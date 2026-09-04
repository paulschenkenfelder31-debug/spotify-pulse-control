/* Pulse — browser-only Spotify controller using Authorization Code + PKCE. */

const icons = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
  library: '<rect x="4" y="3" width="5" height="18" rx="1"/><rect x="11" y="3" width="4" height="18" rx="1"/><path d="m17 4 3 16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  shield: '<path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  'arrow-right': '<path d="M5 12h14M14 7l5 5-5 5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  previous: '<path d="M6 5v14M18 6l-9 6 9 6V6Z"/>',
  next: '<path d="M18 5v14M6 6l9 6-9 6V6Z"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  repeat: '<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
  speaker: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M9 7h6"/>',
  'chevron-down': '<path d="m7 10 5 5 5-5"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5ZM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  more: '<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  spotify: '<circle cx="12" cy="12" r="9"/><path d="M7 9.2c3.7-1 7.5-.6 10.7.9M7.8 12.4c3-.7 6.4-.4 9 .8M8.5 15.4c2.5-.5 5-.2 7.2.8"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
}

document.querySelectorAll('[data-icon]').forEach((node) => { node.innerHTML = icon(node.dataset.icon); });

const demo = {
  tracks: [
    { id:'demo-midnight', name:'Midnight City', artist:'M83', album:"Hurry Up, We're Dreaming", duration_ms:244000, uri:'spotify:track:demo1', colors:['#6b83ff','#e66a9a'] },
    { id:'demo-less', name:'The Less I Know the Better', artist:'Tame Impala', album:'Currents', duration_ms:216000, uri:'spotify:track:demo2', colors:['#ef7447','#67316d'] },
    { id:'demo-pretend', name:'Time to Pretend', artist:'MGMT', album:'Oracular Spectacular', duration_ms:261000, uri:'spotify:track:demo3', colors:['#62c7cc','#265a7a'] },
    { id:'demo-sweet', name:'Sweet Disposition', artist:'The Temper Trap', album:'Conditions', duration_ms:231000, uri:'spotify:track:demo4', colors:['#e6c76d','#7b6435'] },
    { id:'demo-nightcall', name:'Nightcall', artist:'Kavinsky', album:'OutRun', duration_ms:258000, uri:'spotify:track:demo5', colors:['#f54266','#191b4b'] }
  ],
  playlists: [
    { name: 'After Dark Radio', tracks: 38, colors: ['#596cff','#c65bff'], uri: 'spotify:playlist:demo1' },
    { name: 'Sunday Soft Focus', tracks: 52, colors: ['#ff8b6b','#ffd363'], uri: 'spotify:playlist:demo2' },
    { name: 'Deep Work, No Words', tracks: 71, colors: ['#32b89f','#194d61'], uri: 'spotify:playlist:demo3' },
    { name: 'Kitchen Dancing', tracks: 44, colors: ['#fe4c80','#ff9f43'], uri: 'spotify:playlist:demo4' },
    { name: 'Night Bus Home', tracks: 29, colors: ['#274060','#6f78ff'], uri: 'spotify:playlist:demo5' },
    { name: 'Golden Hour', tracks: 61, colors: ['#f7ad45','#e65a3d'], uri: 'spotify:playlist:demo6' },
    { name: 'Clean Slate', tracks: 35, colors: ['#b9ff52','#408f79'], uri: 'spotify:playlist:demo7' },
    { name: 'Left of Centre', tracks: 48, colors: ['#b856e2','#4053c7'], uri: 'spotify:playlist:demo8' }
  ],
  queue: [
    { name: 'The Less I Know the Better', artist: 'Tame Impala', duration: 216, colors: ['#ef7447','#67316d'] },
    { name: 'Time to Pretend', artist: 'MGMT', duration: 261, colors: ['#62c7cc','#265a7a'] },
    { name: 'Sweet Disposition', artist: 'The Temper Trap', duration: 231, colors: ['#e6c76d','#7b6435'] }
  ],
  recent: [
    { name: 'Borderline', artist: 'Tame Impala', album: 'The Slow Rush', ago: '12 min ago', colors: ['#ff7b55','#7251a8'] },
    { name: 'Intro', artist: 'The xx', album: 'xx', ago: '1 hr ago', colors: ['#969ba6','#30333a'] },
    { name: 'Instant Crush', artist: 'Daft Punk', album: 'Random Access Memories', ago: 'Yesterday', colors: ['#d5b56a','#26272c'] },
    { name: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', ago: 'Yesterday', colors: ['#f54266','#191b4b'] }
  ],
  devices: [
    { id: 'demo-living', name: 'Living room', type: 'Speaker', is_active: true },
    { id: 'demo-laptop', name: 'MacBook', type: 'Computer', is_active: false },
    { id: 'demo-phone', name: 'Phone', type: 'Smartphone', is_active: false }
  ],
  search: [
    { name: 'Midnight City', artist: 'M83', colors: ['#6b83ff','#e66a9a'] },
    { name: 'Nightcall', artist: 'Kavinsky', colors: ['#f54266','#191b4b'] },
    { name: 'Midnight Pretenders', artist: 'Tomoko Aran', colors: ['#274f87','#b55d8d'] }
  ]
};

const state = {
  demo: true,
  playing: true,
  shuffle: false,
  repeat: 'off',
  liked: false,
  currentTrack: null,
  currentUri: null,
  duration: 244,
  position: 96,
  progressTimer: null,
  profile: null,
  devices: demo.devices,
  activeDevice: demo.devices[0],
  playlists: demo.playlists,
  recent: demo.recent,
  queue: demo.queue,
  playlistExpanded: false,
  recentReversed: false,
  demoTrackIndex: 0
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const redirectUri = `${location.origin}${location.pathname}`;
const clientIdInput = $('#client-id');
const tokenKey = 'pulse_spotify_token';
const clientKey = 'pulse_spotify_client_id';
const scopes = [
  'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing',
  'playlist-read-private', 'playlist-read-collaborative', 'user-read-recently-played',
  'user-library-read', 'user-library-modify'
].join(' ');

function formatTime(total = 0) {
  const value = Math.max(0, Math.floor(total));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

function colorStyle(colors = ['#5b70ff', '#ef6f9d']) {
  return `--cover-a:${colors[0]};--cover-b:${colors[1]}`;
}

function coverColors(index) {
  const colors = [
    ['#596cff','#c65bff'], ['#ff8b6b','#ffd363'], ['#32b89f','#194d61'], ['#fe4c80','#ff9f43'],
    ['#274060','#6f78ff'], ['#f7ad45','#e65a3d'], ['#b9ff52','#408f79'], ['#b856e2','#4053c7']
  ];
  return colors[index % colors.length];
}

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove('show'), 2300);
}

function setIcon(button, name) {
  const holder = button.querySelector('[data-icon]');
  if (holder) { holder.dataset.icon = name; holder.innerHTML = icon(name); }
}

function setRangeFill(input) {
  const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty('--value', `${pct}%`);
}

function renderPlaylists(items = demo.playlists) {
  state.playlists = items;
  const visibleItems = state.playlistExpanded ? items : items.slice(0, 4);
  $('#playlist-toggle').innerHTML = `${state.playlistExpanded ? 'Show less' : 'See all'} ${icon('arrow-right')}`;
  $('#playlist-grid').innerHTML = visibleItems.map((item, index) => {
    const image = item.images?.[0]?.url;
    const colors = item.colors || coverColors(index);
    const count = item.tracks?.total ?? item.tracks ?? 0;
    return `<article class="playlist-card" data-uri="${item.uri || ''}">
      <div class="playlist-cover" style="${colorStyle(colors)}${image ? `;background-image:linear-gradient(0deg,rgba(9,10,13,.15),rgba(9,10,13,.15)),url('${image}');background-size:cover;background-position:center` : ''}">
        <span class="playlist-number">${String(index + 1).padStart(2, '0')}</span>
        <button class="playlist-play" aria-label="Play ${escapeHtml(item.name)}">${icon('play')}</button>
      </div>
      <div class="playlist-copy"><strong>${escapeHtml(item.name)}</strong><span>${count} tracks</span></div>
    </article>`;
  }).join('');

  $$('.playlist-card').forEach((card) => card.addEventListener('click', async (event) => {
    if (!event.target.closest('.playlist-play')) return;
    if (state.demo) {
      selectDemoTrack(Number(card.querySelector('.playlist-number').textContent) % demo.tracks.length);
      toast('Playlist started · demo');
      return;
    }
    if (await performAction('play playlist', () => spotify('/me/player/play', { method: 'PUT', body: JSON.stringify({ context_uri: card.dataset.uri }) }))) schedulePlaybackRefresh();
  }));
}

function renderQueue(items = demo.queue) {
  state.queue = items;
  $('#queue-list').innerHTML = items.slice(0, 3).map((item, index) => {
    const track = item.track || item;
    const colors = item.colors || coverColors(index + 2);
    const duration = Math.round((track.duration_ms || track.duration * 1000 || 0) / 1000);
    return `<button class="queue-item" data-uri="${track.uri || ''}" data-index="${index}" aria-label="Play ${escapeHtml(track.name)}"><div class="queue-cover" style="${colorStyle(colors)}"></div><div class="queue-info"><strong>${escapeHtml(track.name)}</strong><span>${escapeHtml(track.artists?.map(a => a.name).join(', ') || track.artist || '')}</span></div><span class="queue-time">${formatTime(duration)}</span></button>`;
  }).join('');
  $$('.queue-item').forEach(row => row.addEventListener('click', () => playSelectedRow(row)));
}

function renderRecent(items = demo.recent) {
  state.recent = items;
  const visibleItems = state.recentReversed ? [...items].reverse() : items;
  $('#recent-list').innerHTML = visibleItems.slice(0, 6).map((item, index) => {
    const track = item.track || item;
    const colors = item.colors || coverColors(index + 3);
    return `<button class="recent-row" data-uri="${track.uri || ''}" data-name="${escapeHtml(track.name)}" aria-label="Play ${escapeHtml(track.name)}"><span class="row-number">${String(index + 1).padStart(2, '0')}</span><div class="recent-cover" style="${colorStyle(colors)}"></div><div class="recent-info"><strong>${escapeHtml(track.name)}</strong><span>${escapeHtml(track.artists?.map(a => a.name).join(', ') || track.artist || '')}</span></div><span class="recent-album">${escapeHtml(track.album?.name || track.album || '')}</span><span class="recent-time">${item.ago || 'Recently'}</span></button>`;
  }).join('');
  $$('.recent-row').forEach(row => row.addEventListener('click', () => playSelectedRow(row)));
}

async function playSelectedRow(row) {
  if (state.demo) {
    const name = row.dataset.name || row.querySelector('strong')?.textContent;
    const index = demo.tracks.findIndex(track => track.name === name);
    selectDemoTrack(index >= 0 ? index : (state.demoTrackIndex + 1) % demo.tracks.length);
    toast(`${name || 'Track'} is playing · demo`);
    return;
  }
  if (!row.dataset.uri) { toast('This item cannot be played.'); return; }
  if (await performAction('play track', () => spotify('/me/player/play', { method:'PUT', body:JSON.stringify({ uris:[row.dataset.uri] }) }))) schedulePlaybackRefresh();
}

function renderDevices(items = state.devices) {
  $('#device-list').innerHTML = items.length ? items.map((device) => `<button class="device-option ${device.is_active ? 'active' : ''}" data-device-id="${device.id}">${icon(device.type === 'Computer' ? 'library' : 'speaker')}<strong>${escapeHtml(device.name)}</strong><span>${device.is_active ? 'Active' : device.type}</span></button>`).join('') : '<p class="search-empty">Open Spotify on a device, then refresh.</p>';
  $$('.device-option').forEach(button => button.addEventListener('click', async () => {
    const device = state.devices.find(item => item.id === button.dataset.deviceId);
    if (!device) return;
    await performAction('switch device', () => spotify('/me/player', { method: 'PUT', body: JSON.stringify({ device_ids: [device.id], play: state.playing }) }));
    state.devices.forEach(item => { item.is_active = item.id === device.id; });
    state.activeDevice = device;
    $('#device-name').textContent = device.name;
    renderDevices();
    $('#device-popover').hidden = true;
  }));
}

function escapeHtml(value = '') {
  const node = document.createElement('div');
  node.textContent = value;
  return node.innerHTML;
}

function updatePlaybackUI() {
  document.body.classList.toggle('paused', !state.playing);
  setIcon($('#play-button'), state.playing ? 'pause' : 'play');
  setIcon($('#mobile-play'), state.playing ? 'pause' : 'play');
  $('#play-button').setAttribute('aria-label', state.playing ? 'Pause' : 'Play');
  $('#mobile-play').setAttribute('aria-label', state.playing ? 'Pause' : 'Play');
  $('#playing-badge').lastElementChild.textContent = state.playing ? 'PLAYING' : 'PAUSED';
}

function updateTrackUI(item, playback = {}) {
  if (!item) return;
  state.currentTrack = item;
  state.currentUri = item.uri || null;
  state.duration = Math.round((item.duration_ms || 244000) / 1000);
  state.position = Math.round((playback.progress_ms || 0) / 1000);
  const artist = item.artists?.map(a => a.name).join(', ') || item.artist || 'Unknown artist';
  const album = item.album?.name || item.album || '';
  $('#track-title').textContent = item.name;
  $('#track-artist').textContent = `${artist}${album ? ` · ${album}` : ''}`;
  $('#mobile-title').textContent = item.name;
  $('#mobile-artist').textContent = artist;
  $('#album-art').setAttribute('aria-label', `${item.name} by ${artist}, spinning vinyl record`);
  $('#duration').textContent = formatTime(state.duration);
  $('#progress').max = state.duration;
  $('#progress').value = state.position;
  $('#elapsed').textContent = formatTime(state.position);
  setRangeFill($('#progress'));
  const imageUrl = item.album?.images?.[0]?.url;
  const label = $('#vinyl-label');
  const demoColors = item.colors || ['#7590ff', '#ee6b99'];
  label.style.backgroundImage = `linear-gradient(140deg,${demoColors[0]},${demoColors[1]})`;
  label.querySelectorAll('.art-word,.art-label').forEach(n => n.hidden = false);
  $('.mobile-art').style.backgroundImage = `radial-gradient(circle,${demoColors[0]} 0 33%,#08090c 34% 100%)`;
  if (imageUrl) {
    label.style.backgroundImage = `url('${imageUrl}')`;
    label.querySelectorAll('.art-word,.art-label').forEach(n => n.hidden = true);
    $('.mobile-art').style.backgroundImage = `url('${imageUrl}')`;
    $('.mobile-art').style.backgroundSize = 'cover';
  }
}

function selectDemoTrack(index) {
  state.demoTrackIndex = (index + demo.tracks.length) % demo.tracks.length;
  state.position = 0;
  state.playing = true;
  updateTrackUI(demo.tracks[state.demoTrackIndex]);
  updatePlaybackUI();
}

function schedulePlaybackRefresh() {
  clearTimeout(state.playbackRefreshTimer);
  state.playbackRefreshTimer = setTimeout(() => refreshPlayback().catch(error => toast(error.message)), 650);
}

function startProgressClock() {
  clearInterval(state.progressTimer);
  state.progressTimer = setInterval(() => {
    if (!state.playing || state.position >= state.duration) return;
    state.position += 1;
    $('#progress').value = state.position;
    $('#elapsed').textContent = formatTime(state.position);
    setRangeFill($('#progress'));
  }, 1000);
}

async function performAction(label, liveAction) {
  if (state.demo) {
    toast(`${label[0].toUpperCase()}${label.slice(1)} · demo`);
    return true;
  }
  try {
    await liveAction();
    return true;
  } catch (error) {
    toast(error.message || `Could not ${label}`);
    return false;
  }
}

function getToken() {
  try { return JSON.parse(sessionStorage.getItem(tokenKey)); } catch { return null; }
}

function saveToken(payload) {
  const existing = getToken() || {};
  sessionStorage.setItem(tokenKey, JSON.stringify({
    ...existing,
    ...payload,
    expires_at: Date.now() + ((payload.expires_in || 3600) * 1000) - 30000
  }));
}

async function refreshAccessToken() {
  const token = getToken();
  const clientId = localStorage.getItem(clientKey);
  if (!token?.refresh_token || !clientId) throw new Error('Reconnect Spotify to continue.');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, grant_type: 'refresh_token', refresh_token: token.refresh_token })
  });
  if (!response.ok) throw new Error('Spotify session expired. Reconnect your account.');
  saveToken(await response.json());
  return getToken().access_token;
}

