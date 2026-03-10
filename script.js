/**
 * Hajj Maps — script.js
 * Interactive Hajj pilgrimage education map
 * Built with Leaflet.js
 */

/* ============================================================
   1. EMBEDDED LOCATION DATA
   (mirrors locations.json so the app works without a server)
   ============================================================ */
const LOCATIONS = [
  {
    id: 1, name: "Masjid al-Haram (Ka'bah)", shortName: "Ka'bah",
    lat: 21.4225, lng: 39.8262, order: 1,
    color: "#C8A951",
    emoji: "🕋",
    ritual: "Tawaf al-Qudum",
    description: "Ka'bah adalah bangunan berbentuk kubus di pusat Masjid al-Haram — tempat paling suci dalam Islam. Jemaah haji melakukan Tawaf: mengelilingi Ka'bah sebanyak tujuh kali berlawanan arah jarum jam. Ini adalah ritual utama pertama dalam ibadah haji.",
    details: "Jemaah mengelilingi Ka'bah sebanyak 7 kali berlawanan arah jarum jam, dimulai dan diakhiri di Hajar Aswad (Batu Hitam). Setelah itu, mereka shalat 2 rakaat di dekat Maqam Ibrahim dan meminum air Zamzam yang penuh berkah."
  },
  {
    id: 2, name: "Bukit Shafa", shortName: "Shafa",
    lat: 21.4232, lng: 39.8272, order: 2,
    color: "#2E7D32",
    emoji: "⛰",
    ritual: "Sa'i (Titik Awal)",
    description: "Bukit Shafa adalah bukit kecil di dekat Masjid al-Haram, tempat jemaah memulai Sa'i — ritual berjalan antara Shafa dan Marwah. Ritual ini mengenang perjuangan Siti Hajar yang berlari mencari air untuk putranya, Nabi Ismail.",
    details: "Jemaah berdiri di Bukit Shafa, menghadap Ka'bah, membaca doa dan dzikir, lalu berjalan menuju Marwah. Jarak antara kedua bukit sekitar 450 meter. Perjalanan ini dilakukan sebanyak 7 kali bolak-balik."
  },
  {
    id: 3, name: "Bukit Marwah", shortName: "Marwah",
    lat: 21.4253, lng: 39.8267, order: 3,
    color: "#2E7D32",
    emoji: "⛰",
    ritual: "Sa'i (Titik Akhir)",
    description: "Bukit Marwah adalah tujuan akhir dalam ritual Sa'i. Perjalanan bolak-balik antara Shafa dan Marwah sebanyak 7 kali ini mengenang pengorbanan dan keteguhan iman Siti Hajar. Sa'i berakhir di Marwah pada putaran ke-7.",
    details: "Setelah berjalan dari Shafa ke Marwah (1 putaran) dan kembali (2 putaran), jemaah melanjutkan hingga 7 putaran total dan berakhir di Marwah. Kaum pria dianjurkan berlari-lari kecil di antara dua tanda hijau yang ada di sepanjang jalur Sa'i."
  },
  {
    id: 4, name: "Mina", shortName: "Mina",
    lat: 21.4133, lng: 39.8933, order: 4,
    color: "#1565C0",
    emoji: "⛺",
    ritual: "Mabit di Mina",
    description: "Mina adalah lembah yang dipenuhi tenda-tenda besar, terletak sekitar 5 km di sebelah timur Mekah. Dijuluki 'Kota Tenda', tempat ini menampung lebih dari 2 juta jemaah haji. Jemaah bermalam di sini pada tanggal 8 Dzulhijjah sebelum berangkat ke Arafah.",
    details: "Pada Hari Tarwiyah (8 Dzulhijjah), jemaah berangkat ke Mina untuk bermalam, beribadah, dan mempersiapkan diri secara spiritual. Mereka kembali ke Mina setelah Arafah dan Muzdalifah untuk melaksanakan Lempar Jumrah pada tanggal 10, 11, dan 12 Dzulhijjah."
  },
  {
    id: 5, name: "Padang Arafah", shortName: "Arafah",
    lat: 21.3547, lng: 39.9836, order: 5,
    color: "#6A1B9A",
    emoji: "🏔",
    ritual: "Wukuf di Arafah",
    description: "Padang Arafah adalah puncak dan inti dari seluruh rangkaian ibadah haji. Pada tanggal 9 Dzulhijjah, jutaan jemaah berkumpul di sini dari waktu Dzuhur hingga terbenamnya matahari untuk berdoa dan bermunajat. Rasulullah bersabda: 'Haji adalah Arafah.' Tanpa wukuf, haji tidak sah.",
    details: "Jemaah tiba di Arafah setelah shalat Dzuhur pada 9 Dzulhijjah dan menghabiskan waktu dengan berdoa, berdzikir, dan bertaubat hingga matahari terbenam. Di sini terdapat Jabal Rahmah (Bukit Kasih Sayang) — tempat bertemunya Nabi Adam dan Siti Hawa setelah diturunkan dari surga."
  },
  {
    id: 6, name: "Muzdalifah", shortName: "Muzdalifah",
    lat: 21.3800, lng: 39.9360, order: 6,
    color: "#00695C",
    emoji: "🌙",
    ritual: "Mabit & Mengumpulkan Batu",
    description: "Setelah meninggalkan Arafah saat matahari terbenam, jemaah menuju hamparan terbuka ini yang terletak antara Mina dan Arafah. Mereka bermalam di bawah langit terbuka, menggabungkan shalat Maghrib dan Isya, serta mengumpulkan kerikil untuk ritual Lempar Jumrah.",
    details: "Jemaah tiba di Muzdalifah setelah matahari terbenam pada tanggal 9 Dzulhijjah, kemudian shalat, tidur di bawah bintang, dan mengumpulkan 49-70 kerikil kecil untuk Lempar Jumrah. Mereka berangkat sebelum fajar menyingsing pada 10 Dzulhijjah (Hari Raya Idul Adha)."
  },
  {
    id: 7, name: "Jembatan Jumrah", shortName: "Jumrah",
    lat: 21.4228, lng: 39.8733, order: 7,
    color: "#BF360C",
    emoji: "🗿",
    ritual: "Lempar Jumrah",
    description: "Jembatan Jumrah adalah tempat jemaah melaksanakan Rami — ritual melontar jumrah sebagai simbol penolakan godaan setan. Tiga tiang jumrah melambangkan tiga lokasi di mana Nabi Ibrahim menolak bujukan iblis saat diperintahkan Allah untuk menyembelih putranya.",
    details: "Pada Hari Raya Idul Adha (10 Dzulhijjah), lemparkan 7 kerikil ke tiang terbesar (Jumrah Aqabah). Pada tanggal 11 dan 12 Dzulhijjah, lempari ketiga tiang masing-masing dengan 7 kerikil. Ritual ini melambangkan tekad bulat dalam menolak segala bentuk kejahatan dan godaan."
  }
];

