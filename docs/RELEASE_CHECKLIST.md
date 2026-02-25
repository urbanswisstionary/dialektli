# Release Checklist — MUI → Tailwind/shadcn Migration

Branch: `nextjs-16-fresh-start`

## Pre-Merge Checklist

### Database (CRITICAL)
- [x] Local Docker DB synced via `prisma db push` (Bookmark table created)
- [ ] Run `prisma db push` on staging/production database to create the `Bookmark` table
  - The local DB was set up with `db push` (not migrations), so use `db push` for consistency
  - Command: `POSTGRES_URL="<production-url>" npx prisma db push --config prisma/prisma.config.ts`
  - Test on staging FIRST before production

### Prisma Config
- [x] Updated `prisma/prisma.config.ts` to Prisma 7 `defineConfig` pattern
  - Uses `dotenv` to load `.env.local`
  - Reads `POSTGRES_URL` from environment
  - Requires `--config prisma/prisma.config.ts` flag for CLI commands
  - Or set `POSTGRES_URL` as shell env var

### Environment
- [ ] Verify `.env.local` / production env vars are up to date
- [ ] No new env vars were added by this migration — existing ones are sufficient

### Build & Deploy
- [ ] `yarn install` (lockfile was updated during migration)
- [ ] `npx prisma generate` (regenerate client after migration)
- [ ] `npx next build` passes cleanly
- [ ] Deploy to preview/staging environment first
- [ ] Smoke test all major flows on staging:
  - [ ] Homepage loads, expressions render
  - [ ] Expression detail page (like/dislike/flag/bookmark actions)
  - [ ] Create new expression
  - [ ] Auth flow (sign in / sign out)
  - [ ] Profile page — all tabs: Profile, Expressions, Favorites, Users (admin)
  - [ ] Dark mode toggle
  - [ ] Mobile responsive layout (drawer, navbar)
  - [ ] i18n switching (EN/DE/FR)
  - [ ] Sprachatlas map page

### Bookmark Feature (New)
- [ ] Bookmark button appears on expression cards
- [ ] Bookmark toggles on/off (filled vs outline icon)
- [ ] Unauthenticated users see tooltip directing to sign-in
- [ ] Profile > Favorites tab shows bookmarked expressions
- [ ] Empty state shows "No favorites found" message

### Cleanup (Optional)
- [ ] Remove root-level analysis `.md` files if not needed in repo (ANALYSIS_SUMMARY.md, UI_COMPARISON_DETAILED.md, etc.)
- [ ] Review `prisma/seed.ts` uncommitted change (eslint-disable comment) — commit or discard

## Commit History

| Commit | Task | Description |
|--------|------|-------------|
| `f460f65` | 0 | Tailwind CSS v4 infrastructure |
| `62838de` | 1 | Theme Provider swap → CSS dark mode |
| `9ac0f6f` | 3 | shadcn/ui primitives (22 components) |
| `38d2acb` | 2 | Layout shell (Navbar, Footer, MobileDrawer) |
| `189f65f` | 4 | Expression components migration |
| `f8c15a2` | 5 | Core pages + shared components |
| `a65f0f9` | 6 | Static/legal pages |
| `1cd9ab9` | 7 | MUI/Emotion cleanup (zero `@mui`/`@emotion` references) |
| `39bf48b` | 8 | Bookmark/favorites system |

## Post-Deploy
- [ ] Verify production build is stable
- [ ] Monitor error logs for first 24h
- [ ] Confirm no regressions in Google Analytics / Core Web Vitals