async function accessToken() {
  const token = getToken();
  if (!token) throw new Error('Connect Spotify first.');
  if (Date.now() >= token.expires_at) return refreshAccessToken();
  return token.access_token;
}

async function spotify(path, options = {}) {
  const { __retried = false, ...fetchOptions } = options;
  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    ...fetchOptions,
    headers: { Authorization: `Bearer ${await accessToken()}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) }
  });
  if (response.status === 204) return null;
  if (response.status === 401 && !__retried) {
    await refreshAccessToken();
    return spotify(path, { ...options, __retried: true });
  }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    if (response.status === 404) throw new Error('Open Spotify on a device, then try again.');
    if (response.status === 403) throw new Error('This control needs Spotify Premium or an approved app user.');
    if (response.status === 429) throw new Error('Spotify is busy. Please wait a moment.');
    throw new Error(data.error?.message || 'Spotify could not complete that action.');
  }
  return response.json();
}

function randomString(length = 64) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return [...values].map(value => alphabet[value % alphabet.length]).join('');
}

async function sha256(value) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
}

function base64Url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function connectSpotify() {
  const clientId = clientIdInput.value.trim();
  if (!clientId) { toast('Paste your Spotify Client ID first.'); clientIdInput.focus(); return; }
  localStorage.setItem(clientKey, clientId);
  const verifier = randomString();
  const challenge = base64Url(await sha256(verifier));
  const oauthState = randomString(32);
  sessionStorage.setItem('pulse_pkce_verifier', verifier);
  sessionStorage.setItem('pulse_oauth_state', oauthState);
  const params = new URLSearchParams({
    client_id: clientId, response_type: 'code', redirect_uri: redirectUri,
    code_challenge_method: 'S256', code_challenge: challenge, state: oauthState, scope: scopes, show_dialog: 'true'
  });
  location.assign(`https://accounts.spotify.com/authorize?${params}`);
}

async function handleSpotifyCallback() {
  const params = new URLSearchParams(location.search);
  if (params.get('error')) {
    history.replaceState({}, '', redirectUri);
    toast('Spotify connection was cancelled.');
    return false;
  }
  const code = params.get('code');
  if (!code) return Boolean(getToken());
  const expectedState = sessionStorage.getItem('pulse_oauth_state');
  if (!expectedState || params.get('state') !== expectedState) throw new Error('Security check failed. Please reconnect Spotify.');
  const verifier = sessionStorage.getItem('pulse_pkce_verifier');
  const clientId = localStorage.getItem(clientKey);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: verifier })
  });
  if (!response.ok) throw new Error('Spotify connection failed. Check the Client ID and redirect URL.');
  saveToken(await response.json());
  sessionStorage.removeItem('pulse_pkce_verifier');
  sessionStorage.removeItem('pulse_oauth_state');
  history.replaceState({}, '', redirectUri);
  return true;
}

