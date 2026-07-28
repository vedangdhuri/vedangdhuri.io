<div align="center">
  <h1 align="center">vedangdhuri.io</h1>
  <p align="center">
    <strong>Empowering Innovation, Elevating Digital Experiences Daily</strong>
  </p>
  <p align="center">
    A modern, performance-focused personal portfolio built with Next.js App Router, TypeScript, GSAP, and Three.js.
  </p>
  
  <p align="center">
    <a href="https://vedangdhuri-io.vercel.app">
      <img src="https://img.shields.io/badge/Live_Site-vedangdhuri--io.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" />
    </a>
    <img src="https://img.shields.io/github/last-commit/vedangdhuri/vedangdhuri.github.io?style=for-the-badge&logo=git&logoColor=white&color=0080ff" alt="Last Commit" />
    <img src="https://img.shields.io/github/languages/top/vedangdhuri/vedangdhuri.github.io?style=for-the-badge&color=0080ff" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/count/vedangdhuri/vedangdhuri.github.io?style=for-the-badge&color=0080ff" alt="Language Count" />
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js" />
  </p>
</div>

<hr/>

## 📌 Overview

**vedangdhuri-io** is a scalable, component-driven frontend architecture designed to showcase projects, skills, and experience. Built with the **Next.js App Router** and **TypeScript**, it goes beyond a static portfolio by integrating advanced UI animations, 3D effects, and strict type safety.

This repository serves as:
- A personal developer portfolio
- A starter template for high-performance Next.js applications
- A reference for complex component-driven UI architecture

## ✨ Features

- 🚀 **Next.js App Router Architecture:** Utilizes the modern `app/` directory with layouts, dynamic routes, and robust error handling.
- 🎨 **Advanced UI Animations:** Smooth transitions and interactive elements powered by **Framer Motion** and **GSAP**.
- 🌌 **3D & Interactive Visuals:** Engaging 3D components, star backgrounds, and interactive icon clouds using **Three.js** and **React Three Fiber**.
- 🧩 **Reusable Component System:** Modular UI primitives (cards, badges, animated text) ready to be extended.
- 🛡️ **Strict Type Safety:** Strongly typed props and models to ensure a bug-free developer experience.
- ⚡ **Performance-First:** Optimized assets, fonts, and efficient rendering strategies for lightning-fast load times.

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedangdhuri/vedangdhuri-io.git
   cd vedangdhuri-io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🧭 Project Structure

```text
vedangdhuri-io/
├── app/                     # Next.js App Router
│   ├── globals.css          # Global styles & animation keyframes
│   ├── layout.tsx           # Root layout (Navbar, Footer, StarBackground)
│   ├── page.tsx             # Home page (Hero, About, Skills, Projects, Contact, GitHub)
│   ├── not-found.tsx        # 404 page
│   ├── resume/              # Dedicated resume page
│   │   └── page.tsx         # Resume page with download & open buttons
│   └── projects/            # Projects routes
│       ├── page.tsx         # Main projects listing page
│       └── [id]/            # Individual project details
│           └── page.tsx     # Dynamic project page with README rendering
├── components/
│   ├── pages/               # Page-level section components
│   │   ├── About/           # About section components
│   │   ├── Background/      # Star background with comets & nebula
│   │   ├── Contact/         # Contact form & social links
│   │   ├── Footer/          # Animated footer with social icons
│   │   ├── GitHub/          # GitHub contribution graph
│   │   ├── Hero/            # Hero section with orbital system
│   │   ├── Loader/          # Page loader animation
│   │   ├── Navbar/          # Floating bottom navigation bar
│   │   ├── Project/         # Project cards, grid & preview components
│   │   └── Skills/          # Skills section with category cards
│   └── ui/                  # Reusable UI primitives
│       ├── SpaceProfileCard/ # Circular planet-style profile avatar
│       ├── badge.tsx         # Standard badge component
│       ├── card.tsx          # Base card component
│       ├── comet-card.tsx    # Card with comet trail effect
│       ├── FlipWords.tsx     # Word cycling animation
│       ├── globe.tsx         # 3D globe component
│       ├── icon-cloud.tsx    # Interactive icon cloud
│       └── sparkles-text.tsx # Sparkle text effect
├── data/
│   └── projects.ts          # Centralized project data and README content
├── lib/
│   └── utils.ts             # Core helper functions (cn, etc.)
├── public/                  # Static assets
│   ├── font/                # Custom typography (Poppins, Bastliga)
│   ├── img/                 # Screenshots and project thumbnails
│   └── Resume/              # PDF and PNG assets of the resume
├── types/
│   └── project.ts           # Project-related TypeScript interfaces
└── utils/                   # Shared utilities and custom hooks
    ├── useGsapReveal.ts     # Hook for GSap-based reveal animations
    ├── useMagneticEffect.ts # Hook for magnetic interaction effects
    └── utils.ts             # Miscellaneous utility functions
```

## 🛠️ Customization Guide

Make this portfolio your own:
- **Projects & Content:** Edit `data/projects.ts` to update the portfolio items.
- **Page Sections:** Modify components inside `components/pages` (e.g., Hero, About, Skills).
- **UI Elements:** Extend or customize primitives inside `components/ui`.
- **Assets:** Replace images, fonts, and the resume in the `public/` directory.

## 🚀 Future Roadmap

- [ ] Dark/Light theme persistence
- [ ] MDX-based blog system
- [ ] CMS or API-driven project data integration
- [ ] Comprehensive unit and component testing suite


## 🤝 Contributing

While this is a personal portfolio, suggestions, bug reports, and optimizations are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the [MIT License](https://github.com/vedangdhuri/vedangdhuri.io/blob/master/LICENSE) - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/vedangdhuri">Vedang Dhuri</a></sub>
</div>
