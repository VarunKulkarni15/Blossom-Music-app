const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);
const NodeID3 = require('node-id3');
const archiver = require('archiver');
const os = require('os');
const saavn = require('saavnapi').default;

const CACHE_DIR = path.join(os.tmpdir(), 'blossom_downloads_cache');
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function pLimit(concurrency) {
    const queue = [];
    let activeCount = 0;
    const next = () => {
        activeCount--;
        if (queue.length > 0) queue.shift()();
    };
    return (fn) => new Promise((resolve, reject) => {
        const run = async () => {
            activeCount++;
            try { resolve(await fn()); } catch (err) { reject(err); }
            next();
        };
        if (activeCount < concurrency) run();
        else queue.push(run);
    });
}

// Function to download, convert, tag and cache a song
async function getCachedOrDownloadSong(song) {
    const cacheKey = `${song.id}_${song.source}`.replace(/[^a-zA-Z0-9_-]/g, '');
    const cachePath = path.join(CACHE_DIR, cacheKey + '.mp3');
    
    if (fs.existsSync(cachePath)) {
        return cachePath; // Serve from cache
    }
    
    // Download cover image
    let coverBuffer = null;
    if (song.cover) {
        try {
            const cRes = await fetch(song.cover);
            if (cRes.ok) coverBuffer = await cRes.buffer();
        } catch(e){
            console.error('Cover download failed:', e);
        }
    }

    // Convert to MP3
    await new Promise(async (resolve, reject) => {
        try {
            let stream;
            if (song.source === 'youtube') {
                const url = `https://www.youtube.com/watch?v=${song.id}`;
                stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
                stream.on('error', (err) => reject(err));
            } else {
                // Fetch fresh high quality Saavn URL
                const details = await saavn.songs.getSongDetails(song.id);
                let actualUrl = null;
                if (details && details.downloadUrl) {
                    actualUrl = details.downloadUrl.find(u => u.quality === '320kbps')?.url || details.downloadUrl[0]?.url;
                }
                if (!actualUrl) throw new Error("No URL found for Saavn song");
                
                const sRes = await fetch(actualUrl);
                stream = sRes.body;
                stream.on('error', (err) => reject(err));
            }

            ffmpeg(stream)
                .audioBitrate(320)
                .toFormat('mp3')
                .on('error', (err) => {
                    console.error('FFmpeg Error:', err);
                    reject(err);
                })
                .on('end', () => resolve())
                .save(cachePath);
        } catch (e) {
            reject(e);
        }
    });

    // Tag the MP3
    const tags = {
        title: song.title || 'Unknown Title',
        artist: song.artist || 'Unknown Artist',
    };
    if (coverBuffer) {
        tags.image = {
            mime: 'image/jpeg',
            type: { id: 3, name: 'front cover' },
            description: 'Cover',
            imageBuffer: coverBuffer
        };
    }
    NodeID3.write(tags, cachePath);
    
    return cachePath;
}

module.exports = function(app) {
    // 1. Single Song Download
    app.post('/api/download/song', async (req, res) => {
        const song = req.body;
        if (!song || !song.id || !song.source) return res.status(400).json({ error: 'Invalid song data' });
        
        try {
            const mp3Path = await getCachedOrDownloadSong(song);
            res.download(mp3Path, `${song.title} - ${song.artist}.mp3`);
        } catch (err) {
            console.error('[Download Single Error]', err);
            res.status(500).json({ error: 'Failed to extract song' });
        }
    });

    // 2. Batch / Playlist Download
    app.post('/api/download/batch', async (req, res) => {
        const { songs, folderName } = req.body;
        if (!songs || !Array.isArray(songs) || songs.length === 0) return res.status(400).json({ error: 'No songs provided' });
        
        const limit = pLimit(2); // Process max 2 songs concurrently to save CPU
        
        try {
            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.on('error', (err) => { 
                console.error('Archiver error:', err); 
                if (!res.headersSent) res.status(500).json({ error: 'Archive failed' });
            });
            
            // Set headers for zip streaming
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', `attachment; filename="${folderName}_Blossom.zip"`);
            archive.pipe(res);
            
            // Wait for all to finish processing/caching
            const processedPaths = await Promise.all(
                songs.map(song => limit(async () => {
                    try {
                        const filePath = await getCachedOrDownloadSong(song);
                        const fileName = `${song.title.replace(/[\/\?<>\\:\*\|":]/g, '')} - ${song.artist.replace(/[\/\?<>\\:\*\|":]/g, '')}.mp3`;
                        return { filePath, fileName };
                    } catch (e) {
                        console.error(`Failed batch song ${song.id}:`, e);
                        return null;
                    }
                }))
            );
            
            processedPaths.forEach(item => {
                if (item) {
                    archive.file(item.filePath, { name: item.fileName });
                }
            });
            
            archive.finalize();
        } catch (err) {
            console.error('[Download Batch Error]', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to create zip archive' });
            }
        }
    });
};
