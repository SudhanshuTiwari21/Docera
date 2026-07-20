# Dockera — Technical + Content SEO Audit

**Date:** 2026-07-20 · **Property:** `sc-domain:dockera.in` · **Auditor:** senior technical/content SEO review
**Method:** live crawl of all 50 sitemap URLs (status, canonical, title/desc length, H1 count, visible word count, JSON-LD types) + source review of this repo.

## Evidence & limitations (read first)

Everything in Sections 1–5, 7–9 and 13 is derived from **live HTTP responses and repo code**, captured 2026-07-20. Raw crawl is reproducible via the commands in Appendix A.

What I could **not** measure, and therefore do not assert:

- **Keyword volume / difficulty.** No Ahrefs/Semrush/GKP access. Section 6 gives clusters, intent and priority *reasoning* — the Priority column is my judgment, not a measured KD. Validate with a real tool before committing content budget.
- **Competitor rankings.** Section 11 compares *observable page attributes* (I fetched competitor pages), not their traffic or positions.
- **Core Web Vitals field data.** No CrUX/Lighthouse run. Section 4.2 flags *architectural* risk from code, not measured LCP/INP. Run PageSpeed Insights before acting on it.

Where I say "confirmed", I have a response body or a code line. Where I say "likely", I am inferring.

---

## 1. Executive Summary

Dockera has **better SEO fundamentals than its indexing suggests**. The content is genuinely there: exam landings run 600–1,400 visible words, server-rendered, with FAQPage schema and a real internal-link system (`lib/internalLinks.ts`). This is not a thin-content site being correctly ignored by Google. It is a **well-built site with a broken indexation layer**.

Six indexed pages out of fifty is an *indexation* failure, not a *quality* failure. Four distinct, confirmed defects explain nearly all of it:

1. **Host mismatch** — sitemap, canonicals, robots all emit apex `https://dockera.in`, which 307s to `www`. Google discovers a URL, follows a redirect, then reads a canonical pointing back at the redirecting host. This maps directly to GSC's *Redirect error (4)* and *Page with redirect (1)*. **Fixed in the working tree; not yet deployed.**
2. **`/login` and `/signup` canonicalize to the homepage** — confirmed live. Both are `"use client"` with no `metadata` export, so they inherit the root layout's canonical (`/`). This is *exactly* GSC's **Alternative page with proper canonical (2)** — count and cause match precisely.
3. **`/chat` renders 54 visible words and zero `<h1>`** — the entire server-rendered body is navigation chrome. Your priority growth bet is, to a crawler, an empty page carrying JSON-LD that describes content no user can see.
4. **`og-default.png` returns 404 sitewide** — every OG and Twitter card image is broken.

The upside: fixes 1, 2 and 4 are small, mechanical, and unblock ~44 already-good pages. The exam-landing corpus is the real asset and it is one deploy away from being crawlable. **Fix indexation first; do not write new content until indexed count moves.**

The strategic risk is `/chat`. It is the highest-value keyword territory ("chat with PDF") and currently the weakest page on the site.

---

## 2. Site Inventory

51 `page.tsx` routes; 50 in sitemap (`/pricing/checkout` correctly excluded). All 50 returned **200**. Canonicals below are **as live today** (all apex — the pending fix changes every one to `www`).

**Legend:** ✅ healthy · ⚠️ needs work · 🔴 broken

### A. Homepage
| URL | Words | H1 | Schema | Status |
|---|---|---|---|---|
| `/` | 658 | 1 | FAQPage | ⚠️ links to only 2 of 18 exam pages |

### B. Tool hubs
| URL | Words | H1 | Schema | Status |
|---|---|---|---|---|
| `/tools` | 467 | 1 | **none** | ⚠️ no ItemList/Breadcrumb |
| `/tools/image-tools` | — | 1 | **none** | ⚠️ |
| `/tools/pdf-tools` | — | 1 | **none** | ⚠️ |

