# Dockera – Technical, SEO & Product Architecture Audit

**Date:** March 2026  
**Scope:** Full codebase, site structure, SEO, performance, scalability, conversion  
**Framework:** Next.js 14 (App Router)

---

## 1. Project Architecture

### 1.1 Folder Structure

```
Dockera/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (metadata, Header, Footer)
│   ├── page.tsx                  # Homepage
│   ├── globals.css
│   ├── api/                      # API routes
│   │   ├── auth/                 # login, signup, verify-email, me, logout, send-otp, verify-otp
│   │   ├── subscription/        # create, verify
│   │   ├── webhooks/razorpay/
│   │   ├── premium-status/
│   │   ├── verify-payment/
│   │   ├── create-subscription/
│   │   └── cron/                # renewal-reminders, downgrade-expired
│   ├── tools/                    # 16 tool pages (one folder per tool)
│   │   ├── image-resizer/
│   │   ├── resize-image-to-20kb|50kb|100kb/
│   │   ├── compress-image/, crop-image/, convert-to-png/, convert-from-jpg/
│   │   ├── pdf-compressor/, merge-pdf/, split-pdf/, pdf-to-jpg/
│   │   ├── jpg-to-pdf/, image-to-pdf/
│   │   ├── passport-photo/, signature-extractor/
│   ├── guides/                   # Guides hub + 1 article
│   ├── pricing/, pricing/checkout/
│   ├── login/, signup/
│   ├── privacy/, terms/
│   ├── [20 exam/landing pages]   # e.g. ssc-cgl-photo-signature-size, resize-image-for-ssc-form
│   ├── sitemap.ts
│   └── (no global error/not-found override)
├── components/
│   ├── Header.tsx, Footer.tsx, ThemeProvider.tsx
│   ├── HeroDemo.tsx, TrueFocusHeading.tsx, PremiumPlanButton.tsx
│   ├── tools/                    # One component per tool (e.g. JpgToPdfTool, ResizeImageTool)
│   ├── ui/                       # FileInput, FaqAccordion, LimitReachedModal, PremiumFeatureModal
│   ├── common/                   # InternalLinksSection
│   ├── blog/                     # SeoArticleLayout
│   └── RelatedToolsLinks.tsx
├── lib/
│   ├── seo.ts, titleOptimizer.ts, internalLinks.ts, toolsData.ts
│   ├── auth.ts, db.ts, email.ts, razorpay.ts
│   ├── usageLimit.ts, rateLimit.ts, authRateLimit.ts
│   ├── cropImage.ts, imageOptimizer.ts, passportPhoto.ts, examPresets.ts, verification.ts, otp.ts
│   └── ...
├── public/                       # Favicons, logos, robots.txt, manifest.json
├── migrations/                   # SQL migrations (001–004)
├── docs/                         # seo-strategy.md, SUBSCRIPTIONS.md, AUTH-EDGE-CASES.md
└── vercel.json                   # Crons (renewal-reminders, downgrade-expired)
```

**Observations:**
- **Routes:** All pages are static routes (no `[slug]` or `[...slug]`). Every tool and every exam page is a separate folder under `app/`.
- **Single source of truth:** `lib/toolsData.ts` defines `allTools` and dropdown columns; `lib/internalLinks.ts` defines link clusters for Related Tools and Exam Guides. Good for consistency; sitemap is maintained manually and must stay in sync.
- **Redundancy:** `toolsData` lists 12 tools (resize represented by one entry “Resize Image” → `/tools/resize-image-to-100kb`). Sitemap also lists `/tools/image-resizer` and the three `/tools/resize-image-to-*` pages. Header nav uses “Resize Image” → resize-image-to-100kb and “Compress Image” → compress-image; Footer uses a fixed list (image-resizer, pdf-compressor, passport-photo, signature-extractor) — **Footer is out of sync** with full tool set and with `allTools`.
- **Missing:** No `/tools` index page (category hub). No `app/not-found.tsx` or `app/error.tsx`. No shared `app/tools/layout.tsx` for tool-level wrapper (e.g. schema, breadcrumb pattern).

### 1.2 Route Summary

| Type | Count | Examples |
|------|--------|----------|
| Tool pages | 16 | `/tools/jpg-to-pdf`, `/tools/image-resizer`, `/tools/resize-image-to-20kb` |
| Exam/landing pages | 20 | `/ssc-cgl-photo-signature-size`, `/resize-image-for-ssc-form` |
| Guides | 2 | `/guides`, `/guides/how-to-resize-image-for-government-forms` |
| Auth | 2 | `/login`, `/signup` |
| Other | 6 | `/`, `/pricing`, `/pricing/checkout`, `/privacy`, `/terms` |

