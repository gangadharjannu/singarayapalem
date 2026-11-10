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
2. **Images** — responsive, re-encoded sizes (AVIF/WebP) for mobile; `og:image`; favicon
3. **Additions** — tap-to-call phone numbers, "Directions" button, sticky mobile
   action bar, tap-to-load map, "open now" badge, Schema.org `HinduTemple` JSON-LD
4. **More information** — nothing for now (see Next steps)
5. **Font** — self-hosted, subset Telugu web font
6. **Lighthouse** — re-run in a clean (extension-free) profile and fix findings

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
