# Design system

Nota's tokens live in two places that mirror each other: Figma variables in
file `BHPXqrDP5CGpYB3C6G1xP9` and the `@theme` block in `app/app.css`. Each
Figma variable's WEB code syntax is set to the CSS custom property it maps to,
so `get_design_context` output already speaks this codebase's names.

## Naming

```
Figma  group/name      →  CSS  --color-group-name  →  Tailwind  bg-group-name
       motion/easing/out-cubic → --ease-out-cubic   →  ease-out-cubic
```

Two Figma collections, two layers in CSS:

- **Primitives** (`gray/*`, `sage/*`): the raw palette. Use them for product
  illustrations and one-off shades.
- **Tokens** (`background/*`, `surface/*`, `text/*`, `border/*`, `icon/*`,
  `button/*`, `glow/*`): what page UI uses. They alias primitives.

The dashboard added `red/*` and `amber/*` primitives and the `status/*`,
`paper/*`, `surface/selected`, `surface/accent-subtle` and `border/focus`
tokens. `app.css` holds their dark values; the light ones are in
`dashboard.css` (`dashboard.md`).

Page components use **Token** classes (`bg-background-primary`,
`text-text-secondary`, `border-border-subtle`). A hex value in a component is a
missing token: add the token in both places instead.

## Typography

One utility per Figma text style, defined with `@utility` in `app/app.css`.
Sizes switch from the Figma Typography collection's Mobile mode to its
Desktop mode at `lg` (64rem) through the `--font-size-*` variables.

| Utility | Font | Use |
| --- | --- | --- |
| `text-display-1` | Instrument Serif | Hero headline |
| `text-display-2` | Instrument Serif | Closing headline, prices |
| `text-heading-1` | Instrument Serif | Section titles |
| `text-heading-2` | Instrument Serif | Step titles, plan names, audience roles |
| `text-body` | Plus Jakarta Sans 500 | Lead paragraphs |
| `text-paragraph` | Plus Jakarta Sans 500 | Body copy, lists |
| `text-label` | Plus Jakarta Sans 500 | Small labels |
| `text-caption` | Plus Jakarta Sans 600 | Eyebrows, notes |
| `text-gradient` | — | Figma paint style `gradient/heading` |

Page type always uses these utilities. Tailwind's `text-sm`, `text-lg` and
the rest stay unused so every size traces back to a Figma style.

## Layout

- `container-page`: 1152px wide with the Figma gutters (20px → 32px → 0).
- Sections use `py-24 lg:py-32`; the hero and the pinned chapter set their own.
- Dark only. No `dark:` variants.

## Product pictures

The faux app UI (hero window, How it works panels, bento tiles) is drawn with
the vendored Stageshow kit and styled by `app/components/product/product.css`,
scoped under `.nota-stage`. It sizes in px because a stage draws at 1:1 and
scales as a whole; its type is the app's own scale (12–14px), not the page's.
The `.nota-stage .ss-stage` rule maps the kit's `--ss-*` tokens onto Nota's,
so kit parts (`Button`, `Toggle`, `Popover`) take Nota's look.

## Adding or renaming a token

1. Add the variable in Figma (Primitives or Tokens) and set its WEB code
   syntax to `var(--…)`.
2. Add the same name to `@theme` in `app/app.css`.
3. Use the Tailwind class it generates.
