## CI/CD

- **GitHub Actions**: `.github/workflows/ci.yml` runs on pushes/PRs to `main` and `master`.
  - Steps: `npm ci` → `npm run typecheck` → `npm run test:ci` → `npm run build`.
- **Deploy (Vercel)**:
  - Uses Vercel CLI via `npx vercel pull/build/deploy` on **push** to `main`/`master`.
  - Requires **`VERCEL_TOKEN`** in GitHub → *Settings → Secrets → Actions*.
  - Project link lives in **`.vercel/project.json`** (committed).  
    *(Or skip the CLI deploy and let Vercel “Import Git Repo” handle auto-deploys.)*
- Manual run: Actions tab → **Run workflow**.

## Testing

- **Stack**: Vitest + React Testing Library + JSDOM.
- **Config**:
  - `vite.config.ts` includes a `test` block (jsdom, setup file, globals).
  - `src/setupTests.ts` imports `@testing-library/jest-dom`.
  - `tsconfig.vitest.json` adds `vitest/globals` types.
- **Scripts**:
  - `npm run test` – watch mode
  - `npm run test:ci` – `vitest run --coverage` (outputs `coverage/`)
- **What’s covered** (examples):
  - `Navbar.test.tsx` – cart badge shows/hides correctly (`count > 0`).
  - `ProductCard.test.tsx` – add/increment/decrement/remove flows update cart state.
  - `integration.test.tsx` – basic add-to-cart → badge/total reflect updates.
  **Live Link**
  https://ecommerce-react-query.vercel.app/
