const projects = [
    {
        title: "Gemini bot",
        url: "https://github.com/1nfys/geminibot",
        description: "ai bot for delta chat when white lists is on",
    },
    {
        title: "about me",
        url: "https://github.com/1nfys/aboutme",
        description: "ur here",
    },
    {
        title: "SteamTierList",
        url: "https://github.com/1nfys/SteamTierList",
        description: "free manual/ai tool to make tier list from your library based on url/steam id",
    },
    {
        title: "gasterwriter",
        url: "https://github.com/1nfys/gasterwriter",
        description: "VERY INTRESTING programm to become a gaster",
    },
    {
        title: "LayerMicaUI-my-adaptation",
        url: "https://github.com/1nfys/LayerMicaUI-my-adaptation",
        description: "my recreation of LayerMicaUI",
    },
    {
        title: "MIDI2VIPI",
        url: "https://github.com/1nfys/MIDI2VIPI",
        description: "tool to play on virtual piano anywhere from midi file",
    }
];

const spotifyTracks = [
    {
        url: "https://open.spotify.com/track/1LF2T0aaKNNlc34Sv1BPcN",
        artist: "DIGITAL DESCENDANT, aerokii"
    },
    {
        url: "https://open.spotify.com/track/5Q4VKg0jcZUHcvJYQIPPK4",
        artist: "DIGITAL DESCENDANT, aerokii"
    },
    {
        url: "https://open.spotify.com/track/71OKcekoasTyTmBsrnSrKu",
        artist: "DIGITAL DESCENDANT"
    },
    {
        url: "https://open.spotify.com/track/7nLkjqKtWQgeo1LTJ8rfPZ",
        artist: "DIGITAL DESCENDANT"
    },
    {
        url: "https://open.spotify.com/track/6NZQybbow5SALJhjwAOWVB",
        artist: "PaperKitty"
    },
    {
        url: "https://open.spotify.com/track/5XxLpnFrklJJgs4rU8OJs0",
        artist: "PaperKitty"
    },
    {
        url: "https://open.spotify.com/track/3OyOAwSpQpPOeuj4MBUgGs",
        artist: "Block Tales, nicopatty, Kyles45678"
    },
    {
        url: "https://open.spotify.com/track/64SL9JlYfvhsmjdOkiWjQG",
        artist: "DIGITAL DESCENDANT, Key After Key"
    },
    {
        url: "https://open.spotify.com/track/3TS9xVvteeZbCAlzgLDAHD",
        artist: "boggio, Key After Key"
    },
    {
        url: "https://open.spotify.com/track/2B6g6v69ozghZwmValTb6Q",
        artist: "boggio, Key After Key"
    },
    {
        url: "https://open.spotify.com/track/1Ywf54xuDO3Vuwi09nwJse",
        artist: "surreal"
    },
    {
        url: "https://open.spotify.com/track/2VaK0HRf6wG3a2RlcmV0xy",
        artist: "surreal"
    },
    {
        url: "https://open.spotify.com/track/2f7pUDR1lu7ATEBo1LUDZb",
        artist: "MSR, NoteBlock, MNS"
    },
    {
        url: "https://open.spotify.com/track/3HenQMP5vFMPkyOMvMXtVd",
        artist: "MSR, NoteBlock, MNS"
    },
    {
        url: "https://open.spotify.com/track/52vIPidjyEemoxnFFtZ1Kk",
        artist: "River Boy"
    },
    {
        url: "https://open.spotify.com/track/3KkeAOtLOXU8qsrhTHiFip",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/1tLy0KzjBLqbdYrp2Plb9p",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/54shhL9vif2iwUXg0lNpQX",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/2Ow8YPaRkaHd5Cr9zGpoHC",
        artist: "Omori"
    },
    {
        url: "https://open.spotify.com/track/3TcArgDnTVihS8I1FHF0ns",
        artist: "Heaven Pierce Her"
    },
    {
        url: "https://open.spotify.com/track/1DDIprP7j8GvwjWyk1bIEF",
        artist: "Studio Thumpy Puppy"
    },
    {
        url: "https://open.spotify.com/track/4O0JVgOSsdJrj6Tao1ViEY",
        artist: "Toby Fox, Laura Shigihara"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('musicToggle');
    const menu = document.getElementById('musicMenu');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    renderProjects();
    renderMusicWidget();
});

let currentPage = 0;
let transitionInterval = null;

function renderProjects() {
    const projectList = document.getElementById('projectList');
    if (!projectList) return;

    projectList.innerHTML = `
        <div class="project-item" id="proj-0"></div>
        <div class="project-item" id="proj-1"></div>
        <div class="project-item" id="proj-2"></div>
    `;

    updateProjectSlots();
    startTransitionInterval();
}

function updateProjectSlots() {
    const itemsPerPage = 3;
    for (let i = 0; i < itemsPerPage; i++) {
        const slot = document.getElementById(`proj-${i}`);
        if (!slot) continue;

        const project = projects[currentPage * itemsPerPage + i];
        if (project) {
            slot.innerHTML = `
                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <strong>${project.title}</strong>
                </a>
                <span>${project.description}</span>
            `;
            slot.style.visibility = 'visible';
            slot.style.borderBottom = '1px dotted rgba(255, 77, 77, 0.2)';
        } else {
            slot.innerHTML = `
                <a class="project-link"><strong>&nbsp;</strong></a>
                <span>&nbsp;</span>
            `;
            slot.style.visibility = 'hidden';
            slot.style.borderBottom = 'none';
        }
    }
}

function startTransitionInterval() {
    if (transitionInterval) clearInterval(transitionInterval);

    const totalPages = Math.ceil(projects.length / 3);
    if (totalPages <= 1) return;

    transitionInterval = setInterval(() => {
        const item0 = document.getElementById('proj-0');
        const item1 = document.getElementById('proj-1');
        const item2 = document.getElementById('proj-2');
        if (!item0 || !item1 || !item2) return;

        item0.classList.add('slide-out');
        item1.classList.add('slide-out');
        item2.classList.add('slide-out');

        setTimeout(() => {
            currentPage = (currentPage + 1) % totalPages;
            updateProjectSlots();

            item0.classList.add('slide-in-prepare');
            item1.classList.add('slide-in-prepare');
            item2.classList.add('slide-in-prepare');

            item0.offsetHeight;

            item0.classList.remove('slide-out', 'slide-in-prepare');
            item1.classList.remove('slide-out', 'slide-in-prepare');
            item2.classList.remove('slide-out', 'slide-in-prepare');
        }, 550);
    }, 5000);
}

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

    trackListContainer.innerHTML = '<li class="track-item" style="opacity: 0.5;">Loading tracks...</li>';

    const trackDataPromises = spotifyTracks.map(trackObj => fetchSpotifyData(trackObj));
    const tracks = await Promise.all(trackDataPromises);

    trackListContainer.innerHTML = '';

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
