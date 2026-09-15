# Naming

- **camelCase for identifiers and file names**: `instanceUrl.ts`,
  `errors.ts`. Two exceptions:
  - **Command entry files are kebab-case and match the manifest `name`**:
    `setup.tsx`, `create-memo.tsx`.
  - **React component files are PascalCase**: `SetupGuide.tsx`.
- **Hooks are `useX.ts`**: `useConnectionCheck.ts`.
- **Booleans start with `is`, `has` or `can`**: `isLoading`, `hasAccess`.
- **UPPER_SNAKE for constants**, with numeric separators for large numbers:
  `const DEFAULT_INSTANCE_URL = "https://demo.usememos.com"`,
  `const REQUEST_TIMEOUT_MS = 10_000`.
- **PascalCase for types and classes**: `MemosConnection`, `ApiError`.
- **Command titles are Title Case verb phrases**: "Setup Memos",
  "Search Memos".