### C. Individual tools (16)
| URL | Words | H1 | Schema | Status |
|---|---|---|---|---|
| `/tools/image-resizer` | 1281 | 1 | FAQPage | ✅ strongest tool page |
| `/tools/resize-image-to-100kb` | — | 1 | FAQPage + **HowTo** | ✅ only HowTo on site |
| `/tools/resize-image-to-50kb` | — | 1 | FAQPage | ⚠️ no HowTo |
| `/tools/resize-image-to-20kb` | 602 | 1 | FAQPage | ⚠️ no HowTo |
| `/tools/pdf-compressor` | 525 | 1 | FAQPage | ⚠️ |
| `/tools/passport-photo` | 531 | 1 | FAQPage | ⚠️ desc only 119 chars |
| `/tools/signature-extractor` | 453 | 1 | FAQPage | ⚠️ thinnest tool page |
| `/tools/crop-image` | — | 1 | FAQPage | 🔴 desc **93 chars** |
| `/tools/convert-to-png` | — | 1 | FAQPage | ⚠️ desc 105 |
| `/tools/pdf-to-jpg` | — | 1 | FAQPage | ⚠️ desc 105 |
| `/tools/split-pdf`, `/merge-pdf`, `/jpg-to-pdf`, `/image-to-pdf`, `/convert-from-jpg`, `/compress-image` | — | 1 | FAQPage | ⚠️ desc 110–170 |

### D. Exam/form landings (18) — the core asset
| URL | Words | Schema | Status |
|---|---|---|---|
| `/resize-image-for-ssc-form` | **1360** | FAQPage | ✅ best page on site |
| `/ssc-cgl-photo-signature-size` | 1069 | FAQPage | ✅ |
| `/railway-photo-size-limit` | 879 | FAQPage | ⚠️ title only 40 chars |
| `/upsc-cse-photo-signature-guidelines` | 852 | FAQPage | ✅ |
| `/rrb-je-photo-signature-requirements` | 717 | FAQPage | ✅ |
| `/mppsc-photo-signature-size` | 619 | FAQPage | ⚠️ |
| `/resize-image-for-upsc-form` | — | FAQPage | ✅ |
| 11 others (SSC CHSL/MTS, RRB Group D/ALP, IBPS PO, SBI Clerk, UPPSC, Bihar Police, Bihar PSC, Rajasthan Police, `/compress-pdf-for-govt-form`, `/fix-government-form-photo-upload-error`) | — | FAQPage | ⚠️ **16 of 18 orphaned from homepage** |

### E. Guides + blog
| URL | Words | Schema | Status |
|---|---|---|---|
| `/guides/how-to-resize-image-for-government-forms` | 1138 | Article + FAQPage + Org | ✅ best-structured page |
| `/blog/introducing-docchat-ai-pdf-qa` | 451 | Article + Org | ⚠️ thin for a flagship post |
| `/guides` | 281 | **none** | ⚠️ |
| `/guides/exam-photo-requirements` | — | **none** | ⚠️ Article missing |
| `/blog` | 144 | **none** | 🔴 title **17 chars** |

### F. DocChat
| URL | Words | H1 | Schema | Status |
|---|---|---|---|---|
| `/chat` | **54** | **0** | WebApplication, FAQPage, Offer, Org | 🔴 **app shell — see §3.3** |

### G. Pricing / auth / legal
| URL | Words | Canonical | Status |
|---|---|---|---|
| `/pricing` | 175 | self | 🔴 title 20 chars, no Product/Offer schema, thin |
| `/login` | — | **`/` (homepage)** | 🔴 wrong canonical |
| `/signup` | — | **`/` (homepage)** | 🔴 wrong canonical |
| `/privacy`, `/terms` | ~60 | self | ✅ fine |

### Host consistency (live, pre-deploy)
| Surface | Emits | Correct? |
|---|---|---|
| `sitemap.xml` (50 locs) | `https://dockera.in/...` | 🔴 |
| `robots.txt` Sitemap: | `https://dockera.in/sitemap.xml` | 🔴 |
| All canonicals | `https://dockera.in/...` | 🔴 |
| All `og:url` | apex | 🔴 |
| Apex → www | **307** (temporary) | ⚠️ prefer 308 |

No trailing-slash or http/https inconsistency found. Redirect is a single hop, no chains or loops. ✅

