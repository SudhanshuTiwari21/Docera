# Dockera SEO Strategy: Keyword Reinforcement

Use this doc with Google Search Console data to turn rankings and impressions into a structured optimization workflow.

---

## 1. Using Google Search Console

1. **Add and verify the property**  
   Go to [Search Console](https://search.google.com/search-console). Add property for your live domain (e.g. `https://docera.com`). Verify via DNS (recommended) or HTML file.

2. **Wait for data**  
   After verification, allow 2–4 weeks for meaningful impression/click/position data.

3. **Main reports to use**
   - **Performance** → See total and per-query clicks, impressions, CTR, average position.
   - **Pages** → See which URLs get traffic; click a URL to see queries that led to it.
   - **Queries** (or “Search results” by query) → See which search terms drive impressions and clicks.

4. **Use filters**
   - Filter by **country** (e.g. India) if most users are regional.
   - Use **date range** (e.g. last 3 months) for stable trends.
   - Export to CSV for sorting and tracking in a sheet.

---

## 2. Finding Pages Ranking Position 6–20

Pages in positions **6–20** are close to page 1 and often need small improvements to move up.

**Steps:**

1. In **Performance**, open the **Pages** tab (or view by URL).
2. Click **Average position** to sort by position.
3. Filter or scan for pages whose **average position** is between **6** and **20** (or use the position filter if available).
4. Alternatively, in **Queries**:
   - Sort by **Impressions** (descending).
   - Note queries with **position 6–20**; then in **Pages** find which URL ranks for that query.

**Why 6–20:** These pages already get impressions and are one push away from page 1. Focus here before deep fixes on position 30+.

---

## 3. Finding Queries with High Impressions, Low CTR

These are queries where you show up often but get few clicks. Often a **title** or **snippet** issue.

**Steps:**

1. In **Performance** → **Queries**, add columns: **Impressions**, **Clicks**, **CTR**, **Position**.
2. Sort by **Impressions** (descending).
3. Look for rows where:
   - **Impressions** are high (e.g. top 20–50 queries), and  
   - **CTR** is clearly below average (e.g. &lt; 2% when position is 5–15).
4. Optional: in a sheet, compute **expected CTR** by position (e.g. from industry benchmarks) and flag queries where actual CTR is below expected.

**Use this list to:**  
- Improve meta titles with `buildOptimizedTitle()` (see codebase).  
- Add a direct answer in the first paragraph or an H2 that matches the query.

---

## 4. Checklist for Improving a Page

Use this for any page you’re optimizing (especially position 6–20 or high-impression, low-CTR).

- [ ] **Add missing keyword naturally in H2 or paragraph**  
  If the target query doesn’t appear in any H2 or first 1–2 paragraphs, add it once in a natural way. Prefer H2 or opening paragraph.

- [ ] **Add internal link from another cluster page**  
  Link from one relevant tool/guide (e.g. another resize page or guide) using keyword-rich anchor text from `lib/internalLinks.ts`. One solid link per page is enough.

- [ ] **Expand FAQ section**  
  Add 1–2 questions that match real queries from GSC (exact or close). Keep answers short (2–4 sentences). Update FAQ JSON-LD if you have it.

- [ ] **Improve meta title**  
  Use `buildOptimizedTitle()` in `lib/titleOptimizer.ts` with the right `intent` (e.g. `govt`, `exam`, `general`) so the title is under ~60–65 chars and includes the target query or intent.

- [ ] **Add 1 contextual paragraph answering the query directly**  
  Near the top (after intro or in a clear H2), add a short paragraph that directly answers the main search intent. No fluff; one clear answer.

---

## 5. Page Optimization Template (Checklist)

Copy this block per page and update as you work.

```markdown
## Page: [URL or slug, e.g. /tools/resize-image-to-50kb]
- **Current position (avg):** 
- **Impressions (period):** 
- **Target query:** 
- **Action taken:** 
  - [ ] Keyword in H2/paragraph
  - [ ] Internal link added from cluster
  - [ ] FAQ expanded
  - [ ] Meta title improved (titleOptimizer)
  - [ ] Contextual answer paragraph added
- **Date updated:** 
```

Keep a running list (e.g. in this file or a spreadsheet) so you can re-check positions and CTR after 2–4 weeks.

---

## 6. Guidelines (Avoid Over-Optimization)

- **Do not stuff keywords**  
  Use the target query (or close variants) once or twice in a natural place (e.g. one H2, one paragraph). More than that rarely helps and can hurt.

- **Keep readability high**  
  Write for a human. Short sentences, clear structure (H2/H3), and one main idea per paragraph. If a sentence sounds odd for the sake of a keyword, rephrase.

- **Avoid over-optimization**  
  One round of the checklist per page is usually enough. Re-check GSC in 2–4 weeks before doing another big change on the same page. Prefer many small improvements across pages over heavy edits on a few.

---

## Quick Reference

| Goal | Where in GSC | What to do |
|------|----------------|------------|
| Pages to prioritize | Performance → Pages, sort by position | Focus on position 6–20 |
| Queries to fix CTR | Performance → Queries, sort by impressions | Flag high impressions + low CTR |
| Which URL to edit | Performance → click a query or URL | See “Pages” and “Queries” for that URL |
| After editing | Same reports, 2–4 weeks later | Compare position and CTR before/after |

Use this together with Dockera’s internal linking (`lib/internalLinks.ts`) and title helper (`lib/titleOptimizer.ts`) for a consistent, data-driven workflow.
