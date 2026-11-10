# శ్రీ వల్లీదేవసేన సమేత శ్రీ సుబ్రహ్మణ్యేశ్వరస్వామి వారి దేవస్థానము

Website of the Sri Valli Devasena Sameta Sri Subrahmanyeswara Swamy Temple,
Singarayapalem (Mudinepalli mandal, Eluru district, Andhra Pradesh):
**https://www.singarayapalem.com**

A single, mobile-first Telugu page covering the temple's history (స్థలపురాణం), darshan
timings, how to reach the temple, and contact details. It also has tap-to-call and
directions buttons, an "open now" badge, and a map that loads on tap.

## Stack

- [Astro](https://astro.build) 7, static output, with CSS inlined into the page
- [Tailwind CSS](https://tailwindcss.com) 4 via `@tailwindcss/vite`
- Images are re-encoded at build time (AVIF / WebP / JPEG, several widths) with `astro:assets` + sharp
- System Telugu fonts (Noto Sans Telugu on Android, Kohinoor Telugu on Apple, Nirmala UI on Windows), so no web font is downloaded
- [GoatCounter](https://www.goatcounter.com) analytics: no cookies, no personal data, ~1 KB inline code with no third-party script
- Hosted on GitHub Pages, deployed by GitHub Actions

Lighthouse (production build, mobile and desktop): 100 in Performance, Accessibility,
Best Practices and SEO.

## Development

Requires Node.js ≥ 22.23.4 (CI uses Node 24).

```sh
npm ci            # install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run icons     # regenerate favicons from src/assets/swami.jpg
```

Page views are never counted from localhost, so local testing doesn't affect analytics.

## Project structure

```
src/
  pages/index.astro      the page: content, layout, small inline script
  layouts/Base.astro     <head>: meta, Open Graph, icons
  styles/global.css      Tailwind import, theme tokens (palette), base styles
  assets/swami.jpg       master deity image (responsive sizes are generated from it)
public/                  copied as-is: CNAME, robots.txt, sitemap.xml, icons
scripts/                 one-off scripts (favicon generation)
docs/research/           research notes (e.g. offline panchangam)
.github/workflows/       build + deploy to GitHub Pages
```

## Content guidelines

- **Don't change existing text or the deity image** when changing layout or styles. Re-encoding or resizing the image for delivery is fine.
- Keep it light: no tracking cookies, no heavy third-party scripts, no external APIs at runtime.
- Check mobile first (~360px wide) and keep Lighthouse at 100.

## Deployment

Every push to `main` runs `.github/workflows/static.yml`: `npm ci`, `npm run build`, and then
deploys `dist/` to GitHub Pages. In the repository, Settings → Pages → Source must be **GitHub Actions**.
The custom domain comes from `public/CNAME`.

## Roadmap

Planned and researched ideas are in [ROADMAP.md](ROADMAP.md): offline Telugu
panchangam and Murugan festival days (see [docs/research/panchangam.md](docs/research/panchangam.md)),
and long-lived caching.
