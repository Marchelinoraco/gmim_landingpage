# Implementation Plan: gmimjadi-landing-page

## Overview

Implementasi landing page statis Sistem Keuangan GMIM menggunakan satu file `index.html` dengan Tailwind CSS via CDN dan Vanilla JavaScript minimal. Pendekatan mobile-first dengan progressive enhancement — fungsionalitas inti bekerja tanpa JavaScript. Property-based tests ditulis dengan fast-check untuk memvalidasi properti universal pada fungsi rendering.

## Tasks

- [x] 1. Setup struktur file dan konfigurasi testing
  - Buat file `index.html` dengan boilerplate HTML5, meta viewport, Tailwind CDN, dan tag `<script>` untuk JS minimal
  - Buat file `tests/rendering.test.js` (atau `.mjs`) dengan setup fast-check dan jsdom
  - Buat `package.json` dengan dependensi `fast-check`, `jsdom`, dan test runner (vitest atau jest)
  - Ekspor fungsi-fungsi rendering dari modul terpisah `src/render.js` agar dapat diuji secara terisolasi
  - _Requirements: 1.1, 4.1, 6.2_

- [x] 2. Implementasi Navigation Bar
  - [x] 2.1 Buat komponen `<nav>` sticky dengan logo dan tautan desktop
    - Tambahkan `<nav>` dengan class `sticky top-0 z-50 bg-white shadow-md`
    - Tambahkan logo/nama "GMIM Keuangan" sebagai tautan ke `#hero`
    - Tambahkan tautan navigasi desktop: "Beranda" (`#hero`), "Fitur" (`#fitur`), "Jemaat" (`#jemaat`), "Kontak" (`#kontak`)
    - Tambahkan tombol hamburger dengan `id="hamburger-btn"` (tersembunyi di desktop via `md:hidden`)
    - Tambahkan `<div id="mobile-menu" class="hidden">` untuk menu mobile vertikal
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6_

  - [x] 2.2 Implementasi hamburger menu toggle dengan Vanilla JS
    - Tulis fungsi `initHamburgerMenu()` di `<script>` atau `src/menu.js`
    - Toggle class `hidden` pada `#mobile-menu` saat `#hamburger-btn` diklik
    - Tambahkan event listener pada setiap nav link mobile untuk menutup menu setelah klik
    - Tambahkan `scroll-behavior: smooth` pada tag `<html>` via Tailwind atau inline style
    - _Requirements: 4.4, 4.5, 4.6_

  - [x] 2.3 Tulis unit tests untuk hamburger menu toggle
    - Test: klik tombol hamburger → menu muncul (class `hidden` dihapus)
    - Test: klik tombol hamburger kedua kali → menu hilang (class `hidden` ditambahkan kembali)
    - Test: klik tautan navigasi mobile → menu ditutup otomatis
    - _Requirements: 4.5, 4.6_

- [x] 3. Implementasi Hero Section
  - [x] 3.1 Buat `<section id="hero">` dengan layout dua kolom (desktop) dan satu kolom (mobile)
    - Tambahkan heading H1: "Sistem Keuangan GMIM" dengan class `text-4xl md:text-5xl font-bold text-blue-900`
    - Tambahkan tagline deskriptif (1–2 kalimat) dengan class `text-lg text-gray-600 mt-4`
    - Tambahkan tombol CTA "Masuk ke Sistem" dengan `href` ke URL aplikasi dan class `mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800`
    - Tambahkan logo/ikon GMIM sebagai SVG inline dengan atribut `alt` yang deskriptif
    - Gunakan `grid grid-cols-1 md:grid-cols-2 gap-8 items-center` untuk layout responsif
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 4. Implementasi Feature Section
  - [x] 4.1 Buat `<section id="fitur">` dengan grid kartu fitur
    - Buat array data fitur (4 item) di `src/render.js`: Pencatatan Keuangan, Laporan Keuangan, Transparansi Jemaat, Anggaran Program
    - Tulis fungsi `renderFeatureCard(feature)` yang menghasilkan HTML kartu dengan ikon, judul, dan deskripsi
    - Tulis fungsi `renderFeatureSection(features)` yang merender grid semua kartu
    - Render ke DOM dengan `document.getElementById('fitur-grid').innerHTML`
    - Gunakan `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` untuk layout responsif
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 5. Implementasi Church List Section
  - [x] 5.1 Buat fungsi `renderChurchCard(church)` dan `renderChurchSection(churches)`
    - Tulis fungsi `renderChurchCard(church)` di `src/render.js` yang menghasilkan HTML kartu jemaat
    - Kartu menampilkan nama lengkap dan lokasi jemaat
    - Jika `church.mapsUrl` ada dan non-empty → tampilkan `<a href="..." target="_blank" rel="noopener noreferrer">Lihat Lokasi</a>`
    - Jika `church.mapsUrl` kosong/undefined → sembunyikan elemen tautan (tidak dirender)
    - Tulis fungsi `renderChurchSection(churches)` yang merender counter dan grid semua kartu
    - Counter format: `"${churches.length} Jemaat Terdaftar"`
    - Jika array kosong → tampilkan pesan "Belum ada jemaat terdaftar"
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

  - [x] 5.2 Tulis property test untuk Property 1: Tautan Maps hanya muncul jika mapsUrl tersedia
    - **Property 1: Tautan Maps hanya muncul jika data koordinat tersedia**
    - **Validates: Requirements 3.4, 3.5, 3.6**
    - Gunakan `fc.record({ name, location, mapsUrl: fc.option(fc.webUrl(), { nil: undefined }) })`
    - Assert: `html.includes("Lihat Lokasi") === (church.mapsUrl !== undefined && church.mapsUrl !== "")`
    - `numRuns: 100`

  - [x] 5.3 Tulis property test untuk Property 2: Counter mencerminkan jumlah data aktual
    - **Property 2: Counter jemaat mencerminkan jumlah data aktual**
    - **Validates: Requirements 3.7**
    - Gunakan `fc.array(fc.record({ name: fc.string({ minLength: 1 }), location: fc.string({ minLength: 1 }) }))`
    - Assert: `html.includes(\`${churches.length} Jemaat Terdaftar\`)`
    - `numRuns: 100`

  - [x] 5.4 Wire Church List Section ke DOM
    - Definisikan array `churches` dengan data Jemaat EBEN HAEZER TUMPAAN I (nama, lokasi, mapsUrl)
    - Panggil `renderChurchSection(churches)` dan inject hasilnya ke `<section id="jemaat">`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 6. Checkpoint — Pastikan semua tests lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 7. Implementasi Contact Section dan Footer
  - [x] 7.1 Buat `<section id="kontak">` dengan informasi kontak
    - Tambahkan heading H2: "Hubungi Kami"
    - Tambahkan deskripsi singkat ajakan bergabung
    - Tambahkan tombol/tautan WhatsApp dengan ikon dan class `bg-green-500 hover:bg-green-600`
    - Tambahkan alamat email (opsional, tersembunyi jika tidak tersedia)
    - _Requirements: 5.1, 5.2_

  - [x] 7.2 Buat `<footer>` dengan copyright tahun berjalan
    - Tambahkan teks copyright dengan `<span id="year"></span>` untuk tahun dinamis
    - Tulis JS: `document.getElementById("year").textContent = new Date().getFullYear()`
    - Hardcode tahun sebagai fallback di dalam `<span>` untuk kasus JS dinonaktifkan
    - Tambahkan tautan kebijakan privasi (tersembunyi jika tidak tersedia)
    - _Requirements: 5.3, 5.4, 5.5_

  - [x] 7.3 Tulis unit test untuk tahun copyright
    - Test: `new Date().getFullYear()` menghasilkan angka 4 digit yang valid (≥ 2024)
    - Test: elemen `#year` di DOM berisi string tahun yang benar setelah inisialisasi
    - _Requirements: 5.4_

