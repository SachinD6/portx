# Cloudflare Pages deployment

Production-grade static hosting for **portx** on [Cloudflare Pages](https://pages.cloudflare.com/), with GitHub Actions for CI, preview environments, production deploys, and rollback.

## Architecture

| Concern    | Solution                                                                |
| ---------- | ----------------------------------------------------------------------- |
| Hosting    | Cloudflare Pages (global edge CDN)                                      |
| Build      | Next.js static export → `out/`                                          |
| CI         | GitHub Actions (`ci.yml` + `deploy.yml`)                                |
| Previews   | Unique URL per PR / branch                                              |
| Production | `master` (or `main`) → production branch                                |
| Rollback   | Cloudflare deployment history (1-click) or re-run workflow on older SHA |
| Secrets    | GitHub Environments (`production`, `preview`)                           |

```
PR push ──► CI quality ──► build out/ ──► Pages preview URL + PR comment
master  ──► CI quality ──► build out/ ──► Pages production
manual  ──► workflow_dispatch ──► production or preview (rollback helper)
```

## One-time setup

### 1. Create Cloudflare API token

1. Open [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → use template **Edit Cloudflare Workers** (or custom)
3. Permissions (minimum):
   - **Account → Cloudflare Pages → Edit**
   - **Account → Account Settings → Read** (if prompted)
4. Account resources: include your account
5. Copy the token (shown once)

### 2. Get Account ID

Dashboard → any domain / Workers & Pages → **Account ID** in the right sidebar  
(or Workers overview).

### 3. Create the Pages project (once)

```bash
# Login locally (optional)
pnpm dlx wrangler login

# Create empty Pages project
pnpm dlx wrangler pages project create portx --production-branch=production
```

Or: Dashboard → **Workers & Pages** → **Create** → **Pages** → **Direct Upload** → name `portx`.

> Project name **must** be `portx` (matches workflows + `wrangler.toml`).

### 4. GitHub repository secrets

Repo → **Settings → Secrets and variables → Actions**

| Secret                  | Value                  |
| ----------------------- | ---------------------- |
| `CLOUDFLARE_API_TOKEN`  | Token from step 1      |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from step 2 |

Optional variable (Settings → Variables):

| Variable               | Example                                    |
| ---------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | `https://portx.pages.dev` or custom domain |

### 5. GitHub Environments

Repo → **Settings → Environments** → create:

1. **`production`**
   - Optional: required reviewers (protect prod deploys)
   - Optional: wait timer
2. **`preview`**
   - No protection rules (fast PR previews)

Environments appear in Actions deployment history (like Vercel).

### 6. Push and verify

```bash
git push origin master
```

Open **Actions** → **Deploy Cloudflare Pages** → wait for production URL  
(`https://portx.pages.dev` or your custom domain).

## Daily workflow (Vercel-like)

### Preview environments

1. Open a PR against `master`
2. Pipeline builds + deploys a **preview** branch (`pr-12`, etc.)
3. Bot comments the preview URL on the PR
4. Every new commit updates the same preview

### Production

Merge / push to `master` → production deployment.

### Rollback (like Vercel)

**Option A — Dashboard (fastest)**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **portx**
2. **Deployments**
3. Find a healthy deployment → **⋯ → Rollback to this deployment**

**Option B — Redeploy an older commit**

1. Actions → **Deploy Cloudflare Pages** → **Run workflow**
2. Environment: `production`
3. Checkout that SHA first, or use:

```bash
git checkout <good-sha>
git push origin HEAD:master --force-with-lease   # only if you intend to move the branch
```

Prefer **Option A** for instant rollback without rewriting git history.

### Manual deploy

Actions → **Deploy Cloudflare Pages** → **Run workflow**

- `production` or `preview`
- Optional reason (logged in summary)

## Local commands

```bash
pnpm install
pnpm build                 # writes static site to out/
pnpm pages:preview         # wrangler pages dev out  (needs wrangler login)
pnpm pages:deploy          # deploy current out/ to Pages (local)
```

## Custom domain

1. Cloudflare Dashboard → **portx** → **Custom domains**
2. Add `yourdomain.com` / `www`
3. Follow DNS instructions (auto if domain is on Cloudflare)
4. Update `NEXT_PUBLIC_SITE_URL` + `src/data/site.ts` `url`

## Caching & headers

`public/_headers` sets:

- Long-cache immutable `/_next/static/*`
- Security headers (frame deny, nosniff, referrer policy)
- HTML revalidation so rollouts show immediately

## Comparison vs Vercel

| Feature                     | This setup                                   |
| --------------------------- | -------------------------------------------- |
| `git push` production       | ✅                                           |
| PR preview URLs             | ✅                                           |
| PR deploy comments          | ✅                                           |
| Instant rollback            | ✅ Dashboard                                 |
| Env protection / reviewers  | ✅ GitHub Environments                       |
| Edge CDN                    | ✅ Cloudflare                                |
| SSR / ISR                   | ❌ Static export (enough for this portfolio) |
| Server Actions / API routes | ❌ Add OpenNext Workers later if needed      |

## Troubleshooting

| Symptom                | Fix                                            |
| ---------------------- | ---------------------------------------------- |
| `Authentication error` | Refresh `CLOUDFLARE_API_TOKEN` with Pages Edit |
| `Project not found`    | Create project `portx` (step 3)                |
| Preview URL 404        | Wait ~30s for propagation; check deploy logs   |
| Build fails on format  | Run `pnpm format` locally before push          |
| Husky errors in CI     | Workflows set `HUSKY=0`                        |

## Security notes

- Never commit `.dev.vars` or API tokens
- Prefer fine-scoped tokens (Pages only)
- Use environment protection rules on `production`