async function loadSpotify() {
  const [profile, playback, playlists, recent, queue, devices] = await Promise.all([
    spotify('/me'), spotify('/me/player').catch(() => null), spotify('/me/playlists?limit=8'),
    spotify('/me/player/recently-played?limit=6').catch(() => ({ items: [] })),
    spotify('/me/player/queue').catch(() => ({ queue: [] })), spotify('/me/player/devices').catch(() => ({ devices: [] }))
  ]);
  state.demo = false;
  state.profile = profile;
  state.playlists = playlists.items || [];
  state.recent = recent.items || [];
  state.queue = queue.queue || [];
  state.devices = devices.devices || [];
  state.activeDevice = state.devices.find(d => d.is_active) || state.devices[0];
  $('#greeting').textContent = 'YOUR SPOTIFY';
  $('h1').innerHTML = `Hello, ${escapeHtml(profile.display_name?.split(' ')[0] || 'listener')}<span class="accent-dot">.</span>`;
  $('#account-button').textContent = (profile.display_name || 'S').slice(0, 1).toUpperCase();
  $('#connection-label').textContent = 'Spotify connected';
  $('.status-dot').classList.remove('demo');
  $('#connection-copy').textContent = profile.product === 'premium' ? 'Playback controls are ready.' : 'Some playback controls need Premium.';
  renderPlaylists(state.playlists);
  renderRecent(state.recent);
  renderQueue(state.queue);
  renderDevices();
  if (playback?.item) {
    state.playing = playback.is_playing;
    state.shuffle = playback.shuffle_state;
    state.repeat = playback.repeat_state;
    $('#shuffle-button').classList.toggle('active', state.shuffle);
    $('#repeat-button').classList.toggle('active', state.repeat !== 'off');
    $('#volume').value = playback.device?.volume_percent ?? 68;
    $('#volume-output').value = $('#volume').value;
    $('#device-name').textContent = playback.device?.name || state.activeDevice?.name || 'Device';
    updateTrackUI(playback.item, playback);
  }
  updatePlaybackUI();
  startProgressClock();
  clearInterval(state.spotifySyncTimer);
  state.spotifySyncTimer = setInterval(() => refreshPlayback().catch(() => {}), 10000);
  toast(`Connected as ${profile.display_name || 'Spotify user'}`);
}