/* ============================================================
   2. HAJJ ROUTE (ordered coordinate path for polyline)
   Masjid al-Haram → Mina → Arafah → Muzdalifah → Mina → Masjid al-Haram
   ============================================================ */
const HAJJ_ROUTE_COORDS = [
  [21.4225, 39.8262],  // Masjid al-Haram
  [21.4228, 39.8733],  // Jamarat (en-route to Mina)
  [21.4133, 39.8933],  // Mina
  [21.3800, 39.9360],  // Muzdalifah
  [21.3547, 39.9836],  // Arafah
  [21.3800, 39.9360],  // Muzdalifah (return)
  [21.4133, 39.8933],  // Mina (return)
  [21.4228, 39.8733],  // Jamarat (return)
  [21.4225, 39.8262],  // Masjid al-Haram (return)
];

/* ============================================================
   3. APP STATE
   ============================================================ */
const state = {
  map: null,
  markers: {},       // id → Leaflet marker
  routeLine: null,
  routeVisible: true,
  simActive: false,
  simStep: 0,        // 0-based index into LOCATIONS
};

/* ============================================================
   4. MAP INITIALISATION
   ============================================================ */
function initMap() {
  // Create Leaflet map centered on Mecca
  state.map = L.map('map', {
    center: [21.3891, 39.8579],
    zoom: 12,
    zoomControl: true,
    attributionControl: true,
  });

  // Tile layer — OpenStreetMap (no API key required)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(state.map);

  // Move Leaflet zoom control to bottom-right to avoid overlap with sidebar
  state.map.zoomControl.setPosition('bottomright');
}

/* ============================================================
   5. MARKERS
   ============================================================ */

/**
 * Creates a custom HTML marker for a Hajj location.
 * @param {object} loc - Location data object
 * @param {boolean} active - Whether the marker should appear highlighted
 * @returns {L.DivIcon}
 */