**Total public/content pages:** ~46 (excluding checkout).

### 1.3 Scalability for 50–100 Tools

- **Current:** One `app/tools/<name>/page.tsx` per tool. Adding a tool = new folder + new page component + manual updates to `toolsData`, `internalLinks` (if new category), sitemap, and optionally Header dropdowns.
- **Bottlenecks:** Sitemap is a single hardcoded array. No dynamic route like `app/tools/[slug]/page.tsx` that pulls from a CMS or JSON. No shared “tool template” that takes `slug` and config (title, description, component, FAQ).
- **Verdict:** Architecture is **not** optimized for 50–100 tools. It will require either:
  - **Option A:** Dynamic route `app/tools/[slug]/page.tsx` + a central registry (e.g. `toolsRegistry.ts` or DB) that maps slug → metadata + component, and sitemap generation from that registry; or
  - **Option B:** Codegen or CLI that scaffolds a new tool folder + page + adds to sitemap/toolsData from a config file.
- **Recommendation:** Introduce a **tools registry** (array or JSON) with slug, title, description, component name, keywords, FAQ. Generate sitemap and `allTools` from it; keep one dynamic route for tools so new tools are “add one config entry + one component.”

---

## 2. Site Structure & Full Sitemap

### 2.1 Current Hierarchy (Logical)

```
Homepage
├── Tools (no /tools hub)
│   ├── Image tools (resize, compress, crop, convert, passport, signature, jpg/image to PDF)
│   ├── PDF tools (compress, merge, split, pdf-to-jpg)
│   └── 16 individual tool URLs
├── Guides
│   ├── /guides (hub)
│   └── /guides/how-to-resize-image-for-government-forms
├── Exam / form landing pages (20 URLs at root)
├── Pricing
│   ├── /pricing
│   └── /pricing/checkout (flow; not in sitemap)
├── Auth: /login, /signup (noindex)
└── Legal: /privacy, /terms
```

### 2.2 Full Site Map (URL Structure)

| Section | URL | In sitemap? | Notes |
|--------|-----|-------------|--------|
| **Home** | `/` | ✅ | |
| **Tools** | | | |
| | `/tools/image-resizer` | ✅ | Exam Smart Resizer |
| | `/tools/resize-image-to-100kb`, `.../50kb`, `.../20kb` | ✅ | |
| | `/tools/compress-image`, `crop-image`, `convert-to-png`, `convert-from-jpg` | ✅ | |
| | `/tools/pdf-compressor`, `merge-pdf`, `split-pdf`, `pdf-to-jpg` | ✅ | |
| | `/tools/jpg-to-pdf`, `image-to-pdf` | ✅ | |
| | `/tools/passport-photo`, `signature-extractor` | ✅ | |
| **Category hubs** | `/tools` | ❌ | **Missing** – no “All tools” page |
| | `/tools/image`, `/tools/pdf` | ❌ | **Missing** – no category pages |
| **Guides** | `/guides` | ✅ | |
| | `/guides/how-to-resize-image-for-government-forms` | ✅ | |
| **Form/Exam** | `/resize-image-for-ssc-form`, `...upsc-form` | ✅ | |
| | `/compress-pdf-for-govt-form`, `railway-photo-size-limit`, `fix-government-form-photo-upload-error` | ✅ | |
| | 15 exam-specific pages (SSC, RRB, IBPS, SBI, MPPSC, UPPSC, Bihar, Rajasthan) | ✅ | |
| **Pricing** | `/pricing` | ✅ | |
| **Auth** | `/login`, `/signup` | ✅ | noindex in metadata |
| **Legal** | `/privacy`, `/terms` | ✅ | |

### 2.3 Gaps

- **Missing category pages:** No `/tools`, `/tools/image`, `/tools/pdf`. Competitors (Smallpdf, iLovePDF) have category hubs that improve internal linking and target “image tools” / “PDF tools” queries.
- **Weak hierarchy:** Exam pages and form pages live at root; only breadcrumbs and `RelatedToolsLinks` tie them to “Guides.” A `/guides/exams` or `/exam-photo-requirements` hub would strengthen topical clusters.
- **URL structure:** Tool URLs are consistent (`/tools/kebab-case`). Exam URLs are long but descriptive. No duplicate content (no `/tool/jpg-to-pdf` vs `/tools/jpg-to-pdf`).

