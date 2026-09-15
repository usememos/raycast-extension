# Git

## Commit messages

Use Conventional Commits, and always include a scope:

```
<type>(<scope>): <Subject>
```

- **type**: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`.
- **scope**: kebab-case, naming the area touched: `setup`, `api-client`,
  `preferences`, `docs`, `manifest`. No unscoped commits.
- **Subject**: starts with a capital letter, reads as a sentence in the
  imperative mood, and has no trailing period.
- **Body** (optional): explain _why_, not what.

Examples from this repo:

```
feat(setup): Add guided connection check command
fix(api-client): Retry once on a dropped connection
docs(readme): Explain access token setup
```

## Rules

- **Commit only when asked.**
- **One logical change per commit.** Split unrelated changes.
- **Stage specific paths**, not `git add -A`, so stray files stay out.
- **Never** `--no-verify`, never amend or force-push pushed commits, never push unless asked.
