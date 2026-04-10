# Nota Landing Page

## Code Conventions

Follow `STYLE.md` in this project root for all code patterns, naming
conventions, component structure, and formatting rules. That file is the single
source of truth for how code should be written.

## Stack

- React Router v7 + TypeScript + TailwindCSS v4
- Single page application. Index route at `app/routes/home.tsx`
- Deployed to Cloudflare Workers
- Fonts: Instrument Serif + Plus Jakarta Sans (loaded via Google Fonts in
  `app/root.tsx`)
- `clsx` + `tailwind-merge` installed; `cn()` utility at `app/lib/cn.ts`

## Implementation Status

**Done:**

- ✅ Project setup (React Router v7, TypeScript, TailwindCSS v4, Cloudflare
  Workers)
- ✅ Coding patterns documented in STYLE.md
- ✅ Design tokens defined below
- ✅ Instrument Serif and Plus Jakarta Sans loaded in `app/root.tsx`
- ✅ `cn()` utility (`clsx` + `tailwind-merge`) at `app/lib/cn.ts`
- ✅ `Button` component with `primary`, `secondary`, `ghost` variants and
  `sm`/`base`/`lg` sizes
- ✅ `Navbar` — logo left, ghost CTA right, transparent with scroll blur
- ✅ `Hero` — eyebrow + display heading + subline + 2 CTAs + `HeroMockup`
- ✅ `ValueProps` — horizontal strip of 6 value props (caption style)
- ✅ Feature sections (Proposal Editor, Client Management, Export & Share)
  inline in `home.tsx`
- ✅ Mockup components: `HeroMockup`, `ProposalsMockup`, `ClientsMockup`,
  `ExportMockup`
- ✅ `TrustLine` — centered italic line
- ✅ Bottom CTA section (inline in `home.tsx`)
- ✅ `Footer` — copyright left, nav links right, divider above

**To Do:**

- Replace mockup components with real product screenshots in `public/images/`

## Design Tokens (from Figma)

### Fonts

- Headings: Instrument Serif (400, italic for logo)
- Body: Plus Jakarta Sans (400, 500, 600)

### Colors

- Page bg: gray-950 `#09090B`
- Card/surface bg: gray-900 `#18181B`
- Borders: gray-800 `#27272A`
- Strong borders: gray-700 `#3F3F46`
- Text primary: white `#FFFFFF`
- Text secondary: gray-400 `#A1A1AA`
- Text tertiary: gray-500 `#71717A`
- Text disabled: gray-600 `#52525B`
- Accent: sage-500 `#6B8F71`
- Accent hover: sage-600 `#55795E`
- Accent on dark: sage-400 `#89A88E`
- Accent subtle bg: sage-900 `#1A2F20`
- Accent pressed: sage-700 `#3F6348`

### Typography Scale

- Display: 56px, Instrument Serif, weight 400, line-height 1.15, letter-spacing
  -0.02em
- Heading 1: 36px, Instrument Serif, weight 400, line-height 1.2, letter-spacing
  -0.01em
- Heading 2: 24px, Instrument Serif, weight 400, line-height 1.25
- Body: 17px, Plus Jakarta Sans, weight 500, line-height 1.6
- Body SM: 15px, Plus Jakarta Sans, weight 500, line-height 1.6
- Caption: 13px, Plus Jakarta Sans, weight 600, line-height 1.4, letter-spacing
  0.02em
- Button: 15px, Plus Jakarta Sans, weight 600, line-height 1, letter-spacing
  0.01em

### Spacing (Tailwind subset)

- space-1: 4px
- space-2: 8px
- space-3: 12px
- space-4: 16px
- space-6: 24px
- space-8: 32px
- space-12: 48px
- space-16: 64px
- space-24: 96px
- space-32: 128px

### Layout

- Container: max-w-6xl (1152px), centered
- Columns: 12
- Gutter: 24px
- Page margin mobile: 20px

## Current Structure

```
app/
  root.tsx              # Root layout — loads Google Fonts (Instrument Serif, Plus Jakarta Sans)
  app.css               # Global styles, design tokens (@theme), semantic utility classes
  routes.ts             # Route configuration (single index route)
  routes/
    home.tsx            # Landing page — composes all sections
  components/
    button.tsx          # Button with primary/secondary/ghost variants, sm/base/lg sizes
    navbar.tsx          # Logo left, ghost CTA right, transparent with scroll blur
    hero.tsx            # Eyebrow + display heading + subline + 2 CTAs + HeroMockup
    value-props.tsx     # Horizontal strip of 6 value props (caption style)
    trust-line.tsx      # Single centered italic line
    footer.tsx          # Copyright left, nav links right, divider above
    mockups/
      hero-mockup.tsx       # SVG/JSX mockup for hero section
      proposals-mockup.tsx  # SVG/JSX mockup for Feature 1 (Editor)
      clients-mockup.tsx    # SVG/JSX mockup for Feature 2 (Client Management)
      export-mockup.tsx     # SVG/JSX mockup for Feature 3 (Export & Share)
  lib/
    cn.ts               # cn() utility — clsx + tailwind-merge
workers/
  app.ts                # Cloudflare Workers handler
public/
  favicon.ico
```

**Note:** Feature sections (Proposal Editor, Client Management, Export & Share)
and Bottom CTA are currently inlined in `home.tsx`. The `Feature.tsx` and
`BottomCTA.tsx` components were not extracted as separate files.

## Images

Create `public/images/` directory and place product screenshots there.

**Styling specs:**

- Hero image: 12px radius, 1px border gray-800, sage-500 glow ellipse behind
  (blur), two shadows
- Feature images: 12px radius, 1px border gray-800, two shadows (no glow)
- Use standard `<img>` tags with alt text

