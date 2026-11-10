# Roadmap

Ground rules: no change to existing text or to the deity image itself — only
structure, styling, delivery and additive features.

## Increments

1. **Astro migration + cleanup + layout** — done
   - Astro 7 + Tailwind 4, CSS inlined (no render-blocking stylesheets)
   - `lang="te"`, semantic landmarks/headings, iframe title, obsolete meta removed
   - Responsive layout; image shown uncropped; history reflowed into paragraphs
     (word-for-word identical)
   - GitHub Actions now builds the site; `dist/` is no longer committed
2. **Images** — done
   - Same image re-encoded at 400–1024w (6 sizes) in AVIF (q50), WebP (q72), JPEG (q72);
     phones now download ~30–87 KB (1x–2x) / ~121 KB (3x) instead of 276 KB
   - Image shown uncropped; `og:image` (800px JPEG, under WhatsApp's ~300 KB limit)
   - Favicon + apple-touch-icon cropped from Swami's face (`npm run icons`)
   - Source of truth is `src/assets/swami.jpg`; unused `public/swami.{jpg,webp}` removed
3. **Additions** — tap-to-call phone numbers, "Directions" button, sticky mobile
   action bar, tap-to-load map, "open now" badge, Schema.org `HinduTemple` JSON-LD
4. **More information** — nothing for now (see Next steps)
5. **Font** — decided against a web font
   - Tried self-hosted Noto Sans Telugu (~95 KB); reverted. Android already ships it,
     and iOS (Kohinoor Telugu) / Windows (Nirmala UI) system fonts read well, so the
     bytes only bought cross-device sameness. System stack in `global.css` stays.
6. **Lighthouse** — done (local production build, clean headless Chrome, v13.6.0)
   - Mobile: 100 / 100 / 100 / 100 (was 91 / 90 / 96 / 100). LCP 1.2 s (was 3.3 s), CLS 0,
     TBT 0 ms, total transfer 87 KiB
   - Desktop: 100 / 100 / 100 / 100, total transfer 60 KiB
   - Added 480/560/680w image candidates so emulated phones get an exact-fit file
   - Re-check against the live site after deploy (GitHub Pages adds gzip; 10-min cache TTL
     can't be changed without a CDN in front)

## Next steps (to think about)

- **Telugu calendar (పంచాంగం)**: show today's tithi, nakshatram, rahukalam and
  daily muhurtham for the temple's location.
  - Open questions: compute client-side (an astronomy library and
    Mudinepalli's coordinates) or fetch at build time with a scheduled daily
    rebuild; which panchangam tradition and terminology to follow.
- **Upcoming festival days for Sri Subrahmanyeswara Swamy (Murugan)**, e.g. Subrahmanya
  Shashti, Skanda Shashti, Naga Panchami, Naga Chaturthi, Thaipusam, monthly
  Shashti / Krittika days.
  - Open questions: whether the temple publishes its own utsavam dates; a
    maintained data file (e.g. `src/data/festivals.json`) vs. computed dates.
- **Analytics — fix or replace with something minimal and privacy-focused.**
  STRICTLY no bloated analytics (no Google Analytics, no tag managers, no cookies,
  no consent banner needed).
  - Today: GoatCounter `count.js` plus a separate XHR in
    `public/js/display-visitors-count.js` for the visitor count. Ad blockers
    block `gc.zgo.at`, which is why Lighthouse logged console errors, and the
    count call is a second request.
  - Options: keep GoatCounter but self-host `count.js` (about 3 KB) and use its
    `visit_count()` helper or one fetch for the counter; or a no-JS pixel; or
    drop the public counter entirely. Decide whether the visible visitor count
    is worth keeping.