- [x] 8. Implementasi aksesibilitas dan error handling
  - [x] 8.1 Audit dan perbaiki struktur heading, atribut alt, dan kontras warna
    - Pastikan hanya ada satu H1 di seluruh halaman (Hero Section)
    - Pastikan semua H2 berada di bawah H1 (Feature, Church List, Contact sections)
    - Pastikan setiap `<img>` memiliki atribut `alt` non-kosong yang deskriptif
    - Verifikasi kontras warna teks utama memenuhi WCAG AA (rasio ≥ 4.5:1)
    - Tambahkan `aria-label` pada tombol hamburger dan tautan ikon
    - _Requirements: 6.3, 6.4, 6.5_

  - [x] 8.2 Tambahkan fallback untuk Tailwind CDN gagal dan gambar gagal dimuat
    - Tambahkan minimal inline CSS kritis (navbar, hero) sebagai fallback jika CDN gagal
    - Tambahkan `onerror="this.style.display='none'"` pada elemen `<img>` ilustrasi
    - Gunakan SVG inline untuk logo/ikon utama agar tidak bergantung pada request eksternal
    - Tambahkan fallback CSS `:focus-within` pada nav untuk hamburger menu tanpa JS
    - _Requirements: 6.7_

  - [x] 8.3 Tulis property test untuk Property 3: Setiap gambar memiliki atribut alt
    - **Property 3: Setiap gambar memiliki atribut alt yang deskriptif**
    - **Validates: Requirements 6.3, 6.7**
    - Parse HTML output dengan `DOMParser` atau jsdom
    - Assert: semua elemen `<img>` memiliki `alt` yang non-empty setelah trim
    - `numRuns: 100`

  - [x] 8.4 Tulis property test untuk Property 4: Struktur heading hierarkis
    - **Property 4: Struktur heading bersifat hierarkis**
    - **Validates: Requirements 6.5**
    - Parse HTML output `renderFullPage()` dengan jsdom
    - Assert: tidak ada lompatan level heading lebih dari 1 (misal H1 → H3 tanpa H2)
    - `numRuns: 1` (deterministik)

  - [x] 8.5 Tulis property test untuk Property 5: Tautan navigasi mengarah ke section yang ada
    - **Property 5: Tautan navigasi mengarah ke section yang benar**
    - **Validates: Requirements 4.3, 4.4**
    - Parse HTML output `renderFullPage()` dengan jsdom
    - Assert: setiap `nav a[href^="#"]` memiliki target `id` yang ada di dokumen
    - `numRuns: 1` (deterministik)

- [x] 9. Final checkpoint — Pastikan semua tests lulus dan halaman siap deploy
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk keterlacakan
- Fungsi rendering diekspor dari `src/render.js` agar dapat diuji secara terisolasi dari DOM
- Property tests menggunakan fast-check dengan minimum 100 iterasi per properti
- Unit tests melengkapi property tests untuk kasus spesifik dan edge cases
- Checkpoint memastikan validasi inkremental sebelum melanjutkan ke fase berikutnya
- Tailwind CDN: gunakan Play CDN (`https://cdn.tailwindcss.com`) untuk development

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "5.1"] },
    { "id": 3, "tasks": ["2.3", "5.2", "5.3", "5.4"] },
    { "id": 4, "tasks": ["7.1", "7.2", "8.1", "8.2"] },
    { "id": 5, "tasks": ["7.3", "8.3", "8.4", "8.5"] }
  ]
}
```