---

## 3. Critical Issues (P0) — fix this week

### 3.1 Host mismatch — *fixed in working tree, needs deploy*
**Evidence:** live sitemap/robots/canonicals all apex; `curl -sI https://dockera.in/tools/image-resizer` → `307 → https://www.dockera.in/...`
**Root cause:** `NEXT_PUBLIC_SITE_URL` was **absent from `.env.example`** and almost certainly never set in Vercel, so seven modules fell through to a `"https://dockera.in"` default.
**Maps to GSC:** Redirect error (4), Page with redirect (1).
**Status:** code fixed; **set `NEXT_PUBLIC_SITE_URL=https://www.dockera.in` in Vercel Production and deploy.**

### 3.2 `/login` + `/signup` canonicalize to homepage 🔴
**Evidence:** live `rel="canonical" href="https://dockera.in"` on both. Neither `app/login/page.tsx` nor `app/signup/page.tsx` exports `metadata`; both are `"use client"`, so they inherit the root layout canonical.
**Maps to GSC:** **Alternative page with proper canonical (2)** — exact count match.
**Fix:** add `noindex` + self-canonical to both. Removing them from the sitemap (already done) is *not* sufficient — Google reaches them via homepage nav links.

```ts
// app/login/page.tsx — client component: put metadata in a sibling layout.tsx,
// or convert the page to a server wrapper around the existing client form.
export const metadata: Metadata = {
  ...getDefaultMetadata({ title: "Log in | Dockera", path: "/login", noIndex: true }),
};
```
`lib/seo.ts` already supports `noIndex` — wire it up.

### 3.3 `/chat` is an empty app shell 🔴 — highest strategic cost
**Evidence:** 54 visible words, **zero `<h1>`**. Full rendered body text is: nav links, "Pricing / Login / Sign up", nothing else. `app/chat/page.tsx` renders only `<ChatClient />`.
**Two compounding problems:**
- **Thin content / soft-404 risk** on your most valuable keyword target.
- **Rich-result policy violation.** `DocChatStructuredData.tsx` ships `FAQPage` with Q&A pairs that **do not appear in the visible page**. Google requires structured data to reflect visible content; FAQ markup on invisible content risks a manual action. This is the one schema issue that can actively *hurt* you.

**Fix:** server-render a real marketing section above/around `ChatClient` — `<h1>Chat with PDF & Word documents free</h1>`, value props, use-cases (UPSC notes, SSC syllabus, resumes, circulars), and the **visible** FAQ that matches the schema. The interactive chat stays client-side below it. See §5.5.

### 3.4 `og-default.png` 404s sitewide 🔴
**Evidence:** `curl -o /dev/null -w "%{http_code}" https://www.dockera.in/og-default.png` → **404**. `lib/seo.ts:image` defaults to it; `public/` contains only `Logo-dark.png` / `Logo-light.png`.
**Impact:** every social/WhatsApp share of every page renders imageless. WhatsApp/Telegram sharing is a primary channel for this audience — this is a real distribution loss, not cosmetic.
**Fix:** add a 1200×630 `public/og-default.png`. Cheap, high leverage.

### 3.5 No `BreadcrumbList`, no `WebSite` + `SearchAction`
**Evidence:** `grep -rn "BreadcrumbList\|SearchAction\|\"WebSite\"" app components lib` → **zero hits**.
**Impact:** forfeits breadcrumb SERP display on ~40 eligible pages and sitelinks-searchbox eligibility.

### 3.6 16 of 18 exam landings orphaned from homepage
**Evidence:** homepage links only `/resize-image-for-ssc-form` and `/resize-image-for-upsc-form`. All 16 others are ≥2 clicks deep, reachable only through `RelatedToolsLinks`.
**Impact:** on a low-authority domain, crawl depth directly suppresses discovery — a likely contributor to "Discovered – currently not indexed".

---

## 4. Technical SEO Scorecard

