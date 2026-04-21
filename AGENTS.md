# Repository Guidelines

## Project Structure & Module Organization
`src/app` contains the Next.js App Router. The homepage lives in `src/app/page.tsx`; each tool gets its own route folder at `src/app/tools/<slug>/` with a `page.tsx` and, when needed, a route-local `layout.tsx`. Shared UI belongs in `src/components`, while cross-cutting logic lives in `src/lib` (`tools.ts` for the tool registry, `i18n/` for locale state and dictionaries). Tests live in `src/__tests__` and usually mirror tool slugs, for example `src/__tests__/base64.test.tsx`. Static assets, the PDF worker, and PDF.js maps/fonts are stored in `public/`.

## Build, Test, and Development Commands
`npm install` installs locked dependencies from `package-lock.json`.

`npm run dev` starts the local app at `http://localhost:3000`.

`npm run build` creates the production build.

`npm run start` serves the built app for local smoke testing.

`npm run lint` runs ESLint 9 with the repo’s flat Next.js config.

`npx vitest run` executes the test suite once; `npx vitest` runs it in watch mode because there is no dedicated `test` script yet.

## Coding Style & Naming Conventions
Use TypeScript with strict typing and 2-space indentation. Match the surrounding file’s quote style, and prefer the `@/` import alias for `src/*`. Use PascalCase for React components, kebab-case for route folders, and keep tool slugs consistent across `src/app/tools/<slug>`, `src/lib/tools.ts`, and test filenames. When adding or changing UI copy, update `src/lib/i18n/dictionaries.ts` instead of hard-coding strings in components.

## Testing Guidelines
Tests use Vitest, Testing Library, and `jsdom`, with shared setup in `src/__tests__/setup.ts`. Add or update a `*.test.tsx` file for each tool change. Cover rendering, core interactions, success cases, and invalid-input behavior. If you add a new tool, verify both the route component and any related registry entries in `src/lib/tools.ts`.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commit-style prefixes such as `fix:` and `feat:`. Prefer short, imperative subjects like `fix: handle empty QR payload`. Pull requests should summarize user-facing changes, list the commands you ran (`npm run lint`, `npx vitest run`, etc.), link the relevant issue, and include screenshots or short recordings for UI changes.
