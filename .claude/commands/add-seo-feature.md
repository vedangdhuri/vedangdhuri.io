---
name: add-seo-feature
description: Workflow command scaffold for add-seo-feature in vedangdhuri.io.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-seo-feature

Use this workflow when working on **add-seo-feature** in `vedangdhuri.io`.

## Goal

Adds or updates SEO-related features such as metadata, sitemaps, robots.txt, or JSON-LD schemas.

## Common Files

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update a file under the 'app/' directory related to SEO (e.g., layout.tsx, sitemap.ts, robots.ts).
- Implement the required SEO logic or configuration.
- Commit the change with a 'feat(seo):' message prefix.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.