| Area | Score | Evidence |
|---|---|---|
| **Crawlability & indexation** | **25/100** | Host mismatch across all surfaces; 2 pages canonical→homepage; 6/50 indexed. Sitemap structure itself is clean. |
| **Canonicalization** | **30/100** | Self-referencing and consistent in *pattern* — but on the wrong host, plus 2 outright wrong. Centralized in `lib/seo.ts`, so the fix is one-line. |
| **Rendering / CWV readiness** | **75/100** | Strong: only `/login`, `/signup`, `/pricing/checkout` are `"use client"`. All tools and exam pages are server-rendered — H1, copy and FAQs are in raw HTML. `next.config.js` sets AVIF/WebP and sane `deviceSizes`. Not field-measured. `/chat` is the exception. |
| **URL architecture** | **80/100** | Clean, readable, keyword-appropriate without stuffing. `/tools/*` vs root exam landings is a defensible split. Minor cannibalization (§7). |
| **Metadata system** | **65/100** | `lib/seo.ts` is well-designed with `noIndex` support. Titles unique. But descriptions run short — `/tools/crop-image` **93 chars**, 9 tools under 120; `/blog` title 17 chars, `/pricing` 20. |
| **Structured data** | **45/100** | Good FAQPage coverage on ~40 pages, one HowTo, Article on guides. But: no Breadcrumb/WebSite/Product, hubs bare, and the `/chat` visible-content mismatch is a live policy risk. |
| **Internal linking** | **55/100** | `lib/internalLinks.ts` is a genuine asset with keyword-rich anchors. Undermined by homepage orphaning 16 exam pages. |
| **India/locale** | **70/100** | `locale: en_IN` set, topical focus is sharp and authentically Indian. No Hindi coverage (see §10 — I recommend *deferring*). |
| **Trust / E-E-A-T** | **50/100** | Privacy + Terms present, contact email visible. Missing: About page, named authorship, "verified on DATE" stamps, citations to official notifications — all of which matter for exam-spec claims. |

**Overall: 55/100** — held down almost entirely by indexation. Post-fix, this site is structurally a 75+.

---

## 5. Page-Type Playbooks

### 5.1 Homepage
Keep the 658 words and FAQPage. Add an **"Exam-wise photo & signature requirements"** section linking all 18 exam landings with descriptive anchors (fixes §3.6). Add `WebSite` + `SearchAction` and `Organization`. Give DocChat real above-the-fold presence — it is currently one nav link.

### 5.2 Tool pages
Already good — server-rendered, FAQ schema, 450–1,280 words. Three upgrades:
1. **Add `HowTo` schema to every tool page.** Only `/tools/resize-image-to-100kb` has it; it is the template — replicate.
2. **Add `SoftwareApplication`** with `applicationCategory: "UtilitiesApplication"` and `offers` (free tier).
3. **Rewrite 9 short meta descriptions to 140–160 chars**, starting with `/tools/crop-image` (93).
Lift `/tools/signature-extractor` (453 words) toward 800 with a proper "signature rejected" troubleshooting section.

### 5.3 Exam landings — your moat
600–1,400 words, server-rendered, FAQ schema. To avoid template-sameness risk, each page needs **genuinely page-specific** substance:
- A **spec table** with that exam's actual numbers (photo KB min/max, dimensions px, signature KB, format, background).
- A **citation link to the official notification PDF** + **"Last verified: DATE"**.
- **Exam-specific rejection reasons**, not generic copy.
- A **direct deep link into the pre-configured tool** for that exam's spec (`lib/examPresets.ts` already exists — exploit it).
This is what separates a legitimate programmatic landing from a doorway page. See §14.

### 5.4 Guides & blog
Add `Article` + `BreadcrumbList` to `/guides/exam-photo-requirements` and `/guides` (both bare). Fix `/blog` title (17 chars). `/guides/how-to-resize-image-for-government-forms` (1,138 words, Article + FAQ + Org) is your best-structured page — use it as the template.

### 5.5 DocChat `/chat` — rebuild
Server-render, above the client chat widget:
- `<h1>Chat with PDF & Word Documents — Free AI</h1>`
- 400–700 words: how it works, supported formats, privacy, free-vs-Pro limits
- **Use-case blocks**: UPSC/SSC notes Q&A, syllabus, resume review, govt circulars
- **The visible FAQ matching the existing JSON-LD** (mandatory — closes §3.3)
- Keep `WebApplication` + `Offer`; they become legitimate once content is visible.