---

## 3. SEO Audit

### 3.1 URL Structure

- **Good:** Lowercase, hyphenated, descriptive. No unnecessary query params for canonical content.
- **Canonical:** `lib/seo.ts` provides `buildCanonicalUrl(path)`; pages pass `path` and get `alternates.canonical` set. Root layout uses `getDefaultMetadata()`. Consistent.

### 3.2 Meta Titles & Descriptions

- **Implementation:** Per-page `metadata` in each route; most use `getDefaultMetadata({ title, description, keywords, path })`. Some pages override `openGraph` again (slight duplication but correct).
- **Title format:** Often “Primary Keyword | Dockera” or “Primary Keyword – Subphrase | Dockera.” `lib/titleOptimizer.ts` has `buildOptimizedTitle()` with intent (govt, exam, general) and 65-char cap; **not used everywhere** – many pages hand-write titles. Risk of titles > 60–65 chars on some pages.
- **Descriptions:** Unique per page, generally 140–160 chars. Good.
- **Gap:** No systematic use of `buildOptimizedTitle()` across all tool and exam pages; some titles may be too long or inconsistent.

### 3.3 Headings Hierarchy

- **Pattern:** H1 = page title (one per page). H2 for main sections (e.g. “Use cases”, “FAQs”, “Step-by-step”). H3 in `RelatedToolsLinks` (InternalLinksSection) and in some long guides. No H4+ in sampled pages.
- **Good:** `aria-labelledby` and section structure. Image-resizer page is very rich (many H2s); jpg-to-pdf is lighter (one H2 + FAQs).
- **Thin content risk:** Some tool pages have only one H2 (“Use cases”) + FAQ + RelatedToolsLinks. For competitive terms, more H2s (e.g. “How to convert JPG to PDF”, “Supported formats”, “File size limits”) would help.

### 3.4 Internal Linking

- **Centralized:** `lib/internalLinks.ts` defines `resizeToolLinks`, `pdfToolLinks`, `examPhotoGuidesLinks`. `RelatedToolsLinks` renders three sections (Related Image Tools, PDF Tools, Exam Photo Guides) on tool and guide pages. Good keyword-rich anchors.
- **Homepage:** Links to resize-image-to-100kb, pdf-compressor, passport-photo; FAQ links to SSC/UPSC guides and resize tool.
- **Breadcrumbs:** Present on tool and guide pages; sometimes “Image tools” or “Tools” links to `/tools/image-resizer` (inconsistent – no single “Tools” hub).
- **Gaps:** Footer only links to 4 tools (image-resizer, pdf-compressor, passport-photo, signature-extractor). No links to guides, pricing, or exam pages from Footer. Header dropdowns cover all tools but not exam guides.

### 3.5 Canonical Tags

- **Status:** Set via `getDefaultMetadata({ path })` → `alternates.canonical`. No duplicate URLs observed. Checkout correctly excluded from sitemap; login/signup have noindex but are in sitemap (acceptable for discovery; crawlers will respect noindex).

### 3.6 Structured Data

- **FAQPage:** Used on homepage, image-resizer, jpg-to-pdf, resize-image-to-20kb, ssc-cgl, and likely other tool/exam pages. Inline JSON-LD in page.
- **Article:** `SeoArticleLayout` (guides) outputs Article schema with publisher.
- **Missing:** No **Organization** or **WebSite** schema on homepage (with sitelinks search box or main nav). No **SoftwareApplication** or **WebApplication** for the product. No **BreadcrumbList** (only visual breadcrumb nav). For tools, **HowTo** could be added on key tool pages to target how-to snippets.

### 3.7 Sitemap & robots.txt

- **Sitemap:** `app/sitemap.ts` returns all content URLs with lastModified, changeFrequency, priority. Includes login/signup (low priority). **Not generated from a single source** – adding a page requires editing sitemap.ts manually; risk of drift.
- **robots.txt:** `public/robots.txt`: `Allow: /`, `Sitemap: https://dockera.in/sitemap.xml`. Good. Sitemap URL is hardcoded (should use `NEXT_PUBLIC_SITE_URL` if domain varies by env).

### 3.8 Indexability

- **Login/Signup:** `robots: { index: false, follow: true }` in layout. Correct.
- **Checkout:** Not in sitemap; no noindex in code – consider adding noindex for `/pricing/checkout` to avoid indexing flow pages.
- **Thin content:** Guides hub (“More guides will be added here”) is minimal; could be seen as thin. Individual exam and tool pages have enough content.

