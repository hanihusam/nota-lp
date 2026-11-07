# Nota Landing Page

The marketing site for Nota: write a proposal, send it as a link, and get it
signed in the browser. React Router v7, TypeScript and Tailwind v4, deployed to
Cloudflare Workers. Designed in Figma and built to match it; see `docs/`.

## Stack

- **Framework:** React Router v7 with TypeScript
- **Styling:** TailwindCSS v4 with custom design tokens
- **Deployment:** Cloudflare Workers
- **Fonts:** Instrument Serif, Plus Jakarta Sans
- **Product pictures:** a vendored copy of the Stageshow faux-UI kit
- **Motion:** CSS and IntersectionObserver, no animation library

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

### Previewing Production Build

```bash
npm run preview
```

## Deployment

Deploy to Cloudflare Workers using Wrangler:

```bash
npm run deploy
```

For preview deployments:

```bash
npx wrangler versions upload
npx wrangler versions deploy
```

## Project Structure

```
app/
  root.tsx                 # Document, fonts, error boundary
  app.css                  # Tokens (@theme), text utilities, entrances, reveals
  routes/home.tsx          # The page: section order mirrors Figma
  components/
    navbar.tsx, audience.tsx, pricing.tsx, faq.tsx, final-cta.tsx, footer.tsx
    hero/                  # Hero copy and the signing story
    how-it-works/          # Pinned chapter, stacked layout, story beats
    bento/                 # Features grid and its five pictures
    product/               # Nota's app UI for the pictures (window, editor, signing page)
    ui/                    # Button, Icon, Kbd, Section Heading, Spotlight Card
    motion/                # RevealObserver
  lib/                     # site.ts (copy, links, price), icons.ts, stageshow.ts, cn.ts
  vendor/stageshow/        # Faux-UI kit (MIT), treated as a dependency
docs/
  figma.md                 # Frames, node IDs, section → file map
  design-system.md         # Tokens and type
  motion.md                # How the page moves
  research/                # Motion and pricing studies
```

## Contributing

Follow the coding patterns and conventions documented in `STYLE.md`.