### 5.6 Pricing
175 words is too thin to rank for "Dockera pricing" or convert well. Add `Product`/`Offer` schema with real INR amounts, a free-vs-Pro comparison table, FAQ (refunds, cancellation, Razorpay), and trust signals. **Do not** invent prices in schema — pull from the same source as the UI.

---

## 6. Keyword Cluster Roadmap

> **Priority = my judgment** from intent, commercial value and current asset strength. **No measured volume/KD.** Validate before budgeting.

### Cluster 1 — Image resize for govt forms *(strongest position)*
| Intent | Target URL | Action | Priority |
|---|---|---|---|
| resize image to 20/50/100 KB | `/tools/resize-image-to-{20,50,100}kb` | Add HowTo to 20kb & 50kb | **P0** |
| resize image for govt form | `/guides/how-to-resize-image-for-government-forms` | Already strong | P2 |
| image resizer online free | `/tools/image-resizer` | Best page — defend | P1 |
| resize to 10KB / 200KB / 300KB | **new pages** | Gap — mirror existing template | P1 |

### Cluster 2 — Exam photo & signature specs *(highest-conviction moat)*
| Intent | Target URL | Action | Priority |
|---|---|---|---|
| {exam} photo signature size | 18 existing landings | De-orphan + spec tables + verified dates | **P0** |
| SSC CGL photo size 2026 | `/ssc-cgl-photo-signature-size` | Add year-freshness | P1 |
| Missing: CTET, NEET, JEE, RRB NTPC, state PSCs (MH/TN/WB/KA), Delhi/UP Police | **new pages** | Expand only *after* current 18 index | P2 |

### Cluster 3 — PDF tools *(most competitive — iLovePDF/Smallpdf)*
| Intent | Target URL | Action | Priority |
|---|---|---|---|
| compress pdf online | `/tools/pdf-compressor` | Don't fight head-on | P2 |
| compress pdf **for govt form / to 500KB** | `/compress-pdf-for-govt-form` | **Win the India-qualified long tail** | **P1** |
| merge/split pdf | existing | Maintain | P3 |

**Strategic call:** you will not outrank iLovePDF for "compress pdf". You *can* own "compress pdf for SSC application" — that's where your topical authority compounds.

### Cluster 4 — Passport photo & signature
`/tools/passport-photo` (531w) and `/tools/signature-extractor` (453w) are both under-built for their commercial value. Expand both to 800+; add "passport photo size India 2026" and per-exam signature specs.

### Cluster 5 — DocChat *(highest ceiling, weakest asset)*
| Intent | Target URL | Action | Priority |
|---|---|---|---|
| chat with PDF / AI PDF chat | `/chat` | **Rebuild first (§5.5)** | **P0** |
| chat with PDF free no login | `/chat` | Emphasize free tier | P1 |
| ChatPDF alternative / vs Humata | **new comparison pages** | Only after `/chat` is real | P2 |
| UPSC/SSC notes AI, syllabus Q&A | **new landings** | Your unique angle vs global rivals | P1 |

### Cluster 6 — Brand & category
"Dockera" + "document tools India". Needs `Organization` + `WebSite` schema and an **About page** (§3.5, §12).

---

## 7. Cannibalization Map

**Genuine overlap — monitor, don't merge yet:**
- `/tools/image-resizer` (1281w) vs `/tools/resize-image-to-{20,50,100}kb` — parent/child. Defensible *if* the KB pages stay narrowly focused on their target and link up to the parent. Watch GSC for the same query alternating URLs.
- `/resize-image-for-ssc-form` (1360w) vs `/ssc-cgl-photo-signature-size` (1069w) vs `/ssc-chsl-image-requirements` vs `/ssc-mts-...` — **four SSC pages.** Highest risk on the site. Differentiate hard: the first should be *task/tool*-led ("resize for SSC"), the others *spec*-led per exam. If GSC shows them trading positions for one query, consolidate the weakest into the strongest with a 301.
- `/resize-image-for-upsc-form` vs `/upsc-cse-photo-signature-guidelines` — same pattern, same rule.
- `/tools/jpg-to-pdf` vs `/tools/image-to-pdf` — near-duplicate intent. **Most likely genuine merge candidate.** Consider 301'ing `image-to-pdf` → `jpg-to-pdf` (or vice versa) if both stay unindexed.

