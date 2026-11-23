# Ammar Riaz - Developer Portfolio

A premium dark developer portfolio for **Ammar Riaz**, a MERN Stack and Full-Stack Developer. The website presents his profile, skills, featured projects, internship experience, GitHub activity, resume, and contact information.

## Features

- Animated full-screen introduction
- Metallic text, code-symbol, and RGB accent animations
- Responsive fixed navigation with active section tracking
- Home, About, Skills, Projects, Experience, GitHub, and Contact sections
- Seamless dual technology marquees with language icons
- Centralized project data and dynamic case-study routes
- GitHub REST API repository display with error handling
- Resend contact-email API with a browser mail fallback
- Downloadable resume and PDF resume replacement tool
- SEO metadata, sitemap, robots configuration, and favicon
- Reduced-motion support

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Devicon and Simple Icons
- React Hook Form
- Zod
- Resend

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env.local`, then optionally add Resend credentials:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=abc******12@gmail.com
```

Without Resend credentials, the contact form opens the visitor's email application as a fallback.

## Resume

The active resume is stored at:

```text
public/Ammar-Riaz-Resume.pdf
```

Replace this file directly or use the in-site **Update Resume** controls.

## Project Structure

```text
src/
  app/
    api/contact/route.ts
    api/resume/route.ts
    projects/[slug]/page.tsx
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    Portfolio.tsx
  data/
    projects.ts
  types/
    index.ts
public/
  images/projects/
  Ammar-Riaz-Resume.pdf
scripts/
  capture.mjs
```

## Adding Projects

Add or update project entries in `src/data/projects.ts`. Each project uses the strongly typed `Project` structure in `src/types/index.ts`.

Optional fields include:

- `liveUrl`
- `githubUrl`
- `apkUrl`

Do not add broken or fabricated project URLs. Use `case-study` routes for detailed project pages.

## Capturing Screenshots

With Playwright dependencies installed:

```bash
npx playwright install chromium
node scripts/capture.mjs
```

Place final optimized project images in `public/images/projects/`.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Open [Vercel](https://vercel.com).
3. Select **Add New → Project**.
4. Import the GitHub repository.
5. Configure environment variables from `.env.example`.
6. Deploy.
7. Verify all sections, project routes, resume download, external links, and the contact form.
_________________________________________________________________________________________________________________________________
