# Motion

How Nota moves, and where each kind of motion lives in the code. The
measurements behind these choices are in `research/motion-study.md`. The
Figma page "04 — Motion" shows the same specs and tells each product story as
a Figma Motion timeline, and the Landing prototype plays them (`figma.md`,
The prototype). A change to a story's beats belongs in both.

## Principles

- **Native scroll.** No smooth-scroll library, no wheel handling. Scroll
  effects read the browser's own position.
- **No JavaScript on scroll.** State that depends on scroll (the navbar, the
  pinned chapter's step) comes from IntersectionObservers; scrubbed effects
  are CSS scroll-driven animations behind `@supports (animation-timeline: …)`.
  There are no scroll listeners and no animation library.
- **Reveal once.** Nothing replays on scroll-up. Product stories hold their
  final frame.
- **Transform and opacity.** Scrubbed and entering motion animates only
  these (plus small blurs on reveals), so it stays on the compositor.
- **Reduced motion is gentler, not zero.** Reveals keep a short fade, product
  pictures show their poster frame, the pinned chapter becomes the stacked
  layout, and scrubbed tilts and rails switch off.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-standard` | `cubic-bezier(0.16, 1, 0.3, 1)` | Text reveals, notices |
| `--ease-out-cubic` | `cubic-bezier(0.33, 1, 0.68, 1)` | Large product frames |
| `--ease-in-out-cubic` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Crossfades, accordions |
| `--duration-fast` | 150ms | Hover, press |
| `--duration-base` | 300ms | Accordions |
| `--duration-reveal` | 600ms | Text reveals |
| `--duration-frame` | 900ms | Hero product frame, PDF sheets |
| `--stagger` | 60ms | Reveal groups (tiles use 100ms) |

## The kinds of motion

| Kind | Where | How |
| --- | --- | --- |
| Page-load entrance | Hero copy and frame | `.enter` / `.enter-stage` in `app.css`, CSS only, staggered with `--enter-delay` |
| Scroll reveal | Section headings, tiles, plans | `data-reveal` + `RevealObserver` (one observer, 20% visible, once) |
| Product story | Hero, How it works, bento | Stageshow `Stage` with a script, `play="once"`, `startAt={0.5}`, a `poster` |
| Pinned chapter | How it works | 250vh track, sticky scene, sentinels pick the step |
| Scrubbed | Hero tilt, step rails | CSS `view()` timelines, `linear`, no duration |
| Signature | Hero card, step 03 | `Signature` in `product/parts.tsx`, three strokes drawn with `stroke-dashoffset` |
| Hover and press | Buttons, cards | 150ms; press scales to 0.97 |

## Product stories

Each picture is a Stageshow stage telling one small story that ends on a
result: the cause first, then what it changes. Rules that matter here:

- The `poster` is the final frame and must tell the story alone; reduced
  motion and screenshots show it.
- A story starts once half the stage is visible (`startAt={0.5}`) and stops
  only when the stage leaves the viewport entirely.
- A value that changes rolls (`Count`, `Roll`, the kit `Button`'s label) in
  its own place; a new row opens with `Collapse` and carries the rows below.
- Every stage that can sit in a phone column has a `compact` design: a crop
  around its payoff, not the wide design shrunk.

The How it works beats are data (`how-it-works/panels.tsx`). One list drives
both the stacked layout (as a Stageshow script) and the pinned chapter (played
on its own clock by `useBeatPlayer` when scroll first reaches the step).

## The pinned chapter

`how-it-works.tsx`. Shown only by the `story:` custom variant: at least 64rem
wide, 44rem tall, and motion allowed. The track is 250vh, so the scene holds for
150vh of scroll, 50vh per step. Three sentinel spans split that travel and an
IntersectionObserver on the viewport's center line sets the active step. Steps
01 and 02 share one editor window; 03 crossfades to the client's browser. The
step rails fill from the track's `--how` view timeline.

## Gotchas

- Stageshow parts use `data-reveal` for their own purposes (`Collapse` sets
  `data-reveal="clip"`). The page's reveal rules and `RevealObserver` skip
  anything inside `.ss-stage`; keep it that way.
- Import kit parts from `~/lib/stageshow`, which imports them file by file.
  The kit's own index pulls in the CSS of every part.
- `.enter-stage` and the hero's scroll tilt both set `transform`, so they sit
  on two nested elements.
- A `Stage` without a `script` is a still: the kit sets `data-still` and
  turns off every transition and animation inside it. The pinned chapter's
  stage, driven by `useBeatPlayer`, passes an empty script with
  `play="once"` to stay animated. Never pair an empty script with the default
  `play="loop"`: the loop restarts it in microtasks forever and freezes the
  page.