async function refreshPlayback() {
  if (state.demo) return;
  const playback = await spotify('/me/player').catch(() => null);
  if (!playback) {
    state.playing = false;
    updatePlaybackUI();
    return;
  }
  state.playing = playback.is_playing;
  state.shuffle = playback.shuffle_state;
  state.repeat = playback.repeat_state;
  $('#shuffle-button').classList.toggle('active', state.shuffle);
  $('#shuffle-button').setAttribute('aria-pressed', state.shuffle);
  $('#repeat-button').classList.toggle('active', state.repeat !== 'off');
  $('#repeat-button').dataset.repeat = state.repeat;
  if (playback.item) {
    updateTrackUI(playback.item, playback);
    const liked = await spotify(`/me/tracks/contains?ids=${playback.item.id}`).catch(() => [false]);
    state.liked = Boolean(liked?.[0]);
    $('#like-button').classList.toggle('active', state.liked);
    $('#mobile-like').classList.toggle('active', state.liked);
    $('#like-button').setAttribute('aria-pressed', state.liked);
  }
  updatePlaybackUI();
}

async function disconnect() {
  sessionStorage.removeItem(tokenKey);
  state.demo = true;
  location.assign(redirectUri);
}

async function togglePlay() {
  const next = !state.playing;
  const ok = await performAction(next ? 'play' : 'pause', () => spotify(`/me/player/${next ? 'play' : 'pause'}`, { method: 'PUT' }));
  if (ok) { state.playing = next; updatePlaybackUI(); }
}

