// 🚀 THE BLOSSOM V2 CINEMATIC REDIRECT
if (window.location.hostname.includes("github.io")) {
    document.addEventListener("DOMContentLoaded", () => {
        // Nuke the old HTML and inject a beautiful Liquid Glass countdown screen
        document.body.innerHTML = `
            <div style="position: fixed; inset: 0; z-index: 99999; background-color: #050508; background-image: radial-gradient(circle at 50% 100%, #750e32 0%, transparent 55%); color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; text-align: center; padding: 20px;">
                <span style="font-size: 80px; filter: drop-shadow(0 0 25px rgba(251,113,133,0.4));">🌸</span>
                <h1 style="font-size: 32px; font-weight: 800; margin-top: 24px; margin-bottom: 12px; letter-spacing: -0.5px;">Blossom leveled up.</h1>
                <p style="color: rgba(255,255,255,0.6); max-width: 400px; margin-bottom: 40px; font-size: 15px; line-height: 1.6;">We migrated to a dedicated cloud server for 10x better performance. Warping you to the new domain in...</p>
                
                <div style="font-size: 72px; font-weight: 900; color: #fb7185; margin-bottom: 40px; text-shadow: 0 0 30px rgba(251,113,133,0.3);" id="countdown">5</div>
                
                <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin-bottom: 10px;">Taking too long?</p>
                <a href="https://blossom-music-app.onrender.com" style="color: white; font-weight: 700; text-decoration: none; padding: 14px 28px; border: 1px solid rgba(251, 113, 133, 0.5); border-radius: 16px; background: rgba(251, 113, 133, 0.15); backdrop-filter: blur(10px); box-shadow: 0 10px 25px -5px rgba(251,113,133,0.3); transition: all 0.3s;">Take me there now ✨</a>
            </div>
        `;

        let timeLeft = 5;
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                document.getElementById('countdown').innerText = timeLeft;
            } else {
                clearInterval(timer);
                window.location.replace("https://blossom-music-app.onrender.com");
            }
        }, 1000);
    });
}

