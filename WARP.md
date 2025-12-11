# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Payload CMS 3.x** project integrated with **Next.js 15**, serving as a backoffice/admin system for julie-nutrition. It uses PostgreSQL as the database (via `@payloadcms/db-postgres`) and includes both a headless CMS admin panel and a frontend application.

## Common Commands

### Development
```bash
pnpm install          # Install dependencies
pnpm dev             # Start development server on http://localhost:3000
pnpm devsafe         # Clean .next directory and start dev server (use when having cache issues)
```

### Building & Production
```bash
pnpm build           # Build for production (requires 8GB heap)
pnpm start           # Start production server
```

### Code Quality
```bash
pnpm lint            # Run ESLint
```

### Testing
```bash
pnpm test            # Run all tests (integration + e2e)
pnpm test:int        # Run integration tests only (Vitest)
pnpm test:e2e        # Run end-to-end tests only (Playwright)
```

### Payload CLI
```bash
pnpm payload generate:types      # Regenerate TypeScript types from Payload config
pnpm payload generate:importmap  # Generate import map for admin panel
pnpm payload                     # Access Payload CLI commands
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.65.0
- **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
- **Rich Text Editor**: Lexical
- **Image Processing**: Sharp
- **Languages**: TypeScript (ES2022), French (primary) and English

### Directory Structure

```
src/
├── app/
│   ├── (frontend)/        # Public-facing Next.js pages
│   │   ├── page.tsx       # Homepage
│   │   └── layout.tsx
│   ├── (payload)/         # Payload CMS routes
│   │   ├── admin/         # Admin panel UI (auto-generated)
│   │   └── api/           # API routes (REST + GraphQL)
│   └── my-route/          # Custom API routes
├── collections/           # Payload collection schemas
│   ├── Users.ts          # Auth-enabled user collection
│   ├── Media.ts          # Upload-enabled media collection
│   └── Offer.ts          # Custom business collection
├── payload.config.ts      # Main Payload configuration
└── payload-types.ts       # Auto-generated TypeScript types
```

### Key Concepts

**Route Groups**: Next.js uses route groups to separate concerns:
- `(frontend)` - Public website routes
- `(payload)` - Admin panel and API routes (prefixed with `/admin` and `/api`)

**Payload Collections**: All content types are defined as collections in `src/collections/`. Each collection is a TypeScript file that exports a `CollectionConfig` object defining fields, access control, and admin UI behavior.

**Type Generation**: Payload automatically generates TypeScript types from collection schemas. Run `pnpm payload generate:types` after modifying collections to update `src/payload-types.ts`.

**Path Aliases**:
- `@/*` resolves to `src/*`
- `@payload-config` resolves to `src/payload.config.ts`

**i18n**: The project uses French as the primary language (`fallbackLanguage: 'fr'`) with English support.

### Database Setup

The project requires a PostgreSQL database. Set the connection string in `.env`:
```
DATABASE_URI=postgresql://user:password@host:port/database
PAYLOAD_SECRET=your-secret-key-here
```

Copy `.env.example` to `.env` and fill in your credentials before starting development.

### Admin Panel

Access the Payload admin panel at `http://localhost:3000/admin` after starting the dev server. On first run, you'll be prompted to create an admin user.

### API Endpoints

- REST API: `http://localhost:3000/api/*`
- GraphQL API: `http://localhost:3000/api/graphql`
- GraphQL Playground: `http://localhost:3000/api/graphql-playground`

### Testing Strategy

**Integration Tests** (Vitest): Located in `tests/int/`, these test Payload API functionality directly without a browser. They use `jsdom` environment and run against the actual Payload instance.

**E2E Tests** (Playwright): Located in `tests/e2e/`, these test the full application flow in a Chromium browser. Playwright automatically starts the dev server before running tests.

## Code Style

- **Prettier**: Single quotes, no semicolons, 100 char line width, trailing commas
- **ESLint**: Next.js + TypeScript rules with warnings for unused vars (prefix with `_` to ignore)
- **TypeScript**: Strict mode enabled, ES2022 target

## Common Patterns

### Adding a New Collection

1. Create `src/collections/YourCollection.ts`:
```typescript
import type { CollectionConfig } from 'payload'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
}
```

2. Register in `src/payload.config.ts`:
```typescript
import { YourCollection } from './collections/YourCollection'

export default buildConfig({
  collections: [Users, Media, Offer, YourCollection],
  // ...
})
```

3. Regenerate types: `pnpm payload generate:types`

### Accessing Payload in Next.js

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config: await config })
const items = await payload.find({ collection: 'your-collection' })
```

## Package Manager

This project uses **pnpm** (v9 or v10). The `engines` field enforces this. Do not use npm or yarn.

## Node Version

Required: Node.js ^18.20.2 || >=20.9.0
