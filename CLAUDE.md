# Nota landing page

Marketing site for Nota, a proposal builder with built-in e-signatures for
freelancers. One page (`app/routes/home.tsx`), React Router v7 + TypeScript +
Tailwind v4, deployed to Cloudflare Workers (`wrangler.jsonc`). Scripts are in
`package.json`; `npm run typecheck` must pass before a change is done.

The design lives in Figma and the code mirrors it section for section. Before
building or changing a section, read the doc for what you are touching:

- **Figma**: frames, node IDs, section → file map, design-to-code steps →
  `docs/figma.md`
- **Tokens and type**: color and text utilities, how to add a token →
  `docs/design-system.md`
- **Motion**: entrances, reveals, product stories, the pinned chapter,
  reduced motion → `docs/motion.md`
- **Why it looks this way**: Stripe/Apple measurements, pricing model →
  `docs/research/`
- **Dashboard prototype** (`/app`): routes, data, state, layout rules,
  gotchas → `docs/dashboard.md`

## Code

- Code style: `STYLE.md`, read its "This project" section first.
- Components: kebab-case files, named `const` arrow exports with
  `.displayName`, `cn()` from `~/lib/cn` for merged classes.
- Every component's doc comment starts with its Figma path
  (`Figma: Landing → Pricing`).
- Page type uses the text utilities (`text-heading-1`, `text-body`, …) and
  Token color classes. Every size and color traces to a Figma style.
- Icons are Heroicons 16 solid, as paths in `app/lib/icons.ts`, drawn by
  `ui/icon.tsx`. Add a glyph by copying its path; no icon packages.
- Copy, links, the app URL and the Pro price are in `app/lib/site.ts`.

## Product pictures

The app UI on the page is faux product UI built with the vendored Stageshow
kit (`app/vendor/stageshow`, treated as a dependency: see its `NOTICE.md`).

- Import kit parts from `~/lib/stageshow`, never the kit's index.
- Nota's app look is `app/components/product/` (`product.css`, scoped under
  `.nota-stage`); every product `Stage` takes `className="nota-stage …"`.
- A story plays once, starts at half visible, and its `poster` is the final
  frame. Phone-width stages have a `compact` design of their own.

## Dashboard prototype

`/app` is a clickable concept of the app (proposals list and detail), built
from Figma pages 06 and 07. It is labelled a concept on every screen, uses
made-up data only, and is `noindex`.

- Code: `app/components/dashboard/`, `app/lib/dashboard/`, `app/routes/app*.tsx`.
- Styles are plain CSS in `dashboard.css`, scoped under `.nota-app`, with
  its own light mode. Colors still come from tokens in `app.css`.
- Motion is Motion for React (`m.*` under `LazyMotion`) and Sonner, both
  only under `/app`. Nothing animates on page load; see the Motion section
  of `docs/dashboard.md` before adding any.
- Test changes with `?data=stress` and at 1440, 900 and 390 wide.

## Open decisions (the owner's)

- Pro price: `PRO_PRICE` is a placeholder.
- The FAQ answer on e-signatures being legally binding needs legal review.
- `APP_URL` points at `#get-started` until the app ships.
