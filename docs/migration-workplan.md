# Dialektli UI Migration Workplan

## MUI/Emotion -> Tailwind CSS v4 + shadcn/ui

**Branch**: `nextjs-16-fresh-start`
**Source**: v0-generated build at `/Downloads/dialektli-ui-build/` (100 files)
**Strategy**: Selective integration — adapt v0 output to our existing data layer, i18n, and auth. Never copy blindly.

---

## Table of Contents

1. [Overview](#overview)
2. [Migration Phases](#migration-phases)
3. [Task 0: Infrastructure](#task-0-infrastructure)
4. [Task 1: Theme Provider Swap](#task-1-theme-provider-swap)
5. [Task 2: Layout Shell](#task-2-layout-shell)
6. [Task 3: shadcn/ui Primitives](#task-3-shadcnui-primitives)
7. [Task 4: Expression Components](#task-4-expression-components)
8. [Task 5: Core Pages](#task-5-core-pages)
9. [Task 6: Static/Legal Pages](#task-6-staticlegal-pages)
10. [Task 7: Cleanup & Dependency Removal](#task-7-cleanup--dependency-removal)
11. [Task 8: New Features (Bookmarks)](#task-8-new-features-bookmarks)
12. [File Mapping Reference](#file-mapping-reference)
13. [Commit Checkpoint Plan](#commit-checkpoint-plan)
14. [Constraints & Rules](#constraints--rules)

---

## Overview

### Current State
- **UI framework**: MUI Material v7.3.7 + Emotion (304 MUI imports across 54 files)
- **Styling**: Zero CSS/Tailwind infrastructure — all styling via MUI `sx` prop and Emotion
- **Components**: 38 `.tsx` files in `src/components/`
- **Pages**: 18 page files (15 real + 3 test pages)
- **Provider chain**: `SessionProvider > ThemeProvider(MUI) > ApolloProvider > NextIntlClientProvider > Layout`

### Target State
- **UI framework**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Styling**: CSS-first config in `globals.css`, utility classes, `cn()` helper
- **Icons**: lucide-react (replacing @mui/icons-material)
- **Theme**: Swiss red/alpine blue design tokens, dark mode via `.dark` class
- **Same provider chain** minus MUI: `SessionProvider > ThemeProvider(CSS class) > ApolloProvider > NextIntlClientProvider > Layout`

### What We Keep (NOT migrating)
- All GraphQL modules (`src/graphql/`) — untouched
- All hooks (`src/hooks/`) — untouched (useMe, useExpressions, etc.)
- Prisma schema + API routes — untouched
- i18n config + message files — untouched
- `src/config/cantons.ts` — untouched (canton data/colors)
- `src/components/maps/SwitzerlandMap.tsx` — keep logic, restyle containers only
- `src/components/providers/SessionProvider.tsx` — untouched
- `src/components/providers/ApolloProvider.tsx` — untouched

### What v0 Got Right (adapt with our data layer)
- Home page layout: Search + "Add Expression" + filter popover + feed
- Expression card: title > canton badges + bookmark > definition > type/gender/language > examples > author + like/dislike
- Profile: initials avatar, inline name/bio editing, 3 tabs (expressions, favorites, admin)
- Sign-in: Google OAuth button + subordinate dev credentials
- Navbar: minimal — logo, search, Sprachatlas, Add New, dark mode, user menu
- Mobile: hamburger > right-side Sheet drawer
- Dark mode: class strategy, localStorage persist
- All legal/static pages
- Data model types match our Prisma schema

### What v0 Needs Adaptation
1. **Routes**: v0 uses `app/page.tsx` — we use `app/[locale]/page.tsx`
2. **Imports**: v0 uses `next/link` — we use `@/i18n/navigation` (Link, useRouter, etc.)
3. **Auth**: v0 uses mock `IS_LOGGED_IN` / `CURRENT_USER` — we use `useMe()` hook + `next-auth`
4. **Data**: v0 uses mock arrays — we use Apollo GraphQL queries/mutations
5. **i18n**: v0 hardcodes English — we use `useTranslations()` from `next-intl`
6. **CSS**: Two v0 CSS files to merge into one Tailwind v4 `globals.css`
7. **Missing pages**: No `account/favorites`, no `welcome` page in v0
8. **Sprachatlas**: v0 uses mock SVG — we have real GeoJSON `SwitzerlandMap` component
9. **ExpressionForm**: v0 shows 10 cantons — must show all 26
10. **Unused primitives**: ~25 of 50 shadcn primitives are never imported — skip those

---

## Migration Phases

```
Phase 1: Foundation (Tasks 0-1)    — Install Tailwind, swap theme provider
Phase 2: Shell (Task 2)            — Navbar, Footer, Layout
Phase 3: Components (Tasks 3-4)    — shadcn primitives + expression components
Phase 4: Pages (Tasks 5-6)         — Core pages + static pages
Phase 5: Cleanup (Task 7)          — Remove MUI/Emotion, delete old files
Phase 6: New Features (Task 8)     — Bookmark model + favorites page
```

Each phase ends with a **commit checkpoint** where build + lint + types must pass.

---

## Task 0: Infrastructure

**Goal**: Install Tailwind CSS v4, PostCSS, shadcn utilities, and create the base CSS config.
**Estimated files changed**: 4 new, 1 modified
**Commit checkpoint**: Yes

### Steps

#### 0.1 Install dependencies

```bash
# Core Tailwind v4
yarn add tailwindcss @tailwindcss/postcss postcss

# shadcn utilities
yarn add class-variance-authority clsx tailwind-merge

# Animation plugin
yarn add tailwindcss-animate

# Icons (replaces @mui/icons-material)
yarn add lucide-react
```

#### 0.2 Create PostCSS config

**New file**: `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

#### 0.3 Create globals.css

**New file**: `src/app/globals.css`

Tailwind v4 CSS-first config (NO `tailwind.config.ts` file):
```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-success: hsl(var(--success));
  --color-success-foreground: hsl(var(--success-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 15% 10%;
    --card: 0 0% 99%;
    --card-foreground: 220 15% 10%;
    --popover: 0 0% 99%;
    --popover-foreground: 220 15% 10%;
    --primary: 0 80% 50%;          /* Swiss red */
    --primary-foreground: 0 0% 100%;
    --secondary: 210 60% 45%;      /* Alpine blue */
    --secondary-foreground: 0 0% 100%;
    --muted: 220 10% 96%;
    --muted-foreground: 220 10% 45%;
    --accent: 220 10% 96%;
    --accent-foreground: 220 15% 10%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;
    --border: 220 10% 90%;
    --input: 220 10% 90%;
    --ring: 0 80% 50%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 220 15% 10%;
    --foreground: 220 10% 95%;
    --card: 220 15% 13%;
    --card-foreground: 220 10% 95%;
    --popover: 220 15% 13%;
    --popover-foreground: 220 10% 95%;
    --primary: 0 80% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 60% 45%;
    --secondary-foreground: 0 0% 100%;
    --muted: 220 15% 18%;
    --muted-foreground: 220 10% 60%;
    --accent: 220 15% 18%;
    --accent-foreground: 220 10% 95%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;
    --border: 220 15% 22%;
    --input: 220 15% 22%;
    --ring: 0 80% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground transition-colors duration-200;
  }
}
```

#### 0.4 Create cn() utility

**New file**: `src/lib/utils.ts`
```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### 0.5 Import globals.css in root layout

**Modify**: `src/app/[locale]/layout.tsx`
- Add `import "@/app/globals.css"` at top
- (MUI imports still present at this stage — that's fine, both coexist temporarily)

#### 0.6 Verify

- `yarn build` passes
- `yarn lint` passes
- `yarn check:types` passes
- Tailwind classes render correctly (quick manual check)

---

## Task 1: Theme Provider Swap

**Goal**: Replace MUI ThemeProvider + Emotion + CssBaseline with a CSS class-based dark mode provider.
**Estimated files changed**: 2 modified
**Commit checkpoint**: Yes

### Steps

#### 1.1 Rewrite ThemeProvider

**Modify**: `src/components/providers/ThemeProvider.tsx`

Replace MUI theme with a simple dark mode class toggler:
```tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

type ColorMode = "light" | "dark" | "system"

interface ColorSchemeContextType {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  resolvedMode: "light" | "dark"
}

const ColorSchemeContext = createContext<ColorSchemeContextType>({
  mode: "light",
  setMode: () => {},
  resolvedMode: "light",
})

export const useColorScheme = () => useContext(ColorSchemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("colorMode") as ColorMode | null
    if (saved) setModeState(saved)
  }, [])

  const setMode = (newMode: ColorMode) => {
    setModeState(newMode)
    localStorage.setItem("colorMode", newMode)
  }

  const resolvedMode = (() => {
    if (!mounted) return "light"
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return mode
  })()

  // Toggle .dark class on <html>
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle("dark", resolvedMode === "dark")
  }, [resolvedMode, mounted])

  return (
    <ColorSchemeContext.Provider value={{ mode, setMode, resolvedMode }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}
```

**Key changes**:
- Remove ALL MUI/Emotion imports (`createTheme`, `MuiThemeProvider`, `CssBaseline`, `AppRouterCacheProvider`)
- Keep `useColorScheme` export API identical (existing consumers don't break)
- Add `resolvedMode` to context (useful for components that need to know)
- Toggle `.dark` class on `<html>` element

#### 1.2 Update root layout

**Modify**: `src/app/[locale]/layout.tsx`
- Remove `<meta name="emotion-insertion-point" content="" />` from `<head>`
- Remove Roboto font import (v0 design doesn't use it — we'll use system font stack via Tailwind)
- Or: keep a Google font but switch to Inter (common with Tailwind/shadcn)

#### 1.3 Verify

- `yarn build` passes
- `yarn check:types` passes
- Dark mode toggles correctly via existing `ColorSchemeToggle` component
- No MUI `CssBaseline` means we rely on Tailwind's preflight — verify base styles look right

---

## Task 2: Layout Shell

**Goal**: Replace Navbar, Footer, and Layout with v0 versions wired to our auth, i18n, and routing.
**Estimated files changed**: 5-7 modified/new
**Commit checkpoint**: Yes

### Steps

#### 2.1 New Navbar

**Replace**: `src/components/layout/Navbar.tsx`
**Source**: `v0/components/layout/navbar.tsx` + `v0/components/layout/mobile-drawer.tsx`

Adaptations required:
- `import Link from "next/link"` -> `import { Link } from "@/i18n/navigation"`
- `import { useRouter } from "next/navigation"` -> `import { useRouter } from "@/i18n/navigation"`
- Mock `IS_LOGGED_IN` / `CURRENT_USER` -> `useMe()` hook from `@/hooks/useUsers`
- Hardcoded strings -> `useTranslations("Navbar")` calls
- `signIn()` / `signOut()` -> `signIn("google")` / `signOut()` from `next-auth/react`
- Hardcoded routes (`/expressions/new`) -> locale-aware (`/expressions/new` via i18n Link)
- Search component -> integrate with existing `SearchExpressionsInput` logic or adapt v0's search
- Admin check: `me?.role === "ADMIN"` for showing admin menu items

Components to create/move:
- `src/components/layout/Navbar.tsx` (main navbar)
- `src/components/layout/MobileDrawer.tsx` (Sheet-based mobile nav)

#### 2.2 New Footer

**Replace**: `src/components/layout/Footer.tsx`
**Source**: `v0/components/layout/footer.tsx`

Adaptations:
- Link imports -> `@/i18n/navigation`
- Hardcoded strings -> `useTranslations("Footer")`
- Keep existing footer link structure (about, tos, privacy, dmca, accessibility, contact, bug-report)

#### 2.3 Simplify Layout

**Modify**: `src/components/layout/Layout.tsx`
**Source**: Reference `v0/components/layout/` structure

Current Layout uses MUI `Box`. Replace with:
```tsx
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

#### 2.4 New ColorSchemeToggle

**Replace**: `src/components/ui/ColorSchemeToggle.tsx`
**Source**: `v0/components/theme-provider.tsx` (dark mode toggle portion)

Replace MUI `IconButton` + MUI icons with lucide-react `Sun`/`Moon` icons + Tailwind button styling.

#### 2.5 Update i18n messages

**Modify**: `src/messages/{de,en,fr}.json`
- Add keys for any new navbar/footer strings introduced by v0 design

#### 2.6 Delete old files

- Remove `src/components/ui/Toggler.tsx` (MUI-based, no longer needed)
- Remove `src/components/ui/NewExpressionButton.tsx` (integrated into navbar now)

#### 2.7 Verify

- `yarn build` passes
- Navbar renders with logo, search, nav links, dark mode toggle, user menu
- Mobile hamburger opens Sheet drawer
- All nav links work (locale-aware routing)
- Footer renders all legal links
- Dark mode toggle works

---

## Task 3: shadcn/ui Primitives

**Goal**: Install ONLY the shadcn/ui primitives that are actually used by v0's components.
**Estimated files changed**: ~22 new files in `src/components/ui/`
**Commit checkpoint**: Yes

### Primitives to Install (actually imported by v0 components)

These are the Radix-based primitives referenced in v0's non-UI components:

| Primitive | Radix Package | Used By |
|-----------|--------------|---------|
| `avatar` | `@radix-ui/react-avatar` | profile-header |
| `badge` | (no radix, pure CVA) | expression-card, filter tags |
| `button` | `@radix-ui/react-slot` | everywhere |
| `card` | (no radix, pure div) | expression-card, pages |
| `checkbox` | `@radix-ui/react-checkbox` | expression-form |
| `dialog` | `@radix-ui/react-dialog` | confirmations |
| `dropdown-menu` | `@radix-ui/react-dropdown-menu` | user menu in navbar |
| `input` | (native input) | search, forms |
| `label` | `@radix-ui/react-label` | forms |
| `popover` | `@radix-ui/react-popover` | filter popover on home |
| `select` | `@radix-ui/react-select` | canton select, type select |
| `separator` | `@radix-ui/react-separator` | visual dividers |
| `sheet` | `@radix-ui/react-dialog` | mobile drawer |
| `skeleton` | (pure div) | loading states |
| `switch` | `@radix-ui/react-switch` | dark mode toggle |
| `table` | (native table) | admin users tab |
| `tabs` | `@radix-ui/react-tabs` | profile page |
| `textarea` | (native textarea) | definition input |
| `toast` / `toaster` | `@radix-ui/react-toast` | success/error notifications |
| `toggle` | `@radix-ui/react-toggle` | filter toggles |
| `tooltip` | `@radix-ui/react-tooltip` | icon tooltips |

### Primitives to SKIP (not imported anywhere)

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `breadcrumb`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `drawer`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `progress`, `radio-group`, `resizable`, `scroll-area`, `sidebar`, `slider`, `sonner`, `toggle-group`

### Steps

#### 3.1 Create shadcn components.json

**New file**: `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Note: `tailwind.config` is empty string because Tailwind v4 uses CSS-first config.

#### 3.2 Install Radix packages (only used ones)

```bash
yarn add @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot \
  @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast \
  @radix-ui/react-toggle @radix-ui/react-tooltip
```

#### 3.3 Copy shadcn primitives from v0

For each primitive in the "Install" list:
1. Copy from `v0/components/ui/{name}.tsx` to `src/components/ui/{name}.tsx`
2. Verify the `cn()` import resolves to `@/lib/utils`
3. No modifications needed — these are pure UI primitives with no business logic

#### 3.4 Copy toast hook

**New file**: `src/hooks/use-toast.ts` (from `v0/components/ui/use-toast.ts`)

#### 3.5 Rename/remove conflicting files

Current files that conflict with shadcn naming:
- `src/components/ui/Card.tsx` (MUI-based) -> will be replaced by shadcn `card.tsx`
- `src/components/ui/Accordion.tsx` (MUI-based) -> delete (not in shadcn install list)
- `src/components/ui/Pagination.tsx` (MUI-based) -> keep for now, migrate in Task 5

#### 3.6 Verify

- `yarn check:types` passes (all imports resolve)
- `yarn build` passes
- Primitives can be imported (quick smoke test)

---

## Task 4: Expression Components

**Goal**: Migrate all expression-related components (card, feed, form, detail) from MUI to Tailwind + shadcn.
**Estimated files changed**: ~15 modified/replaced
**Commit checkpoint**: Yes

### Steps

#### 4.1 ExpressionCard

**Replace**: `src/components/expression/ExpressionCard.tsx`
**Source**: `v0/components/expressions/expression-card.tsx`

Adaptations:
- Mock data props -> Apollo query result types (`Expression` from generated GraphQL types)
- `Link` -> `@/i18n/navigation` Link
- Mock like/dislike -> `useLikeExpression()` / `useDislikeExpression()` from `useExpressions` hook
- Mock bookmark -> bookmark mutation (Task 8) or placeholder
- Canton badges -> use `src/config/cantons.ts` for colors/names
- `useTranslations("ExpressionCard")` for i18n strings

Sub-components to migrate:
- `ExpressionCardActionButton.tsx` -> inline into card or adapt with lucide icons
- `ExpressionCardExamples.tsx` -> adapt v0's example display
- `ExpressionCardSynonyms.tsx` -> adapt with Tailwind
- `ExpressionCardShareButtons.tsx` -> adapt (keep `react-share`, replace MUI icons with lucide)
- `ExpressionCardContentList.tsx` -> simplify with Tailwind
- `ExpressionCardSkeleton.tsx` -> replace with shadcn `Skeleton` primitive

#### 4.2 ExpressionFeed

**New file**: `src/components/expression/ExpressionFeed.tsx`
**Source**: `v0/components/expressions/expression-feed.tsx`

Adaptations:
- Mock expression array -> `useExpressions()` hook with Apollo
- Infinite scroll or pagination -> keep existing `usePaginationState` hook
- Loading state -> shadcn Skeleton

#### 4.3 ExpressionDetail

**New file**: `src/components/expression/ExpressionDetail.tsx`
**Source**: `v0/components/expressions/expression-detail.tsx`

Adaptations:
- Same as card but expanded view
- Edit/delete buttons -> wired to our mutations
- Route -> `expressions/[id]` page will use this

#### 4.4 ExpressionForm (New + Edit)

**Replace**: Expression input components
**Source**: `v0/components/expressions/expression-form.tsx`

Current input components to consolidate:
- `ExpressionInput.tsx` -> text input (shadcn Input)
- `ExpressionDefinitionInput.tsx` -> textarea (shadcn Textarea)
- `ExpressionTypeInput.tsx` -> select (shadcn Select)
- `ExpressionGenderInput.tsx` -> button group (shadcn Toggle/RadioGroup)
- `ExpressionExampleInput.tsx` -> dynamic list (custom with shadcn Input + Button)

Adaptations:
- v0 shows 10 cantons for examples -> must show ALL 26 from `cantons.ts`
- Form validation -> keep existing zod/form logic
- Submit -> keep existing `useCreateExpression()` / `useUpdateExpression()` mutations

#### 4.5 LikeDislikeButtons

**New file**: `src/components/expression/LikeDislikeButtons.tsx`
**Source**: `v0/components/expressions/like-dislike-buttons.tsx`

Adaptations:
- Mock state -> `useLikeExpression()` / `useDislikeExpression()` hooks
- Icons: `ThumbsUp` / `ThumbsDown` from lucide-react

#### 4.6 BookmarkButton (placeholder)

**New file**: `src/components/expression/BookmarkButton.tsx`
**Source**: `v0/components/expressions/bookmark-button.tsx`

- Wire to bookmark mutation (created in Task 8)
- For now: UI-only with TODO comment for backend wiring

#### 4.7 Delete old expression components

After migration, delete:
- `ExpressionCardV2.tsx` (experimental MUI version)
- Old MUI-based versions of the above files

#### 4.8 Verify

- `yarn build` passes
- `yarn check:types` passes
- Expression cards render correctly with real data
- Like/dislike works
- Share buttons work

---

## Task 5: Core Pages

**Goal**: Migrate all main application pages from MUI to Tailwind.
**Estimated files changed**: ~8 modified
**Commit checkpoint**: Yes

### Steps

#### 5.1 Home Page

**Modify**: `src/app/[locale]/page.tsx`
**Source**: `v0/app/page.tsx`

Adaptations:
- Remove MUI imports (Box, Stack, Select, MenuItem, FormControl, InputLabel)
- Replace with Tailwind layout + shadcn components
- Search bar -> v0's `SearchBar` component adapted with our `SearchExpressionsInput` logic
- Filter popover -> v0's `FilterPopover` adapted with our canton/type/language data
- Expression feed -> `ExpressionFeed` component from Task 4
- "Add Expression" CTA -> lucide `Plus` icon + shadcn Button
- Sorting -> shadcn Select

#### 5.2 Sign-in Page

**Modify**: `src/app/[locale]/auth/signin/page.tsx`
**Source**: `v0/app/auth/signin/page.tsx`

Adaptations:
- Remove MUI imports
- Google sign-in button -> `signIn("google")` from next-auth
- Dev credentials -> keep for development, style with shadcn
- Remove `GoogleIcon` from MUI -> use inline SVG or lucide icon

#### 5.3 Profile Page

**Modify**: `src/app/[locale]/account/profile/page.tsx`
**Source**: `v0/app/profile/page.tsx` + `v0/components/profile/*`

Adaptations:
- Remove MUI imports (Tabs, Tab, Avatar, Table, etc.)
- Initials avatar (no image upload — per constraint)
- Inline name/bio editing -> `useUpdateUser()` mutation
- Tab 1: My expressions -> `ExpressionCardsList` with user filter
- Tab 2: Favorites -> placeholder (until Task 8)
- Tab 3: Admin users (if admin) -> shadcn Table + existing `useAdminUsers()` hook
- Use shadcn Tabs, Avatar, Card, Input, Button

#### 5.4 Expression Detail Page

**Modify**: `src/app/[locale]/expressions/[id]/page.tsx`
**Source**: `v0/app/expressions/[id]/page.tsx`

- Remove MUI Stack/CircularProgress
- Use `ExpressionDetail` component from Task 4
- Loading -> shadcn Skeleton

#### 5.5 Expression Edit Page

**Modify**: `src/app/[locale]/expressions/[id]/edit/page.tsx`

- Remove MUI imports
- Use `ExpressionForm` from Task 4 in edit mode
- Keep existing mutation logic

#### 5.6 New Expression Page

**Modify**: `src/app/[locale]/expressions/new/page.tsx`

- Remove MUI imports (Stack, CircularProgress, Button, Box, FormHelperText, Alert)
- Use `ExpressionForm` from Task 4 in create mode

#### 5.7 Sprachatlas Page

**Modify**: `src/app/[locale]/sprachatlas/page.tsx`

- Remove MUI imports (Stack, Box, Typography, Select, MenuItem, etc.)
- Keep `SwitzerlandMap` component (restyle container only — remove MUI Box/Typography wrappers)
- Keep `DialectDistributionMap` component (same treatment)
- Replace MUI Select with shadcn Select for expression selector
- Replace MUI List with Tailwind-styled list for expression results

#### 5.8 Welcome Page

**Modify**: `src/app/[locale]/account/welcome/page.tsx`

- Remove MUI imports
- Restyle with Tailwind + shadcn Card/Input/Button

#### 5.9 Search Component

**Replace**: `src/components/ui/SearchExpressionsInput.tsx`
**Source**: `v0/components/search/search-bar.tsx`

Adaptations:
- Keep existing autocomplete/search logic (Apollo query for expression search)
- Replace MUI Autocomplete with custom Tailwind dropdown
- Or: use shadcn Command/Combobox pattern for typeahead

#### 5.10 Locale Selector

**Replace**: `src/components/ui/SelectLocale.tsx`

- Remove MUI FormControl/Select/MenuItem
- Replace with shadcn DropdownMenu or Select
- Keep `useRouter`/`usePathname` from `@/i18n/navigation`

#### 5.11 Pagination

**Replace**: `src/components/ui/Pagination.tsx`

- Remove MUI Pagination/Select
- Replace with Tailwind-styled pagination (simple prev/next + page numbers)
- Keep `usePaginationState` hook

#### 5.12 Verify

- `yarn build` passes
- All pages render and function correctly
- Navigation between pages works
- Forms submit correctly
- Search works

---

## Task 6: Static/Legal Pages

**Goal**: Migrate all static content pages from MUI to Tailwind.
**Estimated files changed**: 6 modified
**Commit checkpoint**: Yes

These are straightforward — each is a simple MUI Stack/Card/Typography layout.

### Pages to Migrate

| Page | File | MUI Imports to Remove |
|------|------|-----------------------|
| About | `src/app/[locale]/about/page.tsx` | Stack, Typography, Card, CardContent, Link |
| Terms of Service | `src/app/[locale]/tos/page.tsx` | Stack, Typography, Card, CardContent, Box |
| Privacy Policy | `src/app/[locale]/privacy-policy/page.tsx` | Stack, Typography, Card, CardContent, Box |
| DMCA | `src/app/[locale]/dmca/page.tsx` | Stack, Typography, Card, CardContent |
| Accessibility | `src/app/[locale]/accessibility/page.tsx` | Stack, Typography, Card, CardContent, Box, Link |
| Contact Us | `src/app/[locale]/contact-us/page.tsx` | Stack, Typography, Card, CardContent, TextField, Button |
| Bug Report | `src/app/[locale]/bug-report/page.tsx` | Stack, Typography, Card, CardContent, TextField, Button |

### Pattern for Each

Replace MUI layout with:
```tsx
<div className="container mx-auto max-w-3xl px-4 py-8 space-y-6">
  <h1 className="text-3xl font-bold">Page Title</h1>
  <Card>
    <CardContent className="prose dark:prose-invert">
      {/* content */}
    </CardContent>
  </Card>
</div>
```

For Contact Us and Bug Report (which have forms):
- Replace MUI `TextField` -> shadcn `Input` / `Textarea`
- Replace MUI `Button` -> shadcn `Button`

### Verify

- `yarn build` passes
- All static pages render correctly

---

## Task 7: Cleanup & Dependency Removal

**Goal**: Remove all MUI and Emotion dependencies, delete unused files, verify clean build.
**Estimated files changed**: ~10 deleted, 1 modified (package.json)
**Commit checkpoint**: Yes

### Steps

#### 7.1 Final MUI import sweep

```bash
grep -r "@mui" src/
```

If ANY `@mui` imports remain, they were missed — fix them first.

#### 7.2 Remove MUI + Emotion packages

```bash
yarn remove @emotion/cache @emotion/react @emotion/styled \
  @mui/icons-material @mui/material @mui/material-nextjs
```

#### 7.3 Delete obsolete component files

Files to delete (if not already removed in prior tasks):
- `src/components/ui/Card.tsx` (old MUI Card wrapper)
- `src/components/ui/Accordion.tsx` (MUI Accordion)
- `src/components/ui/Toggler.tsx` (MUI Box toggler)
- `src/components/ui/NewExpressionButton.tsx` (integrated into navbar)
- `src/components/ui/Flag.tsx` (if replaced by emoji/inline)
- `src/components/ui/DebouncedTextarea.tsx` (if replaced by shadcn Textarea)
- `src/components/expression/ExpressionCardV2.tsx` (experimental)

#### 7.4 Delete test pages

- `src/app/[locale]/test-cards/page.tsx`
- `src/app/[locale]/test-map/page.tsx`
- `src/app/[locale]/test-auth/page.tsx`

These were development test pages — no longer needed.

#### 7.5 Clean up unused imports

Run through all files and remove any orphaned imports.

#### 7.6 Verify (CRITICAL)

- `yarn build` passes (zero MUI references)
- `yarn lint` passes
- `yarn check:types` passes
- `grep -r "@mui" src/` returns NOTHING
- `grep -r "@emotion" src/` returns NOTHING
- All pages functional (manual spot-check)

---

## Task 8: New Features (Bookmarks)

**Goal**: Add bookmark/favorites system — Prisma model, GraphQL module, UI integration.
**Estimated files changed**: ~8 new, ~4 modified
**Commit checkpoint**: Yes

### Steps

#### 8.1 Prisma Bookmark Model

**Modify**: `prisma/schema.prisma`

```prisma
model Bookmark {
  expression   Expression @relation(fields: [expressionId], references: [id], onDelete: Cascade)
  expressionId String
  author       User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId     String
  createdAt    DateTime   @default(now())

  @@id([expressionId, authorId])
  @@unique([expressionId, authorId])
}
```

Add relations to existing models:
- `Expression`: add `bookmarks Bookmark[]`
- `User`: add `bookmarks Bookmark[]`

**CONSTRAINT**: MUST NOT break existing production DB. Use `prisma migrate dev` with additive migration only.

#### 8.2 Run Migration

```bash
yarn prisma:migrate
# Migration name: add-bookmark-model
yarn prisma:generate
```

#### 8.3 GraphQL Bookmark Module

**New files**:
- `src/graphql/bookmark/index.ts` (barrel export)
- `src/graphql/bookmark/bookmark.object.ts` (Pothos object type)
- `src/graphql/bookmark/bookmark.query.ts` (myBookmarks query)
- `src/graphql/bookmark/bookmark.mutation.ts` (toggleBookmark mutation)

Follow existing pattern from `src/graphql/like/` — it's the same structure (user + expression composite key).

#### 8.4 Wire BookmarkButton Component

**Modify**: `src/components/expression/BookmarkButton.tsx` (from Task 4 placeholder)

- Add `useBookmark()` hook in `src/hooks/useBookmarks.ts`
- Wire `toggleBookmark` mutation
- Show filled/empty bookmark icon based on state

#### 8.5 Add Favorites Tab to Profile

**Modify**: Profile page (from Task 5)

- Tab 2 "Favorites" -> query `myBookmarks`, render as `ExpressionCard` list

#### 8.6 Optional: Favorites Page

**New file**: `src/app/[locale]/account/favorites/page.tsx`

- Full-page view of bookmarked expressions
- Reuse `ExpressionFeed` with bookmark filter

#### 8.7 Verify

- `yarn prisma:generate` succeeds
- `yarn build` passes
- Bookmark toggle works (adds/removes)
- Favorites tab shows bookmarked expressions
- No existing data affected

---

## File Mapping Reference

### Components: Current -> New

| Current File | Action | New Source |
|-------------|--------|-----------|
| `components/layout/Navbar.tsx` | Replace | v0 `layout/navbar.tsx` + `mobile-drawer.tsx` |
| `components/layout/Footer.tsx` | Replace | v0 `layout/footer.tsx` |
| `components/layout/Layout.tsx` | Simplify | Tailwind flex layout |
| `components/providers/ThemeProvider.tsx` | Rewrite | CSS class-based dark mode |
| `components/providers/SessionProvider.tsx` | Keep | — |
| `components/providers/ApolloProvider.tsx` | Keep | — |
| `components/ui/ColorSchemeToggle.tsx` | Replace | lucide Sun/Moon + Tailwind |
| `components/ui/SearchExpressionsInput.tsx` | Replace | v0 `search/search-bar.tsx` |
| `components/ui/SelectLocale.tsx` | Replace | shadcn Select |
| `components/ui/Pagination.tsx` | Replace | Tailwind pagination |
| `components/ui/Card.tsx` | Delete | shadcn `card.tsx` |
| `components/ui/Accordion.tsx` | Delete | Not needed |
| `components/ui/Toggler.tsx` | Delete | Not needed |
| `components/ui/NewExpressionButton.tsx` | Delete | Integrated in navbar |
| `components/ui/DebouncedTextarea.tsx` | Replace | shadcn Textarea |
| `components/ui/Flag.tsx` | Evaluate | Keep if useful, remove Tooltip MUI dep |
| `components/ui/Logo.tsx` | Modify | Remove MUI Avatar |
| `components/ui/Select/SelectLetter.tsx` | Replace | Tailwind grid + shadcn styling |
| `components/ui/Autocomplete/*` | Replace | shadcn Select/Combobox pattern |
| `components/expression/ExpressionCard.tsx` | Replace | v0 `expressions/expression-card.tsx` |
| `components/expression/ExpressionCardV2.tsx` | Delete | Superseded |
| `components/expression/ExpressionCardSkeleton.tsx` | Replace | shadcn Skeleton |
| `components/expression/ExpressionCardActionButton.tsx` | Replace | Inline in new card |
| `components/expression/ExpressionCardExamples.tsx` | Replace | Inline in new card |
| `components/expression/ExpressionCardSynonyms.tsx` | Replace | Inline in new card |
| `components/expression/ExpressionCardShareButtons.tsx` | Adapt | Keep react-share, use lucide icons |
| `components/expression/ExpressionCardContentList.tsx` | Replace | Tailwind list |
| `components/expression/ExpressionCardsList.tsx` | Replace | v0 `expressions/expression-feed.tsx` |
| `components/expression/ExpressionInput.tsx` | Replace | Part of ExpressionForm |
| `components/expression/ExpressionDefinitionInput.tsx` | Replace | Part of ExpressionForm |
| `components/expression/ExpressionTypeInput.tsx` | Replace | Part of ExpressionForm |
| `components/expression/ExpressionGenderInput.tsx` | Replace | Part of ExpressionForm |
| `components/expression/ExpressionExampleInput.tsx` | Replace | Part of ExpressionForm |
| `components/maps/SwitzerlandMap.tsx` | Modify | Remove MUI wrappers only |
| `components/maps/DialectDistributionMap.tsx` | Modify | Remove MUI wrappers only |

### Pages: Current -> Action

| Current Page | Action | Notes |
|-------------|--------|-------|
| `[locale]/page.tsx` (Home) | Rewrite | v0 home + our data layer |
| `[locale]/auth/signin/page.tsx` | Rewrite | v0 signin + next-auth |
| `[locale]/account/profile/page.tsx` | Rewrite | v0 profile + our hooks |
| `[locale]/account/welcome/page.tsx` | Restyle | Remove MUI, add Tailwind |
| `[locale]/expressions/new/page.tsx` | Restyle | Use new ExpressionForm |
| `[locale]/expressions/[id]/page.tsx` | Restyle | Use new ExpressionDetail |
| `[locale]/expressions/[id]/edit/page.tsx` | Restyle | Use new ExpressionForm |
| `[locale]/sprachatlas/page.tsx` | Restyle | Remove MUI, keep map logic |
| `[locale]/about/page.tsx` | Restyle | Simple Tailwind layout |
| `[locale]/tos/page.tsx` | Restyle | Simple Tailwind layout |
| `[locale]/privacy-policy/page.tsx` | Restyle | Simple Tailwind layout |
| `[locale]/dmca/page.tsx` | Restyle | Simple Tailwind layout |
| `[locale]/accessibility/page.tsx` | Restyle | Simple Tailwind layout |
| `[locale]/contact-us/page.tsx` | Restyle | shadcn form components |
| `[locale]/bug-report/page.tsx` | Restyle | shadcn form components |
| `[locale]/test-cards/page.tsx` | Delete | Dev test page |
| `[locale]/test-map/page.tsx` | Delete | Dev test page |
| `[locale]/test-auth/page.tsx` | Delete | Dev test page |
| `[locale]/account/favorites/page.tsx` | **New** | Task 8 |

---

## Commit Checkpoint Plan

| # | After Task | Commit Message | Validation |
|---|-----------|----------------|------------|
| 1 | Task 0 | `feat: add Tailwind CSS v4 infrastructure and globals.css` | build, lint, types |
| 2 | Task 1 | `refactor: replace MUI ThemeProvider with CSS class-based dark mode` | build, lint, types, dark mode works |
| 3 | Task 2 | `feat: migrate layout shell (Navbar, Footer) to Tailwind + shadcn` | build, lint, types, navigation works |
| 4 | Task 3 | `feat: add shadcn/ui primitives (22 components)` | build, types |
| 5 | Task 4 | `feat: migrate expression components to Tailwind + shadcn` | build, types, cards render |
| 6 | Task 5 | `feat: migrate core pages to Tailwind + shadcn` | build, types, all pages work |
| 7 | Task 6 | `feat: migrate static/legal pages to Tailwind` | build, types |
| 8 | Task 7 | `chore: remove MUI/Emotion dependencies, delete obsolete files` | build, lint, types, zero MUI refs |
| 9 | Task 8 | `feat: add bookmark/favorites system` | build, types, bookmarks work |

---

## Constraints & Rules

1. **Never break the production database** — only additive Prisma migrations
2. **Never access .env files** — only `.env.example`; ask user to populate secrets
3. **Never merge to main** — all work on `nextjs-16-fresh-start` branch
4. **No user image upload** — keep DB field, use initials avatar only
5. **Selective integration** — adapt v0 output to our data layer, never copy blindly
6. **Install only what's used** — skip unused shadcn primitives and Radix packages
7. **Preserve existing functionality** — auth flow, GraphQL, i18n, routing must continue working
8. **Each task must end with passing build** — no broken intermediate states
9. **MUI and Tailwind coexist temporarily** — until Task 7 removes MUI entirely
10. **All strings must be i18n-ready** — use `useTranslations()`, no hardcoded user-facing text

---

## Dependencies Between Tasks

```
Task 0 ─── required by all ───> Tasks 1-8
Task 1 ─── required by ──────> Task 2 (layout needs new ThemeProvider)
Task 2 ─── required by ──────> Task 5 (pages need new layout)
Task 3 ─── required by ──────> Tasks 4, 5, 6 (components use shadcn primitives)
Task 4 ─── required by ──────> Task 5 (pages use expression components)
Tasks 4-6 ── required by ────> Task 7 (can't remove MUI until all migrated)
Task 7 ─── independent of ──> Task 8 (but 8 is easier after 7)
```

Minimum viable order: `0 -> 1 -> 3 -> 2 -> 4 -> 5 -> 6 -> 7 -> 8`

Tasks 5 and 6 can be done in parallel if desired.
Task 8 can be started any time after Task 3 (backend work doesn't need MUI removal).
