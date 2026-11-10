# Figma

File: [Nota Landing Page](https://www.figma.com/design/BHPXqrDP5CGpYB3C6G1xP9/Nota-Landing-Page)
(key `BHPXqrDP5CGpYB3C6G1xP9`). Laid out for Figma Community; the "00 — Read
me" page explains it to visitors. Landing v1 and v2 were taken out before
publishing; restore them from the file's version history (autosave of
November 7, 2026).

## Where things are

| Page | Node | What |
| --- | --- | --- |
| Cover | `454:61` | Community thumbnail, 1920×1080 |
| 00 — Read me | `500:2` | What the file is, how to play the prototype, changelog |
| 01 — Foundations | `397:99` | Color and type, drawn from the variables in `design-system.md` |
| 02 — Components | `0:1` | Navbar, Footer, Section Heading, Step Item, Accordion Item, Button, icons, product UI parts, the How it works chapter set `483:1049` |
| 03 — Landing page | `459:230` | **Landing / Desktop · 1512**: the page the code builds |
| 03 — Landing page | `470:388` | **Landing / Mobile · 390** |
| 03 — Landing page | `464:357` | How it works / Step panels: the three pinned-chapter states |
| 03 — Landing page | `532:761` | Prototype components: the sets the prototype plays (below) |
| 04 — Motion | `397:100` | Motion principles, tokens and specs; entrances and reveals; the Figma Motion stories: hero `523:56`, steps `486:879`, `486:942`, `486:1038` |
| 05 — Social | `499:412` | OG image, exported to `public/og-image.png` |

Desktop sections: Navbar `459:231`, Hero `459:232`, Audience `459:558`,
How it works `459:567`, Features `459:717`, Pricing `468:379`, FAQ `459:869`,
Final CTA `459:881`, Footer `459:889`.

## Section → code

| Figma | Code |
| --- | --- |
| Hero, Product Window, Satellite / Signed | `components/hero/*`, `product/app-window.tsx` |
| Audience | `components/audience.tsx` |
| How it works, Step panels | `components/how-it-works/*`, `product/editor.tsx`, `product/client-page.tsx` |
| Features (bento) | `components/bento/*` |
| Pricing | `components/pricing.tsx` |
| FAQ | `components/faq.tsx` |
| Final CTA | `components/final-cta.tsx` |
| 04 — Motion stories | the matching Stageshow scripts (`motion.md`, Product stories) |

Component doc comments start with their Figma path: `Figma: Landing → …`
for a part of the Landing frames, `Figma: 02 — Components → …` for a
component. A search for a frame name finds its code.

## Design to code

1. `get_design_context` on the frame, then `get_screenshot` for reference.
2. Map what it returns onto this codebase: Token classes and text utilities
   (`design-system.md`), existing components, and `product/` for app UI.
   Generated code is a starting point; adapt it rather than pasting it.
3. Compare the running page with the screenshot at 1512 and 390 wide before
   calling it done.

## The prototype

Two flows, **Landing — Desktop** and **Landing — Mobile**, play the site's
motion in Present mode. Figma has no scroll-into-view trigger, so the
prototype fakes one:

- **Waiting / Revealed.** Each moving section is an instance of a set in
  Prototype components. `Waiting` holds the first frame of every track;
  `Revealed` carries the Figma Motion tracks. Mouse enter on `Waiting` swaps
  to `Revealed`, which fires when the section scrolls under a resting
  pointer. A timer fallback (60s desktop, 20s mobile) reveals it anyway, which
  is all a touch screen gets.
- **Parts.** A variant reached by an interaction plays only its first 2
  seconds. Longer stories are split at a pause between beats into `part 2`,
  `part 3` variants chained by After delay.
- **600s timelines.** Figma loops timelines in prototypes and ignores loop
  off, so every timeline is 600s long and holds its last frame.
- **Navbar.** The Navbar instances' `State` is bound to the STRING variable
  `navbar-state` (collection Prototype). Mouse enter on the hero copy sets
  `Top`, on the hero stage `Scrolled`; every nav, footer and CTA link sets it
  too. Mobile uses `Navbar / Mobile` `564:1312` (State × Menu).
- **How it works.** The chapter set `483:1049` starts at `Step=00 Waiting`,
  then runs 01 → 02 → 03 on a clock (3s, then about 4.6s a step). Clicking a
  step jumps to it.
- **Hero.** The Hero Stage holds an instance of `Story / Hero` `523:56`;
  the entrance delays match `app.css`.

To change a moving section, edit its `Revealed` variant, then make `Waiting`
and any parts match, with the same layer names in every variant. Interaction
overrides on links live on the Landing instances.

## Known differences

- The prototype has no pinned scroll and no hero tilt; the chapter advances
  on a clock rather than with scroll. After a link jump, the target section
  reveals once the pointer moves.
- The Pro price ($8/month billed yearly) is a placeholder in both
  (`PRO_PRICE` in `app/lib/site.ts`).