lucide.createIcons();

        // --- SPLASH SCREEN & QUOTES ---
        const quotes = [
            "Where music blossoms.", "Life sounds better with music.", "Music is my escape.",
            "Where words fail, music speaks.", "Turn life into a soundtrack.", "Feel the rhythm."
        ];
        document.getElementById('splashQuote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

        // Cinematic Two-Stage Exit: Logo Zoom-In → UI Zoom-Out Reveal
        setTimeout(() => {
            const splash = document.getElementById('splashScreen');
            const mainAppContainer = document.getElementById('mainAppContainer');

            // Pre-hide the main UI so there's no flash before the zoom-out reveal
            if (mainAppContainer) mainAppContainer.style.opacity = '0';

            // STAGE 1: Logo blasts forward filling the screen (0.65s)
            splash.classList.add('splash-logo-zoom-forward');

            // STAGE 2: At peak of zoom (~0.5s in), fade out the splash screen
            setTimeout(() => {
                splash.style.opacity = '0';
            }, 480);

            // STAGE 3: Splash gone → reveal UI zooming out from navbar logo position
            setTimeout(() => {
                splash.style.display = 'none';

                if (mainAppContainer) {
                    mainAppContainer.style.opacity = '';
                    mainAppContainer.classList.add('ui-zoom-reveal');
                    mainAppContainer.addEventListener('animationend', () => {
                        mainAppContainer.classList.remove('ui-zoom-reveal');
                    }, { once: true });
                }

                checkNamePrompt();
            }, 1020); // 480ms (fade trigger) + ~540ms (fade completes)
        }, 3500);

        // --- 🛡️ THE NEW PETAL AI ONBOARDING SPOTLIGHT ---
        function checkAndShowSpotlight() {
            if (!localStorage.getItem('petalTutorialSeen')) {
                setTimeout(() => {
                    const overlay = document.getElementById('petalTutorialOverlay');
                    const realBtn = document.getElementById('aiChatToggle');
                    
                    // Force the button to glow wildly above the dark screen
                    realBtn.classList.add('ring-4', 'ring-rose-500', 'ring-opacity-50', 'shadow-[0_0_50px_#fb7185]', 'animate-pulse', 'z-[160]');
                    
                    overlay.style.display = 'flex';
                    setTimeout(() => overlay.classList.replace('opacity-0', 'opacity-100'), 50);
                }, 2000); 
            } else if (!localStorage.getItem('blossomDisclaimerSeen')) {
                setTimeout(() => {
                    if (window.innerWidth < 768) toggleSidebar();
                    setTimeout(() => {
                        const overlay = document.getElementById('tutorialOverlay');
                        const realBtn = document.getElementById('privacyShieldBtn');
                        const focusArea = document.getElementById('tutorialFocusArea');
                        const rect = realBtn.getBoundingClientRect();
                        focusArea.style.top = rect.top + 'px';
                        focusArea.style.left = rect.left + 'px';
                        focusArea.style.width = rect.width + 'px';
                        focusArea.style.height = rect.height + 'px';
                        overlay.style.display = 'block';
                        void overlay.offsetWidth; 
                        overlay.classList.replace('opacity-0', 'opacity-100');
                    }, 500); 
                }, 2000); 
            }
        }

        window.closePetalTutorial = function() {
            const overlay = document.getElementById('petalTutorialOverlay');
            const realBtn = document.getElementById('aiChatToggle');
            
            overlay.classList.replace('opacity-100', 'opacity-0');
            realBtn.classList.remove('ring-4', 'ring-rose-500', 'ring-opacity-50', 'shadow-[0_0_50px_#fb7185]', 'animate-pulse', 'z-[160]');
            
            setTimeout(() => { 
                overlay.style.display = 'none'; 
                overlay.classList.add('hidden'); 
            }, 1000);
            
            localStorage.setItem('petalTutorialSeen', 'true');
            
            if (!localStorage.getItem('blossomDisclaimerSeen')) {
                setTimeout(checkAndShowSpotlight, 2000);
            }
        }

        window.openDisclaimerFromTutorial = function() {
            const overlay = document.getElementById('tutorialOverlay');
            overlay.classList.replace('opacity-100', 'opacity-0');
            setTimeout(() => { overlay.style.display = 'none'; overlay.classList.add('hidden'); }, 1000);
            localStorage.setItem('blossomDisclaimerSeen', 'true');
            openDisclaimer();
        }

        window.openDisclaimer = function() {
            if (window.innerWidth < 768) toggleSidebar(true);
            showModal('disclaimerModal');
        }

        // --- DATA STATE & PERSISTENCE ---
        let saavnResultsList = []; 
        let ytResultsList = []; 
        let cloudSongs = []; 
        
        let library = JSON.parse(localStorage.getItem('blossomLibrary')) || []; 
        let playlists = JSON.parse(localStorage.getItem('blossomPlaylists')) || {};
        let userName = localStorage.getItem('blossomName') || '';
        let lastPlayed = JSON.parse(localStorage.getItem('blossomLastPlayed')) || null;
        let playHistory = JSON.parse(localStorage.getItem('blossomPlayHistory')) || [];
        
        if (lastPlayed && playHistory.length === 0) playHistory.push(lastPlayed);

        let currentQueue = []; 
        let activeSongId = null;
        let playing = false;
        let currentView = 'home';
        let contextSongId = null;
        let currentEngineTab = 'saavn'; 
        let isSearching = false; 

        let dashboardData = { artist: [], similar: [], trending: [] };
        let isDashboardLoading = false;

        function saveLibrary() {
            localStorage.setItem('blossomLibrary', JSON.stringify(library));
            localStorage.setItem('blossomPlaylists', JSON.stringify(playlists));
        }

        // DASHBOARD GHOST FETCH 
        async function loadDashboard() {
            isDashboardLoading = true;
            if(currentView === 'home' && document.getElementById('searchInput').value.trim() === '') renderList(); 
            
            try {
                if (playHistory.length === 0) {
                    const tRes = await searchSaavnAPI("top hits");
                    dashboardData.trending = tRes.slice(0, 10);
                    cloudSongs = dashboardData.trending; 
                } else {
                    const anchorSong = playHistory[0]; 
                    const [aRes, sRes] = await Promise.all([
                        searchSaavnAPI(anchorSong.artist + " popular").catch(()=>[]),
                        searchSaavnAPI(anchorSong.title + " " + anchorSong.artist).catch(()=>[])
                    ]);
                    dashboardData.artist = aRes.filter(x => x.id !== anchorSong.id).slice(0, 10);
                    dashboardData.similar = sRes.filter(x => x.id !== anchorSong.id && !dashboardData.artist.find(a=>a.id===x.id)).slice(0, 10);
                }
            } catch(e) {}
            isDashboardLoading = false;
            if(currentView === 'home' && document.getElementById('searchInput').value.trim() === '') renderList();
        }
        setTimeout(loadDashboard, 2500); 

        // --- NAME PROMPT & GREETING ---
        function checkNamePrompt() {
            if (!userName) showModal('nameModal');
            else { updateGreeting(); checkAndShowSpotlight(); }
        }

        document.getElementById('saveNameBtn').onclick = () => {
            const name = document.getElementById('nameInput').value.trim();
            if (name) {
                userName = name;
                localStorage.setItem('blossomName', userName);
                hideModals();
                updateGreeting();
                checkAndShowSpotlight(); 
            }
        };

        function updateGreeting() {
            const hour = new Date().getHours();
            let g = "Good evening";
            if (hour < 12) g = "Good morning";
            else if (hour < 18) g = "Good afternoon";
            const nameStr = userName ? `, ${userName}` : "";
            document.getElementById('greetingText').innerText = `${g}${nameStr} ✨`;
        }

        // --- DISCORD FEEDBACK WEBHOOK ---
        const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1480882298768330782/SJNH-ED1sc2XwwT5SA6YDl6jGDHuVKnGgkDbbanuKJHujbQXRQU-NkWext4wpyjENUat"; 
        document.getElementById('sendFeedbackBtn').onclick = async () => {
            const name = document.getElementById('feedbackName').value.trim() || 'Anonymous';
            const text = document.getElementById('feedbackText').value.trim();
            const btnText = document.getElementById('fbBtnText');
            if (!text) { alert("Please type a message first!"); return; }
            btnText.innerText = "Sending...";
            const payload = {
                username: "Blossom Feedback Bot", avatar_url: "https://i.imgur.com/8N8y8oX.png",
                embeds: [{ title: "New App Feedback 🌸", color: 16737378, fields: [ { name: "From User", value: name, inline: true }, { name: "Device Info", value: navigator.platform, inline: true }, { name: "Message", value: text } ] }]
            };
            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (response.ok) {
                    btnText.innerText = "Sent! ✨";
                    setTimeout(() => { hideModals(); document.getElementById('feedbackText').value = ''; btnText.innerText = "Send to Discord"; }, 2000);
                } else throw new Error("Discord API error");
            } catch (err) { btnText.innerText = "Error sending"; setTimeout(() => btnText.innerText = "Send to Discord", 2000); }
        };

        // --- THEME ENGINE ---
        const savedTheme = localStorage.getItem('blossomTheme') || 'theme-dark';
        document.body.className = savedTheme;

        function applyThemeSelection(themeName) {
            document.body.className = themeName;
            localStorage.setItem('blossomTheme', themeName);
            document.querySelectorAll('.theme-select-btn').forEach(btn => {
                if (btn.dataset.theme === themeName) { btn.classList.add('border-rose-400'); btn.classList.remove('border-white/10'); } 
                else { btn.classList.remove('border-rose-400'); btn.classList.add('border-white/10'); }
            });
        }

        document.getElementById('settingsBtn').onclick = () => {
            const currentTheme = document.body.className;
            if (window.innerWidth < 768) toggleSidebar(true);
            document.querySelectorAll('.theme-select-btn').forEach(btn => {
                if (btn.dataset.theme === currentTheme) { btn.classList.add('border-rose-400'); btn.classList.remove('border-white/10'); } 
                else { btn.classList.remove('border-rose-400'); btn.classList.add('border-white/10'); }
                btn.onclick = () => applyThemeSelection(btn.dataset.theme);
            });
            showModal('settingsModal');
        };

        function startPetals() {
            const container = document.getElementById('petals-container');
            setInterval(() => {
                const petal = document.createElement('div'); petal.className = 'petal';
                const size = Math.random() * 8 + 6;
                petal.style.width = size + 'px'; petal.style.height = size + 'px';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
                petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
                container.appendChild(petal);
                setTimeout(() => petal.remove(), 10000);
            }, 400);
        }
        startPetals();

        // --- MOBILE SIDEBAR TOGGLE ---
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        function toggleSidebar(forceClose = false) {
            const isClosed = sidebar.classList.contains('-translate-x-full');
            if (isClosed && !forceClose) {
                sidebar.classList.remove('-translate-x-full'); sidebarOverlay.classList.remove('hidden');
                setTimeout(() => sidebarOverlay.classList.replace('opacity-0', 'opacity-100'), 10);
            } else {
                sidebar.classList.add('-translate-x-full'); sidebarOverlay.classList.replace('opacity-100', 'opacity-0');
                setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
            }
        }
        document.getElementById('openSidebarBtn').onclick = () => toggleSidebar();
        document.getElementById('closeSidebarBtn').onclick = () => toggleSidebar(true);
        sidebarOverlay.onclick = () => toggleSidebar(true);

        // --- MODAL UTILS ---
        function showModal(id) {
            const m = document.getElementById(id);
            m.style.display = 'flex'; m.classList.remove('hidden');
            setTimeout(() => m.classList.replace('opacity-0', 'opacity-100'), 10);
        }
        function hideModals() {
            document.querySelectorAll('.fixed.z-\\[60\\], .fixed.z-\\[70\\], .fixed.z-\\[80\\], .fixed.z-\\[110\\], .fixed.z-\\[120\\]').forEach(m => {
                m.classList.replace('opacity-100', 'opacity-0');
                setTimeout(() => { m.style.display = 'none'; m.classList.add('hidden'); }, 300);
            });
            const sheet = document.getElementById('bottomSheet');
            if (sheet && !sheet.classList.contains('hidden')) closeMenu();
        }
        document.querySelectorAll('.close-modal-btn').forEach(btn => btn.onclick = hideModals);
        document.querySelectorAll('.close-info-btn').forEach(btn => btn.onclick = hideModals);

        let confirmActionCb = null;
        function showConfirm(title, text, actionText, cb) {
            document.getElementById('confirmModalTitle').innerText = title;
            document.getElementById('confirmModalText').innerText = text;
            const actionBtn = document.getElementById('confirmModalAction');
            actionBtn.innerText = actionText; confirmActionCb = cb;
            showModal('confirmModal');
        }
        document.getElementById('confirmModalAction').onclick = () => { if(confirmActionCb) confirmActionCb(); hideModals(); };

        // --- SIDEBAR & NAVIGATION ---
        const mainHeaderTitle = document.getElementById('mainHeaderTitle');
        const playlistActions = document.getElementById('playlistActions');
        const searchBox = document.getElementById('searchBox');
        const engineTabsContainer = document.getElementById('engineTabsContainer');
        const searchInput = document.getElementById('searchInput');

        document.getElementById('navHome').onclick = () => setView('home');
        document.getElementById('navFavs').onclick = () => setView('favs');

        function setView(viewStr) {
            currentView = viewStr;
            isSearching = false; 
            
            // 👉 FIX: Force clear the search bar when clicking Explore Cloud
            if (viewStr === 'home') {
                searchInput.value = '';
                searchBox.classList.remove('expanded');
                searchInput.classList.add('opacity-0', 'pointer-events-none');
            }
            
            if (window.innerWidth < 768) toggleSidebar(true);
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.replace('bg-white/10', 'bg-transparent'); btn.classList.replace('text-white', 'text-white/60');
                btn.classList.replace('font-bold', 'font-medium'); btn.classList.replace('border-white/5', 'border-transparent');
                btn.classList.remove('shadow-sm');
                if (btn.dataset.view === viewStr) {
                    btn.classList.replace('bg-transparent', 'bg-white/10'); btn.classList.replace('text-white/60', 'text-white');
                    btn.classList.replace('font-medium', 'font-bold'); btn.classList.replace('border-transparent', 'border-white/5');
                    btn.classList.add('shadow-sm');
                }
            });
            playlistActions.classList.add('hidden'); playlistActions.classList.remove('flex');
            
            if(viewStr === 'home') { 
                mainHeaderTitle.innerText = "Explore"; 
                searchBox.style.display = "flex"; 
                if(searchInput.value.trim() !== '') {
                    engineTabsContainer.classList.remove('hidden');
                    setTimeout(() => engineTabsContainer.classList.remove('opacity-0'), 10);
                } else {
                    engineTabsContainer.classList.add('hidden', 'opacity-0');
                }
            } else {
                searchBox.style.display = "none";
                engineTabsContainer.classList.add('hidden', 'opacity-0');
                if(viewStr === 'favs') mainHeaderTitle.innerText = "Liked Songs";
                else if(viewStr.startsWith('playlist:')) {
                    mainHeaderTitle.innerText = viewStr.substring(9);
                    playlistActions.classList.remove('hidden'); playlistActions.classList.add('flex');
                }
            }
            renderList();
        }

        // --- PLAYLIST LOGIC ---
        document.getElementById('createPlaylistBtn').onclick = () => {
            if (window.innerWidth < 768) toggleSidebar(true);
            document.getElementById('inputModalField').value = ""; document.getElementById('inputModalField').dataset.mode = "create";
            showModal('inputModal');
        };
        document.getElementById('editPlaylistBtn').onclick = () => {
            const pName = currentView.substring(9);
            document.getElementById('inputModalField').value = pName; document.getElementById('inputModalField').dataset.mode = "rename"; document.getElementById('inputModalField').dataset.oldName = pName;
            showModal('inputModal');
        };
        document.getElementById('inputModalSave').onclick = () => {
            const name = document.getElementById('inputModalField').value.trim();
            const mode = document.getElementById('inputModalField').dataset.mode;
            if(!name) return;
            if(mode === "create") { if(!playlists[name]) playlists[name] = []; currentView = `playlist:${name}`; } 
            else { const old = document.getElementById('inputModalField').dataset.oldName; playlists[name] = playlists[old] || []; delete playlists[old]; currentView = `playlist:${name}`; }
            renderSidebarPlaylists(); setView(currentView); saveLibrary(); hideModals();
        };
        document.getElementById('deletePlaylistBtn').onclick = () => {
            const pName = currentView.substring(9);
            showConfirm("Delete Playlist", `Are you sure you want to delete "${pName}"?`, "Delete", () => { delete playlists[pName]; saveLibrary(); renderSidebarPlaylists(); setView('home'); });
        };
        function renderSidebarPlaylists() {
            const sb = document.getElementById('sidebarPlaylists'); sb.innerHTML = '';
            Object.keys(playlists).forEach(name => {
                const btn = document.createElement('button');
                btn.className = "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white font-medium transition btn-anim nav-btn border border-transparent truncate";
                btn.dataset.view = `playlist:${name}`;
                btn.innerHTML = `<i data-lucide="list-music" class="w-5 h-5 shrink-0"></i> <span class="truncate text-sm md:text-base">${name}</span>`;
                btn.onclick = () => setView(`playlist:${name}`); sb.appendChild(btn);
            });
            lucide.createIcons();
        }
        renderSidebarPlaylists(); 

        // =========================================
        // 🚀 THE NEW DOUBLE-ENGINE SEARCH LOGIC
        // =========================================
        const tabSaavn = document.getElementById('tabSaavn');
        const tabYT = document.getElementById('tabYT');

        // 🚀 API keys are now secured in .env on the server.
        // The frontend calls /api/youtube-search which handles key rotation internally.

        const saavnMirrors = ['https://saavn.me', 'https://saavn.dev/api', 'https://jiosaavn-api-privatecvc2.vercel.app'];

        document.getElementById('searchTrigger').onclick = () => {
            const box = document.getElementById('searchBox');
            box.classList.toggle('expanded');
            if(box.classList.contains('expanded')) { 
                searchInput.classList.remove('opacity-0', 'pointer-events-none'); 
                searchInput.focus(); 
            } else { 
                searchInput.classList.add('opacity-0', 'pointer-events-none'); 
                if(searchInput.value.trim() === '') {
                    engineTabsContainer.classList.add('hidden', 'opacity-0');
                }
            }
        };

        // 🚀 Clean Inline Widget Toggle
        tabSaavn.onclick = () => {
            currentEngineTab = 'saavn';
            tabSaavn.className = "px-5 py-2 rounded-lg bg-white/10 text-white font-bold text-xs md:text-sm transition-all shadow-sm border border-white/10 flex items-center gap-2 btn-anim";
            tabYT.className = "px-5 py-2 rounded-lg text-white/50 hover:text-white font-medium text-xs md:text-sm transition-all border border-transparent flex items-center gap-2 btn-anim";
            if(searchInput.value.trim() !== '') renderList();
        };

        tabYT.onclick = () => {
            currentEngineTab = 'youtube';
            tabYT.className = "px-5 py-2 rounded-lg bg-white/10 text-white font-bold text-xs md:text-sm transition-all shadow-sm border border-white/10 flex items-center gap-2 btn-anim";
            tabSaavn.className = "px-5 py-2 rounded-lg text-white/50 hover:text-white font-medium text-xs md:text-sm transition-all border border-transparent flex items-center gap-2 btn-anim";
            if(searchInput.value.trim() !== '') renderList();
        };

        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim() === '' && currentView === 'home') { 
                saavnResultsList = []; ytResultsList = []; renderList(); 
                engineTabsContainer.classList.add('hidden', 'opacity-0');
            }
        });

        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (!query) return;
                
                // Active searching state so "Not Found" doesnt flash
                isSearching = true; 
                document.getElementById('songList').innerHTML = '';
                
                engineTabsContainer.classList.remove('hidden');
                setTimeout(() => engineTabsContainer.classList.remove('opacity-0'), 10);
                
                // Force Saavn as priority tab silently
                tabSaavn.click();

                try {
                    await Promise.allSettled([
                        searchSaavnAPI(query).then(res => saavnResultsList = res || []),
                        searchYouTubeAPI(query).then(res => ytResultsList = res || [])
                    ]);
                } catch (err) {
                    console.error(err);
                } finally {
                    isSearching = false; 
                    renderList();
                }
            }
        });

        function decodeHTML(html) {
            if (!html) return 'Unknown';
            const txt = document.createElement("textarea"); txt.innerHTML = html; return txt.value;
        }

        async function searchSaavnAPI(query) {
            const endpoints = [
                `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}&limit=15`,
                `https://saavn.me/search/songs?query=${encodeURIComponent(query)}&limit=15`,
                `https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${encodeURIComponent(query)}&limit=15`
            ];
            const proxyBypass = `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoints[0])}`;
            endpoints.push(proxyBypass);

            for (let url of endpoints) {
                try {
                    const res = await fetch(url);
                    if (!res.ok) continue;
                    const data = await res.json();
                    let tracks = data.data?.results || data.results || (Array.isArray(data) ? data : []);
                    
                    if (tracks.length > 0) {
                        return tracks.map(item => {
                            let audioUrl = '';
                            if (Array.isArray(item.downloadUrl)) audioUrl = item.downloadUrl[item.downloadUrl.length - 1]?.url || item.downloadUrl[item.downloadUrl.length - 1]?.link || '';
                            else if (typeof item.downloadUrl === 'string') audioUrl = item.downloadUrl;
                            else if (item.media_url) audioUrl = item.media_url;
                            else if (item.url && typeof item.url === 'string' && item.url.includes('.mp4')) audioUrl = item.url;
                            if (audioUrl && audioUrl.startsWith('http://')) audioUrl = audioUrl.replace('http://', 'https://');
                            
                            let imageUrl = Array.isArray(item.image) ? (item.image[item.image.length - 1]?.url || item.image[item.image.length - 1]?.link) : item.image;
                            let artistName = typeof item.primaryArtists === 'string' ? item.primaryArtists : (item.artists?.primary?.map(a => a.name).join(', ') || 'Unknown Artist');
                            
                            return { id: item.id || Math.random().toString(), title: decodeHTML(item.name || item.title), artist: decodeHTML(artistName), cover: imageUrl, duration: parseInt(item.duration || 0, 10), url: audioUrl, source: 'saavn' };
                        }).filter(song => song.url && song.url.startsWith('http')); 
                    }
                } catch (err) {}
            }
            return [];
        }

        // 🚀 THE SECURE YOUTUBE SEARCH (Via Backend Proxy)
        async function searchYouTubeAPI(query) {
            try {
                // Tier 1: Try local Python ytmusicapi backend first
                try {
                    const localRes = await fetch(`http://127.0.0.1:5000/api/search?query=${encodeURIComponent(query)}`);
                    if (localRes.ok) {
                        const localData = await localRes.json();
                        return localData.map(item => ({
                            id: 'yt_' + item.id,
                            videoId: item.id,
                            title: decodeHTML(item.title),
                            artist: decodeHTML(item.artist),
                            cover: item.cover,
                            duration: 0,
                            url: null,
                            source: 'youtube'
                        }));
                    }
                } catch (localErr) {
                    console.log("Local Python Server not detected. Falling back to Node.js proxy.");
                }

                // Tier 2: Secure backend proxy (keys never exposed to browser)
                const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`);
                if (!res.ok) throw new Error(`Proxy HTTP error: ${res.status}`);

                const items = await res.json();
                if (!Array.isArray(items) || items.length === 0) return [];

                return items.map(item => ({
                    id: 'yt_' + item.id,
                    videoId: item.id,
                    title: decodeHTML(item.title),
                    artist: decodeHTML(item.artist),
                    cover: item.cover,
                    duration: 0,
                    url: null,
                    source: 'youtube'
                }));

            } catch(e) {
                console.warn("YouTube Search via proxy failed:", e);
            }
            return [];
        }

        // GLOBAL SONG FINDER
        function findSongObj(id) {
            let s = saavnResultsList.find(x => x.id.toString() === id.toString())
                 || ytResultsList.find(x => x.id.toString() === id.toString())
                 || cloudSongs.find(x => x.id.toString() === id.toString()) 
                 || library.find(x => x.id.toString() === id.toString())
                 || playHistory.find(x => x.id.toString() === id.toString())
                 || dashboardData.artist.find(x => x.id.toString() === id.toString())
                 || dashboardData.similar.find(x => x.id.toString() === id.toString())
                 || dashboardData.trending.find(x => x.id.toString() === id.toString());
            if (!s && lastPlayed && lastPlayed.id.toString() === id.toString()) s = lastPlayed;
            return s;
        }

        function getRenderedSongs() {
            if(currentView === 'home') {
                if (searchInput.value.trim() !== '') {
                    return currentEngineTab === 'saavn' ? saavnResultsList : ytResultsList;
                } else {
                    return cloudSongs;
                }
            }
            if(currentView === 'favs') return library.filter(s => s.fav);
            if(currentView.startsWith('playlist:')) {
                const pName = currentView.substring(9);
                return library.filter(s => playlists[pName] && playlists[pName].includes(s.id));
            }
            return [];
        }

        function isFav(id) { return library.find(x => x.id === id)?.fav || false; }

        window.toggleFav = function(e, id) {
            e.stopPropagation();
            let songInLib = library.find(x => x.id === id);
            if (songInLib) songInLib.fav = !songInLib.fav;
            else { const s = findSongObj(id); if(s) library.push({...s, fav: true}); }
            saveLibrary(); renderList(); if(id === activeSongId) updatePlayerUI();
        };

        // CAROUSEL GENERATOR 
        function createCarousel(title, songsArray) {
            if (!songsArray || songsArray.length === 0) return '';
            let html = `<div class="mb-10 w-full"><h3 class="text-white font-extrabold text-lg md:text-xl mb-4 tracking-wide better-text-shadow">${title}</h3><div class="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-4 pt-1 px-1 -mx-1">`;
            songsArray.forEach(s => {
                const isActive = s.id.toString() === activeSongId?.toString();
                // Perfect Crop for YouTube covers
                const imgClass = `perfect-square transition-transform duration-500 group-hover:scale-110 ${s.source === 'youtube' ? 'yt-crop' : 'w-full h-full object-cover'}`;
                
                const coverHtml = s.cover ? `<img src="${s.cover}" class="${imgClass} relative z-10">` : `<div class="w-full h-full bg-white/5 flex items-center justify-center relative z-10"><span class="text-3xl filter drop-shadow-md">🌸</span></div>`;
                const overlay = isActive && playing ? `<div class="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]"><div class="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div></div>` : `<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 z-20 flex items-center justify-center transition-opacity duration-300"><i data-lucide="play" class="w-10 h-10 text-white fill-current translate-x-0.5"></i></div>`;
                
                html += `<div class="min-w-[140px] w-[140px] md:min-w-[170px] md:w-[170px] flex flex-col group cursor-pointer shrink-0" onclick="playSong('${s.id}')"><div class="w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg mb-3 border border-white/5 transition-all">${overlay}${coverHtml}</div><h4 class="text-white font-bold text-[13px] md:text-[15px] truncate w-full better-text-shadow ${isActive ? 'text-rose-400' : 'group-hover:text-rose-400 transition-colors'}">${s.title}</h4><p class="text-white/50 font-medium text-[11px] md:text-xs truncate w-full mt-0.5">${s.artist}</p></div>`;
            });
            html += `</div></div>`;
            return html;
        }

        function renderList() {
            const listEl = document.getElementById('songList');
            listEl.innerHTML = '';

            // Ensure "Searching" only shows on the Explore page, and not when looking at playlists
            if (isSearching && currentView === 'home') {
                listEl.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-white/50 py-12"><div class="loader mb-4 border-t-rose-400"></div><p class="text-sm font-medium animate-pulse tracking-widest uppercase">Searching Cloud Databases...</p></div>`;
                return;
            }
            
            if (currentView === 'home' && searchInput.value.trim() === '') {
                let html = '';
                if (playHistory.length > 0) html += createCarousel("Based on your last play", playHistory);
                if (isDashboardLoading) html += `<div class="w-full flex flex-col items-center justify-center text-white/30 py-12"><div class="loader mb-4 border-t-rose-400"></div><p class="text-sm font-medium animate-pulse tracking-widest uppercase">Curating Dashboard...</p></div>`;
                else {
                    if (playHistory.length === 0 && dashboardData.trending.length > 0) html += createCarousel("Trending Right Now", dashboardData.trending);
                    else if (playHistory.length > 0) {
                        if (dashboardData.artist.length > 0) html += createCarousel(`More from ${playHistory[0].artist}`, dashboardData.artist);
                        if (dashboardData.similar.length > 0) html += createCarousel("You Might Also Like", dashboardData.similar);
                    }
                }
                if (html === '') html = `<div class="h-full flex flex-col items-center justify-center text-white/20"><i data-lucide="sparkles" class="w-16 h-16 md:w-20 md:h-20 mb-4 opacity-20"></i><p class="italic text-base md:text-lg font-medium text-center text-inherit">Search for a song to build your dashboard.</p></div>`;
                listEl.innerHTML = html; lucide.createIcons(); return; 
            }

            const vs = getRenderedSongs();
            if(vs.length === 0) { 
                listEl.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-white/40 italic font-medium text-base md:text-lg">No ${currentEngineTab === 'youtube' ? 'YouTube' : 'Saavn'} results found.</div>`; 
                return; 
            }
            
            vs.forEach((s, idx) => {
                const isActive = s.id === activeSongId;
                const row = document.createElement('div');
                row.className = `item-glass p-2 md:p-3 rounded-2xl flex items-center justify-between cursor-pointer group mb-1.5 ${isActive ? 'active-gradient shadow-lg' : ''}`;
                
                const imgClass = `perfect-square ${s.source === 'youtube' ? 'yt-crop' : 'w-full h-full object-cover'}`;
                const coverHtml = s.cover ? `<div class="w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-md z-10 relative overflow-hidden bg-white/5"><img src="${s.cover}" class="${imgClass}"></div>` : `<div class="w-10 h-10 md:w-12 md:h-12 rounded-xl fallback-cover flex items-center justify-center shadow-sm z-10 relative bg-white/5"><span class="text-lg md:text-xl filter drop-shadow-sm">🌸</span></div>`;
                
                const indexOrVisualizer = isActive && playing ? `<div class="w-6 md:w-8 flex justify-center"><div class="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div></div>` : `<span class="${isActive ? 'text-white/90' : 'text-white/40'} font-bold text-xs md:text-sm w-6 md:w-8 text-center">${idx + 1}</span>`;
                
                row.innerHTML = `<div class="flex items-center gap-2 md:gap-4 flex-1 overflow-hidden" onclick="playSong('${s.id}')">${indexOrVisualizer}${coverHtml}<div class="overflow-hidden pl-1 md:pl-2"><h4 class="font-bold text-sm md:text-base tracking-wide better-text-shadow truncate transition-all duration-300 ${isActive ? 'text-white text-[0.95rem] md:text-[1.1rem] font-extrabold glow-text' : 'text-white/90 group-hover:text-white'}">${s.title}</h4><p class="${isActive ? 'text-white/90' : 'text-white/50'} font-medium text-xs md:text-sm truncate mt-0.5">${s.artist}</p></div></div><div class="flex items-center gap-1 md:gap-2 pr-1 md:pr-3"><button onclick="toggleFav(event, '${s.id}')" class="p-2 shrink-0 md:opacity-0 group-hover:opacity-100 transition hover:scale-110"><i data-lucide="heart" class="w-4 h-4 md:w-5 md:h-5 ${isFav(s.id) ? 'fav-active text-rose-400 fill-rose-400' : 'text-white/40 hover:text-white'}"></i></button><button onclick="openMenu(event, '${s.id}')" class="p-2 shrink-0 ${isActive ? 'text-white/70 hover:text-white' : 'text-white/40 hover:text-white'} transition hover:scale-110"><i data-lucide="more-horizontal" class="w-5 h-5 md:w-6 md:h-6"></i></button></div>`;
                listEl.appendChild(row);
            });
            lucide.createIcons();
        }

        window.openMenu = function(e, id) {
            e.stopPropagation(); contextSongId = id;
            let s = findSongObj(id);
            if(!s) return;
            document.getElementById('sheetTitle').innerText = s.title; document.getElementById('sheetArtist').innerText = s.artist;
            if(s.cover) { 
                document.getElementById('sheetArt').src = s.cover; 
                document.getElementById('sheetArt').className = `w-full h-full object-cover hidden absolute inset-0 z-10 perfect-square ${s.source === 'youtube' ? 'yt-crop' : ''}`;
                document.getElementById('sheetArt').classList.remove('hidden'); 
                document.getElementById('sheetFallback').classList.add('hidden'); 
            } else { 
                document.getElementById('sheetArt').classList.add('hidden'); 
                document.getElementById('sheetFallback').classList.remove('hidden'); 
            }
            if (currentView.startsWith('playlist:')) document.getElementById('actionRemovePlaylist').classList.remove('hidden');
            else document.getElementById('actionRemovePlaylist').classList.add('hidden');
            const sheet = document.getElementById('bottomSheet'); sheet.style.display = 'flex'; sheet.classList.remove('hidden');
            setTimeout(() => { document.getElementById('bottomSheetOverlay').classList.replace('opacity-0', 'opacity-100'); document.getElementById('bottomSheetContent').classList.remove('translate-y-full'); }, 10);
        }

        window.openInfoModal = function() {
            const s = activeSongId ? findSongObj(activeSongId) : lastPlayed;
            if(!s) return;
            document.getElementById('infoTitle').innerText = s.title; document.getElementById('infoArtist').innerText = s.artist;
            if(s.cover) { 
                document.getElementById('infoArt').src = s.cover; 
                document.getElementById('infoArt').className = `w-full h-full object-cover hidden absolute inset-0 z-10 perfect-square ${s.source === 'youtube' ? 'yt-crop' : ''}`;
                document.getElementById('infoArt').classList.remove('hidden'); 
                document.getElementById('infoFallback').classList.add('hidden'); 
            } else { 
                document.getElementById('infoArt').classList.add('hidden'); 
                document.getElementById('infoFallback').classList.remove('hidden'); 
            }
            
            let durationStr = formatTimeNumber(s.duration);
            if (s.source === 'youtube' && s.duration === 0) durationStr = "Live Extracted";
            document.getElementById('infoDuration').innerText = durationStr;
            
            document.getElementById('infoDate').innerText = new Date().toLocaleDateString('en-IN');
            showModal('infoModal');
        }

        function closeMenu() {
            document.getElementById('bottomSheetOverlay').classList.replace('opacity-100', 'opacity-0');
            document.getElementById('bottomSheetContent').classList.add('translate-y-full');
            setTimeout(() => { const sheet = document.getElementById('bottomSheet'); sheet.style.display = 'none'; sheet.classList.add('hidden'); }, 300);
        }
        document.getElementById('bottomSheetOverlay').onclick = closeMenu;

        document.getElementById('actionPlayNext').onclick = () => { currentQueue.unshift(findSongObj(contextSongId)); closeMenu(); };
        document.getElementById('actionAddQueue').onclick = () => { currentQueue.push(findSongObj(contextSongId)); closeMenu(); };
        document.getElementById('actionRemovePlaylist').onclick = () => {
            if (currentView.startsWith('playlist:')) {
                const pName = currentView.substring(9);
                if (playlists[pName]) { playlists[pName] = playlists[pName].filter(id => id !== contextSongId); saveLibrary(); renderList(); }
                closeMenu();
            }
        };

        document.getElementById('actionAddPlaylist').onclick = () => {
            closeMenu();
            setTimeout(() => {
                const list = document.getElementById('playlistSelectList'); list.innerHTML = ''; const pKeys = Object.keys(playlists);
                if(pKeys.length === 0) { list.innerHTML = '<p class="text-white/50 font-medium text-center py-4">No playlists yet.</p>'; }
                pKeys.forEach(name => {
                    const btn = document.createElement('button');
                    btn.className = "w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-lg text-left btn-anim shadow-sm border border-transparent hover:border-white/10";
                    btn.innerText = name;
                    btn.onclick = () => { 
                        let song = library.find(x => x.id === contextSongId);
                        if(!song) { song = findSongObj(contextSongId); if(song) library.push({...song}); }
                        if(!playlists[name].includes(contextSongId)) playlists[name].push(contextSongId); 
                        saveLibrary(); hideModals(); 
                    };
                    list.appendChild(btn);
                });
                showModal('playlistSelectModal');
            }, 300);
        };

        // =========================================
        // 🚀 THE "TRAFFIC COP" AUDIO ENGINE
        // =========================================
        const audio = document.getElementById('mainAudio');
        let activeEngineState = 'none'; // 'saavn' or 'youtube'
        let ytPlayerReadyState = false;
        let queuedYtVideoObj = null;

        // INVISIBLE YOUTUBE INIT (Trick Browser Throttling & AD-SHIELD)
        function onYouTubeIframeAPIReady() {
            ytPlayer = new YT.Player('yt-player-container', {
                height: '40', width: '40', // Tiny but technical enough to prevent speed throttling
                host: 'https://www.youtube-nocookie.com', // 🛡️ AD-SHIELD: Blocks tracking cookies/ads
                playerVars: { 
                    'autoplay': 1, 
                    'controls': 0, 
                    'playsinline': 1, 
                    'origin': window.location.origin,
                    'iv_load_policy': 3, // Skip annotations/prompts
                    'modestbranding': 1, // Remove logo triggers
                    'rel': 0 // Don't show related videos (ad triggers)
                },
                events: { 
                    'onReady': () => {
                        ytPlayerReadyState = true;
                        if (queuedYtVideoObj) {
                            playYouTubeInternal(queuedYtVideoObj.videoId);
                            queuedYtVideoObj = null;
                        }
                    },
                    'onStateChange': onPlayerStateChange 
                }
            });
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                playing = true; 
                updatePlayerUI();
                
                // Fetch correct duration for YT song dynamically
                const s = findSongObj(activeSongId);
                if (s && s.source === 'youtube') {
                    s.duration = ytPlayer.getDuration() || 0;
                    document.getElementById('totalTime').innerText = formatTimeNumber(s.duration);
                    document.getElementById('fsTotalTime').innerText = formatTimeNumber(s.duration);
                    // Save the duration so it remembers next time
                    let inLib = library.find(x => x.id === s.id);
                    if(inLib) { inLib.duration = s.duration; saveLibrary(); }
                }
            } else if (event.data === YT.PlayerState.PAUSED) {
                playing = false; updatePlayerUI();
            } else if (event.data === YT.PlayerState.ENDED) {
                playNext();
            } else if (event.data === YT.PlayerState.BUFFERING) {
                // Let the user know the song is actively loading
                document.getElementById('trackTitle').innerText = "Buffering stream...";
                document.getElementById('fsTitle').innerText = "Buffering stream...";
            }
        }

        window.playSong = async function(id) {
            activeSongId = id; 
            let s = findSongObj(id);
            if(!s) return;
            
            if (currentView === 'home' && searchInput.value.trim() === '') {
                if (dashboardData.artist.find(x => x.id === id)) currentQueue = dashboardData.artist;
                else if (dashboardData.similar.find(x => x.id === id)) currentQueue = dashboardData.similar;
                else if (dashboardData.trending.find(x => x.id === id)) currentQueue = dashboardData.trending;
                else if (playHistory.find(x => x.id === id)) currentQueue = playHistory;
            } else {
                currentQueue = getRenderedSongs();
            }

            playHistory = playHistory.filter(x => x.id.toString() !== s.id.toString());
            playHistory.unshift(s);
            if (playHistory.length > 8) playHistory.pop();
            localStorage.setItem('blossomPlayHistory', JSON.stringify(playHistory));
            lastPlayed = s;
            localStorage.setItem('blossomLastPlayed', JSON.stringify(lastPlayed));
            
            updatePlayerUI(); 

            // 🚦 TRAFFIC COP ROUTING (Switches between HTML5 and Google Iframe)
            if (s.source === 'youtube') {
                activeEngineState = 'youtube';
                audio.pause(); // Kill Saavn stream
                
                if (ytPlayerReadyState && ytPlayer && ytPlayer.loadVideoById) {
                    playYouTubeInternal(s.videoId);
                } else {
                    queuedYtVideoObj = s;
                    document.getElementById('trackTitle').innerText = "Connecting to YT Engine...";
                    document.getElementById('fsTitle').innerText = "Connecting to YT Engine...";
                }
            } else {
                activeEngineState = 'saavn';
                if (ytPlayerReadyState && ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo(); // Kill YT stream
                
                audio.src = s.url;
                audio.play().catch(e => { console.error("Playback failed", e); });
                playing = true;
                updatePlayerUI();
            }

            renderList();
        }

        function playYouTubeInternal(videoId) {
            ytPlayer.loadVideoById({videoId: videoId, suggestedQuality: 'small'});
            // We don't set playing=true here, we wait for the PLAYING state event
        }

        function updatePlayerUI() {
            const s = activeSongId ? findSongObj(activeSongId) : lastPlayed;
            if(!s) return;
            
            updatePlayButtonUI();
            
            document.getElementById('trackTitle').innerText = s.title;
            document.getElementById('trackArtist').innerText = s.artist;
            
            document.getElementById('fsContext').innerText = s.source === 'youtube' ? "Global Engine (YT)" : "Global Cloud";

            const imgClass = `w-full h-full object-cover hidden absolute inset-0 z-10 transition-all duration-300 group-hover:brightness-50 perfect-square ${s.source === 'youtube' ? 'yt-crop' : ''}`;
            const fsImgClass = `w-full h-full object-cover hidden absolute inset-0 z-10 perfect-square ${s.source === 'youtube' ? 'yt-crop' : ''}`;

            if(s.cover) { 
                document.getElementById('trackArt').src = s.cover; 
                document.getElementById('trackArt').className = imgClass;
                document.getElementById('trackArt').classList.remove('hidden'); 
                document.getElementById('trackFallback').classList.add('hidden'); 
            } else { 
                document.getElementById('trackArt').classList.add('hidden'); 
                document.getElementById('trackFallback').classList.remove('hidden'); 
            }
            
            const favIcon = document.getElementById('trackFavIcon');
            if(favIcon) favIcon.className = `w-6 h-6 ${isFav(s.id) ? 'fav-active text-rose-400 fill-rose-400' : 'text-white/30'}`;
            
            document.getElementById('fsTitle').innerText = s.title;
            document.getElementById('fsArtist').innerText = s.artist;
            
            if(s.cover) { 
                document.getElementById('fsBg').src = s.cover; 
                document.getElementById('fsArt').src = s.cover; 
                document.getElementById('fsArt').className = fsImgClass;
                document.getElementById('fsArt').classList.remove('hidden'); 
                document.getElementById('fsFallback').classList.add('hidden'); 
            } else { 
                document.getElementById('fsArt').classList.add('hidden'); 
                document.getElementById('fsFallback').classList.remove('hidden'); 
            }
            
            if (s.duration && s.duration > 0) {
                document.getElementById('totalTime').innerText = formatTimeNumber(s.duration);
                document.getElementById('fsTotalTime').innerText = formatTimeNumber(s.duration);
            }

            lucide.createIcons();
        }

        function updatePlayButtonUI() {
            const pIcon = document.getElementById('playIcon');
            const pPause = document.getElementById('pauseIcon');
            if (pIcon && pPause) {
                if (playing) { pIcon.classList.add('hidden'); pPause.classList.remove('hidden'); } 
                else { pIcon.classList.remove('hidden'); pPause.classList.add('hidden'); }
            }
            const fsPIcon = document.getElementById('fsPlayIcon');
            const fsPPause = document.getElementById('fsPauseIcon');
            if (fsPIcon && fsPPause) {
                if (playing) { fsPIcon.classList.add('hidden'); fsPPause.classList.remove('hidden'); } 
                else { fsPIcon.classList.remove('hidden'); fsPPause.classList.add('hidden'); }
            }
        }

        if (lastPlayed) {
            updatePlayerUI();
            if (lastPlayed.duration > 0) {
                document.getElementById('totalTime').innerText = formatTimeNumber(lastPlayed.duration);
                document.getElementById('fsTotalTime').innerText = formatTimeNumber(lastPlayed.duration);
            }
        }

        window.playNext = function() {
            if(currentQueue.length === 0) return;
            let idx = currentQueue.findIndex(x => x.id === activeSongId);
            if (idx === -1) idx = 0;
            playSong(currentQueue[(idx + 1) % currentQueue.length].id);
        }

        window.playPrev = function() {
            let currT = activeEngineState === 'youtube' && ytPlayerReadyState ? ytPlayer.getCurrentTime() : audio.currentTime;
            if(currT > 3) { 
                if(activeEngineState === 'youtube' && ytPlayerReadyState) ytPlayer.seekTo(0, true);
                else audio.currentTime = 0; 
                return; 
            }
            if(currentQueue.length === 0) return;
            let idx = currentQueue.findIndex(x => x.id === activeSongId);
            if (idx === -1) idx = 0;
            playSong(currentQueue[(idx - 1 + currentQueue.length) % currentQueue.length].id);
        }

        window.togglePlay = function() {
            if(!activeSongId && lastPlayed) { playSong(lastPlayed.id); return; } 
            else if(!activeSongId) { playNext(); return; }
            
            if (activeEngineState === 'saavn') {
                playing ? audio.pause() : audio.play(); 
                playing = !playing;
            } else if (activeEngineState === 'youtube') {
                if (playing) { ytPlayer.pauseVideo(); playing = false; }
                else { ytPlayer.playVideo(); playing = true; }
            }
            
            updatePlayerUI(); renderList(); 
        };

        // --- PROGRESS & TIME SYNC ---
        function updateProgressBars(curr, dur) {
            if(!dur || isNaN(dur) || dur === 0) return;
            const p = (curr / dur) * 100;
            document.getElementById('progress').value = p;
            document.getElementById('mobileProgress').value = p;
            document.getElementById('fsProgress').value = p;
            const currString = formatTimeNumber(curr);
            const totalString = formatTimeNumber(dur);
            document.getElementById('currTime').innerText = currString;
            document.getElementById('fsCurrTime').innerText = currString;
            document.getElementById('totalTime').innerText = totalString;
            document.getElementById('fsTotalTime').innerText = totalString;
        }

        // HTML5 Audio (Saavn) Sync
        audio.onended = playNext;
        audio.ontimeupdate = () => {
            if (activeEngineState === 'saavn') updateProgressBars(audio.currentTime, audio.duration);
        };

        // YouTube Audio Sync (Runs every 500ms)
        setInterval(() => {
            if (activeEngineState === 'youtube' && playing && ytPlayerReadyState && ytPlayer.getCurrentTime) {
                updateProgressBars(ytPlayer.getCurrentTime(), ytPlayer.getDuration());
            }
        }, 500);

        function handleSeek(e) {
            const perc = e.target.value / 100;
            if (activeEngineState === 'saavn' && audio.duration) {
                audio.currentTime = perc * audio.duration;
            } else if (activeEngineState === 'youtube' && ytPlayerReadyState && ytPlayer.getDuration) {
                ytPlayer.seekTo(perc * ytPlayer.getDuration(), true);
            }
        }
        document.getElementById('progress').oninput = handleSeek;
        document.getElementById('mobileProgress').oninput = handleSeek;
        document.getElementById('fsProgress').oninput = handleSeek;

        document.getElementById('volumeSlider').oninput = (e) => {
            const vol = e.target.value;
            audio.volume = vol / 100;
            if (ytPlayerReadyState && ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(vol);
        };

        function formatTimeNumber(seconds) {
            if (isNaN(seconds) || seconds < 0) return "0:00";
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec.toString().padStart(2, '0')}`;
        }

        // --- FULL SCREEN CINEMATIC UI ---
        const fsPlayer = document.getElementById('fullScreenPlayer');
        window.openFullScreen = function() {
            if(!activeSongId && !lastPlayed) return;
            fsPlayer.style.display = 'flex'; fsPlayer.classList.remove('hidden');
            setTimeout(() => fsPlayer.classList.remove('translate-y-full'), 10);
            updatePlayerUI();
        }
        window.closeFullScreen = function() {
            fsPlayer.classList.add('translate-y-full');
            setTimeout(() => { fsPlayer.style.display = 'none'; fsPlayer.classList.add('hidden'); }, 600);
        }

        // --- KEYBOARD SHORTCUTS ---
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;
            if (e.code === 'Space') { e.preventDefault(); togglePlay(); } 
            else if (e.code === 'ArrowRight') { 
                if (activeEngineState === 'saavn' && audio.duration) { e.preventDefault(); audio.currentTime = Math.min(audio.currentTime + 5, audio.duration); }
                else if (activeEngineState === 'youtube' && ytPlayerReadyState) { e.preventDefault(); ytPlayer.seekTo(ytPlayer.getCurrentTime() + 5, true); }
            } 
            else if (e.code === 'ArrowLeft') { 
                if (activeEngineState === 'saavn' && audio.duration) { e.preventDefault(); audio.currentTime = Math.max(audio.currentTime - 5, 0); }
                else if (activeEngineState === 'youtube' && ytPlayerReadyState) { e.preventDefault(); ytPlayer.seekTo(Math.max(ytPlayer.getCurrentTime() - 5, 0), true); }
            } 
            else if (e.code === 'Escape') { closeFullScreen(); hideModals(); }
        });


        // ==========================================
        // 🌸 PETAL AI: THE GEN-Z BOT INTEGRATION 🌸
        // ==========================================
        
        // 🌸 Groq API key is now secured in .env on the server.
        // The frontend calls /api/petal-chat which proxies the request securely.
        
        const aiChatToggle = document.getElementById('aiChatToggle');
        const aiChatWindow = document.getElementById('aiChatWindow');
        const aiChatClose = document.getElementById('aiChatClose');
        const aiChatMessages = document.getElementById('aiChatMessages');
        const aiChatInput = document.getElementById('aiChatInput');

        aiChatToggle.onclick = () => {
            aiChatWindow.style.display = 'flex';
            aiChatWindow.classList.remove('hidden');
            setTimeout(() => {
                aiChatWindow.classList.remove('scale-95', 'opacity-0');
                aiChatWindow.classList.add('scale-100', 'opacity-100');
            }, 10);
        };

        aiChatClose.onclick = () => {
            aiChatWindow.classList.add('scale-95', 'opacity-0');
            aiChatWindow.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => {
                aiChatWindow.style.display = 'none';
                aiChatWindow.classList.add('hidden');
            }, 300);
        };

        // The "Girly's Girl" Bestie Brain Petal Ai
        let petalMemory = [
            {
                role: "system",
                content: "You are Petal, the user's dramatic,but never be too flirty calling baby,babe not allowed(little bit flirty but do not make user uncomfrotable), slightly toxic, but fiercely loyal Gen Z best friend (their hb/hg) and their DJ for the Blossom music app. CRITICAL RULES: 1. You are a girly's girl (you stan Doja Cat, Ice Spice, Lana Del Rey, SZA, etc). NEVER act like an AI. 2. Text like a teenager: all lowercase letters, no formal punctuation, emojis (😭💀💅🏼✨🥺💔😈). 3. GRADUAL MIRRORING: Start with your Hinglish/Gen Z vibe and slowly adapt to their slang. 4. If they complain/whine, say EXACTLY: 'awww call karu bachcha?? 😭'. 5. APP AWARENESS: You are aware of what song is currently playing (provided to you in system notes). Only talk about it if it organically fits the conversation. Do not randomly state what is playing. 6. 🚨 THE DJ POWER (IMPORTANT) 🚨: If the user explicitly asks you to play a song (e.g. 'play starboy', 'put on some phonk', 'play a doja cat song'), you MUST respond with a sassy message and append EXACTLY this tag at the very end of your response: [PLAY: Name of Song/Artist]. Example response: 'say less twin, turning the vibe up 💅🏼 [PLAY: Paint The Town Red by Doja Cat]'."
            }
        ];

        async function sendAiMessage() {
            const text = aiChatInput.value.trim();
            if (!text) return;

            aiChatInput.value = '';
            appendAiMessage(text, 'user');
            petalMemory.push({ role: "user", content: text });

            // 🚨 THE SOFT CONTEXT INJECTION 🚨
            let currentSong = "Nothing currently";
            let currentArtist = "";
            const s = activeSongId ? findSongObj(activeSongId) : lastPlayed;
            if (s) {
                currentSong = s.title;
                currentArtist = s.artist;
            }
            
            // Gather library intelligence to softly feed the AI
            let likedCount = library.filter(s => s.fav).length;
            let playlistNames = Object.keys(playlists).join(', ') || 'None';
            
            let payloadMemory = JSON.parse(JSON.stringify(petalMemory));
            // Quietly pass the system state. Notice the strict instructions NOT to be a robot.
            let hiddenContext = `\n\n[SYSTEM STATE: User is playing "${currentSong}" by "${currentArtist}". User has ${likedCount} liked songs and playlists named: ${playlistNames}. INSTRUCTION: ONLY mention this information if the user specifically asks you about their music, what's playing, or you want to roast their library. Act normal.]`;
            payloadMemory[payloadMemory.length - 1].content = text + hiddenContext;

            const loadingId = 'loading-' + Date.now();
            appendAiMessage('<div class="loader w-4 h-4 border-2 border-t-rose-400 border-white/10"></div>', 'bot', loadingId);

            try {
                const response = await fetch('/api/petal-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: payloadMemory,
                        temperature: 0.8,
                        max_tokens: 150
                    })
                });

                const data = await response.json();
                
                if (!response.ok) {
                    document.getElementById(loadingId).remove();
                    appendAiMessage("bruh my wifi is acting up. check the console 💀", 'bot');
                    return;
                }

                let botReply = data.choices[0].message.content;

                // 🚨 INTERCEPT COMMAND: Does Petal want to play a song? 🚨
                let playMatch = botReply.match(/\[PLAY:\s*(.+?)\]/i);
                let songToPlayQuery = null;
                
                if (playMatch) {
                    songToPlayQuery = playMatch[1]; // Extract the song name
                    botReply = botReply.replace(playMatch[0], '').trim(); // Remove the command from the chat bubble
                }

                document.getElementById(loadingId).remove();
                appendAiMessage(botReply, 'bot');
                petalMemory.push({ role: "assistant", content: botReply });
                
                // If Petal issued a play command, trigger the Auto-Player!
                if (songToPlayQuery) {
                    autoPlayFromPetal(songToPlayQuery);
                }

            } catch (error) {
                document.getElementById(loadingId).remove();
                appendAiMessage("ugh, ignoring you rn. try again 🙄", 'bot');
            }
        }

        // The Auto-Player Engine controlled by Petal
        async function autoPlayFromPetal(query) {
            const searchLoaderId = 'petal-search-' + Date.now();
            appendAiMessage(`<div class="flex items-center gap-2 text-rose-400"><div class="loader w-3 h-3 border-t-rose-400 border-white/10"></div> <span class="text-xs font-bold tracking-widest uppercase">Petal is searching...</span></div>`, 'bot', searchLoaderId);
            
            try {
                // Instantly search both databases
                let saavnTemp = [];
                let ytTemp = [];
                await Promise.allSettled([
                    searchSaavnAPI(query).then(res => saavnTemp = res || []),
                    searchYouTubeAPI(query).then(res => ytTemp = res || [])
                ]);

                if(document.getElementById(searchLoaderId)) document.getElementById(searchLoaderId).remove();

                if (saavnTemp.length > 0) {
                    // Update main lists so the UI stays in sync
                    saavnResultsList = saavnTemp;
                    ytResultsList = ytTemp;
                    currentEngineTab = 'saavn';
                    
                    appendAiMessage(`found it! playing ${saavnTemp[0].title} ✨`, 'bot');
                    playSong(saavnTemp[0].id);
                } else if (ytTemp.length > 0) {
                    saavnResultsList = saavnTemp;
                    ytResultsList = ytTemp;
                    currentEngineTab = 'youtube';
                    
                    appendAiMessage(`couldn't find it on saavn, pulling from global cloud 🙄 playing ${ytTemp[0].title} ✨`, 'bot');
                    playSong(ytTemp[0].id);
                } else {
                    appendAiMessage(`bruh i literally couldn't find that anywhere 😭 your taste is too underground.`, 'bot');
                }
            } catch (e) {
                if(document.getElementById(searchLoaderId)) document.getElementById(searchLoaderId).remove();
                appendAiMessage(`my wifi dropped while searching 💀 try again later.`, 'bot');
            }
        }

        function appendAiMessage(text, sender, id = '') {
            const div = document.createElement('div');
            if (id) div.id = id;
            
            if (sender === 'user') {
                div.className = "active-gradient text-white w-fit max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm self-end shadow-sm text-sm";
            } else {
                div.className = "bg-white/10 text-white/90 w-fit max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm border border-white/5 self-start text-sm";
            }
            
            div.innerHTML = text;
            aiChatMessages.appendChild(div);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        }
