# Harshit Portfolio Handoff For Claude

## Project

React + Vite + TypeScript + Tailwind CSS portfolio landing page for Harshit Sharma.

Local project path:

```text
C:\Users\harsh\Documents\Codex\2026-07-03\new-chat-2
```

Local preview URL:

```text
http://127.0.0.1:5174/
```

## Current Direction

The page was changed from a mostly static cinematic portfolio into a darker, scroll-driven portfolio inspired by a 3D creator landing page reference. It is now tailored to Harshit Sharma's GitHub profile and cloud/DevOps portfolio.

GitHub used for content:

```text
https://github.com/Harshitsharma010
```

## Main UX Changes

- Removed the awkward placeholder sections:
  - "Data stories with visual clarity"
  - "From architecture to observability"
- Added a dark animated hero with:
  - Huge gradient heading
  - GitHub avatar in a magnetic hover circle
  - Animated CTA
- Added scroll-moving marquee strips for tools/project standards.
- Added animated About section with scroll-revealed text.
- Added white "Review proof" section listing project standards.
- Rebuilt projects as sticky stacked scroll cards.
- Added a cleaner skills section grouped by engineering area.
- Updated contact links to Harshit's GitHub and LinkedIn.

## Key Files

```text
src/App.tsx
src/components/Hero.tsx
src/components/Navbar.tsx
src/components/MarqueeSection.tsx
src/components/AboutSection.tsx
src/components/ProofSection.tsx
src/components/ProjectsSection.tsx
src/components/SkillsSection.tsx
src/components/ContactSection.tsx
src/components/FadeIn.tsx
src/components/Magnet.tsx
src/components/AnimatedText.tsx
src/data/sections.ts
src/styles/fonts.css
src/styles/theme.css
tailwind.config.ts
```

## Project Data Currently Used

Featured projects are defined in `src/data/sections.ts`:

- AWS ECS Fargate Terraform CI/CD
- TrustNet CyberCop
- Local AI RAG Assistant
- Team Task Manager

The cards link to:

```text
https://github.com/Harshitsharma010/aws-ecs-fargate-terraform-cicd
https://github.com/Harshitsharma010/trustnet-cybercop
https://github.com/Harshitsharma010/local-ai-rag-assistant
https://github.com/Harshitsharma010/Team-Task-Manager
```

## Commands

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 5174
```

Build:

```bash
npm run build
```

Latest verification:

```text
npm.cmd run build
```

Result: successful build.

Browser check:

```text
http://127.0.0.1:5174/
```

Result: page loaded, no console errors, mobile hero fixed, no horizontal overflow.

## Notes For Next Pass

- The hero currently uses the GitHub avatar URL:

```text
https://github.com/Harshitsharma010.png
```

- Placeholder media paths from the older version still exist in the public/media structure, but the new design relies more on CSS/motion and GitHub avatar.
- The page intentionally uses strong dark creative direction, Kanit font, big uppercase type, scroll-linked movement, and sticky project cards.
- If polishing further, focus on:
  - Better screenshots for each repo card
  - Real email address
  - Resume PDF at `/resume.pdf`
  - More refined mobile spacing in the project stack
  - Optional smoother scrolling library if desired