$('#play-button').addEventListener('click', togglePlay);
$('#mobile-play').addEventListener('click', togglePlay);
$('#next-button').addEventListener('click', async () => {
  if (state.demo) { selectDemoTrack(state.demoTrackIndex + 1); toast('Skipped to next · demo'); }
  else if (await performAction('skip to next', () => spotify('/me/player/next', { method:'POST' }))) schedulePlaybackRefresh();
  animateControl($('#next-button'));
});
$('#previous-button').addEventListener('click', async () => {
  if (state.demo) { selectDemoTrack(state.demoTrackIndex - 1); toast('Previous track · demo'); }
  else if (await performAction('go to previous', () => spotify('/me/player/previous', { method:'POST' }))) schedulePlaybackRefresh();
  animateControl($('#previous-button'));
});

$('#shuffle-button').addEventListener('click', async () => {
  const next = !state.shuffle;
  if (await performAction(`${next ? 'enable' : 'disable'} shuffle`, () => spotify(`/me/player/shuffle?state=${next}`, { method: 'PUT' }))) {
    state.shuffle = next; $('#shuffle-button').classList.toggle('active', next); $('#shuffle-button').setAttribute('aria-pressed', next);
  }
});

$('#repeat-button').addEventListener('click', async () => {
  const modes = ['off', 'context', 'track'];
  const next = modes[(modes.indexOf(state.repeat) + 1) % modes.length];
  if (await performAction(`set repeat ${next}`, () => spotify(`/me/player/repeat?state=${next}`, { method: 'PUT' }))) {
    state.repeat = next; $('#repeat-button').dataset.repeat = next; $('#repeat-button').classList.toggle('active', next !== 'off');
    $('#repeat-button').setAttribute('aria-pressed', next !== 'off');
  }
});