function createMarkerIcon(loc, active = false) {
  const size = active ? 44 : 38;
  const half = size / 2;
  return L.divIcon({
    className: '',
    html: `
      <div class="hajj-marker-icon ${active ? 'sim-active' : ''}"
           style="
             width:${size}px; height:${size}px;
             background:${loc.color};
             margin-left:-${half}px; margin-top:-${size * 0.85}px;
           ">
        <div class="marker-inner">${loc.emoji}</div>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [half, size],
    popupAnchor: [0, -size],
  });
}

/**
 * Builds the Leaflet popup HTML for a location.
 * @param {object} loc
 * @returns {string} HTML string
 */
function buildPopupHTML(loc) {
  return `
    <div class="popup-inner">
      <div class="popup-header">
        <div class="popup-order" style="background:${loc.color};">
          ${loc.order}
        </div>
        <div class="popup-title">${loc.name}</div>
      </div>
      <div class="popup-ritual">${loc.emoji} ${loc.ritual}</div>
      <p class="popup-description">${loc.description}</p>
    </div>`;
}

/**
 * Adds all Hajj location markers to the map.
 */
function addMarkers() {
  LOCATIONS.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: createMarkerIcon(loc),
      title: loc.name,
      alt: loc.name,
      riseOnHover: true,
    }).addTo(state.map);

    marker.bindPopup(buildPopupHTML(loc), {
      maxWidth: 300,
      minWidth: 250,
      className: 'hajj-popup',
    });

    // Store reference for simulation use
    state.markers[loc.id] = marker;
  });
}

/* ============================================================
   6. HAJJ ROUTE POLYLINE
   ============================================================ */
function addRoute() {
  state.routeLine = L.polyline(HAJJ_ROUTE_COORDS, {
    color: '#C8A951',
    weight: 3,
    opacity: 0.75,
    dashArray: '8, 10',
    lineJoin: 'round',
    lineCap: 'round',
  }).addTo(state.map);
}

function toggleRoute() {
  if (state.routeVisible) {
    state.map.removeLayer(state.routeLine);
    state.routeVisible = false;
    document.getElementById('btn-toggle-route').classList.add('active');
  } else {
    state.routeLine.addTo(state.map);
    state.routeVisible = true;
    document.getElementById('btn-toggle-route').classList.remove('active');
  }
}

/* ============================================================
   7. SIDEBAR POPULATION
   ============================================================ */
function buildSidebar() {
  const list = document.getElementById('location-list');
  list.innerHTML = '';

  LOCATIONS.forEach(loc => {
    const li = document.createElement('li');
    li.className = 'loc-item';
    li.dataset.id = loc.id;
    li.setAttribute('role', 'listitem');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `Navigate to ${loc.name}`);
    li.innerHTML = `
      <div class="loc-order" style="background:${loc.color};">${loc.order}</div>
      <div class="loc-info">
        <div class="loc-name">${loc.shortName}</div>
        <div class="loc-ritual">${loc.ritual}</div>
      </div>
      <span class="loc-arrow">›</span>`;

    // Click handler: fly to location and open popup
    li.addEventListener('click', () => navigateToLocation(loc));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateToLocation(loc);
    });

    list.appendChild(li);
  });
}

/**
 * Flies the map to a location, opens its popup, and highlights sidebar item.
 * @param {object} loc
 */
function navigateToLocation(loc) {
  // Close any open popups
  state.map.closePopup();

  // Fly to location
  state.map.flyTo([loc.lat, loc.lng], 15, { duration: 1.2, easeLinearity: 0.3 });

  // Open popup after fly animation
  setTimeout(() => {
    const marker = state.markers[loc.id];
    if (marker) marker.openPopup();
  }, 1300);

  // Highlight sidebar item
  setActiveSidebarItem(loc.id);

  // On mobile, close sidebar after navigation
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

/**
 * Marks a sidebar list item as active, clearing others.
 * @param {number} locId
 */
function setActiveSidebarItem(locId) {
  document.querySelectorAll('.loc-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === locId);
    el.classList.remove('sim-highlight');
  });
}

/**
 * Highlights a sidebar item during simulation (without removing active state).
 * @param {number} locId
 */
function setSimHighlightSidebarItem(locId) {
  document.querySelectorAll('.loc-item').forEach(el => {
    el.classList.toggle('sim-highlight', parseInt(el.dataset.id) === locId);
  });
  // Scroll sidebar item into view
  const el = document.querySelector(`.loc-item[data-id="${locId}"]`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================================================
   8. HAJJ SIMULATION
   ============================================================ */

/** Starts the step-by-step Hajj simulation. */
function startSimulation() {
  state.simActive = true;
  state.simStep = 0;

  // Show simulation UI
  document.getElementById('sim-panel').style.display = 'block';
  document.getElementById('sim-progress-bar').style.display = 'block';

  // Update start button appearance
  const btnSim = document.getElementById('btn-simulation');
  btnSim.querySelector('.btn-label').textContent = 'Simulasi Aktif';
  btnSim.classList.add('active');

  renderSimStep();
}

/** Stops the simulation and resets all state. */
function stopSimulation() {
  state.simActive = false;

  // Hide simulation UI
  document.getElementById('sim-panel').style.display = 'none';
  document.getElementById('sim-progress-bar').style.display = 'none';

  // Reset start button
  const btnSim = document.getElementById('btn-simulation');
  btnSim.querySelector('.btn-label').textContent = 'Mulai Simulasi Haji';
  btnSim.classList.remove('active');

  // Reset all markers to normal icons
  LOCATIONS.forEach(loc => {
    state.markers[loc.id].setIcon(createMarkerIcon(loc, false));
  });

  // Close any open popups
  state.map.closePopup();

  // Reset sidebar highlights
  document.querySelectorAll('.loc-item').forEach(el => {
    el.classList.remove('active', 'sim-highlight');
  });

  // Reset progress bar
  document.getElementById('sim-progress-fill').style.width = '0%';
}

/** Renders the current simulation step onto the map and panel. */
function renderSimStep() {
  const loc = LOCATIONS[state.simStep];
  const total = LOCATIONS.length;
  const stepNum = state.simStep + 1;

  // ---- Update panel content ----
  document.getElementById('sim-step-badge').textContent = `Langkah ${stepNum} / ${total}`;
  document.getElementById('sim-location-name').textContent = loc.name;
  document.getElementById('sim-ritual-name').textContent = `${loc.emoji}  ${loc.ritual}`;
  document.getElementById('sim-description').textContent = loc.details;

  // ---- Prev/Next button states ----
  document.getElementById('btn-sim-prev').disabled = state.simStep === 0;
  document.getElementById('btn-sim-next').disabled = state.simStep === total - 1;
  const nextBtn = document.getElementById('btn-sim-next');
  nextBtn.textContent = state.simStep === total - 1 ? '✓ Selesai' : 'Selanjutnya →';

  // ---- Progress bar ----
  const pct = (stepNum / total) * 100;
  document.getElementById('sim-progress-fill').style.width = `${pct}%`;

  // ---- Reset all markers to normal icons ----
  LOCATIONS.forEach(l => {
    state.markers[l.id].setIcon(createMarkerIcon(l, false));
  });

  // ---- Activate current marker ----
  state.markers[loc.id].setIcon(createMarkerIcon(loc, true));

  // ---- Fly map to location ----
  state.map.flyTo([loc.lat, loc.lng], 14, { duration: 1.5, easeLinearity: 0.25 });

  // ---- Open popup after fly ----
  state.map.closePopup();
  setTimeout(() => {
    state.markers[loc.id].openPopup();
  }, 1600);

  // ---- Sidebar highlight ----
  setSimHighlightSidebarItem(loc.id);
}

/* ============================================================
   9. EVENT LISTENERS
   ============================================================ */
function bindEvents() {
  // Toggle Hajj route
  document.getElementById('btn-toggle-route').addEventListener('click', toggleRoute);

  // Start/stop simulation
  document.getElementById('btn-simulation').addEventListener('click', () => {
    if (state.simActive) {
      stopSimulation();
    } else {
      startSimulation();
    }
  });

  // Simulation: previous step
  document.getElementById('btn-sim-prev').addEventListener('click', () => {
    if (state.simStep > 0) {
      state.simStep--;
      renderSimStep();
    }
  });

  // Simulation: next step
  document.getElementById('btn-sim-next').addEventListener('click', () => {
    if (state.simStep < LOCATIONS.length - 1) {
      state.simStep++;
      renderSimStep();
    } else {
      // Last step completed
      stopSimulation();
    }
  });

  // Simulation: stop
  document.getElementById('btn-sim-stop').addEventListener('click', stopSimulation);

  // Mobile sidebar toggle
  document.getElementById('btn-toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking the map on mobile
  document.getElementById('map').addEventListener('click', () => {
    if (window.innerWidth < 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });

  // Keyboard navigation for simulation
  document.addEventListener('keydown', e => {
    if (!state.simActive) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      document.getElementById('btn-sim-next').click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      document.getElementById('btn-sim-prev').click();
    } else if (e.key === 'Escape') {
      stopSimulation();
    }
  });
}

/* ============================================================
   10. INITIALISE APPLICATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialise map
  initMap();

  // 2. Add Hajj route polyline
  addRoute();

  // 3. Add location markers
  addMarkers();

  // 4. Populate sidebar
  buildSidebar();

  // 5. Bind all UI events
  bindEvents();

  // 6. Welcome: fly to show all of Hajj area
  state.map.flyToBounds(
    L.latLngBounds([21.3500, 39.8200], [21.4300, 40.0000]),
    { duration: 2.0, padding: [40, 40] }
  );

  console.log('🕋 Hajj Maps initialised. %c Bismillah', 'color:#C8A951;font-weight:bold');
});
