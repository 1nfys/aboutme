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

const soundCloudTracks = [
    "https://soundcloud.com/treaty-670147814/smile-at-my-cursed-dream-lady-ethereals-theme",
    "https://soundcloud.com/uploadyellow/a-mothers-love",
    "https://soundcloud.com/etaoinshrdlu1997/mike-boss",
    "https://soundcloud.com/pprkty/sugarcube-hailstorm",
    "https://soundcloud.com/treaty-670147814/long-awaited-death-jis-theme",
    "https://soundcloud.com/surreal012/penumbra-phantasm-v3",
    "https://soundcloud.com/treaty-670147814/staircase-of-a-thousand-steps",
    "https://soundcloud.com/xcipo-nilex/omori-ost-012-trees",
    "https://soundcloud.com/7gb0/six-feet-under",
    "https://soundcloud.com/digital-descendant/wont-you-hear-my-symphony",
    "https://soundcloud.com/tobyfox-music/black-knife",
    "https://soundcloud.com/xcipo-nilex/omori-ost-118-swallow-hollow",
    "https://soundcloud.com/ironicepee/in-stars-and-time-ost-how-can-you-help-me-stardust",
    "https://soundcloud.com/user-910734203/komodo-dragon-block-tales",
    "https://soundcloud.com/sexballs/12-altars-of-apostasy-incl",
    "https://soundcloud.com/81syv4b8op5i/swinging-with-ghost",
    "https://soundcloud.com/xcipo-nilex/omori-ost-117-whale-whale-whale",
    "https://soundcloud.com/surreal012/your-fault",
    "https://soundcloud.com/xcipo-nilex/omori-ost-112-h20hcl",
    "https://soundcloud.com/xcipo-nilex/omori-ost-074-pyrefly-forest-cats-cradle",
    "https://soundcloud.com/me_i_think/loop-hangout-in-stars-and-time",
    "https://soundcloud.com/surreal012/nightmare",
    "https://soundcloud.com/digital-descendant/stars-melody?in=digital-descendant/sets/voyager",
    "https://soundcloud.com/digital-descendant/a-lullaby-to-the-heat-death-of?in=digital-descendant/sets/voyager",
    "https://soundcloud.com/81syv4b8op5i/waltz-of-wandering",
    "https://soundcloud.com/digital-descendant/pizza-galaxy?in=digital-descendant/sets/voyager"
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

    const pauseBtn = document.getElementById('pauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(transitionInterval);
                transitionInterval = null;
                pauseIcon.textContent = '\u25b6';
                pauseBtn.classList.add('paused');
            } else {
                pauseIcon.textContent = '\u23f8';
                pauseBtn.classList.remove('paused');
                startTransitionInterval();
            }
        });
    }

    renderProjects();
    renderMusicWidget();
});

let currentPage = 0;
let transitionInterval = null;
let isPaused = false;

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

        const projectIndex = currentPage * itemsPerPage + i;
        const project = (projectIndex >= 0 && projectIndex < projects.length) ? projects.at(projectIndex) : null;
        slot.innerHTML = '';
        if (project) {
            const a = document.createElement('a');
            a.href = project.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'project-link';

            const strong = document.createElement('strong');
            strong.textContent = project.title;
            a.appendChild(strong);

            const span = document.createElement('span');
            span.textContent = project.description;

            slot.appendChild(a);
            slot.appendChild(span);
            slot.style.visibility = 'visible';
            slot.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
        } else {
            const a = document.createElement('a');
            a.className = 'project-link';
            const strong = document.createElement('strong');
            strong.textContent = '\u00a0';
            a.appendChild(strong);

            const span = document.createElement('span');
            span.textContent = '\u00a0';

            slot.appendChild(a);
            slot.appendChild(span);
            slot.style.visibility = 'hidden';
            slot.style.borderBottom = 'none';
        }
    }
}

function startTransitionInterval() {
    if (isPaused) return;
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

async function fetchSoundCloudData(trackUrl) {
    const oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
    try {
        const response = await fetch(oembedUrl);
        if (!response.ok) {
            throw new Error(`SoundCloud oEmbed request failed with status ${response.status}`);
        }
        const data = await response.json();
        let name = data.title || "Unknown Track";
        const artist = data.author_name || "Unknown Artist";
        if (data.author_name && name.endsWith(` by ${data.author_name}`)) {
            name = name.slice(0, -(data.author_name.length + 4));
        }

        return {
            name: name,
            artist: artist,
            cover: data.thumbnail_url,
            link: trackUrl
        };
    } catch (error) {
        console.error("Error fetching SoundCloud data:", error);
        return null;
    }
}

async function renderMusicWidget() {
    const trackListContainer = document.querySelector('.track-list');
    if (!trackListContainer) return;

    trackListContainer.innerHTML = '<li class="track-item" style="opacity: 0.5;">Loading tracks...</li>';

    const trackDataPromises = soundCloudTracks.map(trackUrl => fetchSoundCloudData(trackUrl));
    const tracks = await Promise.all(trackDataPromises);

    trackListContainer.innerHTML = '';

    tracks.forEach(track => {
        if (!track) return;

        const li = document.createElement('li');
        li.className = 'track-item';
        li.style.cursor = 'pointer';
        li.onclick = () => window.open(track.link, '_blank');

        const img = document.createElement('img');
        img.src = track.cover;
        img.alt = `${track.name} cover`;
        img.className = 'track-cover';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'track-info';
        infoDiv.style.display = 'flex';
        infoDiv.style.flexDirection = 'column';
        infoDiv.style.gap = '2px';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'track-name';
        nameSpan.style.fontWeight = 'bold';
        nameSpan.style.color = '#fff';
        nameSpan.textContent = track.name;

        const artistSpan = document.createElement('span');
        artistSpan.className = 'track-artist';
        artistSpan.style.fontSize = '0.8rem';
        artistSpan.style.color = 'var(--accent)';
        artistSpan.style.opacity = '0.9';
        artistSpan.textContent = track.artist;

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(artistSpan);

        li.appendChild(img);
        li.appendChild(infoDiv);
        trackListContainer.appendChild(li);
    });
}
