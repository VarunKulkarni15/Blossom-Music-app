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

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

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
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query + ' song')}&type=video&videoCategoryId=10&safeSearch=strict&key=${activeKey}`;

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
// 🌸 ROUTE 2: /api/petal-chat
// ================================================
// Accepts: POST /api/petal-chat with JSON body { messages: [...] }
// Returns: Groq API JSON response (proxied directly)
// ================================================

app.post('/api/petal-chat', async (req, res) => {
    const { messages, temperature, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing or invalid messages array.' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
        return res.status(500).json({ error: 'Groq API key not configured on server.' });
    }

    try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                temperature: temperature ?? 0.8,
                max_tokens: max_tokens ?? 150,
            }),
        });

        const data = await groqRes.json();

        if (!groqRes.ok) {
            console.error('[Groq] API Error:', data);
            return res.status(groqRes.status).json(data);
        }

        return res.json(data);

    } catch (err) {
        console.error('[Groq] Fetch failed:', err.message);
        return res.status(500).json({ error: 'Failed to reach Groq API.' });
    }
});

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
