# Nota Landing Page

## Code Conventions

Follow `STYLE.md` in this project root for all code patterns, naming
conventions, component structure, and formatting rules. That file is the single
source of truth for how code should be written.

## Stack

- React Router v7 + TypeScript + TailwindCSS v4
- Single page application. Index route at `app/routes/home.tsx`
- Deployed to Cloudflare Workers
- Font: Inter (currently loaded). Will add Instrument Serif and Plus Jakarta Sans

## Implementation Status

**Done:**
- ✅ Project setup (React Router v7, TypeScript, TailwindCSS v4, Cloudflare Workers)
- ✅ Coding patterns documented in STYLE.md
- ✅ Design tokens defined below

**To Do:**
- Create `app/components/` directory with the 7 landing page components
- Load Instrument Serif and Plus Jakarta Sans fonts in `app/root.tsx`
- Create `public/images/` and add product screenshots
- Implement each section component following STYLE.md conventions
- Compose all sections in `app/routes/home.tsx`

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
  root.tsx              # Root layout
  app.css               # Global styles with Tailwind and Inter font
  routes.ts             # Route configuration (single index route)
  routes/
    home.tsx            # Index route - compose landing page sections here
  welcome/              # Template welcome component (will be replaced)
    welcome.tsx
    logo-dark.svg
    logo-light.svg
workers/
  app.ts                # Cloudflare Workers handler
public/
  favicon.ico
```

## Component Structure (To Implement)

Build these components in `app/components/` to compose the landing page:

```
app/components/
  Navbar.tsx            # Logo left, CTA right, transparent with scroll blur
  Hero.tsx              # Eyebrow + display heading + subline + 2 CTAs + screenshot
  ValueProps.tsx        # Horizontal strip of 6 value props (caption style)
  Feature.tsx           # Reusable component - text/image alternating layout
  TrustLine.tsx         # Single centered italic line
  BottomCTA.tsx         # Heading + button + caption
  Footer.tsx            # Copyright + links with divider
```

**Composition:** Import all in `app/routes/home.tsx` to render complete landing page.

## Images

Create `public/images/` directory and place product screenshots there.

**Styling specs:**
- Hero image: 12px radius, 1px border gray-800, sage-500 glow ellipse behind (blur), two shadows
- Feature images: 12px radius, 1px border gray-800, two shadows (no glow)
- Use standard `<img>` tags with alt text

## Landing Page Sections (top to bottom)

1. **Navbar** - Logo left, ghost CTA button right, transparent background with blur on scroll
2. **Hero** - Eyebrow text + display heading + subheading + 2 CTA buttons + floating screenshot image
3. **Value Props** - Horizontal strip with 6 value proposition items (caption style text)
4. **Feature 1 (Editor)** - Text content left, product image right (alternating layout)
5. **Feature 2 (Clients)** - Text content right, product image left (alternating layout)
6. **Feature 3 (Export)** - Text content left, product image right (alternating layout)
7. **Trust Line** - Single centered line of italic text
8. **Bottom CTA** - Heading + primary button + supporting caption text
9. **Footer** - Copyright text left, navigation links right, divider line above

**Layout Grid:**
- Container: max-w-6xl (1152px), centered
- 12-column grid system
- 24px gutters between columns
- 20px margins on mobile
