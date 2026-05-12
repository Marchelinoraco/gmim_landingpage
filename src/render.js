/**
 * src/render.js
 * Fungsi-fungsi rendering untuk landing page Sistem Keuangan GMIM.
 * Diekspor sebagai modul agar dapat diuji secara terisolasi.
 */

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/** @type {Array<{icon: string, title: string, description: string}>} */
export const features = [
  {
    icon: "📊",
    title: "Pencatatan Keuangan",
    description: "Catat pemasukan dan pengeluaran gereja secara terstruktur dan akurat."
  },
  {
    icon: "📄",
    title: "Laporan Keuangan",
    description: "Buat dan unduh laporan keuangan siap cetak kapan saja."
  },
  {
    icon: "👁️",
    title: "Transparansi Jemaat",
    description: "Jemaat dapat memantau kondisi keuangan gereja secara terbuka."
  },
  {
    icon: "📅",
    title: "Anggaran Program",
    description: "Kelola anggaran per program dan kegiatan gereja dengan mudah."
  }
]

// ---------------------------------------------------------------------------
// Feature Section
// ---------------------------------------------------------------------------

/**
 * Render satu kartu fitur.
 * @param {{ icon: string, title: string, description: string }} feature
 * @returns {string} HTML string
 */
export function renderFeatureCard(feature) {
  return `<div class="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
  <div class="text-4xl mb-4" aria-hidden="true">${feature.icon}</div>
  <h3 class="text-lg font-semibold text-gray-800">${escapeHtml(feature.title)}</h3>
  <p class="text-sm text-gray-600 mt-2">${escapeHtml(feature.description)}</p>
</div>`
}

/**
 * Render grid semua kartu fitur.
 * @param {Array<{icon: string, title: string, description: string}>} [featureList]
 * @returns {string} HTML string
 */
export function renderFeatureSection(featureList = features) {
  return featureList.map(renderFeatureCard).join("\n")
}

// ---------------------------------------------------------------------------
// Church List Section
// ---------------------------------------------------------------------------

/**
 * Render satu kartu jemaat.
 * @param {{ name: string, location: string, mapsUrl?: string }} church
 * @returns {string} HTML string
 */
export function renderChurchCard(church) {
  const mapsLink =
    church.mapsUrl && church.mapsUrl.trim() !== ""
      ? `<a
          href="${escapeHtml(church.mapsUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-blue-600 hover:underline text-sm mt-3"
        >Lihat Lokasi</a>`
      : ""

  return `<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 class="text-base font-semibold text-gray-800">${escapeHtml(church.name)}</h3>
  <p class="text-sm text-gray-600 mt-1">${escapeHtml(church.location)}</p>
  ${mapsLink}
</div>`
}

/**
 * Render counter dan grid semua kartu jemaat.
 * @param {Array<{name: string, location: string, mapsUrl?: string}>} churches
 * @returns {string} HTML string
 */
export function renderChurchSection(churches) {
  if (!churches || churches.length === 0) {
    return `<p class="text-center text-3xl font-bold text-blue-700 mb-8">0 Jemaat Terdaftar</p>
<p class="text-center text-gray-600">Belum ada jemaat terdaftar</p>`
  }

  const counter = `<p class="text-center text-3xl font-bold text-blue-700 mb-8">${churches.length} Jemaat Terdaftar</p>`
  const grid = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
${churches.map(renderChurchCard).join("\n")}
</div>`

  return counter + "\n" + grid
}

// ---------------------------------------------------------------------------
// Full Page (used by property tests)
// ---------------------------------------------------------------------------

/**
 * Render HTML lengkap halaman (tanpa <html>/<head> boilerplate) untuk keperluan testing.
 * @param {{ churches?: Array, featureList?: Array }} [options]
 * @returns {string} HTML string
 */
export function renderFullPage(options = {}) {
  const {
    churches = [
      {
        name: "Jemaat EBEN HAEZER TUMPAAN I",
        location: "Tumpaan, Minahasa Selatan",
        mapsUrl: "https://maps.app.goo.gl/S1b8cguCRnvQyrLZA"
      }
    ],
    featureList = features
  } = options

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Sistem Keuangan GMIM</title>
</head>
<body>
  <nav>
    <a href="#hero">GMIM Keuangan</a>
    <ul>
      <li><a href="#hero">Beranda</a></li>
      <li><a href="#fitur">Fitur</a></li>
      <li><a href="#jemaat">Jemaat</a></li>
      <li><a href="#kontak">Kontak</a></li>
    </ul>
    <button
      id="hamburger-btn"
      aria-label="Buka menu navigasi"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >&#9776;</button>
    <div id="mobile-menu" class="hidden">
      <ul>
        <li><a href="#hero">Beranda</a></li>
        <li><a href="#fitur">Fitur</a></li>
        <li><a href="#jemaat">Jemaat</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </div>
  </nav>
  <main>
    <section id="hero" class="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white">
      <div class="max-w-6xl mx-auto px-4 py-16 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-blue-900">Sistem Keuangan GMIM</h1>
            <p class="text-lg text-gray-600 mt-4">
              Kelola keuangan gereja secara transparan, terstruktur, dan mudah diakses oleh seluruh jemaat dan pengurus.
            </p>
            <a
              href="https://app.gmim-keuangan.id/login"
              class="inline-block mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Masuk ke Sistem
            </a>
          </div>
          <div class="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              class="w-48 h-48 md:w-64 md:h-64"
              role="img"
              aria-label="Logo Sistem Keuangan GMIM"
            >
              <circle cx="100" cy="100" r="90" fill="#1e40af" opacity="0.1" />
              <circle cx="100" cy="100" r="70" fill="#1e40af" opacity="0.15" />
              <rect x="88" y="40" width="24" height="120" rx="4" fill="#1e40af" />
              <rect x="50" y="78" width="100" height="24" rx="4" fill="#1e40af" />
              <circle cx="100" cy="155" r="18" fill="#f59e0b" />
              <text x="100" y="161" text-anchor="middle" font-size="16" font-weight="bold" fill="#fff">Rp</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <section id="fitur">
      <h2>Fitur Unggulan</h2>
      <div id="fitur-grid">${renderFeatureSection(featureList)}</div>
    </section>
    <section id="jemaat">
      <h2>Jemaat yang Telah Bergabung</h2>
      ${renderChurchSection(churches)}
    </section>
    <section id="kontak" class="py-20 bg-blue-700 text-white text-center">
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4">Hubungi Kami</h2>
        <p class="text-blue-100 mb-8">
          Tertarik mendaftarkan jemaat Anda? Hubungi kami dan kami akan membantu proses pendaftaran.
        </p>
        <a
          href="https://wa.me/628123456789"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  </main>
  <footer>
    <p>© <span id="year">2024</span> GMIM. Hak cipta dilindungi.</p>
    <p class="hidden" id="privacy-policy-link">
      <a href="#">Kebijakan Privasi</a>
    </p>
  </footer>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Escape karakter HTML khusus untuk mencegah XSS.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== "string") return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
