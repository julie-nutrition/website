## Command environment

Use `doppler run -- <command>` from the repository root only for commands that
run Next.js or Payload, directly or through package scripts. This supplies the
environment variables needed for builds, development/production servers, Payload
type generation, and schema/migration commands. Tests that initialize Payload or
launch Next.js also need this environment.

```sh
doppler run -- pnpm build
doppler run -- pnpm generate:types
doppler run -- pnpm start
```

Run other commands directly, including Git, dependency installation, linting,
formatting, standalone TypeScript checks, and tests that do not run Next.js or
Payload. In command chains, wrap only the commands that need the environment:
`pnpm install --frozen-lockfile && doppler run -- pnpm build`.

If Doppler configuration or authentication fails for a Next.js or Payload command,
report the error and ask for setup guidance rather than retrying without Doppler.
Keep secret values out of logs and documentation.

## Agent skills

### Issue tracker

Issues and specs are tracked in this repository's GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-role triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Use the single-context domain documentation layout. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
