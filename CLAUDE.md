# CLAUDE.md — TTU Student Handbook

Guidance and instructions for Claude Code and related AI agents working on the Tan Tao University (TTU) Student Handbook project.

## Build & Quality Commands

Always use **Bun** (`bun`) for running commands and managing packages:

```bash
# Development
bun run dev                     # Start Next.js dev server on http://localhost:3000

# Verification & Quality Checks
bun run types:check             # Run Next.js typegen and TypeScript compiler (tsc --noEmit)
bun run lint                    # Fast linting with oxlint
bun run format                  # Format all files in place with oxfmt
bun run format:check            # Verify formatting with oxfmt
bun run check:duplication       # Check duplicate code with jscpd
bun run check:deps              # Find unused dependencies/files with knip
bun run build                   # Full production build verification

# Git Hooks
bun run prepare                 # Install lefthook git hooks
```

## Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack) with React 19
- **Documentation Platform**: Fumadocs (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`)
- **Package Manager**: Bun (`v1.4+`)
- **Styling**: Tailwind CSS v4 + Fumadocs CSS variables (`@import 'fumadocs-ui/css/neutral.css'`)
- **Icon Set**: Hugeicons Free (`@hugeicons/core-free-icons`, `@hugeicons/react`)
- **Tooling**: Oxlint, Oxfmt, Knip, JSCPD, Commitlint, Lefthook

## Design & Branding System

- **Primary TTU Green**: `#0d793d` (extracted directly from the TTU shield crest).
- **Light Theme**:
  - Background: Pure crisp white (`#ffffff`). Never use pale, washed-out, or greenish-tinted backgrounds.
  - Cards: Crisp white with neutral `#e4e4e7` borders.
  - Text: High-contrast `#09090b`.
- **Dark Theme**:
  - Background: Pure black (`#000000`).
  - Cards: Deep obsidian near-black (`#09090b`) with `#27272a` borders.
  - Text: Sharp light zinc (`#f4f4f5`).
- **Header**:
  - University crest: `public/logo-ttu.png` (also copied to `src/app/icon.png` as favicon).
  - Title: "ĐẠI HỌC TÂN TẠO" in `#0d793d` (dark mode `#22c55e`), uppercase, bold.
  - Subtitle: "Sổ tay Sinh viên" (`text-[13px] font-semibold`).

## Architecture & Conventions

- **Root Docs Route**: The documentation is served at the domain root (`/`), not under `/docs`.
  - Routed through route group `src/app/(docs)/[[...slug]]/page.tsx` and `layout.tsx`.
  - `src/lib/shared.ts` sets `docsRoute = ''`.
- **Content Organization**:
  - Located under `content/docs/`.
  - 8 core folders: `hoc-vu`, `luu-tru`, `doi-song-sinh-vien`, `ren-luyen`, `quy-che-cong-tac-sv`, `tai-nguyen`, `tai-chinh`, `lien-he`.
  - Each folder contains a `meta.json` defining title, Lucide/Hugeicons icon, and page order.
- **Icons**:
  - Resolved via `src/lib/hugeicons-resolver.tsx` using `loader({ icon(icon) { return resolveHugeIcon(icon); } })` in `src/lib/source.ts`.
- **MDX Safety**:
  - Avoid raw LaTeX `$$` or unescaped `{}` expressions in markdown paragraphs, which trigger Acorn JSX syntax errors in Fumadocs MDX. Use code blocks (` ```txt ... ``` `) for formulas.
- **Git Commits**:
  - Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`), validated by commitlint via Lefthook.
