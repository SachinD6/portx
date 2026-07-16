# Portfolio

Production-ready Next.js portfolio starter with Tailwind CSS, shadcn/ui, and strict quality tooling.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **shadcn/ui** (base-nova style)
- **pnpm** package manager

## Quality tooling

| Tool         | Purpose                                    |
| ------------ | ------------------------------------------ |
| ESLint       | Next.js core-web-vitals + TypeScript rules |
| Prettier     | Formatting + Tailwind class sorting        |
| Husky        | Git hooks                                  |
| lint-staged  | Lint/format only staged files on commit    |
| Commitlint   | Conventional commit messages               |
| EditorConfig | Consistent editor basics                   |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Start dev server (Turbopack)    |
| `pnpm build`        | Production build                |
| `pnpm start`        | Start production server         |
| `pnpm lint`         | Run ESLint                      |
| `pnpm lint:fix`     | Fix ESLint issues               |
| `pnpm format`       | Format with Prettier            |
| `pnpm format:check` | Check formatting                |
| `pnpm typecheck`    | TypeScript `tsc --noEmit`       |
| `pnpm check`        | typecheck + lint + format check |

## shadcn/ui

Components live under `src/components/ui`. Add more with:

```bash
pnpm dlx shadcn@latest add button card
```

Config: `components.json`.

## Agent skills

Installed under `.agents/skills/`:

- `frontend-design` (Anthropic)
- `vercel-react-best-practices` (Vercel)
- `web-design-guidelines` (Vercel)

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add hero section
fix: correct contact form validation
chore: update dependencies
```

Pre-commit runs lint-staged. Commit messages are validated by commitlint.

## Environment

Copy `.env.example` to `.env.local` and fill in values as needed.