## Landing Page Sections (top to bottom)

1. **Navbar** - Logo left, ghost CTA button right, transparent background with
   blur on scroll
2. **Hero** - Eyebrow text + display heading + subheading + 2 CTA buttons +
   floating screenshot image
3. **Value Props** - Horizontal strip with 6 value proposition items (caption
   style text)
4. **Feature 1 (Editor)** - Text content left, product image right (alternating
   layout)
5. **Feature 2 (Clients)** - Text content right, product image left (alternating
   layout)
6. **Feature 3 (Export)** - Text content left, product image right (alternating
   layout)
7. **Trust Line** - Single centered line of italic text
8. **Bottom CTA** - Heading + primary button + supporting caption text
9. **Footer** - Copyright text left, navigation links right, divider line above

**Layout Grid:**

- Container: max-w-6xl (1152px), centered
- 12-column grid system
- 24px gutters between columns
- 20px margins on mobile

## Figma MCP Integration Rules

### Required Workflow

1. Call `get_design_context` with the fileKey and nodeId
2. Call `get_screenshot` for visual reference
3. Adapt output to this project's conventions — do not use raw generated code
   verbatim
4. Validate visually against the screenshot before marking done

### Token Mapping

**Colors — always use Tailwind classes, never hardcode hex values:**

Semantic token classes (from `@theme` in `app/app.css`):

| Figma token          | Tailwind class                  | Hex       |
| -------------------- | ------------------------------- | --------- |
| `background/primary` | `bg-page`                       | `#09090b` |
| card/surface bg      | `bg-surface`                    | `#18181b` |
| `text/primary`       | `text-text-primary`             | `#ffffff` |
| `text/secondary`     | `text-text-secondary`           | `#a1a1aa` |
| `text/tertiary`      | `text-text-tertiary`            | `#71717a` |
| text disabled        | `text-text-disabled`            | `#52525b` |
| `text/accent`        | `text-text-accent`              | `#89a88e` |
| `border/default`     | `border-border`                 | `#27272a` |
| `border/strong`      | `border-border-strong`          | `#3f3f46` |
| `button/primary`     | `bg-btn-primary`                | `#6b8f71` |
| button hover         | `hover:bg-btn-primary-hover`    | `#55795e` |
| button pressed       | `active:bg-btn-primary-pressed` | `#3f6348` |

Primitive scale classes (for when you need a raw palette value):

| Figma token      | Tailwind class                  | Hex       |
| ---------------- | ------------------------------- | --------- |
| `color/sage/400` | `text-sage-400` / `bg-sage-400` | `#89a88e` |
| `color/sage/500` | `text-sage-500` / `bg-sage-500` | `#6b8f71` |
| `color/sage/600` | `bg-sage-600`                   | `#55795e` |
| `color/sage/700` | `bg-sage-700`                   | `#3f6348` |
| `color/sage/900` | `bg-sage-900`                   | `#1a2f20` |
| `color/gray/800` | `border-gray-800`               | `#27272a` |
| `color/gray/700` | `border-gray-700`               | `#3f3f46` |

**Typography — use semantic utility classes from `app/app.css`, never generic
Tailwind sizes:**

| Figma token                      | CSS utility      |
| -------------------------------- | ---------------- |
| `display-1` (64px, serif, 400)   | `text-display-1` |
| `heading-1` (36px, serif, 400)   | `text-heading-1` |
| `paragraph` (18px, sans, 500)    | `text-body`      |
| `paragraph-sm` (15px, sans, 500) | `text-body-sm`   |
| `caption` (13px, sans, 600)      | `text-caption`   |
| button text (15px, sans, 600)    | `text-button`    |

IMPORTANT: Never use `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`,
etc. Always use the semantic classes above.

**Fonts:**

- `font/family/title` (Instrument Serif) → `font-serif`
- `font/family/body` (Plus Jakarta Sans) → `font-sans`

**Spacing — Figma space tokens map 1:1 to Tailwind defaults:**

| Figma      | px    | Tailwind             |
| ---------- | ----- | -------------------- |
| `space/1`  | 4px   | `p-1`, `gap-1`, etc. |
| `space/2`  | 8px   | `p-2`, `gap-2`, etc. |
| `space/3`  | 12px  | `p-3`                |
| `space/4`  | 16px  | `p-4`                |
| `space/6`  | 24px  | `p-6`                |
| `space/8`  | 32px  | `p-8`                |
| `space/24` | 96px  | `p-24`               |
| `space/32` | 128px | `p-32`               |

### Component Conventions (Landing Page Specific)

- Components are flat in `app/components/`, PascalCase filenames (e.g.
  `Hero.tsx`)
- Named `const` arrow functions with `.displayName` set immediately after
- Named exports (no default exports for section components)
- `clsx` + `tailwind-merge` are installed — use `cn()` from `~/lib/cn` for
  dynamic class merging
- Forward a `className` prop for composability when it makes sense
- No barrel `index.ts` needed for this flat structure

### Styling Notes

- All components are dark-only — no `dark:` variants needed
- Container: `max-w-6xl mx-auto px-6` (desktop), override with `px-5` on mobile
- The `sage-*` color scale is defined in `app/app.css` `@theme` block
- Hero image: `rounded-[12px] border border-gray-800` + glow + two `drop-shadow`
  values
- Feature images: `rounded-[12px] border border-gray-800` + two `drop-shadow`
  values (no glow)

### Asset Handling

- IMPORTANT: If Figma MCP returns a `localhost` image source, use it directly as
  `src`
- IMPORTANT: Do not install icon libraries — use inline SVG from the Figma
  payload
- Product screenshots live in `public/images/`
- Use standard `<img>` tags with descriptive `alt` text
