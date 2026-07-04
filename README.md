# Harshit Sharma Portfolio

A cinematic engineering portfolio for presenting live projects, cloud deployment proof, and recruiter-ready case studies.

This site is built to show more than visual polish. It highlights deployable systems, inspectable repositories, live demos, architecture thinking, and documented tradeoffs across cloud, DevOps, backend, AI/ML, and security-focused work.

## Live Portfolio

The portfolio is intended to be connected to:

```text
https://harshitbits.in
```

Until the custom domain is connected, the project can be deployed through Vercel or any static hosting platform that supports Vite builds.

## What This Portfolio Shows

- Cinematic intro video with multilingual greeting overlay
- Magnetic galaxy hero section with animated role text
- Recruiter snapshot for quick proof of live apps and project depth
- Live proof section for deployment and inspection signals
- Animated project case-study cards
- Premium black-and-white glassmorphism skills section
- Engineering process section explaining how projects are built
- Contact section with GitHub, LinkedIn, email, and resume download

## Featured Proof

| Area | Evidence |
| --- | --- |
| Live apps | Nexus and TrustNet |
| Cloud / DevOps | AWS ECS Fargate, Terraform, Docker, ECR, ALB, CloudWatch, GitHub Actions |
| Backend | FastAPI, Node.js, Express, REST APIs, JWT auth, MongoDB |
| AI / ML | scikit-learn, phishing URL features, LangChain, ChromaDB, Ollama, RAG |
| Frontend | React, Vite, dashboard UI, responsive layouts |

## Main Projects

### Nexus Command Center

A full-stack team task management platform with JWT authentication, role-aware collaboration, Kanban workflow, comments, analytics, and a live Vercel deployment.

- Live: https://team-task-manager-ydda.vercel.app
- Repo: https://github.com/Harshitsharma010/Team-Task-Manager

### TrustNet CyberCop

An ML-powered phishing detection system with URL feature extraction, dashboard workflow, Chrome extension path, and AWS deployment notes.

- Live: https://main.dqqhdlk8jbmoh.amplifyapp.com
- Repo: https://github.com/Harshitsharma010/trustnet-cybercop

### AWS ECS Fargate Terraform CI/CD

A deployment-focused cloud lab that takes a FastAPI service from Docker image to ECR, ECS Fargate, ALB, Terraform infrastructure, GitHub Actions checks, and CloudWatch logging.

- Repo: https://github.com/Harshitsharma010/aws-ecs-fargate-terraform-cicd

### Local AI RAG Assistant

A private local assistant for webpages and documents using LangChain loading, ChromaDB retrieval, and Ollama inference.

- Repo: https://github.com/Harshitsharma010/local-ai-rag-assistant

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | React, TypeScript, Vite |
| Styling | Tailwind CSS, custom CSS animation |
| Motion | Framer Motion |
| Icons | Lucide React, React Icons |
| Media | Local MP4 intro asset |
| Deployment target | Vercel, Netlify, or static hosting |

## Project Structure

```text
src/
  components/
    Hero.tsx
    RecruiterSnapshot.tsx
    ProofSection.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
    HowIBuildSection.tsx
    AboutSection.tsx
    ContactSection.tsx
  data/
    sections.ts
  styles/
    fonts.css
    theme.css
public/
  media/
  Harshit-Sharma-Resume.pdf
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

Recommended deployment path:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add the Hostinger domain `harshitbits.in` in Vercel Domains.
5. Update Hostinger DNS records using the values shown by Vercel.
6. Set the primary domain and redirect `www.harshitbits.in` to `harshitbits.in`.

## Design Direction

The portfolio follows a "cinematic engineering proof" direction:

- Premium black-and-white visual system
- Subtle gold and silver accents
- Motion that supports the story instead of distracting from it
- Recruiter-first proof sections
- Clean technical writing with honest project limitations

## Contact

- Portfolio: https://harshitbits.in
- GitHub: https://github.com/Harshitsharma010
- LinkedIn: https://www.linkedin.com/in/harshitsharma624
- Email: harshitbhardwajhs@gmail.com

