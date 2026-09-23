# Workflow

## Workspace

- **Work in the existing checkout, on the current branch.** Never create git
  worktrees (`git worktree add`, `.worktrees/`, agent isolation modes).
- **Don't create branches, push or open PRs** unless asked.

## Commands

| Task                         | Command                                            |
| ---------------------------- | -------------------------------------------------- |
| Develop                      | `pnpm dev`                                         |
| Lint (fix)                   | `pnpm fix-lint`                                    |
| Lint                         | `pnpm lint`                                        |
| Build                        | `pnpm build` (also regenerates `raycast-env.d.ts`) |
| Type check                   | `pnpm typecheck`                                   |
| Tests                        | `pnpm test`                                        |
| Store compliance             | `pnpm store-check`                                 |
| Publish to the Raycast Store | `pnpm run publish` (never `npm publish`)           |

**Done means** `pnpm lint && pnpm build && pnpm typecheck && pnpm test` passes,
plus `pnpm store-check` when the change touched `package.json`, `assets/`,
`metadata/`, `CHANGELOG.md` or `README.md`. If a step fails, report the
output. Don't claim success.

## Dependencies

- **pnpm only for development.** Never npm or yarn for installing, upgrading
  or removing packages, and never commit `yarn.lock`.
- **One exception, at submission only.** Raycast's CI builds with npm, so the
  store submission PR must carry a `package-lock.json`. Generate it as the
  last step before opening that PR, without touching `node_modules`:

  ```
  npm install --package-lock-only
  ```

  Never run a plain `npm install` in this checkout, and never let
  `package-lock.json` drift from `package.json` afterwards —
  `pnpm store-check --submission` checks that it matches.
- **Change packages only through the CLI**: `pnpm add <pkg>`,
  `pnpm add -D <pkg>`, `pnpm up --latest <pkg>`, `pnpm remove <pkg>`. Never
  type a dependency or version into `package.json`.
- **Check current documentation** before using a library API. Your training
  data may be out of date.
- **Check current Raycast API docs** (developers.raycast.com) and the Memos
  API (`proto/api/v1` in usememos/memos) before using an endpoint.

## Submitting to the store

In order. Stop at the first failure.

1. `pnpm up --latest @raycast/api @raycast/utils`
2. `pnpm lint && pnpm build && pnpm typecheck && pnpm test`
3. Open the built extension in Raycast and walk every command. A distribution
   build is not `pnpm dev`.
4. Capture screenshots into `metadata/` (Window Capture, `Save to Metadata`).
5. Move the `{PR_MERGE_DATE}` entry in `CHANGELOG.md` to the top and make sure
   it describes this release.
6. `npm install --package-lock-only`
7. `pnpm store-check --submission` — must be green.
8. `pnpm run publish`
