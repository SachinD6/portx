# Portx — portfolio template

A minimal, elegant software engineer portfolio for **Sachin Duhan**, built as a **reusable template**. Swap content in the data layer—no UI rewrites.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Motion (micro-interactions)
- Lenis (smooth scroll)
- cmdk (command palette)
- Sonner (toasts)
- Husky, lint-staged, Prettier, ESLint, commitlint

## Design

Light editorial system inspired by calm, centered product UIs:

- Warm paper background, charcoal type, single restrained accent
- Floating island nav, command palette (`⌘K` / `Ctrl+K`)
- Kinetic hero once, then stillness
- Magnetic CTAs, scroll reveals, double-bezel cards
- Film grain overlay + full `prefers-reduced-motion` support

## Customize this template

### 1. Content (primary)

Edit files under `src/data/`:

| File            | What it controls                               |
| --------------- | ---------------------------------------------- |
| `person.ts`     | Name, role, headline, bio, email, availability |
| `site.ts`       | SEO title, description, URL, keywords          |
| `projects.ts`   | Selected work (impact-first shape)             |
| `experience.ts` | Roles / timeline                               |
| `skills.ts`     | Stack clusters                                 |
| `socials.ts`    | GitHub, LinkedIn, X, email                     |
| `approach.ts`   | Principles                                     |
| `navigation.ts` | Nav + command palette actions                  |

Components **must not** hardcode personal content—keep it in data.

### 2. Design tokens

Semantic colors, radii, and spacing live in `src/app/globals.css` (`:root` / `.dark`). Components use Tailwind tokens (`bg-background`, `text-muted-foreground`, etc.)—not raw hex.

### 3. Assets

- Put images in `public/`
- Optional resume at `public/resume.pdf` (linked from `person.resumeUrl`)

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
pnpm check        # typecheck + lint + format
```

## Structure

```
src/
  data/                 # all portfolio content
  components/
    sections/           # Hero, Work, Approach, Experience, Stack, Contact
    layout/             # header, footer, section shell, grain
    navigation/         # command palette
    effects/            # magnetic, text reveal
    ui/                 # button, reveal, magnetic-button
  lib/                  # cn, motion presets, seo, scroll helpers
  app/                  # layout + page composition
```

## Quality

- Pre-commit: lint-staged (ESLint + Prettier)
- Commit messages: conventional commits via commitlint
- TypeScript: strict + `noUncheckedIndexedAccess`

## Deploy (Cloudflare Pages)

Static export → global edge CDN with Vercel-like previews & rollback.

| Event            | Result                     |
| ---------------- | -------------------------- |
| Push to `master` | Production deploy          |
| Pull request     | Preview URL + PR comment   |
| Manual workflow  | Redeploy / rollback helper |

**Full guide:** [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

```bash
# Required GitHub secrets
# CLOUDFLARE_API_TOKEN
# CLOUDFLARE_ACCOUNT_ID

pnpm build            # → out/
pnpm pages:preview    # local Pages dev server
pnpm pages:deploy     # deploy out/ via Wrangler
```

## License

Personal / template use. Replace placeholder projects and contact details with your own.
