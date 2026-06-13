# CertiForge - Certificate & Card Template Maker

A powerful, drag-and-drop web-based editor built with Next.js to design, configure, and export dynamic certificate and ID card templates.

## ✨ Features

- **Custom Page Setup:** Choose between standard Certificate (A4) or Card (ID Size) formats with landscape and portrait orientation support.
- **Freeform Canvas Editor:** Fully resizable and draggable text and image elements directly on the workspace.
- **Dynamic Variable Mapping:** Added fields map directly to unique variable IDs (e.g., `{{full_name}}`, `{{qr_code}}`, `{{signature}}`) so you can seamlessly replace template data programmatically using the exported JSON structures.
- **Categorized Sidebar Components:** Over 35+ ready-to-use template fields grouped logically into Personal, Academic, Corporate, Result, Validation & Security categories.
- **Advanced Properties Panel:** Fine-tune canvas backgrounds, font sizes, colors, text-alignment, bounds, and X/Y positioning in real-time.
- **Undo/Redo History:** Includes a persistent timeline stack for safe template authoring with keyboard shortcuts built-in (`Ctrl+Z`, `Ctrl+Y`).
- **Export Options:**
  - Export layout coordinate configurations to **JSON** format.
  - Render the visual canvas directly to a high-quality **PDF**.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **Editor Core:** `react-rnd` (Drag, Drop, and Scaling)
- **Generators:** `html-to-image` & `jspdf`
- **Icons:** `lucide-react`

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 👨‍💻 Author

**Tahmid Khandokar**