### 3.9 Missing Keyword Targeting

- **Category queries:** “image tools online”, “PDF tools free” – no dedicated hub pages.
- **Comparison / “vs” queries:** No “JPG vs PNG”, “compress PDF vs reduce PDF size” pages.
- **Long-tail:** Exam pages cover many exams; some state-level exams may have additional long-tail (e.g. “MP Police photo size”) – can expand from `internalLinks` and new pages.

---

## 4. Tool Page Optimization

### 4.1 Tool UI Placement

- **Pattern:** Breadcrumb → H1 + short intro → **Tool component** (above the fold on desktop) → SEO sections (Use cases, steps, tips, FAQs) → RelatedToolsLinks.
- **Good:** Tool is prominent; content below supports SEO and answers “how to” without pushing the tool down too far. Lazy/dynamic loading used for heavy tools (PdfCompressorTool, PdfToJpgTool via `dynamic(..., { ssr: false })`).

### 4.2 SEO Content Below the Tool

- **Rich (e.g. image-resizer):** Multiple H2s (Indian Exams, All modes, Step-by-step, Common errors, Tips, Resize vs Compress vs Smart Optimize, Use cases), FAQs, internal links. Excellent.
- **Thin (e.g. jpg-to-pdf):** One H2 “Use cases” + FAQ + RelatedToolsLinks. Could add “How to convert JPG to PDF” (steps), “Supported formats”, “File size limits” to match competitor depth.

### 4.3 Keyword Targeting

- **Title/description:** Targeted (e.g. “JPG to PDF Online”, “Resize image to 20KB for govt forms”). Keywords in H1/H2 and first paragraph on most pages.
- **Gap:** `buildOptimizedTitle()` and intent-based suffixes (govt, exam) are underused; some pages could better align title with primary keyword and length.

### 4.4 Call-to-Action Placement

- **Primary CTA:** “Use tool” is the main action (tool at top). No sticky CTA bar. Pricing/Pro is in Header (PremiumPlanButton) and on pricing page; no “Upgrade to Pro” on tool pages for free users (could add after N uses or in footer of tool card).
- **Secondary:** RelatedToolsLinks drive cross-tool usage. No explicit “Back to all tools” (no hub).

### 4.5 Internal Linking on Tool Pages

- **RelatedToolsLinks:** Three blocks (Related Image Tools, PDF Tools, Exam Photo Guides) with keyword anchors. Strong.
- **In-content:** Image-resizer and similar pages link to passport-photo, pdf-compressor, resize-to-100kb, SSC/UPSC guides. Good.
- **Recommendation:** Add one “See all image tools” / “See all PDF tools” link to future category pages.

### 4.6 Page Load Performance

- **Heavy libs:** `pdf-lib`, `pdfjs-dist`, `jspdf` used by PDF tools. PdfCompressor and PdfToJpg are loaded with `dynamic(..., { ssr: false })` to avoid bundling on initial load. Good.
- **Images:** Next.js Image with avif/webp; config present. No large above-the-fold images on tool pages.
- **No lazy loading** for below-the-fold tool components that don’t need client interactivity (most tools are client components). Consider lazy-loading RelatedToolsLinks or FAQ if they are below fold.

---

## 5. Performance Audit

### 5.1 Bundle Sizes

- **Not measured in audit.** Recommend `next build` and analyze `.next` or use `@next/bundle-analyzer` to identify large dependencies (e.g. pdfjs-dist, razorpay).
- **Dynamic imports:** Used for PdfCompressorTool and PdfToJpgTool; pdfjs-dist is also dynamically imported inside MergePdfTool and SplitPdfTool. Good for code splitting.

### 5.2 Lazy Loading

- **Tools:** Only 2 tools use `dynamic()` with `ssr: false`. Other tools (JpgToPdfTool, ResizeImageTool, etc.) are static imports; their JS is in the page bundle. For 50+ tools, every tool page would load its own component – consider dynamic import for all tool components so only the current tool’s JS loads.
- **Images:** Next/Image used on homepage (HeroDemo); no audit of actual image sizes.

### 5.3 Image Optimization