$('#like-button').addEventListener('click', async () => {
  const next = !state.liked;
  const trackId = state.currentTrack?.id;
  if (!state.demo && !trackId) { toast('Play a track first.'); return; }
  if (await performAction(next ? 'saved to Liked Songs' : 'removed from Liked Songs', () => spotify(`/me/tracks?ids=${trackId}`, { method: next ? 'PUT' : 'DELETE' }))) {
    state.liked = next;
    $('#like-button').classList.toggle('active', next);
    $('#mobile-like').classList.toggle('active', next);
    $('#like-button').setAttribute('aria-pressed', next);
    animateControl($('#like-button'));
  }
});
$('#mobile-like').addEventListener('click', () => $('#like-button').click());

$('#volume').addEventListener('input', (event) => {
  setRangeFill(event.target); $('#volume-output').value = event.target.value;
  clearTimeout(state.volumeTimer);
  state.volumeTimer = setTimeout(() => performAction('volume changed', () => spotify(`/me/player/volume?volume_percent=${event.target.value}`, { method: 'PUT' })), 250);
});

$('#progress').addEventListener('input', (event) => {
  state.position = Number(event.target.value); $('#elapsed').textContent = formatTime(state.position); setRangeFill(event.target);
});
$('#progress').addEventListener('change', (event) => performAction('seeked', () => spotify(`/me/player/seek?position_ms=${Number(event.target.value) * 1000}`, { method: 'PUT' })));

