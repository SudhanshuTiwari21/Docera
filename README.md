# Dockera

Production-ready Next.js 14 project for document and image tools (resize image for govt forms, compress PDF online India, passport photo size tool).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint**

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run ESLint

## SEO

- Metadata API with default title, description, keywords
- OpenGraph and Twitter card metadata
- Canonical URLs via `lib/seo.ts`
- Robots meta and `public/robots.txt`
- `app/sitemap.ts` for dynamic sitemap
- Semantic HTML and H1/H2 hierarchy on homepage

## Environment

Set `NEXT_PUBLIC_SITE_URL` for production to exactly `https://www.dockera.in` (www, no trailing slash) so canonical URLs and sitemap use the correct domain. The apex domain 301s to www, so using the apex here makes Google see sitemap URLs that redirect and canonicals that point back at the redirecting host.

## Folder structure

```
app/
  layout.tsx, page.tsx, globals.css
  tools/
    image-resizer/
    pdf-compressor/
    passport-photo/
    signature-extractor/
  privacy/, terms/
  sitemap.ts
components/
lib/
  seo.ts
public/
  robots.txt, manifest.json
```
