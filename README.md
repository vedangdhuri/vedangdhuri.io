<h1 align="center">NEXT.js Portfolio</h1>
<h3 align="center">Empowering Innovation, Elevating Digital Experiences Daily</h3>

<div align="center">
  <img src="https://img.shields.io/github/last-commit/vedangdhuri/vedangdhuri.github.io?style=flat&logo=git&logoColor=white&color=0080ff" />
  <img src="https://img.shields.io/github/languages/top/vedangdhuri/vedangdhuri.github.io?style=flat&color=0080ff" />
  <img src="https://img.shields.io/github/languages/count/vedangdhuri/vedangdhuri.github.io?style=flat&color=0080ff" />
  <a href="https://vedangdhuri-io.vercel.app">
    <img src="https://img.shields.io/badge/Visit_Site-Live_Portfolio-0080ff?style=flat" />
  </a>
</div>

<hr/>

<h2 align="center">🧩 Built With</h2>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" />
  <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white" />
</div>

<hr/>

<h2>📌 Overview</h2>

<p>
<strong>vedangdhuri-io</strong> is a modern, performance-focused personal portfolio built using 
<strong>Next.js App Router</strong> and <strong>TypeScript</strong>.  
It is designed not just as a static portfolio, but as a <strong>scalable frontend architecture</strong> 
that can be extended into full-stack applications.
</p>

<h3>🔄 Recent Updates</h3>
<ul>
  <li><strong>Refactored Hero Section</strong>: Replaced legacy Hero grid with a sleek, modern, shiny <code>HeroVisual</code> component showing <strong>FULL STACK DEVELOPER & DESIGNER</strong>.</li>
  <li><strong>Smoother Navigation & Anchors</strong>: Intercepted anchor tags in <code>Navbar</code> to perform seamless, fluid scrolling to sections rather than page jumps.</li>
  <li><strong>Clean Navbar Style</strong>: Removed active background pills and active text colors to keep the navigation bar clean, dark, and minimal.</li>
  <li><strong>Resume Integration</strong>: Fixed pathing and loading triggers for the Resume PDF download/viewing page.</li>
</ul>

<p>
The project emphasizes:
</p>

<ul>
  <li>Clean separation of concerns</li>
  <li>Reusable, animation-ready UI components</li>
  <li>Type safety across data, components, and utilities</li>
  <li>High visual impact without sacrificing performance</li>
</ul>

<p>
This repository can be used as:
</p>

<ul>
  <li>A personal developer portfolio</li>
  <li>A starter template for Next.js App Router projects</li>
  <li>A reference for component-driven UI architecture</li>
</ul>

<hr/>

<h2>🎯 Why This Project Exists</h2>

<p>
Most portfolios fail in one of two ways:
</p>

<ul>
  <li>They look good but are impossible to scale or maintain</li>
  <li>They are technically solid but visually boring</li>
</ul>

<p>
<strong>vedangdhuri-io</strong> intentionally solves both problems by combining:
</p>

<ul>
  <li><strong>Structured project architecture</strong> – predictable, maintainable folder layout</li>
  <li><strong>Interactive UI patterns</strong> – animations, 3D effects, and motion design</li>
  <li><strong>Type-safe development</strong> – fewer runtime bugs, better DX</li>
  <li><strong>Production-ready defaults</strong> – ESLint, optimized assets, and clean builds</li>
</ul>

<hr/>

<h2>✨ Key Features</h2>

<ul>
  <li>
    <strong>Next.js App Router Architecture</strong><br/>
    Uses the modern <code>app/</code> directory with layouts, routes, and error handling.
  </li>

  <li>
    <strong>Reusable Component System</strong><br/>
    UI elements are abstracted into composable components for scalability.
  </li>

  <li>
    <strong>Advanced UI Animations</strong><br/>
    Includes animated text, icon clouds, cursor effects, 3D cards, and background effects.
  </li>

  <li>
    <strong>Centralized Data Management</strong><br/>
    Project data is stored in structured TypeScript files, making content updates simple.
  </li>

  <li>
    <strong>Strict Type Safety</strong><br/>
    Strongly typed props, data models, and utility functions reduce bugs and refactor risk.
  </li>

  <li>
    <strong>Performance-First Approach</strong><br/>
    Optimized fonts, assets, and components ensure fast load times.
  </li>
</ul>

<hr/>

<h2>⚙️ Installation & Setup</h2>

<h4>1️⃣ Clone the repository</h4>
<pre><code>git clone https://github.com/vedangdhuri/vedangdhuri-io.git
cd vedangdhuri-io</code></pre>

<h4>2️⃣ Install dependencies</h4>
<pre><code>npm install</code></pre>

<h4>3️⃣ Start the development server</h4>
<pre><code>npm run dev</code></pre>

<h4>4️⃣ Open in your browser</h4>
<pre><code>http://localhost:3000</code></pre>

<hr/>

<h2>🧭 Project Structure</h2>

<p>
The project follows a <strong>feature-based component architecture</strong>, separating pages, UI primitives, and shared utilities.
</p>

<pre><code>
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
</code></pre>

<hr/>

<h2>🚀 Customization Guide</h2>

<ul>
  <li>Edit <code>data/projects.ts</code> to add or update portfolio projects</li>
  <li>Modify page sections inside <code>components/pages</code></li>
  <li>Extend UI components inside <code>components/ui</code></li>
  <li>Update fonts and images in the <code>public/</code> directory</li>
</ul>

<hr/>

<h2>📈 Future Improvements</h2>

<ul>
  <li>Dark/light theme persistence</li>
  <li>MDX-based blog system</li>
  <li>CMS or API-driven project data</li>
  <li>Unit and component testing</li>
</ul>

<hr/>

<h2>📜 License</h2>

<p>
This project is licensed under the 
<a href="https://github.com/vedangdhuri/vedangdhuri.io/blob/main/LICENSE" target="_blank">
MIT License
</a>.
</p>

<p>
You are free to use, modify, and distribute this project with proper attribution.
</p>
