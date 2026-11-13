# Dashboard prototype

A clickable concept of Nota's app at `/app`: the proposals list and one
proposal's detail, built from the Figma dashboard frames. It is a concept with
made-up data, labelled as one on every screen, and not linked from the landing
page. Everything runs in the browser; nothing is saved beyond the tab's
`sessionStorage`.

| Route | File | What |
| --- | --- | --- |
| `/app` | `routes/app._index.tsx` | Redirects to `/app/proposals`, keeping the query |
| `/app/*` layout | `routes/app.tsx` | Prefs script, `DashboardProvider`, `AppShell`, `noindex` |
| `/app/proposals` | `routes/app.proposals.tsx` | The list |
| `/app/proposals/:id` | `routes/app.proposal.tsx` | Detail; unknown ids get a 404 inside the shell |

`?data=stress` swaps in the worst-case set on both routes; the banner toggles it.

## Figma

Page **06 — Dashboard** `595:25` holds every screen in dark and light, desktop
1440 and phone 390, with its states and a stress test. Page **07 — Dashboard
Handoff** `595:26` holds the handoff doc `659:2` (decisions, motion table,
states) and the portfolio exports.

| Figma | Code |
| --- | --- |
| Proposals / Desktop 1440 / Dark / Detailed `602:2`, Compact `626:3658` | `dashboard/proposals.tsx` |
| Proposals / Phone 390 / Dark / List `633:4305` | same, `@media (width < 48rem)` |
| Proposals / Stress test `628:3661`, `628:4768` | `STRESS_PROPOSALS` in `lib/dashboard/data.ts` |
| Proposal detail / Desktop 1440 / Dark `638:6431`, Phone `644:6803` | `dashboard/detail.tsx` |
| Proposal detail / … / Stress test `642:7370` | the first stress proposal |
| App / Stop, Journey, Progress, Wait marker, Nudge tooltip, Chip, Proposal row | `dashboard/journey.tsx`, `proposals.tsx` |
| Timeline item, Signer row | `dashboard/detail.tsx` |

Not built (the tab or button shows a toast saying so): Overview, Clients,
Settings, Export, New proposal, Download PDF, the full document viewer. The
loading, error and no-access frames are designed but not wired up; the list
only has the filtered empty state.

## Files

- `lib/dashboard/data.ts`: 24 proposals. The first 8 are the Figma rows;
  the rest fill the ledger so its totals match the design (awaiting $183,289;
  Draft 3, Sent 6, Opened 5, Signed 7, Expired 3). The stress set is 8 worst
  cases × 5. Today in the prototype is **Mar 10, 2026**.
- `lib/dashboard/format.ts`: money (`moneyParts`), counts, status
  mapping, the ledger, and expiry dates (`extendExpiry`, `swapExpiry`,
  `waitedAfterExtend`).
- `components/dashboard/state.tsx`: reminders sent, expiries extended,
  toasts (Sonner), and the theme/density preferences.
- `components/dashboard/motion.tsx`: the shared motion pieces (`Swap`,
  `Roll`, `AutoHeight`, `useMeasure`) and their transitions.
- `components/dashboard/shell.tsx`: concept banner, top bar, theme toggle.
- `components/dashboard/dashboard.css`: all styles, scoped under `.nota-app`.

## Rules the code keeps

- **One settle rule.** A nudge is settled by a reminder, or by extending one
  that was about to expire (`isSettled` in `journey.tsx`). The list chip, the
  "need a nudge" count, the line colour, the wait marker, the callout and the
  timeline all read it, so they never disagree.
- **Extend expiry** adds 7 days (handoff). Every date that mentions expiry
  goes through `expiryOf` / `swapExpiry`, and the wait marker moves back.
- **Theme and density** live on `<html>` as `data-nota-theme` and
  `data-nota-density`, set by `PREFS_SCRIPT` before paint from
  `localStorage`. CSS picks the layout and the toggles' selected look from
  those attributes, so a reload paints the stored choice at once.
- **Light mode** is `:root[data-nota-theme='light'] .nota-app` in
  `dashboard.css`, overriding the dark token values from `app.css`. The
  landing page stays dark only.

## Layout

| Width | Rows |
| --- | --- |
| ≥ 80rem | Detailed (journey with labels) or Compact, by the toggle |
| < 80rem | Compact only; the toggle hides; detail rail moves under the preview |
| < 64rem | Compact without Last activity; titles keep at least 120px |
| < 48rem | Phone: one column per row, scrolling filters, document card |

The tablet and phone blocks prefix their selectors with `:root` on purpose:
the density rules are `:root[data-nota-density='compact'] …`, and without the
prefix they win and the tablet grid never applies.

## Motion

The handoff's motion table plus a pass against Emil Kowalski's animations.dev
rules. Every animation answers something the person did, and how often they
do it sets how much it moves. Motion for React and Sonner load only under
`/app`; the landing page has no animation library.

