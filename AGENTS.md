# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router portfolio. Route files and global styling live in `app/`: the homepage is `app/page.tsx`, and feature routes include `app/projects/[id]/` and `app/resume/`. Keep page-specific sections in `components/pages/<Feature>/` (for example, `components/pages/Hero/Hero.tsx`) and reusable primitives/effects in `components/ui/`. Store portfolio content in `data/projects.ts`, shared helpers in `lib/` or `utils/`, and domain types in `types/`. Static images, fonts, and resume files belong in `public/`.

## Build, Test, and Development Commands

- `npm install` — install dependencies from `package-lock.json`.
- `npm run dev` — start the local development server at `http://localhost:3000`.
- `npm run lint` — run ESLint with the Next.js Core Web Vitals and TypeScript rules.
- `npm run build` — create a production build and catch type/build-time errors.
- `npm run start` — serve a completed production build locally.

Run lint and build before opening a pull request. No automated test framework is currently configured; validate affected routes and interactions manually in the browser.

## Coding Style & Naming Conventions

Write TypeScript with strict types and use the `@/` import alias for repository-root imports. Match existing formatting: two-space indentation, double quotes, semicolons, and trailing commas where the surrounding code uses them. Use PascalCase for React component files and exported components (`ProjectCard.tsx`), camelCase for functions/hooks (`useMagneticEffect.ts`), and route directories in lowercase. Add `"use client";` only when a component needs browser APIs, state, or animation hooks.

Prefer small composable components. Put reusable animation and UI behavior in `components/ui/` or `utils/`; keep project metadata centralized in `data/projects.ts` rather than duplicating it in route components.

## Commit & Pull Request Guidelines

Follow the repository's Conventional Commit-style history: `feat(hero): add HeroVisual`, `fix(resume): correct download logic`, `refactor: simplify navigation`, or `docs(readme): update setup`. Use an imperative, focused subject and keep unrelated cleanup out of the same change.

Pull requests should explain the user-visible change, list validation performed (at minimum `npm run lint` and `npm run build` when practical), and link relevant issues. Include before/after screenshots or a short recording for visual, responsive, or animation changes. Note any added environment variables, external assets, or follow-up work.

## Design Reference

The Nexus Core visual specification is available at [`public/design/DESIGN.md`](public/design/DESIGN.md). Use it when creating or updating page visuals, static illustrations, typography, color, surface, and interaction treatments. Store project-owned generated assets under `public/illustrations/`; do not replace them with stock imagery.
