# Nota Landing Page

A modern, high-performance landing page for Nota built with React Router v7, TypeScript, and TailwindCSS v4, deployed to Cloudflare Workers.

## Stack

- **Framework:** React Router v7 with TypeScript
- **Styling:** TailwindCSS v4 with custom design tokens
- **Deployment:** Cloudflare Workers
- **Fonts:** Inter, Instrument Serif, Plus Jakarta Sans

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
  root.tsx              # Root layout
  app.css               # Global styles with design tokens
  routes/
    home.tsx            # Landing page composition
  components/           # Reusable section components
public/
  images/               # Product screenshots
workers/
  app.ts                # Cloudflare Workers handler
```

## Design Tokens

Custom design tokens are defined in `app/app.css`:

- **Colors:** Dark theme with sage accent (e.g., `bg-page`, `text-text-primary`, `bg-btn-primary`)
- **Typography:** Semantic utility classes (`text-display`, `text-heading-1`, `text-body`, etc.)
- **Spacing:** 4px baseline grid (space-1 → space-32)
- **Layout:** 12-column grid, max-w-6xl container

See `CLAUDE.md` for complete token reference and component conventions.

## Contributing

Follow the coding patterns and conventions documented in `STYLE.md`.
