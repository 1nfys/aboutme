const spotifyTracks = [
    { 
        url: "https://open.spotify.com/track/5XxLpnFrklJJgs4rU8OJs0?si=3656af32c7b04c73", 
        artist: "Paperkitty" 
    },
    { 
        url: "https://open.spotify.com/track/3OyOAwSpQpPOeuj4MBUgGs?si=332c4c08e2f1438e", 
        artist: "Block Tales, nicopatty, Kyles45678" 
    },
    { 
        url: "https://open.spotify.com/track/64SL9JlYfvhsmjdOkiWjQG?si=c20dd89b87374b85", 
        artist: "DIGITAL DESCENDANT, Key After Key" 
    },
    { 
        url: "https://open.spotify.com/track/3TS9xVvteeZbCAlzgLDAHD?si=fee65de85d224e36", 
        artist: "boggio, Key After Key" 
    },
    { 
        url: "https://open.spotify.com/track/2B6g6v69ozghZwmValTb6Q?si=3e77405f6e924240", 
        artist: "boggio, Key After Key" 
    },
    {
        url: "https://open.spotify.com/track/1Ywf54xuDO3Vuwi09nwJse?si=941cff7ab961475e",
        artist: "surreal"
    },
    {
        url: "https://open.spotify.com/track/2VaK0HRf6wG3a2RlcmV0xy?si=e2d628b3a6d04c0a",
        artist: "surreal"
    },
    {
        url: "https://open.spotify.com/track/2f7pUDR1lu7ATEBo1LUDZb?si=68dc5b22b26d451a",
        artist: "MSR, NoteBlock, MNS"
    },
    {
        url: "https://open.spotify.com/track/3HenQMP5vFMPkyOMvMXtVd?si=8a27e809809f41f1",
        artist: "MSR, NoteBlock, MNS"
    },
    {
        url: "https://open.spotify.com/track/52vIPidjyEemoxnFFtZ1Kk?si=8863e0b381704968",
        artist: "River Boy"
    },
    {
        url: "https://open.spotify.com/track/3KkeAOtLOXU8qsrhTHiFip?si=9b516eb7d2b44868",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/1tLy0KzjBLqbdYrp2Plb9p?si=32a74250092e42ab",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/54shhL9vif2iwUXg0lNpQX?si=e646faa41fd843c5",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/2Ow8YPaRkaHd5Cr9zGpoHC?si=a9cdfecd648e46ab",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/3TcArgDnTVihS8I1FHF0ns?si=0ce2ecfdbf644ab1",
        artist: "Heaven Pierce Her"
    },
    {
        url: "https://open.spotify.com/track/1DDIprP7j8GvwjWyk1bIEF?si=7bef0f7ad41541f5",
        artist: "Studio Thumpy Puppy"
    },
    {
        url: "https://open.spotify.com/track/4O0JVgOSsdJrj6Tao1ViEY?si=e5ce949d848f4064",
        artist: "Toby Fox, Laura Shigihara"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('musicToggle');
    const menu = document.getElementById('musicMenu');

    // Toggle Music Menu
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // Initial render
    renderMusicWidget();
});

async function fetchSpotifyData(trackObj) {
    const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(trackObj.url)}`;
    try {
        const response = await fetch(oembedUrl);
        if (!response.ok) {
            throw new Error(`Spotify oEmbed request failed with status ${response.status}`);
        }
        const data = await response.json();
        
        return {
            name: data.title || "Unknown Track",
            artist: trackObj.artist || "Unknown Artist",
            cover: data.thumbnail_url,
            link: trackObj.url
        };
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return null;
    }
}

async function renderMusicWidget() {
    const trackListContainer = document.querySelector('.track-list');
    if (!trackListContainer) return;

    // Loading state
    trackListContainer.innerHTML = '<li class="track-item" style="opacity: 0.5;">Loading tracks...</li>';

    const trackDataPromises = spotifyTracks.map(trackObj => fetchSpotifyData(trackObj));
    const tracks = await Promise.all(trackDataPromises);

    trackListContainer.innerHTML = ''; // Clear existing

    tracks.forEach(track => {
        if (!track) return;

        const li = document.createElement('li');
        li.className = 'track-item';
        li.style.cursor = 'pointer';
        li.onclick = () => window.open(track.link, '_blank');

        li.innerHTML = `
            <img src="${track.cover}" alt="${track.name} cover" class="track-cover">
            <div class="track-info" style="display: flex; flex-direction: column; gap: 2px;">
                <span class="track-name" style="font-weight: bold; color: #fff;">${track.name}</span>
                <span class="track-artist" style="font-size: 0.8rem; color: var(--accent); opacity: 0.9;">${track.artist}</span>
            </div>
        `;
        trackListContainer.appendChild(li);
    });
}