function animateControl(node) { node.classList.remove('pulse-click'); void node.offsetWidth; node.classList.add('pulse-click'); }

$('#device-button').addEventListener('click', () => { $('#device-popover').hidden = false; renderDevices(); });
$('[data-close-popover]').addEventListener('click', () => { $('#device-popover').hidden = true; });
$('#refresh-button').addEventListener('click', async () => {
  animateControl($('#refresh-button'));
  if (!state.demo) await loadSpotify().catch(error => toast(error.message));
  else {
    demo.queue.push(demo.queue.shift());
    renderQueue(demo.queue);
    toast('Queue refreshed · demo');
  }
});
$('#open-spotify-button').addEventListener('click', () => window.open(state.currentTrack?.external_urls?.spotify || 'https://open.spotify.com/', '_blank', 'noopener'));

function openSettings() {
  clientIdInput.value = localStorage.getItem(clientKey) || '';
  $('#redirect-uri').textContent = redirectUri;
  $('#connect-button').innerHTML = state.demo ? `${icon('spotify')} Connect with Spotify` : `${icon('logout')} Disconnect Spotify`;
  $('#demo-button').textContent = state.demo ? 'Keep exploring the demo' : 'Back to dashboard';
  $('#settings-modal').hidden = false;
  setTimeout(() => clientIdInput.focus(), 120);
}
function closeSettings() { $('#settings-modal').hidden = true; }
$('#open-settings').addEventListener('click', openSettings);
$('#account-button').addEventListener('click', openSettings);
$('[data-close-modal]').addEventListener('click', closeSettings);
$('#demo-button').addEventListener('click', closeSettings);
$('#settings-modal').addEventListener('click', event => { if (event.target === $('#settings-modal')) closeSettings(); });
$('#connect-button').addEventListener('click', () => state.demo ? connectSpotify() : disconnect());
$('#toggle-client-id').addEventListener('click', () => { clientIdInput.type = clientIdInput.type === 'password' ? 'text' : 'password'; });
$('#redirect-copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(redirectUri); toast('Redirect URL copied'); }
  catch { toast('Select and copy the redirect URL above.'); }
});

