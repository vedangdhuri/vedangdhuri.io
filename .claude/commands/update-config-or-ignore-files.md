---
name: update-config-or-ignore-files
description: Workflow command scaffold for update-config-or-ignore-files in vedangdhuri.io.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-config-or-ignore-files

Use this workflow when working on **update-config-or-ignore-files** in `vedangdhuri.io`.

## Goal

Adds or removes configuration files or updates .gitignore to manage project settings or tool integrations.

## Common Files

- `.gitignore`
- `.codex/hooks.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or remove a configuration file (e.g., .gitignore, .codex/hooks.json).
- Commit the change with a 'chore(config):' message prefix.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.