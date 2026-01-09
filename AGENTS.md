# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js App Router pages, route segments, and global styles (`app/globals.css`).
- `components/` holds reusable UI components; each component pairs with a CSS Module (e.g., `HeroSection.js` + `HeroSection.module.css`).
- `utils/` contains shared logic such as image processing (`utils/imageProcessor.js`).
- `public/` stores static assets served as-is (images, icons).
- `out/` is a build artifact; do not edit by hand.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server at `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: run the production server from the build output.
- `npm run lint`: run ESLint with Next.js Core Web Vitals rules.

## Coding Style & Naming Conventions
- JavaScript uses 2-space indentation and double quotes (match existing files).
- Components are `PascalCase` (e.g., `StickerGrid.js`), functions/variables are `lowerCamelCase`.
- CSS is organized with CSS Modules: name files `ComponentName.module.css`.
- Prefer colocating styles with their components and keep exports minimal.

## Testing Guidelines
- There is no automated test suite configured yet.
- When adding tests, keep them near the feature and document the command in `package.json`.
- Run `npm run lint` before opening a PR to catch regressions early.

## Commit & Pull Request Guidelines
- Git history shows Conventional Commit-style subjects such as `fix(scope): ...`, `refactor: ...`, `style: ...`.
- Use concise, imperative commit messages and include a scope when it clarifies context.
- PRs should include: summary of changes, screenshots for UI changes, and linked issues if applicable.

## Security & Configuration Tips
- This app runs entirely client-side; do not embed secrets or API keys.
- If environment variables are needed, use `.env.local` and keep it out of git.