| Moment | What moves | How | Code |
| --- | --- | --- | --- |
| Send a reminder (list) | The nudge chip crossfades to "Reminder sent just now" and eases to its new width; the line, marker and stops ease from amber to green; "3 need a nudge" rolls to 2 | Spring 300ms, no bounce, 2px blur; colours 200ms `ease` | `SwapChip`, `Roll`, `[data-live]` CSS |
| Send a reminder or Extend (detail) | Your event grows into the timeline and the items below move down; the callout eases to its new height and colour while its text crossfades; changed dates crossfade | Height 270ms `[0.25, 1, 0.5, 1]`; text as above | `TimelineItem`, `AutoHeight`, `Swap` |
| List → detail and back | The clicked row's title and amount travel to the header; the rest crossfades | View Transitions through React Router's `viewTransition`: 250ms `cubic-bezier(0.25, 1, 0.5, 1)`, page crossfade 150ms | `Row`, `dashboard.css` |
| Toasts | Stack, exit, swipe away, pause on hover | Sonner, styled with tokens | `state.tsx` |
| Selecting rows | The toolbar and bulk bar swap: the one leaving sinks 4px and fades in 150ms, the one arriving rises in 200ms | CSS transitions, so a quick select/clear reverses smoothly | `.toolbar-swap` |
| Copy link | The icon turns into a check and the label into Copied for 2s; the button keeps its width | Spring 300ms, scale from 0.25 with blur | `CopyLink` |
| Wait-marker tooltips | Open after a 300ms hover in 150ms `cubic-bezier(0.19, 1, 0.22, 1)`, close in 100ms. Once one is open, the next opens at once with no animation, and only one is open | CSS plus a module-level group | `WaitMarker` |
| Status filter | The other value-bar segments dim to 30% | 150ms `ease` | `.strip__seg` |
| Density switch | The table crossfades | 150ms | `.table[data-swapped]` |
| Button press, row hover | Scale 0.97; background | 150ms; 100ms | `.btn`, `.row` |

Left still on purpose: search and filter results (they follow typing, many
times a day), pagination, the reading bars and value bar on load (seen on
every visit), the density layout (morphing 25 rows would stretch the text),
and the theme switch, which repaints at once: `data-nota-switching` turns
transitions off for two frames so coloured elements don't trail the page.

- **Nothing animates on load.** Stored reminders arrive in an effect, so
  Motion transitions stay instant until the provider is `live`
  (`useSwapTransition`, `useHeightTransition`), colour transitions apply only
  under `.nota-app[data-live]`, and every `AnimatePresence` starts with
  `initial={false}`.
- **Reduced motion is gentler, not zero.** `MotionConfig reducedMotion="user"`
  drops transforms and keeps fades; height changes are instant; nothing
  travels between pages, only the crossfade; the toolbar swap only fades;
  Sonner follows the setting itself.
- **Size.** `LazyMotion` with `domAnimation` and the `m.*` components
  (`strict`), so a full `motion.*` import fails loudly.

## Gotchas

- **Hydration.** The server has no `sessionStorage` or `localStorage`, so
  the first client render must match the server and stored state arrives in
  an effect. Don't format from locale defaults either: the Worker and Chrome
  disagree on IDR's decimals, so `DIGITS` pins them per currency.
- **The tooltip button.** Sending a reminder replaces the button, which
  would blur it and close the tooltip, so `send()` moves focus to the marker
  first. Closed tooltips are `visibility: hidden` so Tab skips their button.
- **Focus rings** follow each control's own radius; the global
  `:focus-visible` rule sets none, except 4px on text links.
- **Crossfades pop the old copy out of flow** (`mode="popLayout"`), so the
  wrapper (`.swap`, `.roll`) must be positioned and the copy can't rely on a
  flex gap for word spacing (`.toolbar__nudge .swap__item` is inline).
- **Testing exits.** Slowing animations with DevTools' playback rate (CDP
  `Animation.setPlaybackRate`) is fine for looking at a middle frame, but
  Motion's exiting copies stay in the DOM afterwards. Check that exits finish
  at normal speed. The in-app browser pane freezes animations while hidden.

## Checked

In the browser pane, against the Figma frames: desktop 1440 detailed and
compact, light and dark; tablet 1100, 900 and 768; phone 390; the stress set
on desktop and phone; reminder and extend on the list and the detail, and
after a reload; keyboard on the wait marker (focus opens, Tab reaches the
button, Enter sends, Escape closes); an unknown id; the console.

The motion pass, in Playwright at 1440, 900 and 390: each moment above in a
slowed middle frame and at its end state; exits finishing at normal speed;
a reload with stored reminders running no animations; the theme switch
repainting on the next frame; the view-transition names on exactly one row,
both ways; reduced motion emulated (no travel, instant heights, no toolbar
shift); the console, clean apart from Motion's development notice under
reduced motion.
