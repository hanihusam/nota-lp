# Stageshow (vendored)

Faux product UI kit by Benji Taylor, MIT licensed (see `LICENSE`).
Vendored from the Stageshow skill with two local changes:

- `parts/Icon.tsx` draws Heroicons 16/solid paths instead of importing `lucide-react`.
- `BrandMark` and the third-party brand registry are removed (unused).

Treat this folder as a dependency: restyle parts from the host with classes and
`--ss-*` tokens rather than editing files here. See `docs/motion.md`.

Local change 3: the host-guard rule in `stage.css` skips `.ss-host` subtrees, so
Nota's own Tailwind-styled mockups can render inside a `Stage` unchanged.

Local change 4: `Stage` takes `startAt` (0 to 1), the visible share at which a
script starts, so a story begins once the visitor can see it rather than on its
first pixel (docs/research/motion-study.md).
