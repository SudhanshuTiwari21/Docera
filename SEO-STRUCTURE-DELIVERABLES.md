# SEO Structure & Internal Linking – Deliverables

**Date:** March 2026  
**Scope:** Hub pages, navigation, internal links, sitemap. No routes removed or renamed.

---

## 1. New folder structure

```
app/
├── tools/
│   ├── page.tsx                    ← NEW: Tools hub (/tools)
│   ├── image-tools/
│   │   └── page.tsx                ← NEW: Image tools hub (/tools/image-tools)
│   ├── pdf-tools/
│   │   └── page.tsx                ← NEW: PDF tools hub (/tools/pdf-tools)
│   ├── image-resizer/              (unchanged)
│   ├── resize-image-to-20kb/       (unchanged)
│   ├── ... (all other tool routes unchanged)
│   └── ...
├── guides/
│   ├── page.tsx                    (unchanged)
│   ├── exam-photo-requirements/
│   │   └── page.tsx                ← NEW: Exam hub (/guides/exam-photo-requirements)
│   └── how-to-resize-image-for-government-forms/  (unchanged)
└── ... (all other app routes unchanged)
```

---

## 2. Newly created pages

| # | Route | File | Purpose |
|---|--------|------|---------|
| 1 | `/tools` | `app/tools/page.tsx` | Main tools hub: all tools grouped as Image Tools and PDF Tools, with intro and links to category hubs |
| 2 | `/tools/image-tools` | `app/tools/image-tools/page.tsx` | Image tools hub: 10 image tools in a grid, related guides section, breadcrumb |
| 3 | `/tools/pdf-tools` | `app/tools/pdf-tools/page.tsx` | PDF tools hub: 6 PDF tools in a grid, related guides, breadcrumb |
| 4 | `/guides/exam-photo-requirements` | `app/guides/exam-photo-requirements/page.tsx` | Exam hub: intro on why image size matters, SSC / RRB / Banking / State / general guides, links to resize and PDF tools |

All four pages include:
- Unique meta title and description
- Canonical URL
- Breadcrumb nav
- H1 and H2 hierarchy
- Internal links to other hubs and key tools/guides

---

## 3. Updated navigation components

### Header (`components/Header.tsx`)

- **Desktop nav:** Added three links after “All PDF Tools”:
  - **Image Tools** → `/tools/image-tools`
  - **PDF Tools** → `/tools/pdf-tools`
  - **Guides** → `/guides`
- **Mobile nav:** Added the same three links (Image Tools, PDF Tools, Guides) before the auth block.

Existing dropdowns (Resize Image, Compress Image, Convert PDF, All Image Tools, All PDF Tools) and Pricing/Login/Sign up are unchanged.

### Footer (`components/Footer.tsx`)

- **Tools:** Links to `/tools`, `/tools/image-tools`, `/tools/pdf-tools` (replaces previous 4 tool links).
- **Guides:** New section with link to `/guides`.
- **Legal:** Links to `/pricing`, `/privacy`, `/terms`.
- **Contact:** Unchanged (info@dockera.in).
- Removed unused `Image` import. Footer is now a 4-column grid: Tools | Guides | Legal | Contact.

---

## 4. Updated sitemap

**File:** `app/sitemap.ts`

**Added entries:**

| Path | changeFrequency | priority |
|------|-----------------|----------|
| `/tools` | weekly | 0.9 |
| `/tools/image-tools` | weekly | 0.9 |
| `/tools/pdf-tools` | weekly | 0.9 |
| `/guides/exam-photo-requirements` | monthly | 0.8 |

All existing routes are unchanged. Sitemap is still a single function; new routes were appended to the existing `routes` array.

---

## 5. Other code changes

### `lib/toolsData.ts`

- **allTools:** Added three entries so hub pages can resolve all tools from one source:
  - `/tools/image-resizer` (Exam Smart Resizer)
  - `/tools/resize-image-to-20kb` (Resize Image to 20KB)
  - `/tools/resize-image-to-50kb` (Resize Image to 50KB)
- **imageToolHrefs:** New array of 10 image-tool paths for the image-tools hub.
- **pdfToolHrefs:** New array of 6 PDF-tool paths for the pdf-tools hub.
- **getToolsByHrefs(hrefs):** New helper used by hub pages to map hrefs to `ToolEntry[]`.

### `lib/internalLinks.ts`

- **toolHubLinks:** New array of 5 links: All tools, Image tools, PDF tools, Guides, Exam photo & signature requirements. Used by `RelatedToolsLinks` and exam hub.

### `components/RelatedToolsLinks.tsx`

- Added a fourth section **“Tool & guide hubs”** using `toolHubLinks`, so every tool and guide page that uses `RelatedToolsLinks` now links to the hubs.

### Homepage (`app/page.tsx`)

- **Metadata:** Title set to “Dockera – Free Online PDF & Image Tools”; description and keywords updated to include “PDF tools”, “image tools”, “resize image 100kb”, “passport photo maker”.
- **H1:** Set to “Free Online PDF & Image Tools”.
- **Subheading:** Set to “Resize images for government forms, compress PDFs, create passport photos and extract signatures instantly. **100% free** and easy to use — no sign-up required.”
- **Hero CTAs:** “All tools” (→ `/tools`) added as first button; Resize Image, Compress PDF, Passport Photo kept.
- **Tools section:** One line added with links to “image tools”, “PDF tools”, “guides”.
- **FAQ block:** Added links to “PDF and image tools”, “image tools”, and “guides” before the existing SSC/UPSC/resize links.

---

## 6. Summary of SEO improvements

| Area | Change |
|------|--------|
| **Hierarchy** | Clear hub structure: `/tools` → `/tools/image-tools` and `/tools/pdf-tools`; `/guides` → `/guides/exam-photo-requirements`. Breadcrumbs on all new pages. |
| **Category pages** | Four new index pages for “all tools”, “image tools”, “PDF tools”, and “exam photo requirements” to target category and exam queries. |
| **Internal linking** | Tool and guide pages using `RelatedToolsLinks` now get a “Tool & guide hubs” block. Homepage, hubs, and exam hub cross-link to tools and guides. |
| **Homepage** | H1 and copy aligned with “Free Online PDF & Image Tools” and main keywords; prominent links to `/tools`, `/tools/image-tools`, `/tools/pdf-tools`, `/guides`. |
| **Navigation** | Header and Footer expose Image Tools, PDF Tools, and Guides; Footer adds Pricing and standard Legal/Contact. |
| **Sitemap** | All four new URLs included with sensible priority and change frequency. |
| **Compatibility** | No existing routes removed or renamed; no new tools added. |

---

**Total new pages:** 4  
**Total pages after change:** 48 (44 existing + 4 hubs)
