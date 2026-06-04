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
    title: "Pemasukan & Pengeluaran",
    description: "Catat persembahan, kategori pemasukan, pengeluaran, dan saldo gereja secara terstruktur."
  },
  {
    icon: "📄",
    title: "Rekap Mingguan & Bulanan",
    description: "Buat laporan periode mingguan atau bulanan untuk rapat, arsip, dan pertanggungjawaban."
  },
  {
    icon: "👥",
    title: "Role Pengguna",
    description: "Bendahara mengakses semua menu, sementara pelayan khusus hanya menginput pemasukan."
  },
  {
    icon: "🏛️",
    title: "Multi Gereja",
    description: "Setiap jemaat memiliki data, akun, dan subdomain sendiri dalam satu sistem SaaS."
  },
  {
    icon: "📈",
    title: "Dashboard Keuangan",
    description: "Pantau saldo, total pemasukan, total pengeluaran, dan transaksi terbaru dari satu halaman."
  },
  {
    icon: "🔐",
    title: "Admin SaaS",
    description: "Developer/admin mengatur jemaat berlangganan, domain, paket, dan akun bendahara."
  }
]

/** @type {Array<{name: string, price: string, description: string, highlight?: boolean, features: string[]}>} */
export const subscriptionPlans = [
  {
    name: "Basic",
    price: "Rp 99.000",
    description: "Untuk jemaat yang mulai beralih dari pencatatan manual.",
    features: ["1 akun bendahara", "Pencatatan pemasukan dan pengeluaran", "Kategori transaksi", "Rekap bulanan"]
  },
  {
    name: "Standard",
    price: "Rp 179.000",
    description: "Untuk jemaat yang membutuhkan alur kerja bendahara dan pelayan khusus.",
    highlight: true,
    features: [
      "Semua fitur Basic",
      "Akun pelayan khusus",
      "Dashboard keuangan",
      "Rekap mingguan dan bulanan",
      "Dukungan aktivasi subdomain"
    ]
  },
  {
    name: "Premium",
    price: "Rp 299.000",
    description: "Untuk jemaat yang membutuhkan pengelolaan lebih lengkap dan prioritas dukungan.",
    features: [
      "Semua fitur Standard",
      "Jumlah akun lebih fleksibel",
      "Prioritas dukungan teknis",
      "Pendampingan setup awal",
      "Laporan siap cetak"
    ]
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
  return `<div class="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
  <div class="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" aria-hidden="true"></div>
  <div class="relative">
    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-3xl ring-1 ring-blue-100" aria-hidden="true">${feature.icon}</div>
    <h3 class="mt-4 text-lg font-semibold text-slate-900">${escapeHtml(feature.title)}</h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-600">${escapeHtml(feature.description)}</p>
  </div>
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
// Subscription Plan Section
// ---------------------------------------------------------------------------

/**
 * Render satu kartu paket langganan.
 * @param {{name: string, price: string, description: string, highlight?: boolean, features: string[]}} plan
 * @returns {string} HTML string
 */
export function renderSubscriptionPlanCard(plan) {
  const featuredClass = plan.highlight
    ? "border-brand-500 ring-2 ring-brand-100 shadow-xl scale-[1.01]"
    : "border-slate-200 shadow-sm"
  const badge = plan.highlight
    ? `<span class="absolute right-5 top-5 rounded-full bg-brand-600 px-3 py-1 text-xs font-extrabold text-white">Paling Direkomendasikan</span>`
    : ""
  const items = plan.features
    .map(
      (item) => `<li class="flex gap-3 text-sm text-slate-600">
  <span class="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">✓</span>
  <span>${escapeHtml(item)}</span>
</li>`
    )
    .join("\n")

  return `<div class="relative rounded-3xl border ${featuredClass} bg-white p-7">
  ${badge}
  <h3 class="text-xl font-extrabold text-slate-900">${escapeHtml(plan.name)}</h3>
  <p class="mt-3 text-sm leading-relaxed text-slate-600">${escapeHtml(plan.description)}</p>
  <div class="mt-6 flex items-end gap-1">
    <span class="text-3xl font-extrabold text-slate-900">${escapeHtml(plan.price)}</span>
    <span class="pb-1 text-sm font-semibold text-slate-500">/bulan</span>
  </div>
  <ul class="mt-7 space-y-3">${items}</ul>
  <a href="#kontak" class="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-brand-700">Pilih Paket</a>
</div>`
}

/**
 * Render semua paket langganan.
 * @param {Array<{name: string, price: string, description: string, highlight?: boolean, features: string[]}>} [plans]
 * @returns {string} HTML string
 */
export function renderSubscriptionSection(plans = subscriptionPlans) {
  return plans.map(renderSubscriptionPlanCard).join("\n")
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
          class="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm mt-4 font-semibold"
        >Lihat Lokasi</a>`
      : ""

  return `<div class="bg-white/70 backdrop-blur p-6 rounded-2xl shadow-sm border border-slate-200/70 hover:shadow-md transition-shadow">
  <h3 class="text-base font-semibold text-slate-900">${escapeHtml(church.name)}</h3>
  <p class="text-sm text-slate-600 mt-1">${escapeHtml(church.location)}</p>
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
      <li><a href="#paket">Paket</a></li>
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
        <li><a href="#paket">Paket</a></li>
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
    <section id="paket">
      <h2>Paket Langganan</h2>
      <div id="paket-grid">${renderSubscriptionSection()}</div>
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