**Rule:** do not consolidate anything until indexation is fixed. You cannot diagnose cannibalization when only 6 pages are indexed.

---

## 8. Schema Implementation Spec

| Template | Has | Add |
|---|---|---|
| Root layout | — | `Organization`, `WebSite` + `SearchAction` (once, sitewide) |
| Homepage | FAQPage | `BreadcrumbList` |
| Tool hubs | **none** | `BreadcrumbList`, `ItemList` |
| Tool pages | FAQPage | `SoftwareApplication`, `HowTo`, `BreadcrumbList` |
| Exam landings | FAQPage | `BreadcrumbList`, `Article` (`dateModified`) |
| Guides/blog | Article (partial) | `BreadcrumbList`; `Article` on the 2 bare pages |
| `/chat` | WebApp, FAQ, Offer | **Make FAQ visible** (§3.3) |
| `/pricing` | **none** | `Product` + `Offer` (real INR) |

Sketches:

```jsonc
// Root layout — sitewide
{ "@context":"https://schema.org","@type":"WebSite",
  "url":"https://www.dockera.in","name":"Dockera",
  "potentialAction":{"@type":"SearchAction",
    "target":"https://www.dockera.in/tools?q={search_term_string}",
    "query-input":"required name=search_term_string"} }
```
```jsonc
// Tool page
{ "@context":"https://schema.org","@type":"SoftwareApplication",
  "name":"Image Resizer","applicationCategory":"UtilitiesApplication",
  "operatingSystem":"Web","url":"https://www.dockera.in/tools/image-resizer",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"INR"} }
```
```jsonc
// Exam landing
{ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Home","item":"https://www.dockera.in"},
  {"@type":"ListItem","position":2,"name":"Exam Photo Requirements","item":"https://www.dockera.in/guides/exam-photo-requirements"},
  {"@type":"ListItem","position":3,"name":"SSC CGL Photo & Signature Size"}]}
```

**Never** add `AggregateRating`/`Review` without real user reviews — fabricated ratings are a manual-action trigger.

---

## 9. Internal Linking Blueprint

Current: homepage → tools (good), homepage → 2 of 18 exam pages (bad). `lib/internalLinks.ts` has all 18 in `examPhotoGuidesLinks` with strong anchors — **it is simply not rendered on the homepage.**

Target graph:
```
Homepage ──► Tool hubs ──► 16 tool pages
    │                          │
    ├──► Exam index (all 18) ──┤ (spec → deep-link into preset tool)
    │            ▲             │
    ├──► Guides ─┘             │
    └──► /chat ◄───────────────┘ (every tool + exam page links to DocChat)
```
Actions:
1. Render `examPhotoGuidesLinks` on the homepage — **one component, fixes the orphaning.**
2. Promote `/guides/exam-photo-requirements` into a true exam hub linking all 18.
3. Each exam page → deep-link into its `examPresets.ts` tool config.
4. Add a DocChat CTA to tool/exam pages — `/chat` currently has almost no internal equity.
5. Add breadcrumb UI (pairs with `BreadcrumbList`).

---

## 10. 30 / 60 / 90 Day Plan

**Days 1–30 — Indexation repair (ship nothing else)**
- Deploy www fix; set `NEXT_PUBLIC_SITE_URL` in Vercel
- `noindex` + self-canonical on `/login`, `/signup`
- Add `og-default.png`
- Rebuild `/chat` with server-rendered content + visible FAQ
- Homepage → all 18 exam links
- `Organization` + `WebSite` schema; `BreadcrumbList` sitewide
- Resubmit sitemap; Validate Fix on Redirect error; URL-inspect top 10
- **Exit gate: indexed ≥ 35/48.** Do not start content until met.

