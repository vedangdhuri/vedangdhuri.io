```markdown
# vedangdhuri.io Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns, coding conventions, and workflows used in the `vedangdhuri.io` codebase. The project is built with TypeScript using the Next.js framework, and follows consistent conventions for file naming, imports, exports, and commit messages. You'll also learn how to contribute using established workflows for SEO features and configuration management.

## Coding Conventions

- **File Naming:**  
  Use camelCase for file names.  
  _Example:_  
  ```
  seoConfig.ts
  userProfile.tsx
  ```

- **Import Style:**  
  Use alias imports for modules.  
  _Example:_  
  ```typescript
  import seoUtils from '@/utils/seoUtils';
  ```

- **Export Style:**  
  Use default exports for modules.  
  _Example:_  
  ```typescript
  const SeoComponent = () => { /* ... */ };
  export default SeoComponent;
  ```

- **Commit Messages:**  
  Follow [Conventional Commits](https://www.conventionalcommits.org/) with prefixes like `feat`, `chore`, and `build`.  
  _Example:_  
  ```
  feat(seo): add JSON-LD schema to layout
  chore(config): update .gitignore for new build artifacts
  ```

## Workflows

### Add SEO Feature
**Trigger:** When you want to improve or extend SEO capabilities (metadata, sitemaps, robots.txt, JSON-LD, etc.)  
**Command:** `/add-seo-feature`

1. Create or update a file under the `app/` directory related to SEO, such as `layout.tsx`, `sitemap.ts`, or `robots.ts`.
2. Implement the required SEO logic or configuration.
   - _Example:_ Adding a sitemap generator to `app/sitemap.ts`
     ```typescript
     export default function generateSitemap() {
       // Sitemap generation logic
     }
     ```
3. Commit the change with a message starting with `feat(seo):`.
   - _Example:_  
     ```
     feat(seo): add sitemap generation logic
     ```

### Update Config or Ignore Files
**Trigger:** When you need to add, remove, or update project configuration files or ignore rules.  
**Command:** `/update-config`

1. Edit or remove a configuration file, such as `.gitignore` or `.codex/hooks.json`.
2. Commit the change with a message starting with `chore(config):`.
   - _Example:_  
     ```
     chore(config): update .gitignore for new environment files
     ```

## Testing Patterns

- **Test File Naming:**  
  Test files follow the pattern `*.test.*`.  
  _Example:_  
  ```
  seoUtils.test.ts
  userProfile.test.tsx
  ```
- **Testing Framework:**  
  The specific framework is not detected, but standard patterns suggest usage of popular JavaScript/TypeScript testing libraries.

## Commands

| Command            | Purpose                                               |
|--------------------|-------------------------------------------------------|
| /add-seo-feature   | Add or update SEO-related features and configurations |
| /update-config     | Add, remove, or update configuration/ignore files     |
```