- **Config:** `next.config.js` has `images: { formats: ['avif', 'webp'], deviceSizes, imageSizes }`. Favicons and logos in public. Default OG image in `lib/seo.ts` is `${SITE_URL}/og-default.png` – **file not present in public/** (will 404 unless added at build or CDN).

### 5.4 Client vs Server

- **Server:** Layout, pricing (getSession), metadata, sitemap. Most pages are server components; tool pages import client tool components.
- **Client:** Header (theme, auth, dropdowns), all tool UIs, ThemeProvider. Appropriate.

### 5.5 Page Speed

- **Not measured.** Recommend Lighthouse (mobile/desktop) on homepage and 2–3 tool pages. Likely improvements: ensure og-default.png exists or remove reference; lazy-load below-fold sections; consider font optimization if using custom fonts.

---

## 6. Growth Scalability (50 / 100 / 300 SEO Pages)

### 6.1 Current Scale

- **~46 indexable pages.** Sitemap and nav are manual. Adding one tool = 4+ file touches (page, toolsData, sitemap, optionally internalLinks/Header).

### 6.2 Scaling to 50 Tools

- **Feasible but tedious** with current structure. Need: (1) tools registry, (2) sitemap generated from registry, (3) single “tool template” or dynamic route so one new tool = one registry entry + one component.

### 6.3 Scaling to 100 Tools / 300 SEO Pages

- **Requires programmatic approach:**
  - **Tools:** Dynamic route `app/tools/[slug]/page.tsx` + registry (metadata, component name, FAQ). Sitemap from registry.
  - **Guides/Exam:** Optionally `app/guides/[slug]/page.tsx` and `app/exam/[slug]/page.tsx` with content from MDX or CMS, or at least a registry.
  - **Internal links:** Generated from registry (e.g. “all tools in category X”) to avoid maintaining huge static arrays.
- **Programmatic SEO:** To scale to hundreds of pages (e.g. “photo size for [exam]”, “convert [format] to [format]”), need template pages + data (e.g. JSON/MDX per exam or per tool variant) and generate static params or use ISR.

### 6.4 Recommendations

1. **Short term:** Add `toolsRegistry.ts` (or JSON) with slug, title, description, keywords, component, category. Generate `allTools` and sitemap from it; keep existing page files but have them read from registry.
2. **Medium term:** Migrate to `app/tools/[slug]/page.tsx` that loads config from registry and renders the right component. One new tool = one registry entry + one component.
3. **Long term:** For 300+ pages, add guide/exam content from data (MDX or headless CMS) and generate sitemap/index from that data; consider ISR for rarely changing pages.

---

## 7. Competitor Comparison (Smallpdf, iLovePDF, PDF24)

| Aspect | Smallpdf / iLovePDF / PDF24 | Dockera |
|--------|-----------------------------|---------|
| **Category hubs** | /all-tools, /pdf-tools, /image-tools | Missing /tools, /tools/pdf, /tools/image |
| **Homepage** | Strong category cards, “Most popular” | Tool grid + hero; no category grouping |
| **Tool URLs** | Often /tool-name or /pdf-tools/tool-name | /tools/tool-name ✅ |
| **Structured data** | WebSite, Organization, BreadcrumbList, HowTo on tools | FAQPage, Article on guides; no WebSite/Organization/Breadcrumb/HowTo |
| **Free vs Pro** | Clear limits, upgrade prompts on tool pages | Premium in header; no in-tool upgrade CTA |
| **Programmatic SEO** | Many “X to Y” and “for [use case]” pages | Exam pages manual; no template-based expansion |
| **Sitemap** | Often split (sitemap_index) for large sites | Single sitemap; OK for current size |
| **Internal linking** | Category → tools → related; breadcrumbs | RelatedToolsLinks + breadcrumbs; no category layer |

**Takeaways:** Add category hubs; add WebSite + Organization + BreadcrumbList schema; consider HowTo on key tools; add upgrade CTA on tool pages when limit reached; plan for programmatic tool/guide pages for scale.

---

## 8. Conversion Optimization

### 8.1 Homepage Messaging

- **Headline:** “Every tool you need for documents & images in one place.” Clear.
- **Sub:** Resize, compress, passport, signatures; “100% free” and “no sign-up required.” Trust strip (private, no sign-up, instant, all devices). Good.
- **CTAs:** Resize Image, Compress PDF, Passport Photo. Could A/B test order or add “All tools” linking to a hub.

### 8.2 Pricing Placement

- **Header:** “Pricing” / “Go Pro” (PremiumPlanButton). Visible.
- **Pricing page:** Two columns (Basic free, Pro paid); features listed. No FAQ on pricing page (e.g. “Can I cancel?”).

### 8.3 Free vs Premium UX

- **Usage limits:** Enforced via API (usageLimit, premium-status). LimitReachedModal and PremiumFeatureModal prompt upgrade. Good.
- **Differentiation:** Free = limited processing; Pro = unlimited, ad-free, multi-device. Messaging is clear; could add “X of Y free uses left” on tool page for clarity.

### 8.4 Upgrade Triggers

- **Current:** Modal when limit reached; Header “Go Pro.” No soft prompt (e.g. “You’ve used 5 tools today – go Pro for unlimited”).
- **Recommendation:** After N successful conversions, show a non-blocking banner or inline CTA (“Loving Dockera? Go Pro for unlimited use”) with link to pricing.

### 8.5 Ad Placement Potential

- **Current:** No ads in codebase. If you add a free-with-ads tier, natural places: below the tool (above “Use cases”), in sidebar on desktop, or between FAQ and RelatedToolsLinks. Keep tool and first CTA above the fold.

---

## 9. Final Scores (Out of 10)

| Dimension | Score | Rationale |
|-----------|--------|------------|
| **Architecture** | 6.5 | Clear App Router structure, shared libs and components; no dynamic tool route, sitemap/toolsData manual, Footer out of sync. |
| **SEO readiness** | 7 | Good meta, canonicals, FAQ schema, internal links; missing category hubs, WebSite/Organization/Breadcrumb/HowTo, thin content on some tools, title optimizer underused. |
| **Performance** | 7 | Dynamic import for heavy PDF tools, Next Image config; no bundle analysis, og-default.png missing, no lazy load for all tool components. |
| **Scalability** | 5 | Adding tools is manual and doesn’t scale to 50–100; no registry, no dynamic route or programmatic SEO. |
| **Monetization potential** | 7 | Clear Pro vs Free, Razorpay subscription, limit modals; missing in-tool upgrade CTA, soft prompts, and pricing FAQ. |

**Overall (average):** **6.5 / 10** – Solid base; biggest levers are scalability (registry + dynamic tools), category hubs, schema and content depth, and conversion prompts.

---

## 10. Action Plan

### Immediate (0–2 weeks)

1. **Fix OG image:** Add `public/og-default.png` (1200×630) or change `lib/seo.ts` to use an existing image so OG/twitter cards don’t 404.
2. **Pricing/checkout noindex:** Set `noIndex: true` (or robots noindex) for `/pricing/checkout` so the flow isn’t indexed.
3. **Footer sync:** Update Footer to use `allTools` from `lib/toolsData` (or a subset) and add Pricing, Guides; optionally add “All tools” link to a new `/tools` page.
4. **Sitemap URL in robots.txt:** Use `NEXT_PUBLIC_SITE_URL` or relative `/sitemap.xml` if you support multiple domains.

### Short-term (1–2 months)

5. **Category hubs:** Add `/tools` (list all tools, optionally grouped by Image/PDF), and optionally `/tools/image`, `/tools/pdf` with metadata and internal links.
6. **Structured data:** Add **WebSite** (and **Organization**) on root layout or homepage with `url`, `name`, `potentialAction` (e.g. SearchAction) if you have search. Add **BreadcrumbList** on tool/guide pages from breadcrumb trail.
7. **Title optimizer:** Use `buildOptimizedTitle()` in all tool and exam pages; ensure title length ≤ 60–65 chars and primary keyword front-loaded.
8. **Thin tool pages:** Add 1–2 H2 sections (e.g. “How to use”, “Supported formats”) and 1–2 FAQs on the lightest tool pages (e.g. jpg-to-pdf, image-to-pdf).
9. **Tools registry:** Create `toolsRegistry.ts` (slug, title, description, keywords, component, category). Generate sitemap and `allTools` from it; keep pages for now but reduce drift.

### Long-term (3–6 months)

10. **Dynamic tool route:** Move to `app/tools/[slug]/page.tsx` with `generateStaticParams` from registry; one component per tool, metadata from registry. New tool = registry + component only.
11. **HowTo schema:** Add HowTo JSON-LD on 3–5 key tools (e.g. resize to 100KB, JPG to PDF) with steps and tools.
12. **Programmatic SEO:** Design data model for “exam photo requirements” and “X to Y converter” pages; add template page(s) and generate static params or ISR for 50–100+ pages.
13. **Conversion:** In-tool “Upgrade to Pro” CTA (e.g. after tool run or in LimitReachedModal); soft banner after N uses; pricing page FAQ.
14. **Performance:** Run bundle analyzer; lazy-load all tool components via dynamic import; add `og-default.png` and verify Core Web Vitals on key URLs.

---

**End of audit.**
