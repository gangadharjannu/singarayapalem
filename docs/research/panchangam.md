# Offline Telugu panchangam & Murugan festival days: research

Status: **researched, not planned for implementation yet** (Nov 2026).
Constraint from the owner: **no external API calls.**

## Verdict

Feasible fully offline. Every panchangam element is derived from Sun and Moon
positions, which can be computed locally. A throwaway probe
([`panchangam-probe.cjs`](./panchangam-probe.cjs)) using `astronomy-engine`
produced, for the temple's coordinates (16.41031, 81.15019):

```
Wed 11 Nov 2026 · Sunrise 06:06 · Sunset 17:31
Tithi: శుక్ల విదియ (until 15:53) · Nakshatra: అనూరాధ (until 11:37)
Rahukalam: 11:49–13:14 · Abhijit: 11:25–12:13
```

It also placed శుక్ల షష్ఠి on Tue 15 Dec 2026 (Margashira → likely
Subrahmanya Shashti 2026). **These values are not yet validated** against a
published panchangam.

## Approaches

| | Visitor downloads | Notes |
|---|---|---|
| **A. Precompute at build time (recommended)** | One small same-origin yearly JSON (estimated ~10 KB gzipped) plus a few lines of JS | No API, no astronomy library shipped. Page picks today's entry by IST date. Data is fixed, so it can be validated in advance. Build generates the next 2–3 years; any routine rebuild extends the window. |
| B. Compute in the browser | ~47 KB gzipped `astronomy-engine` + CPU work on the phone | Works for any date, but hurts low-end phones and the Lighthouse score. |
| C. Scheduled daily rebuild | Nothing extra (values inlined in HTML) | Needs a GitHub Actions cron. If a run fails, the page shows a stale date. |

### Libraries (all build-time only under approach A)

| Package | Licence | Notes |
|---|---|---|
| `astronomy-engine` 2.1.19 | MIT | Solid base, no dependencies. Browser bundle 116 KB min / ~47 KB gzip. |
| `@ishubhamx/panchangam-js` 3.0.0 | MIT | Built on astronomy-engine + luxon; includes muhurta timings. Could save work, but its accuracy and Telugu conventions must be verified. |
| `panchang-ts` 5.4.0 | MIT | Pure TypeScript alternative; not evaluated. |
| `mhah-panchang` 1.2.0 | MPL-2.0 | Tithi, nakshatra, yoga, karana, masa; last updated Jan 2024. |
| Swiss Ephemeris (`sweph`, `swisseph`) | AGPL / commercial | **Avoid**: licensing. |

## What can be shown

| Element | How | Confidence |
|---|---|---|
| Vaaram, sunrise/sunset | Rise/set search at the temple's coordinates | High |
| Tithi, nakshatram, yogam, karanam (with end times) | Moon/Sun longitudes + Lahiri ayanamsa | High (minutes) |
| Rahukalam, Yamagandam, Gulika | Daytime split into 8 parts, by weekday | High |
| Abhijit, Durmuhurtham | Fractions of day length | High |
| Telugu month (amanta), adhika masam | Sun's rasi at each new moon | Medium: needs care |
| Samvatsaram name (60-year cycle) | From Ugadi each year | Medium |
| Varjyam, Amrutha ghadiyalu | Per-nakshatram ghati tables | Medium: needs an authoritative table source |
| Muhurthams for weddings / griha pravesam | Many rules plus family tradition | **Don't automate.** The priests decide. |

## Murugan festival rules (derived from the same data)

| Festival | Rule |
|---|---|
| సుబ్రహ్మణ్య షష్ఠి | Margashira shukla shashti |
| Monthly Shashti | Every shukla shashti |
| కృత్తిక | Monthly Krittika nakshatram; Kartika Krittika is the major one |
| నాగుల చవితి | Kartika shukla chaturthi |
| నాగ పంచమి | Shravana shukla panchami |
| Skanda Shashti, Thaipusam, Vaikasi Visakam | Tamil traditions; include only if the temple observes them |

## Risks: convention, not astronomy

- **Which moment decides the day.** A festival can be fixed by the tithi at sunrise, at
  madhyahna or at pradosha, which can shift it by a day.
- **Traditional vs modern calculation.** A traditional (siddhantic) panchangam can differ
  from modern (drik) calculation by minutes, or occasionally by a day.
- **Mitigation:** a small overrides file (e.g. `src/data/festival-overrides.json`) where
  the temple's own dates win over computed ones, plus a short Telugu disclaimer.

## Decisions needed before building

1. Reference panchangam to validate a full year against (TTD, or the one the temple priests follow).
2. Which festivals the temple actually celebrates, and whether it publishes its own dates.
3. UI scope: a small "నేటి పంచాంగం" card near the timings plus the next 2–3 festivals, or a fuller daily view.
4. Confirm approach A (yearly JSON generated at build time).