$('#playlist-toggle').addEventListener('click', () => {
  state.playlistExpanded = !state.playlistExpanded;
  renderPlaylists(state.playlists);
  if (!state.playlistExpanded) $('#playlists-section').scrollIntoView({ behavior:'smooth' });
});

$('#recent-order-button').addEventListener('click', () => {
  state.recentReversed = !state.recentReversed;
  renderRecent(state.recent);
  animateControl($('#recent-order-button'));
  toast(state.recentReversed ? 'Showing oldest first' : 'Showing newest first');
});

$$('[data-view]').forEach(button => button.addEventListener('click', () => {
  const view = button.dataset.view;
  $$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === view));
  if (view === 'playlists') { state.playlistExpanded = true; renderPlaylists(state.playlists); $('#playlists-section').scrollIntoView({ behavior:'smooth' }); }
  else if (view === 'recent') $('#recent-section').scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}));

async function search(query) {
  const panel = $('#search-panel');
  if (!query.trim()) { panel.hidden = true; return; }
  panel.hidden = false;
  $('#search-results').innerHTML = '<div class="search-empty">Searching…</div>';
  let items;
  if (state.demo) {
    items = demo.search.filter(item => `${item.name} ${item.artist}`.toLowerCase().includes(query.toLowerCase()));
  } else {
    try { items = (await spotify(`/search?type=track&limit=6&q=${encodeURIComponent(query)}`)).tracks?.items || []; }
    catch (error) { $('#search-results').innerHTML = `<div class="search-empty">${escapeHtml(error.message)}</div>`; return; }
  }
  $('#search-results').innerHTML = items.length ? items.map((item, index) => `<button class="search-result" data-uri="${item.uri || ''}" data-index="${index}" aria-label="Play ${escapeHtml(item.name)}"><div class="recent-cover" style="${colorStyle(item.colors || coverColors(index))}"></div><div class="recent-info"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.artists?.map(a => a.name).join(', ') || item.artist || '')}</span></div><span class="icon-button">${icon('play')}</span></button>`).join('') : '<div class="search-empty">No matches found.</div>';
  $$('.search-result').forEach(row => row.addEventListener('click', async () => {
    if (state.demo) {
      const item = items[Number(row.dataset.index)];
      const track = { ...item, id:`demo-search-${row.dataset.index}`, album:item.album || 'Search results', duration_ms:item.duration_ms || 220000 };
      state.playing = true; state.position = 0; updateTrackUI(track); updatePlaybackUI(); toast(`${item.name} is playing · demo`);
    } else if (await performAction('play track', () => spotify('/me/player/play', { method:'PUT', body:JSON.stringify({ uris:[row.dataset.uri] }) }))) schedulePlaybackRefresh();
    $('#search-panel').hidden = true;
    $('.search').classList.remove('mobile-open');
  }));
}

$('#search-input').addEventListener('input', event => { clearTimeout(state.searchTimer); state.searchTimer = setTimeout(() => search(event.target.value), 280); });
$('#close-search').addEventListener('click', () => { $('#search-panel').hidden = true; $('#search-input').value = ''; $('.search').classList.remove('mobile-open'); });
$('.search').addEventListener('click', () => {
  if (matchMedia('(max-width: 820px)').matches) {
    $('.search').classList.add('mobile-open');
    setTimeout(() => $('#search-input').focus(), 0);
  }
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#search-input').focus(); }
  if (event.key === 'Escape') { closeSettings(); $('#search-panel').hidden = true; $('#device-popover').hidden = true; $('.search').classList.remove('mobile-open'); }
  if (event.code === 'Space' && !['INPUT','BUTTON'].includes(document.activeElement.tagName)) { event.preventDefault(); togglePlay(); }
});

async function init() {
  renderPlaylists(); renderQueue(); renderRecent(); renderDevices();
  updateTrackUI(demo.tracks[0], { progress_ms:96000 });
  setRangeFill($('#progress')); setRangeFill($('#volume')); updatePlaybackUI(); startProgressClock();
  clientIdInput.type = 'password';
  try {
    if (await handleSpotifyCallback()) await loadSpotify();
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    toast(error.message);
    setTimeout(openSettings, 600);
  }
}

init();
