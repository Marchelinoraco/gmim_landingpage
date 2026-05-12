/**
 * tests/hamburger.test.js
 * Unit tests untuk hamburger menu toggle behavior.
 * Mensimulasikan DOM dengan jsdom dan mendefinisikan logika toggle
 * yang sama dengan yang ada di index.html inline script.
 *
 * Validates: Requirements 4.5, 4.6
 */

import { describe, it, expect, beforeEach } from "vitest"
import { JSDOM } from "jsdom"

// ---------------------------------------------------------------------------
// Helper: buat DOM minimal dengan hamburger button dan mobile menu
// ---------------------------------------------------------------------------
function createHamburgerDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <nav>
          <button
            id="hamburger-btn"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >☰</button>

          <div id="mobile-menu" class="hidden">
            <ul>
              <li><a href="#hero">Beranda</a></li>
              <li><a href="#fitur">Fitur</a></li>
              <li><a href="#jemaat">Jemaat</a></li>
              <li><a href="#kontak">Kontak</a></li>
            </ul>
          </div>
        </nav>
      </body>
    </html>
  `)

  const { document } = dom.window
  const btn = document.getElementById("hamburger-btn")
  const menu = document.getElementById("mobile-menu")

  // Pasang logika toggle yang sama dengan index.html
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isHidden = menu.classList.toggle("hidden")
      btn.setAttribute("aria-expanded", String(!isHidden))
    })

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden")
        btn.setAttribute("aria-expanded", "false")
      })
    })
  }

  return { document, btn, menu }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("Hamburger menu toggle", () => {
  let document, btn, menu

  beforeEach(() => {
    ;({ document, btn, menu } = createHamburgerDOM())
  })

  it("menu tersembunyi secara default (memiliki class hidden)", () => {
    expect(menu.classList.contains("hidden")).toBe(true)
  })

  it("klik tombol hamburger → menu muncul (class hidden dihapus)", () => {
    btn.click()
    expect(menu.classList.contains("hidden")).toBe(false)
  })

  it("klik tombol hamburger kedua kali → menu hilang (class hidden ditambahkan kembali)", () => {
    btn.click() // buka
    btn.click() // tutup
    expect(menu.classList.contains("hidden")).toBe(true)
  })

  it("klik tombol hamburger → aria-expanded berubah menjadi true", () => {
    btn.click()
    expect(btn.getAttribute("aria-expanded")).toBe("true")
  })

  it("klik tombol hamburger kedua kali → aria-expanded kembali menjadi false", () => {
    btn.click() // buka
    btn.click() // tutup
    expect(btn.getAttribute("aria-expanded")).toBe("false")
  })

  it("klik tautan navigasi mobile → menu ditutup otomatis (class hidden ditambahkan)", () => {
    btn.click() // buka menu terlebih dahulu
    expect(menu.classList.contains("hidden")).toBe(false)

    const firstLink = menu.querySelector("a")
    firstLink.click()

    expect(menu.classList.contains("hidden")).toBe(true)
  })

  it("klik tautan navigasi mobile → aria-expanded kembali menjadi false", () => {
    btn.click() // buka menu
    const firstLink = menu.querySelector("a")
    firstLink.click()

    expect(btn.getAttribute("aria-expanded")).toBe("false")
  })

  it("semua tautan navigasi mobile menutup menu saat diklik", () => {
    const links = Array.from(menu.querySelectorAll("a"))
    expect(links.length).toBeGreaterThan(0)

    links.forEach((link) => {
      btn.click() // buka menu
      expect(menu.classList.contains("hidden")).toBe(false)

      link.click() // klik tautan
      expect(menu.classList.contains("hidden")).toBe(true)
    })
  })
})
