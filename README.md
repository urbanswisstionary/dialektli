# Dialektli

A multilingual Swiss dialect expression dictionary.

## What is Dialektli?

Dialektli lets you search, browse, and contribute Swiss German dialect words and phrases. You can filter expressions by canton and language, view how words vary across regions on an interactive dialect atlas map, and interact with entries through likes, bookmarks, and flags. The app supports German, English, and French interfaces with locale-prefixed routes.

## Tech Stack

### Frontend
- Next.js 16 (App Router), React 19
- Tailwind CSS 4, Radix UI
- next-intl (DE/EN/FR), next-themes

### Data
- Apollo Client 4, SWR 2

### Backend
- GraphQL (Apollo Server 5 + Pothos schema builder)
- Prisma 7, PostgreSQL

### Auth
- NextAuth.js 4 (Google, Facebook OAuth + credentials), JWT strategy

### Dev Tools
- TypeScript 5, Oxlint, ESLint 9, Oxfmt
- GraphQL Code Generator, Husky, Turbopack, Yarn 4

## Features

- Multilingual UI in German, English, and French (`/de`, `/en`, `/fr`)
- Filter expressions by any of the 26 Swiss cantons (with multilingual canton names)
- Expression types (NOUN, VERB, ADJ, etc.) with grammatical gender (M/F/N)
- User interactions: like, dislike, bookmark, flag
- Semantic grouping with Sprachatlas-style conceptual categories
- Interactive canton map with zoom and pan
- Dark/light theme
- OAuth and credentials login with role-based access (USER/ADMIN)
- Optional rate limiting via Upstash Redis
- Security headers (CSP, X-Frame-Options, X-Content-Type-Options)

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn 4 (`corepack enable`)
- Docker (for local PostgreSQL)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/urbanswisstionary.git
   cd urbanswisstionary
   ```

2. **Start the local database**

   ```bash
   docker compose up -d
   ```

   This starts a PostgreSQL instance at `postgres://user:password@localhost:5432/urbanswisstionary`.

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values. At minimum you need `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`. See the [Environment Variables](#environment-variables) section below.

4. **Install dependencies**

   ```bash
   yarn install
   ```

5. **Run database migrations**

   ```bash
   yarn prisma:migrate
   ```

6. **Seed the database**

   ```bash
   yarn prisma:seed
   ```

7. **Start the dev server**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The app will redirect to your default locale (e.g. `/de`).

## Available Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start the dev server with Turbopack |
| `yarn build` | Production build (runs Prisma generate + GraphQL codegen, then Next.js build) |
| `yarn start` | Start the production server |
| `yarn lint` | Run Oxlint and ESLint |
| `yarn lint:fix` | Auto-fix lint issues |
| `yarn check:types` | TypeScript type check (no emit) |
| `yarn check:format` | Check formatting with Oxfmt |
| `yarn format` | Auto-format with Oxfmt |
| `yarn prisma:generate` | Regenerate the Prisma client |
| `yarn prisma:studio` | Open Prisma Studio in the browser |
| `yarn prisma:migrate` | Run pending database migrations |
| `yarn prisma:seed` | Seed the database with initial data |
| `yarn codegen` | Regenerate GraphQL types from schema |

## Project Structure

```
src/
  app/
    [locale]/             # All routes are locale-prefixed (/de, /en, /fr)
      sprachatlas/        # Dialect atlas map page
      expressions/        # Expression listing and detail pages
      account/            # User profile
      auth/               # Sign in / sign up
  api/
    graphql/              # Apollo Server GraphQL endpoint
    auth/                 # NextAuth.js API routes
  components/
    expression/           # Expression cards and forms
    layout/               # Header and footer
    map/                  # Interactive canton map component
    ui/                   # Radix UI component wrappers
  graphql/                # Pothos schema definition and modules
  i18n/                   # next-intl configuration
  config/                 # Canton data, app constants
  lib/                    # Prisma client, shared utilities
  generated/              # Auto-generated types — do not edit by hand
prisma/
  schema.prisma           # Database schema
  migrations/             # Migration history
  seed/                   # Seed scripts
messages/
  de.json                 # German translations
  en.json                 # English translations
  fr.json                 # French translations
```

## Contributing

Pull requests are welcome. Before submitting, make sure your changes pass all checks:

```bash
yarn lint
yarn check:types
yarn check:format
```

Fix any issues with `yarn lint:fix` and `yarn format` before opening a PR.
