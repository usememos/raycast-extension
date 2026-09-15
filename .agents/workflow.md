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
| Publish to the Raycast Store | `pnpm run publish` (never `npm publish`)           |

**Done means** `pnpm lint && pnpm build && pnpm typecheck && pnpm test` passes.
If a step fails, report the output. Don't claim success.

## Dependencies

- **pnpm only.** Never npm or yarn, and never commit their lockfiles.
- **Change packages only through the CLI**: `pnpm add <pkg>`,
  `pnpm add -D <pkg>`, `pnpm up --latest <pkg>`, `pnpm remove <pkg>`. Never
  type a dependency or version into `package.json`.
- **Check current documentation** before using a library API. Your training
  data may be out of date.
- **Check current Raycast API docs** (developers.raycast.com) and the Memos
  API (`proto/api/v1` in usememos/memos) before using an endpoint.
