import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    shortDescription: "Open-source Next.js portfolio template recognized and forked by developers worldwide, optimized for SEO/AEO and performance.",
    techStack: ["Web Dev", "Frontend", "UI/UX"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/portfolio.png?raw=true",
    github: "https://github.com/vedangdhuri/vedangdhuri-io",
    liveUrl: "https://vedangdhuri-io.vercel.app",
    readme: `
# Portfolio Website

This is a **Next.js** portfolio template recognized and forked by developers worldwide.

## Features
- Optimized for SEO/AEO
- High Performance
- Responsive Design
- Dark Mode Support

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Installation
\`\`\`bash
npm install
npm run dev
\`\`\`
    `
  },
  {
    title: "Opti-Time - AI Integrated Time Table Generator",
    shortDescription: "Django timetabling engine solving university scheduling with constraint handling, batch management, and optimized faculty allocation.",
    techStack: ["Python", "Django", "HTML", "CSS", "Bootstrap", "AI", "ML", "PostgreSQL"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/opti_time.png?raw=true",
    github: "https://github.com/vedangdhuri/Opti-Time-69",
    liveUrl: "https://opti-time-69-1.onrender.com/",
    readme: `
# 🕒 Opti-Time

**Automated Class Timetable Generator**
A robust, randomized heuristic-based system for automating complex academic scheduling. Built with Django, it easily handles classes, practical batches, and teacher assignments while strictly adhering to constraints.

## ✨ Key Features
* **🤖 Automated Scheduling:** Generate valid, multi-class timetables with a single click.
* **⚡ Conflict Detection:** Real-time validation prevents double-booking of teachers and rooms.
* **🧪 Batch Management:** Automatically handles distinct practical batches (e.g., A1, A2, A3) with unique teachers.
* **⚖️ Smart Allocation:** Prioritizes practical blocks, limits theory to max 2/day, and intelligently fills gaps.
* **📊 Visual Dashboards:** Global and per-class analytics for tracking workloads and conflicts.
* **🔄 Dynamic Regeneration:** One-click alternative schedule generation.
* **📥 Export Ready:** Download schedules in PDF, Excel, and PNG formats.

## 🛠️ Tech Stack
* **Backend:** Python 3.11+, Django, SQLite/PostgreSQL, WhiteNoise
* **Frontend:** HTML5, CSS3, Vanilla JS
* **Key Libraries:** \`itertools\` & \`random\` (algorithm), \`reportlab\` (PDF), \`xlsxwriter\` (Excel)

## 🧠 How the Algorithm Works
1. **Phase 1: Practical Scheduling (Hard Constraint)** - Allocates combined practical slots ensuring unique teachers and cross-checking availability.
2. **Phase 2: Theory Scheduling** - Assigns theory lectures based on teacher availability and a daily load limit (max 2/day).
3. **Phase 3: Gap Filling & Optimization** - Fills remaining empty slots with "Extra" or "Library" periods to ensure a complete schedule.

## 📦 Quick Start

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/vedangdhuri/Opti-Time-69.git
   cd Opti-Time
   \`\`\`
2. **Setup virtual environment & install dependencies:**
   \`\`\`bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
   pip install -r requirements.txt
   \`\`\`
3. **Setup Database & optional sample data:**
   \`\`\`bash
   python manage.py makemigrations
   python manage.py migrate
   # Optional: Seed data
   python populate_fyco_real.py
   python populate_syco_real.py
   python populate_tyco_real.py
   \`\`\`
4. **Run the server:**
   \`\`\`bash
   python manage.py runserver
   \`\`\`
   *Visit \`http://127.0.0.1:8000/\` in your browser.*
    `
  },
  {
    title: "SafeCity Hub",
    shortDescription: "A Multi-Stakeholder Crime Reporting, Monitoring & Real-Time Urban Safety Management Platform.",
    techStack: ["Full Stack", "Web Dev", "HTML", "CSS", "Bootstrap", "Python", "Django", "MySQL"],
    category: "professional",
    thumbnail: 'https://github.com/vedangdhuri/images/blob/main/safecityhub.png?raw=true',
    github: "https://github.com/vedangdhuri/SafeCity-Hub",
    liveUrl: "",
    readme: `
# 🏙️ SafeCity Hub

### A Multi-Stakeholder Crime Reporting, Monitoring & Real-Time Urban Safety Management Platform

# 📖 Overview

### SafeCity Hub is a smart, integrated platform designed to improve urban safety by connecting citizens, police, and administrative authorities on a single digital system. It enables real-time crime reporting, incident monitoring, and data-driven decision-making to build safer, smarter cities.

# 🚀 Key Features
- 🧑‍🤝‍🧑 Citizen Portal: Report crimes or safety concerns with location, images, or videos (anonymously or identified).
- 👮 Police Dashboard: Live monitoring of reported incidents, response assignment, and communication tools.
- 🏛️ Admin Panel: Analyze crime data, visualize heatmaps, and plan urban safety strategies.

# 🧩 System Architecture

### Stakeholders:
- Citizens
- Police / Law Enforcement
- Municipal & Administrative Authorities

### Stakeholders:
1. A citizen reports an incident via web/app.
2. The system logs data in the central database.
3. Police receive real-time alerts and take action.
4. Administrators access analytics for policy planning.


# ⚙️ Installation & Setup
[Link](https://youtu.be/MkLX85XU5rU?si=VH0IeGVYaUHZkIDk)

#### ❗ IMPORTANT Note : If you're creating a virtual environment in VS Code, choose Python version 3.6.2.

# ❗ Additional Note
In the area police station, only the police of area code 001 can view the complaints. Police from other areas (002 or 003) cannot access these complaints.

# 🔐 Security & Privacy
- End-to-end encrypted communication
- Role-based access control (Citizen, Police, Admin)
- Option for anonymous reporting
- Data protection compliant with standard security guidelines

# 💡 Future Enhancements
- AI-based crime prediction and pattern recognition
- IoT integration (smart CCTV, panic buttons)
- Chatbot for emergency help
- Integration with government databases for automated response

# 🏆 Impact
- Faster law enforcement response
- Improved citizen safety engagement
- Data-driven urban policy planning
- Transparent communication between authorities and citizens

# 📜 License
This project is licensed under the [MIT License](https://raw.githubusercontent.com/vedangdhuri/SafeCity-Hub/main/LICENSE).
    `
  },
  {
    title: "Match Master Game",
    shortDescription: "A fast and scalable memory-matching game built with React and Vite. Designed as a lightweight, maintainable foundation for interactive web apps.",
    techStack: ["Web Dev Game", "React", "Vite", "JavaScript"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/match-master-game.png?raw=true",
    github: "https://github.com/vedangdhuri/Match-Master-Game",
    liveUrl: "https://match-master-game.vercel.app",
    readme: `
# MATCH-MASTER-GAME

### Unleash Your Mind, Master the Memory Challenge

## Built with the tools and technologies:

## ✅ Overview
Match-Master-Game is a React-based memory matching game designed to provide developers with a fast, maintainable, and scalable foundation for building interactive web applications. Built with Vite, it offers a streamlined development experience with instant updates and optimized performance.

#### Why Match-Master-Game?
This project simplifies the process of creating engaging React games while ensuring high code quality. The core features include:
- 🚀 Rapid Setup: Leverages Vite for quick project initialization and fast builds.
- 🔥 Hot Module Replacement: Enables real-time updates during development for a smoother workflow.
- 📝 ESLint Integration: Enforces coding standards and best practices across your codebase.
- 🔧 Modular Architecture: Supports plugin options and future enhancements like React Compiler support.
- 🎮 Focused on React: Utilizes modern React hooks and components for maintainability and scalability.
- 🎉 Engaging UI Components: Includes interactive cards, headers, and win messages for a polished user experience.

## ⚙️ Installation & Setup

\`\`\`
❯ git clone https://github.com/vedangdhuri/Match-Master-Game
\`\`\`

\`\`\`
npm install
\`\`\`

\`\`\`
npm start
\`\`\`

The app will automatically open at

\`\`\`
http://localhost:5173/
\`\`\`

## 📜 License
Licensed under the [MIT License](https://github.com/vedangdhuri/Match-Master-Game/blob/main/LICENSE).
    `
  },
  {
    title: "AES Encryption and Decryption in Java",
    shortDescription: "A Java application that uses AES for secure text encryption and decryption, demonstrating symmetric key cryptography to protect sensitive information.",
    techStack: ["Java", "Encryption", "Decryption"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/aes-edcryption.png?raw=true",
    github: "https://github.com/vedangdhuri/AES-Encryption-Decryption-Using-Java",
    liveUrl: "",
    readme: `
# AES Encryption and Decryption in Java
A simple yet powerful Java application that implements the Advanced Encryption Standard (AES) algorithm to perform secure text encryption and decryption. This project demonstrates the practical use of AES symmetric key cryptography for protecting sensitive information in Java.

# 📘 Description
AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for securing data. This project — EDcrypt — provides an educational and functional example of how AES can be implemented in Java using the built-in \`javax.crypto\` package.

# 🚀 Features
- AES 128-bit encryption and decryption
- Text-based encryption using a user-defined secret key
- Command-line interface (CLI) for user input
- Uses Base64 encoding for readable encrypted output
- Lightweight and dependency-free

# 🛠️ Tech Stack

#### Language :

#### Code Editor :

# ⚙️ Installation & Setup

### Prerequirements
- Java JDK 8 or higher installed on your system
- Basic command-line knowledge

# 💻 Usage Example

### Encrypting a Message

\`\`\`
Enter text to encrypt: Hello Vedang Enter secret key: mySecretKey123 Encrypted text: z1G7b8x+Nlq90O2ZTYbKAw==
\`\`\`

### Decrypting a Message

\`\`\`
Enter text to decrypt: z1G7b8x+Nlq90O2ZTYbKAw== Enter secret key: mySecretKey123 Decrypted text: Hello Vedang
\`\`\`

# 🧠 How It Works
1. The user provides text and a secret key.
2. The key is converted into a secure AES key.
3. The text is encrypted using AES and encoded with Base64.
4. During decryption, the process is reversed to reveal the original message.

# 🚀 Future Enhancements
- File encryption and decryption
- GUI implementation (Swing/JavaFX)
- Support for AES-256
- Key management improvements

# 📜 License
This project is licensed under the [MIT License](https://raw.githubusercontent.com/vedangdhuri/AES-Encryption-Decryption-Using-Java/main/LICENSE).
    `
  },
  {
    title: "To Do List Using React",
    shortDescription: "A responsive To-Do List app built with React.js that helps users efficiently organize tasks with an intuitive interface for adding, editing, deleting, and marking tasks as completed.",
    techStack: ["React", "JavaScript", "Vite", "Beginner level"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/to_do_list_using_react.png?raw=true",
    github: "https://github.com/vedangdhuri/To-Do-List-Using-REACT",
    liveUrl: "https://to-do-list-using-react-vd.netlify.app/",
    readme: `
# TO-DO-LIST-USING-REACT

### Transform Tasks into Triumphs with Seamless Simplicity

## Built with the tools and technologies:

## ✅ Overview
To-Do List Using React is a sleek, modular task management application designed to help developers organize tasks efficiently with a clean, scalable architecture. Built with modern tools like Vite and React, it emphasizes rapid development and maintainability.

#### Why To-Do-List-Using-REACT?
This project simplifies task organization with intuitive categorization and dynamic filtering. The core features include:
- 🧩 Modular Components: Reusable task cards, tags, and columns for flexible UI management.
- 🚀 Fast Development Setup: Powered by Vite for quick builds and hot-reloading.
- 🔍 Code Quality & Standards: Enforced through ESLint configuration, ensuring consistent, maintainable code.
- 📝 Interactive Task Management: Create, categorize, and delete tasks seamlessly.
- 🌟 Clear Architecture: Well-defined component interactions for easy extension and customization.

## ⚙️ Installation & Setup

\`\`\`
git clone https://github.com/yourusername/to-do-list-using-react.git
\`\`\`

\`\`\`
npm install
\`\`\`

\`\`\`
npm start
\`\`\`

The app will automatically open at

\`\`\`
http://localhost:5173/
\`\`\`

## 🚀 Future Enhancements
- Dark mode toggle
- Search and filter options
- Category-based organization
- PWA offline support

## 📜 License
Licensed under the [MIT License](https://github.com/vedangdhuri/To-Do-List-Using-REACT/blob/main/LICENSE).
    `
  },
  {
    title: "Weather App",
    shortDescription: "Weather-App is a fast, modern React project built with Vite. It includes hot module replacement, ESLint, and support for TypeScript and the React compiler, providing a solid foundation for building high-performance, maintainable weather applications.",
    techStack: ["React", "JavaScript", "Vite", "Beginner level"],
    category: "personal",
    thumbnail: "https://github.com/vedangdhuri/images/blob/main/weather-app.jpg?raw=true",
    github: "https://github.com/username/apex-shopping",
  },
  // {
  //   title: "Builtdesign Blogs",
  //   shortDescription: "Crafted Builtdesign's dynamic Blogs Website using Netlify CMS and React for engaging content experiences.",
  //   techStack: ["Web Dev", "Full Stack", "UI/UX"],
  //   category: "professional",
  //   thumbnail: "/projects/blogs-thumb.png",
  //   github: "https://github.com/username/builtdesign-blogs",
  //   liveUrl: "https://blog.builtdesign.io"
  // },
  // {
  //   title: "Portfolio Card",
  //   shortDescription: "Forged an interactive 3D Portfolio Card utilizing the prowess of Three.js and Blender, where art meets code.",
  //   techStack: ["Web Dev", "Frontend", "3D Modeling"],
  //   category: "personal",
  //   thumbnail: "/projects/card-thumb.png",
  //   github: "https://github.com/username/portfolio-card",
  //   liveUrl: "https://card.portfolio.dev"
  // },
  // {
  //   title: "Cirql Dashboard",
  //   shortDescription: "Created a dashboard project using React and Tailwind CSS, focusing on UI design and routing implementation.",
  //   techStack: ["Web Dev", "Frontend", "UI/UX"],
  //   category: "personal",
  //   thumbnail: "/projects/cirql-thumb.png",
  //   github: "https://github.com/username/cirql-dashboard",
  //   liveUrl: "https://cirql-dashboard.vercel.app"
  // },
  // {
  //   title: "Inscript Hindi Typing",
  //   shortDescription: "Developed a user-friendly website for Inscript Hindi typing, addressing the need for a simple tool for Hindi input.",
  //   techStack: ["Web Dev", "UI/UX"],
  //   category: "personal",
  //   thumbnail: "/projects/inscript-thumb.png",
  //   github: "https://github.com/username/inscript-hindi-typing",
  //   liveUrl: "https://inscript-hindi.vercel.app"
  // }
];
