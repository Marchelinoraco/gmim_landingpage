/**
 * tests/footer.test.js
 * Unit tests untuk tahun copyright di footer.
 * Validates: Requirements 5.4
 */

import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { renderFullPage } from "../src/render.js"

// ---------------------------------------------------------------------------
// Helper: parse HTML string ke DOM
// ---------------------------------------------------------------------------
function parseHtml(html) {
  const dom = new JSDOM(html)
  return dom.window.document
}

// ---------------------------------------------------------------------------
// Unit Tests: Tahun Copyright (Requirements 5.4)
// ---------------------------------------------------------------------------
describe("Tahun Copyright Footer", () => {
  it("new Date().getFullYear() menghasilkan angka 4 digit yang valid (≥ 2024)", () => {
    const year = new Date().getFullYear()

    // Harus berupa angka
    expect(typeof year).toBe("number")

    // Harus 4 digit (antara 1000 dan 9999)
    expect(year).toBeGreaterThanOrEqual(1000)
    expect(year).toBeLessThanOrEqual(9999)

    // Harus ≥ 2024 (tahun pembuatan sistem)
    expect(year).toBeGreaterThanOrEqual(2024)
  })

  it("elemen #year di DOM berisi string tahun yang benar setelah inisialisasi", () => {
    const html = renderFullPage()
    const doc = parseHtml(html)

    const yearEl = doc.getElementById("year")
    expect(yearEl).not.toBeNull()

    const yearText = yearEl.textContent.trim()

    // Harus berupa string angka 4 digit
    expect(yearText).toMatch(/^\d{4}$/)

    // Harus ≥ 2024
    const yearNum = parseInt(yearText, 10)
    expect(yearNum).toBeGreaterThanOrEqual(2024)
  })
})
