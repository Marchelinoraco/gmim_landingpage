/**
 * tests/rendering.test.js
 * Setup test dasar untuk memverifikasi konfigurasi fast-check, jsdom, dan fungsi rendering.
 * Property-based tests lengkap ada di task 5.2, 5.3, 8.3, 8.4, 8.5.
 */

import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import fc from "fast-check"
import {
  renderChurchCard,
  renderChurchSection,
  renderFeatureCard,
  renderFeatureSection,
  renderSubscriptionPlanCard,
  renderSubscriptionSection,
  renderFullPage,
  escapeHtml,
  features
} from "../src/render.js"

// ---------------------------------------------------------------------------
// Helper: parse HTML string ke DOM
// ---------------------------------------------------------------------------
function parseHtml(html) {
  const dom = new JSDOM(html)
  return dom.window.document
}

// ---------------------------------------------------------------------------
// Unit Tests: escapeHtml
// ---------------------------------------------------------------------------
describe("escapeHtml", () => {
  it("mengembalikan string kosong untuk input non-string", () => {
    expect(escapeHtml(null)).toBe("")
    expect(escapeHtml(undefined)).toBe("")
    expect(escapeHtml(123)).toBe("")
  })

  it("tidak mengubah string biasa", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World")
  })

  it("meng-escape karakter HTML khusus", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;")
    expect(escapeHtml("a & b")).toBe("a &amp; b")
    expect(escapeHtml("it's")).toBe("it&#39;s")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: renderChurchCard
// ---------------------------------------------------------------------------
describe("renderChurchCard", () => {
  it("menampilkan nama dan lokasi jemaat", () => {
    const church = { name: "Jemaat ABC", location: "Manado" }
    const html = renderChurchCard(church)
    expect(html).toContain("Jemaat ABC")
    expect(html).toContain("Manado")
  })

  it('menampilkan tautan "Lihat Lokasi" jika mapsUrl tersedia', () => {
    const church = {
      name: "Jemaat ABC",
      location: "Manado",
      mapsUrl: "https://maps.app.goo.gl/example"
    }
    const html = renderChurchCard(church)
    expect(html).toContain("Lihat Lokasi")
    expect(html).toContain("https://maps.app.goo.gl/example")
  })

  it('tidak menampilkan tautan "Lihat Lokasi" jika mapsUrl tidak ada', () => {
    const church = { name: "Jemaat ABC", location: "Manado" }
    const html = renderChurchCard(church)
    expect(html).not.toContain("Lihat Lokasi")
  })

  it('tidak menampilkan tautan "Lihat Lokasi" jika mapsUrl string kosong', () => {
    const church = { name: "Jemaat ABC", location: "Manado", mapsUrl: "" }
    const html = renderChurchCard(church)
    expect(html).not.toContain("Lihat Lokasi")
  })

  it('tautan membuka di tab baru dengan rel="noopener noreferrer"', () => {
    const church = {
      name: "Jemaat ABC",
      location: "Manado",
      mapsUrl: "https://maps.app.goo.gl/example"
    }
    const html = renderChurchCard(church)
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: renderChurchSection
// ---------------------------------------------------------------------------
describe("renderChurchSection", () => {
  it("menampilkan counter dengan jumlah jemaat yang benar", () => {
    const churches = [
      { name: "Jemaat A", location: "Kota A" },
      { name: "Jemaat B", location: "Kota B" }
    ]
    const html = renderChurchSection(churches)
    expect(html).toContain("2 Jemaat Terdaftar")
  })

  it('menampilkan "0 Jemaat Terdaftar" dan pesan kosong jika array kosong', () => {
    const html = renderChurchSection([])
    expect(html).toContain("0 Jemaat Terdaftar")
    expect(html).toContain("Belum ada jemaat terdaftar")
  })

  it('menampilkan "0 Jemaat Terdaftar" jika dipanggil tanpa argumen', () => {
    const html = renderChurchSection(null)
    expect(html).toContain("0 Jemaat Terdaftar")
  })

  it("menampilkan semua nama jemaat dalam output", () => {
    const churches = [
      {
        name: "Jemaat EBEN HAEZER TUMPAAN I",
        location: "Tumpaan, Minahasa Selatan",
        mapsUrl: "https://maps.app.goo.gl/S1b8cguCRnvQyrLZA"
      }
    ]
    const html = renderChurchSection(churches)
    expect(html).toContain("Jemaat EBEN HAEZER TUMPAAN I")
    expect(html).toContain("1 Jemaat Terdaftar")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: renderFeatureCard
// ---------------------------------------------------------------------------
describe("renderFeatureCard", () => {
  it("menampilkan ikon, judul, dan deskripsi", () => {
    const feature = { icon: "📊", title: "Pencatatan", description: "Catat keuangan." }
    const html = renderFeatureCard(feature)
    expect(html).toContain("📊")
    expect(html).toContain("Pencatatan")
    expect(html).toContain("Catat keuangan.")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: renderFeatureSection
// ---------------------------------------------------------------------------
describe("renderFeatureSection", () => {
  it("merender fitur default", () => {
    const html = renderFeatureSection()
    expect(html).toContain("Buku Kas Digital")
    expect(html).toContain("Dashboard &amp; Grafik")
    expect(html).toContain("Arus Kas &amp; Tutup Buku")
    expect(html).toContain("Multi Peran")
  })

  it("merender array fitur kustom", () => {
    const customFeatures = [{ icon: "🔑", title: "Fitur Kustom", description: "Deskripsi kustom." }]
    const html = renderFeatureSection(customFeatures)
    expect(html).toContain("Fitur Kustom")
    expect(html).not.toContain("Pencatatan Keuangan")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: Subscription Plans
// ---------------------------------------------------------------------------
describe("renderSubscriptionSection", () => {
  it("merender paket langganan default", () => {
    const html = renderSubscriptionSection()
    expect(html).toContain("Basic")
    expect(html).toContain("Standard")
    expect(html).toContain("Premium")
    expect(html).toContain("Paling Direkomendasikan")
  })

  it("merender kartu paket dengan fitur", () => {
    const html = renderSubscriptionPlanCard({
      name: "Trial",
      price: "Rp 0",
      description: "Coba sistem.",
      features: ["1 gereja", "1 bendahara"]
    })
    expect(html).toContain("Trial")
    expect(html).toContain("Rp 0")
    expect(html).toContain("1 bendahara")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: renderFullPage
// ---------------------------------------------------------------------------
describe("renderFullPage", () => {
  it("menghasilkan HTML yang valid dengan semua section utama", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)

    expect(doc.getElementById("hero")).not.toBeNull()
    expect(doc.getElementById("fitur")).not.toBeNull()
    expect(doc.getElementById("paket")).not.toBeNull()
    expect(doc.getElementById("jemaat")).not.toBeNull()
    expect(doc.getElementById("kontak")).not.toBeNull()
  })

  it("mengandung tepat satu H1", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)
    const h1s = doc.querySelectorAll("h1")
    expect(h1s.length).toBe(1)
  })

  it("mengandung tautan navigasi ke semua section", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)
    const navLinks = Array.from(doc.querySelectorAll('nav a[href^="#"]'))
    const hrefs = navLinks.map((a) => a.getAttribute("href"))
    expect(hrefs).toContain("#hero")
    expect(hrefs).toContain("#fitur")
    expect(hrefs).toContain("#paket")
    expect(hrefs).toContain("#jemaat")
    expect(hrefs).toContain("#kontak")
  })
})

// ---------------------------------------------------------------------------
// Unit Tests: Contact Section (Task 7.1)
// ---------------------------------------------------------------------------
describe("Contact Section (renderFullPage)", () => {
  it("mengandung section#kontak dengan heading H2 'Hubungi Kami'", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)
    const kontak = doc.getElementById("kontak")
    expect(kontak).not.toBeNull()
    const h2 = kontak.querySelector("h2")
    expect(h2).not.toBeNull()
    expect(h2.textContent.trim()).toBe("Hubungi Kami")
  })

  it("mengandung tautan WhatsApp dengan class bg-green-500 dan hover:bg-green-600", () => {
    const html = renderFullPage()
    expect(html).toContain("bg-green-500")
    expect(html).toContain("hover:bg-green-600")
    expect(html).toContain("wa.me")
  })

  it("tautan WhatsApp membuka di tab baru dengan rel noopener noreferrer", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)
    const kontak = doc.getElementById("kontak")
    const waLink = kontak.querySelector('a[href*="wa.me"]')
    expect(waLink).not.toBeNull()
    expect(waLink.getAttribute("target")).toBe("_blank")
    expect(waLink.getAttribute("rel")).toContain("noopener")
    expect(waLink.getAttribute("rel")).toContain("noreferrer")
  })

  it("mengandung deskripsi ajakan bergabung", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)
    const kontak = doc.getElementById("kontak")
    // Should have a paragraph with descriptive text
    const paragraphs = kontak.querySelectorAll("p")
    expect(paragraphs.length).toBeGreaterThan(0)
  })
})

/**
 * Property 1: Tautan Maps hanya muncul jika data koordinat tersedia
 * Validates: Requirements 3.4, 3.5, 3.6
 */
describe("Property 1: Tautan Maps hanya muncul jika mapsUrl tersedia", () => {
  it("menampilkan 'Lihat Lokasi' jika dan hanya jika mapsUrl tersedia dan non-kosong", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }),
          location: fc.string({ minLength: 1 }),
          mapsUrl: fc.option(fc.webUrl(), { nil: undefined })
        }),
        (church) => {
          const html = renderChurchCard(church)
          const hasLink = html.includes("Lihat Lokasi")
          return hasLink === (church.mapsUrl !== undefined && church.mapsUrl !== "")
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Smoke test: fast-check tersedia dan berfungsi
// ---------------------------------------------------------------------------
describe("fast-check setup", () => {
  it("fast-check dapat menjalankan property sederhana", () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        return typeof escapeHtml(s) === "string"
      }),
      { numRuns: 50 }
    )
  })

  it("jsdom dapat mem-parse HTML", () => {
    const doc = parseHtml('<div id="test">Hello</div>')
    expect(doc.getElementById("test").textContent).toBe("Hello")
  })
})

// ---------------------------------------------------------------------------
// Property Test 2: Counter jemaat mencerminkan jumlah data aktual
// Validates: Requirements 3.7
// ---------------------------------------------------------------------------
describe("Property 2: Counter mencerminkan jumlah data aktual", () => {
  it("counter selalu menampilkan jumlah jemaat yang sesuai dengan panjang array input", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            name: fc.string({ minLength: 1 }),
            location: fc.string({ minLength: 1 })
          })
        ),
        (churches) => {
          const html = renderChurchSection(churches)
          return html.includes(`${churches.length} Jemaat Terdaftar`)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property Test 4: Struktur heading bersifat hierarkis
// Validates: Requirements 6.5
// ---------------------------------------------------------------------------
/**
 * Property 4: Struktur heading bersifat hierarkis
 * Validates: Requirements 6.5
 */
describe("Property 4: Struktur heading hierarkis", () => {
  it("tidak ada lompatan level heading lebih dari 1 (misal H1 → H3 tanpa H2)", () => {
    fc.assert(
      fc.property(fc.constant(renderFullPage()), (html) => {
        const doc = parseHtml(html)
        const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) => parseInt(h.tagName[1]))
        // Tidak boleh ada lompatan level lebih dari 1
        for (let i = 1; i < headings.length; i++) {
          if (headings[i] - headings[i - 1] > 1) return false
        }
        return true
      }),
      { numRuns: 1 } // Deterministik, cukup 1 run
    )
  })
})

// ---------------------------------------------------------------------------
// Property Test 5: Tautan navigasi mengarah ke section yang ada
// Validates: Requirements 4.3, 4.4
// ---------------------------------------------------------------------------
describe("Property 5: Tautan navigasi mengarah ke section yang ada", () => {
  it("setiap nav a[href^='#'] memiliki target id yang ada di dokumen", () => {
    fc.assert(
      fc.property(fc.constant(renderFullPage()), (html) => {
        const dom = new JSDOM(html)
        const doc = dom.window.document
        const navLinks = Array.from(doc.querySelectorAll('nav a[href^="#"]'))
        return navLinks.every((link) => {
          const targetId = link.getAttribute("href").slice(1)
          return doc.getElementById(targetId) !== null
        })
      }),
      { numRuns: 1 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property Test 3: Setiap gambar memiliki atribut alt yang deskriptif
// Validates: Requirements 6.3, 6.7
// ---------------------------------------------------------------------------
/**
 * Property 3: Setiap gambar memiliki atribut alt yang deskriptif
 * Validates: Requirements 6.3, 6.7
 */
describe("Property 3: Setiap gambar memiliki atribut alt yang deskriptif", () => {
  it("semua elemen <img> dalam output renderFullPage memiliki atribut alt non-kosong", () => {
    fc.assert(
      fc.property(
        fc.record({
          churches: fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              location: fc.string({ minLength: 1 }),
              mapsUrl: fc.option(fc.webUrl(), { nil: undefined })
            })
          ),
          featureList: fc.array(
            fc.record({
              icon: fc.string({ minLength: 1 }),
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 })
            })
          )
        }),
        ({ churches, featureList }) => {
          const html = renderFullPage({ churches, featureList })
          const doc = parseHtml(html)
          const imgs = Array.from(doc.querySelectorAll("img"))
          return imgs.every((img) => {
            const alt = img.getAttribute("alt")
            return alt !== null && alt.trim().length > 0
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})
