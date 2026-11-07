# Motion study: Stripe and Apple

Measured on 2026-11-06 at a 1512 × 900 viewport, in headless Chromium.
The probe hooked `IntersectionObserver`, `Element.animate()` and scroll/wheel
listeners before page load, then scrolled the page in 320px steps and read
`document.getAnimations()` and computed transitions at each step. The numbers
below are what the pages actually run, not estimates.

Pages: `stripe.com`, `stripe.com/enterprise`,
`apple.com/macbook-pro/liquid-retina-xdr-display/`.

## What they have in common

- **Native scrolling.** No smooth-scroll library, no wheel hijacking,
  `scroll-behavior: auto`, no GSAP. Every scroll effect reads the native
  scroll position.
- **Product UI is authored, not filmed.** Stripe's product graphics are HTML,
  each driven by one long Web Animations timeline. Apple uses video, but plays
  it on its own clock and stops on a final frame; it is not scrubbed.
- **Motion is staged by importance.** Title, then body, then actions; the
  graphic last. The heavy entrance happens once, at the top.
- **Most of a pin is hold.** Content arrives early in a pinned section and then
  sits still long enough to read.

## Stripe

| What | Duration | Easing | Notes |
| --- | --- | --- | --- |
| Headline line or word reveal | 325ms | `cubic-bezier(0.33, 1, 0.68, 1)` | Translate only, 50ms stagger |
| Enterprise hero entrance | 1250ms | `cubic-bezier(0.33, 1, 0.68, 1)` | Title, body, button at 0 / 250 / 500ms |
| Hero cards settling | 750–850ms | `cubic-bezier(0.65, 0, 0.35, 1)` | On-screen move, so ease-in-out |
| Section graphic entrance | 1000ms | `cubic-bezier(0.33, 1, 0.68, 1)` | Transform + opacity |
| Lazy section fade | 500ms | `cubic-bezier(0.33, 1, 0.68, 1)` | Opacity only |
| Diagram lines drawing on | 3000ms | `cubic-bezier(0.33, 1, 0.68, 1)` | `stroke-dashoffset`, 44 paths |
| Product graphic story | 1.4–12s | linear (eased per keyframe) | One timeline per graphic, 1.2–4s lead-in |
| Hover: color, fill, arrow | 150–300ms | `cubic-bezier(0.25, 1, 0.5, 1)` | 150ms on enterprise, 300ms on home |
| Reveal transforms, clip-path | 800ms | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Mask and clip wipes |
| Fixed nav appearing | 250ms | `ease` | Opacity + translate |

- **Nav state with no JavaScript.** The homepage nav runs a CSS animation on a
  `scroll()` timeline (`detect-scroll`) to know it has scrolled.
- **Graphics are pre-warmed.** Observers with 500–3000px root margins mount and
  prepare graphics well before they enter; a second observer (threshold 0.01
  on home, 0.5–0.6 on enterprise) starts the story.
- **Pins are short or absent.** The homepage has no pinned section. Enterprise
  pins a copy column for 1.5–1.6 viewport heights while graphics scroll past.
- **One signature visual.** The animated gradient (WebGL canvas) appears in the
  hero only; the rest of the page is product fragments on quiet ground.
- **Bento of fragments.** Tiles show one component each (a card, a table, a
  checkout), often a small card overlapping a larger window.

## Apple

| What | Measurement |
| --- | --- |
| Page length | 39 viewport heights, 10 videos |
| Pinned chapters | 3–4 viewport heights each |
| Pin, phase 1 (0–25%) | Giant masked headline scales from 400× to 1×, revealing the video |
| Pin, phase 2 (25–34%) | Mask fades out, eyebrow fades in |
| Pin, phase 3 (34–57%) | Content translates up 190px |
| Pin, phase 4 (57–100%) | Hold |
| Crossfade chapter | Discrete opacity swaps at fixed progress points (16%, 32–49%) |
| Video | Plays on its own clock as the pin arrives and stops on a held frame |
| UI transitions | 240–320ms, `cubic-bezier(0.4, 0, 0.6, 1)` or `ease` |
| Local nav backdrop | 240ms, `cubic-bezier(0.28, 0.11, 0.32, 1)` |
| Link list entrance | 320ms, 20–40ms stagger |

Apple drives pins with its own scroll engine (52 scroll listeners writing
inline styles). Only transform and opacity are scrubbed.

## What Nota adopts

1. **Native scroll, always.** No smooth-scroll library. Already true.
2. **Product stories are authored timelines** (Stageshow scripts): mounted
   early, started when the tile is about half visible, played once, ending on
   a held payoff frame that doubles as the reduced-motion poster.
3. **One pinned chapter: How it works.** About 2.5 viewport heights, heading
   inside the pin. Each step gets roughly a third of the track, and at least
   half of each third is hold. Progress maps to discrete step changes, as in
   Apple's crossfade chapter, not to continuous drift.
4. **Entrance tiers.** Text reveals stay at 600ms with `--ease-standard`.
   Large product frames take 800–1000ms with an ease-out-cubic curve. The hero
   entrance staggers title, body, then actions.
5. **One signature visual: the signature itself.** Where Stripe has its
   gradient, Nota draws a sage ink signature once, as the payoff of the hero
   story (`stroke-dashoffset`, about 1.2s, ease-in-out). It does not recur
   elsewhere.
6. **Lines draw on.** Connectors and diagram strokes use `stroke-dashoffset`
   with an ease-out curve, never a fade.
7. **Hover is fast.** 150ms for color, up to 250ms for transforms.
8. **No scroll listeners.** Stripe sets its nav state from a CSS `scroll()`
   timeline. Nota gets the same result with an IntersectionObserver on an 8px
   sentinel at the top of the page, which keeps the nav's 250ms transition.

### New easing token

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out-cubic` | `cubic-bezier(0.33, 1, 0.68, 1)` | Large product frames, line drawing |

The existing `--ease-standard`, `--ease-emphasized` and `--ease-in-out-cubic`
stay as they are.
