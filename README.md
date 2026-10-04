# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URI` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## Production

With Doppler configured for this directory, install the locked dependencies and build:

```sh
pnpm install --frozen-lockfile
doppler run -- pnpm build
```

Run the production server with `doppler run -- pnpm start`.

Keep `payload` and all `@payloadcms/*` dependencies pinned to the same exact
version and update them together. Mixing versions can cause missing-export errors
during the build. Commit `pnpm-lock.yaml` alongside dependency changes.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Pages

  Nutrition and Batchcooking are separate records in one Pages collection, with
  a shared ordered Sections schema. Their unique identities are `nutrition` and
  `batchcooking`; identities cannot change after creation. Authenticated
  backoffice users can create, edit, or delete either record. Page URLs are
  `/nutrition` and `/batchcooking`, subject to the release mode below. A missing
  record returns 404; a record with no sections renders an empty page. The
  Homepage remains a separate global.

  **Batchcooking-only launch ([#138](https://github.com/julie-nutrition/website/issues/138)):**
  `NUTRITION_ENABLED` in [src/config/release.ts](src/config/release.ts) defaults to
  `false`. `/` temporarily redirects to `/batchcooking`, `/nutrition` returns 404,
  the Nutrition navigation link is hidden, and titles/descriptions focus on
  Batchcooking. Identity, contact details, and the existing booking link remain
  unchanged.

  Anonymous CMS reads are limited to the Batchcooking Page and cannot read the
  Homepage's Nutrition image reference, title, or description. Authenticated
  editors retain access to both Pages and all Homepage fields. Nutrition content
  and schemas are preserved; no migration or deletion is required. Shared media
  and other collections are unchanged, so this is not asset-level privacy.

  To release Nutrition, set `NUTRITION_ENABLED` to `true` and redeploy. The same
  setting restores the two-offering homepage, Nutrition navigation and route,
  public Nutrition Page/teaser reads, and the original nutrition-oriented metadata.
  Local Payload API calls must use `overrideAccess: false` when acting on behalf
  of anonymous visitors; Payload's default override bypasses read access rules.

  Existing installations must apply the `consolidate_pages` migration before
  starting the updated application. It copies both former globals and their
  nested section data into the Pages tables, verifies the copied values, and
  removes the obsolete global tables within Payload's migration transaction.
  Block and nested-array IDs are namespaced during copying to prevent collisions
  between the formerly independent globals; content, ordering, and media
  relationships are preserved.

  Back up the database and stop application writes before migrating. Review and
  rehearse the migration against a restored backup before approving deployment.
  With the intended Doppler environment configured:

  ```sh
  doppler run -- pnpm payload migrate
  ```

  Do not start `next dev` against an unmigrated existing database: development
  schema push is not a content migration. Keep the old application stopped until
  migration finishes successfully. No deployed database is migrated
  automatically as part of the architecture refactor.

  The down migration copies current Page content back to the former globals,
  including subsequent content edits and new nested records. A deleted Page is
  not restored. Run rollback only with application writes stopped and deploy
  the matching older application afterward.

  The Pages regression tests run without Doppler or an external database:

  ```sh
  pnpm exec vitest run --config vitest.config.mts \
    tests/int/content-page.int.spec.ts \
    tests/int/pages-schema.int.spec.ts \
    tests/int/release-mode.int.spec.ts \
    tests/int/pages-migration.int.spec.ts
  ```

  Migration tests use an isolated in-memory PostgreSQL engine (PGlite), covering
  content and relationship preservation, identity collisions, transactional
  failures, deletion isolation, and rollback.

  Release-mode tests cover both settings, including routes, navigation, metadata,
  editor access, and anonymous Page/teaser reads. Browser tests verify the active
  release mode against a running app:

  ```sh
  doppler run -- pnpm exec playwright test tests/e2e/frontend.e2e.spec.ts
  ```

  Each Section rendering module accepts its generated Payload block data and
  owns its interpretation and presentation. `SectionRenderer` only dispatches
  by block type; it does not normalize fields for individual blocks. Hero owns
  its optional-header behavior, populated-media checks, tags, rich text, and
  action presentation. No second section schema is maintained.

  Hero rendering regression tests exercise both the module and dispatch
  interfaces without a database:

  ```sh
  pnpm exec vitest run --config vitest.config.mts tests/int/hero-section.int.spec.ts
  ```

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
