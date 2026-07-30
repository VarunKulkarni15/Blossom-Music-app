// ================================================
// 🌸 BLOSSOM — Node.js Backend Proxy Server
// ================================================
// Keeps all API keys secure on the server-side.
// Serves static frontend + provides two API routes.
// ================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const saavn = require('saavnapi').default;
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);
const NodeID3 = require('node-id3');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Security / Bot Protection ---
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all /api routes
app.use('/api/', apiLimiter);

// --- Domain Redirect Middleware ---
app.use((req, res, next) => {
    if (req.hostname && req.hostname.includes('.onrender.com')) {
        return res.redirect(301, 'https://blossom.varunkulkarni.dpdns.org' + req.originalUrl);
    }
    next();
});

// --- Serve Static Frontend Files ---
// This serves index.html, app.js, styles.css, etc.
app.use(express.static(path.join(__dirname)));

// ================================================
// 🎵 ROUTE 1: /api/youtube-search
// ================================================
// Accepts: GET /api/youtube-search?query=...
// Returns: Array of YouTube video objects
// Logic:   Cycles through 5 YT API keys on 403 errors
// ================================================

const YT_KEYS = [
    process.env.YT_KEY_1,
    process.env.YT_KEY_2,
    process.env.YT_KEY_3,
    process.env.YT_KEY_4,
    process.env.YT_KEY_5,
].filter(Boolean); // Remove any undefined entries

// Persist the active key index across requests (per server session)
let currentKeyIndex = 0;

app.get('/api/youtube-search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter.' });
    }

    if (YT_KEYS.length === 0) {
        return res.status(500).json({ error: 'No YouTube API keys configured on server.' });
    }

    let attempts = 0;

    while (attempts < YT_KEYS.length) {
        const activeKey = YT_KEYS[currentKeyIndex];
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(query + ' official audio')}&type=video&videoCategoryId=10&safeSearch=strict&key=${activeKey}`;

        try {
            const ytRes = await fetch(url);

            if (ytRes.status === 403) {
                // Quota exhausted for this key — rotate silently
                console.warn(`[YT] Key ${currentKeyIndex + 1} exhausted. Rotating...`);
                currentKeyIndex = (currentKeyIndex + 1) % YT_KEYS.length;
                attempts++;
                continue;
            }

            if (!ytRes.ok) {
                throw new Error(`YouTube API HTTP error: ${ytRes.status}`);
            }

            const data = await ytRes.json();

            if (!data.items || data.items.length === 0) {
                return res.json([]);
            }

            const results = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                artist: item.snippet.channelTitle,
                cover: item.snippet.thumbnails.high?.url
                     || item.snippet.thumbnails.medium?.url
                     || item.snippet.thumbnails.default?.url,
            }));

            return res.json(results);

        } catch (err) {
            console.error(`[YT] Search failed on Key ${currentKeyIndex + 1}:`, err.message);
            currentKeyIndex = (currentKeyIndex + 1) % YT_KEYS.length;
            attempts++;
        }
    }

    console.error('[YT] All API keys are exhausted.');
    return res.status(503).json({ error: 'All YouTube API keys exhausted. Try again tomorrow.' });
});

// ================================================
// 🎵 ROUTE 1.5: /api/saavn-search
// ================================================
// Accepts: GET /api/saavn-search?query=...
// Returns: Array of Saavn song objects with streaming URLs
// ================================================

app.get('/api/saavn-search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter.' });
    }

    try {
        // Fetch 30 search results from JioSaavn's official internal API
        const saavnRes = await fetch(`https://www.jiosaavn.com/api.php?__call=search.getResults&q=${encodeURIComponent(query)}&n=30&p=1&_format=json&_marker=0&ctx=android`);
        if (!saavnRes.ok) throw new Error('Failed to fetch from JioSaavn');
        
        const saavnData = await saavnRes.json();
        const searchResults = saavnData.results || [];
        
        if (searchResults.length === 0) {
             return res.json([]);
        }

        // Extract IDs and fetch full song details (which includes streaming URLs) via saavnapi
        const songIds = searchResults.map(song => song.id);
        const detailedSongs = await saavn.songs.getSongByIds({ songIds });
        
        const results = detailedSongs.map(song => {
            let audioUrl = '';
            if (song.downloadUrl && song.downloadUrl.length > 0) {
                // Get the highest quality available (usually the last element)
                audioUrl = song.downloadUrl[song.downloadUrl.length - 1].url;
            }
            
            let imageUrl = '';
            if (song.image && song.image.length > 0) {
                imageUrl = song.image[song.image.length - 1].url;
            }

            let artistName = 'Unknown Artist';
            if (song.artists && song.artists.primary && song.artists.primary.length > 0) {
                artistName = song.artists.primary.map(a => a.name).join(', ');
            }

            return {
                id: song.id,
                title: song.name,
                artist: artistName,
                cover: imageUrl,
                duration: song.duration,
                url: audioUrl,
                source: 'saavn'
            };
        });

        res.json(results);
    } catch (e) {
        console.error('[SAAVN SEARCH]', e);
        res.status(500).json({ error: 'Failed to search Saavn.' });
    }
});

// ================================================
// 🎵 ROUTE 1.6: /api/saavn-suggest
// ================================================
// Accepts: GET /api/saavn-suggest?id=...
// Returns: Array of similar Saavn song objects
// ================================================
app.get('/api/saavn-suggest', async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id parameter.' });

    try {
        const suggestions = await saavn.songs.getSongSuggestions({ songId: id, limit: 10 });
        if (!suggestions || suggestions.length === 0) return res.json([]);

        const songIds = suggestions.map(song => song.id);
        const detailedSongs = await saavn.songs.getSongByIds({ songIds });
        
        const results = detailedSongs.map(song => {
            let audioUrl = '';
            if (song.downloadUrl && song.downloadUrl.length > 0) audioUrl = song.downloadUrl[song.downloadUrl.length - 1].url;
            let imageUrl = '';
            if (song.image && song.image.length > 0) imageUrl = song.image[song.image.length - 1].url;
            let artistName = 'Unknown Artist';
            if (song.artists && song.artists.primary && song.artists.primary.length > 0) {
                artistName = song.artists.primary.map(a => a.name).join(', ');
            }

            return {
                id: song.id,
                title: song.name,
                artist: artistName,
                cover: imageUrl,
                duration: song.duration,
                url: audioUrl,
                source: 'saavn'
            };
        });
        res.json(results);
    } catch (e) {
        console.error('[SAAVN SUGGEST]', e);
        res.status(500).json({ error: 'Failed to fetch suggestions.' });
    }
});


// --- DOWNLOAD ENGINE ---
require('./downloadEngine')(app);

// --- Fallback: Serve index.html for any unknown route (SPA support) ---
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`\n🌸 Blossom server running at: http://localhost:${PORT}`);
    console.log(`   YT keys loaded: ${YT_KEYS.length}`);
    console.log(`   Groq key loaded: ${!!process.env.GROQ_API_KEY}\n`);
});