**Days 31–60 — On-page depth**
- Rewrite 9 thin meta descriptions; fix `/blog` + `/pricing` titles
- `HowTo` + `SoftwareApplication` on all tool pages
- Spec tables + official-notification citations + "verified on" dates across 18 exam pages
- Expand `/pricing` (+ `Product`/`Offer`), `/signature-extractor`, `/passport-photo`
- About page + authorship (E-E-A-T)

**Days 61–90 — Growth**
- 6–8 new exam landings (CTET, NEET, JEE, RRB NTPC, state PSCs) *only if* the 18 are indexing
- New KB targets (10/200/300 KB)
- DocChat use-case landings + comparison pages
- YouTube Shorts demos; community seeding (§ below)
- First cannibalization review using real GSC query data

**On Hindi (asked explicitly): defer past 90 days.** You do not yet have English indexation working. Adding `hi-IN` now multiplies your crawl surface while the core corpus is unindexed. Revisit once indexed count is stable and you have GSC evidence of Hindi/Hinglish queries. When you do: subfolder `/hi/` + `hreflang`, hand-translated — never machine-translated at scale.

**Community (condensed, since it's downstream of everything above):** Telegram is the right primary surface for this audience (exam groups already live there), plus Reddit r/SSC and r/UPSC for genuine help-first participation — answer form-rejection questions, link only when directly useful. YouTube Shorts ("SSC CGL photo to 20KB in 30 seconds") doubles as demo and backlink bait. A public "verified on DATE" changelog for exam-spec updates is both an E-E-A-T signal and a recurring reason for education portals to cite you. Weekly cadence: 2 Shorts, 5 genuine forum answers, 1 spec-update post. **Do not** mass-drop links — this audience's subreddits ban it fast and it is exactly the "Do NOT" in §14.

---

## 11. Competitive Gap Matrix

Observable attributes only — not traffic or rankings.

| | Dockera | iLovePDF / Smallpdf | ChatPDF / Humata |
|---|---|---|---|
| Domain authority | Very low (new) | Very high | Medium-high |
| India exam specificity | **Strong — your moat** | None | None |
| Tool breadth | 16 | 25+ | N/A |
| Free tier, no login | Yes | Partial | Limited |
| Exam preset configs | **Yes (unique)** | No | No |
| Content depth/page | 450–1,400w | Thin, authority-carried | Medium |
| Indexation health | **6/50 🔴** | Full | Full |

**Where you win:** India-qualified long tail — "SSC CGL photo signature size", "resize image for UPSC form". Global tools have no incentive to build this; you already have 18 such pages. **Where you lose:** generic head terms. Don't contest them.

---

## 12. Weekly KPIs

1. **Indexed pages** (target 6 → 35+ in 30 days) — the only metric that matters this month
2. Redirect-error count → 0
3. Impressions/clicks by cluster (exam / tools / DocChat)
4. `/chat` impressions — currently near-zero, should move after §5.5
5. Top queries per cluster + position
6. Query-URL overlap (cannibalization watch, §7)
7. Tool-use → signup → Pro conversion by landing cluster
8. CWV from CrUX once traffic supports it

---

## 13. Code Change List

**Done (working tree, awaiting deploy):**
| File | Change |
|---|---|
| `.env.example` | Added `NEXT_PUBLIC_SITE_URL=https://www.dockera.in` |
| `app/sitemap.ts` | www default; dropped `/login`, `/signup` (50→48) |
| `app/robots.ts`, `lib/seo.ts` | www default |
| `app/chat/DocChatStructuredData.tsx`, `components/blog/SeoArticleLayout.tsx` | www default |
| `lib/email.ts`, `app/api/auth/verify-email/route.ts` | www default |
| `public/robots.txt` | Deleted (conflicted with `app/robots.ts`) |
| `README.md` | Documented exact value |

**To do:**
| Priority | File | Change |
|---|---|---|
| **P0** | Vercel env | Set `NEXT_PUBLIC_SITE_URL=https://www.dockera.in` |
| **P0** | `app/login/`, `app/signup/` | `noIndex: true` + self-canonical via sibling `layout.tsx` |
| **P0** | `app/chat/page.tsx` | Server-render H1 + copy + **visible FAQ** |
| **P0** | `public/og-default.png` | Create 1200×630 |
| **P0** | `app/page.tsx` | Render `examPhotoGuidesLinks` (all 18) |
| P1 | `app/layout.tsx` | `Organization` + `WebSite`/`SearchAction` |
| P1 | new `components/seo/Breadcrumbs.tsx` | UI + `BreadcrumbList` |
| P1 | `app/tools/**/page.tsx` | `HowTo` + `SoftwareApplication`; fix 9 short descriptions |
| P1 | `app/pricing/page.tsx` | Expand content; `Product`/`Offer` |
| P2 | Vercel → Domains | Apex redirect 307 → 308 permanent |
| P2 | `app/guides/**` | Add `Article` to 2 bare pages |

---

## 14. Do NOT Do

- **Do not** add `FAQPage`/`HowTo` schema for content not visible on the page — this is *already happening on `/chat`* and is the single riskiest thing on the site.
- **Do not** add `AggregateRating`/`Review` without real reviews.
- **Do not** mass-generate exam pages from a template with only the exam name swapped — that is a doorway-page pattern. Each needs real specs, real citations, real rejection reasons.
- **Do not** keyword-stuff titles. Several exam titles are already at 70–73 chars; going further truncates in SERPs.
- **Do not** buy links from Indian "education portal" link farms.
- **Do not** machine-translate to Hindi at scale.
- **Do not** block `/login`/`/signup` in `robots.txt` instead of `noindex` — blocked pages can still be indexed without content, which is worse.
- **Do not** publish new content before indexed count moves. You will be adding pages to a site Google isn't crawling properly.

---

## Top 10 Actions — Next 14 Days

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | Set `NEXT_PUBLIC_SITE_URL` in Vercel + deploy www fix | 🔥🔥🔥 | XS |
| 2 | `noindex` + self-canonical on `/login`, `/signup` | 🔥🔥🔥 | XS |
| 3 | Verify sitemap/robots/canonicals emit www post-deploy | 🔥🔥🔥 | XS |
| 4 | Resubmit sitemap + Validate Fix on Redirect error | 🔥🔥🔥 | XS |
| 5 | Add `og-default.png` | 🔥🔥 | XS |
| 6 | Homepage → all 18 exam landings | 🔥🔥🔥 | S |
| 7 | Rebuild `/chat` with server-rendered content + visible FAQ | 🔥🔥🔥 | M |
| 8 | `Organization` + `WebSite`/`SearchAction` in root layout | 🔥🔥 | S |
| 9 | URL-inspect + request indexing on top 10 pages | 🔥🔥 | S |
| 10 | Fix 9 short meta descriptions + `/blog`, `/pricing` titles | 🔥 | S |

Items 1–5 are roughly a half-day combined and unblock ~44 pages. Do them before anything in Section 6.

---

## Appendix A — Reproduce the crawl

```bash
# Every sitemap URL: status, canonical, title/desc length, H1 count, schema types
curl -s https://www.dockera.in/sitemap.xml | grep -o '<loc>[^<]*</loc>' \
  | sed 's|<loc>||g; s|</loc>||g' | sed 's|https://dockera.in|https://www.dockera.in|' \
  | while read u; do
      b=$(curl -s -L "$u")
      echo "$u | $(echo "$b" | grep -o 'rel="canonical" href="[^"]*"' | head -1)"
    done

# Visible word count (strips script/style — note: use perl, BSD sed greedily eats the DOM)
curl -s -L https://www.dockera.in/chat \
  | perl -0777 -pe 's/<script.*?<\/script>//gs; s/<style.*?<\/style>//gs; s/<[^>]+>/ /gs' \
  | tr -s ' \n' '  ' | wc -w      # → 54

curl -s -o /dev/null -w "%{http_code}\n" https://www.dockera.in/og-default.png   # → 404
curl -sI https://dockera.in/tools/image-resizer | grep -iE '^(HTTP|location)'    # → 307 → www
```
