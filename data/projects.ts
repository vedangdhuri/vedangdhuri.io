import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    shortDescription: "Open-source Next.js portfolio template recognized and forked by developers worldwide, optimized for SEO/AEO and performance.",
    techStack: ["Web Dev", "Frontend", "UI/UX"],
    category: "personal",
    thumbnail: "/projects/portfolio_website/portfolio.webp",
    github: "https://github.com/vedangdhuri/vedangdhuri-io",
    liveUrl: "https://vedangdhuri-io.vercel.app",
    pagesInfoArr: [
      {
        title: "Project Overview",
        description: "A comprehensive look at the main interface and features.",
        imgArr: ["/projects/portfolio_website/portfolio.webp"]
      }
    ],
    readme: `
# 🚀 Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

This is a **Next.js** portfolio template recognized and forked by developers worldwide.

## ✨ Features
- **Optimized for SEO/AEO**: Rank higher and get discovered easily.
- **High Performance**: Lightning-fast load times.
- **Responsive Design**: Looks great on desktop, tablet, and mobile.
- **Dark Mode Support**: Easy on the eyes for night owls.

## 🛠️ Tech Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## 🚀 Installation

\`\`\`bash
# Install dependencies
npm install

# Run the development server
npm run dev
\`\`\`
    `
  },
  {
    title: "Opti-Time - AI Integrated Time Table Generator",
    shortDescription: "Django timetabling engine solving university scheduling with constraint handling, batch management, and optimized faculty allocation.",
    techStack: ["Python", "Django", "HTML", "CSS", "Bootstrap", "AI", "ML", "PostgreSQL"],
    category: "personal",
    thumbnail: "/projects/optitime/opti_time.webp",
    github: "https://github.com/vedangdhuri/Opti-Time-69",
    liveUrl: "https://opti-time-69-1.onrender.com/",
    pagesInfoArr: [
      {
        title: "Dashboard & Schedule View",
        description: "An overview of the automated class timetable and conflict detection dashboard.",
        imgArr: ["/projects/optitime/opti_time.webp"]
      }
    ],
    readme: `
# 🕒 Opti-Time - AI Integrated Time Table Generator

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AI](https://img.shields.io/badge/AI_Powered-FF9900?style=for-the-badge&logo=openai&logoColor=white)

**Automated Class Timetable Generator**
A robust, randomized heuristic-based system for automating complex academic scheduling. Built with Django, it easily handles classes, practical batches, and teacher assignments while strictly adhering to constraints.

## ✨ Key Features
- **🤖 Automated Scheduling:** Generate valid, multi-class timetables with a single click.
- **⚡ Conflict Detection:** Real-time validation prevents double-booking of teachers and rooms.
- **🧪 Batch Management:** Automatically handles distinct practical batches (e.g., A1, A2, A3) with unique teachers.
- **⚖️ Smart Allocation:** Prioritizes practical blocks, limits theory to max 2/day, and intelligently fills gaps.
- **📊 Visual Dashboards:** Global and per-class analytics for tracking workloads and conflicts.
- **🔄 Dynamic Regeneration:** One-click alternative schedule generation.
- **📥 Export Ready:** Download schedules in PDF, Excel, and PNG formats.

## 🛠️ Tech Stack
- **Backend:** Python 3.11+, Django, SQLite/PostgreSQL, WhiteNoise
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Key Libraries:** \`itertools\` & \`random\` (algorithm), \`reportlab\` (PDF), \`xlsxwriter\` (Excel)

## 🧠 How the Algorithm Works
1. **Phase 1: Practical Scheduling (Hard Constraint)** - Allocates combined practical slots ensuring unique teachers and cross-checking availability.
2. **Phase 2: Theory Scheduling** - Assigns theory lectures based on teacher availability and a daily load limit (max 2/day).
3. **Phase 3: Gap Filling & Optimization** - Fills remaining empty slots with "Extra" or "Library" periods to ensure a complete schedule.

## 📦 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/vedangdhuri/Opti-Time-69.git
cd Opti-Time

# Setup virtual environment & install dependencies
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt

# Setup Database & optional sample data
python manage.py makemigrations
python manage.py migrate
python populate_fyco_real.py
python populate_syco_real.py
python populate_tyco_real.py

# Run the server
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
    thumbnail: "/projects/safecity/safecityhub.webp",
    github: "https://github.com/vedangdhuri/SafeCity-Hub",
    liveUrl: "",
    pagesInfoArr: [
      {
        title: "City Monitoring Hub",
        description: "The main administrative panel showing crime hotspots and recent reporting data.",
        imgArr: ["/projects/safecity/safecityhub.webp"]
      }
    ],
    readme: `
# 🏙️ SafeCity Hub

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### A Multi-Stakeholder Crime Reporting, Monitoring & Real-Time Urban Safety Management Platform

## 📖 Overview
SafeCity Hub is a smart, integrated platform designed to improve urban safety by connecting citizens, police, and administrative authorities on a single digital system. It enables real-time crime reporting, incident monitoring, and data-driven decision-making to build safer, smarter cities.

## 🚀 Key Features
- **🧑‍🤝‍🧑 Citizen Portal**: Report crimes or safety concerns with location, images, or videos (anonymously or identified).
- **👮 Police Dashboard**: Live monitoring of reported incidents, response assignment, and communication tools.
- **🏛️ Admin Panel**: Analyze crime data, visualize heatmaps, and plan urban safety strategies.

## 🧩 System Architecture
**Stakeholders Workflow:**
1. A citizen reports an incident via web/app.
2. The system logs data in the central database.
3. Police receive real-time alerts and take action.
4. Administrators access analytics for policy planning.

## ⚙️ Installation & Setup
[Watch Installation Guide](https://youtu.be/MkLX85XU5rU?si=VH0IeGVYaUHZkIDk)
*(**Note:** If creating a virtual environment in VS Code, choose Python version 3.6.2 for optimal compatibility.)*

## ❗ Additional Security
In the area police station, only the police of area code 001 can view their respective complaints. Inter-area data access is strictly restricted.

## 🔐 Security & Privacy
- **End-to-end Encrypted Communication**
- **Role-Based Access Control** (Citizen, Police, Admin)
- **Anonymous Reporting Support**
- **Data Protection Compliant**

## 💡 Future Enhancements
- AI-based crime prediction and pattern recognition
- IoT integration (smart CCTV, panic buttons)
- Chatbot for emergency help
- Integration with government databases

## 📜 License
Licensed under the [MIT License](https://raw.githubusercontent.com/vedangdhuri/SafeCity-Hub/main/LICENSE).
    `
  },
  {
    title: "Match Master Game",
    shortDescription: "A fast and scalable memory-matching game built with React and Vite. Designed as a lightweight, maintainable foundation for interactive web apps.",
    techStack: ["Web Dev Game", "React", "Vite", "JavaScript"],
    category: "personal",
    thumbnail: "/projects/match_master_game/match-master-game.webp",
    github: "https://github.com/vedangdhuri/Match-Master-Game",
    liveUrl: "https://match-master-game.vercel.app",
    pagesInfoArr: [
      {
        title: "Game Interface",
        description: "The interactive memory-matching card layout and gameplay screen.",
        imgArr: ["/projects/match_master_game/match-master-game.webp"]
      }
    ],
    readme: `
# 🎮 MATCH-MASTER-GAME

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

### Unleash Your Mind, Master the Memory Challenge

## ✅ Overview
Match-Master-Game is a React-based memory matching game designed to provide developers with a fast, maintainable, and scalable foundation for building interactive web applications. Built with Vite, it offers a streamlined development experience with instant updates and optimized performance.

## ✨ Why Match-Master-Game?
- **🚀 Rapid Setup:** Leverages Vite for quick project initialization and fast builds.
- **🔥 Hot Module Replacement:** Enables real-time updates during development.
- **📝 ESLint Integration:** Enforces coding standards across your codebase.
- **🔧 Modular Architecture:** Supports easy plugin additions and React Compiler support.
- ** Engaging UI Components:** Includes interactive cards, headers, and win messages for a polished UX.

## ⚙️ Installation & Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/vedangdhuri/Match-Master-Game

# Install dependencies
npm install

# Start the dev server
npm run dev
\`\`\`
*The app will automatically open at \`http://localhost:5173/\`*

## 📜 License
Licensed under the [MIT License](https://github.com/vedangdhuri/Match-Master-Game/blob/main/LICENSE).
    `
  },
  {
    title: "AES Encryption and Decryption in Java",
    shortDescription: "A Java application that uses AES for secure text encryption and decryption, demonstrating symmetric key cryptography to protect sensitive information.",
    techStack: ["Java", "Encryption", "Decryption"],
    category: "personal",
    thumbnail: "/projects/aes_edcryption/aes-edcryption.webp",
    github: "https://github.com/vedangdhuri/AES-Encryption-Decryption-Using-Java",
    liveUrl: "",
    pagesInfoArr: [
      {
        title: "Application Interface",
        description: "The main user interface for encrypting and decrypting secure messages.",
        imgArr: ["/projects/aes_edcryption/aes-edcryption.webp"]
      }
    ],
    readme: `
# 🔐 AES Encryption and Decryption in Java

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Security](https://img.shields.io/badge/Security-AES--128-green?style=for-the-badge)

A simple yet powerful Java application that implements the Advanced Encryption Standard (AES) algorithm to perform secure text encryption and decryption. This project demonstrates the practical use of AES symmetric key cryptography for protecting sensitive information in Java.

## 📘 Description
AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for securing data. This project — EDcrypt — provides an educational and functional example of how AES can be implemented in Java using the built-in \`javax.crypto\` package.

## 🚀 Features
- **AES 128-bit** encryption and decryption
- Text-based encryption using a user-defined secret key
- Command-line interface (CLI) for user input
- Uses **Base64 encoding** for readable encrypted output
- Lightweight and completely dependency-free

## ⚙️ Installation & Setup
- Java JDK 8 or higher installed on your system
- Basic command-line knowledge

## 💻 Usage Example

### Encrypting a Message
\`\`\`text
Enter text to encrypt: Hello Vedang
Enter secret key: mySecretKey123
Encrypted text: z1G7b8x+Nlq90O2ZTYbKAw==
\`\`\`

### Decrypting a Message
\`\`\`text
Enter text to decrypt: z1G7b8x+Nlq90O2ZTYbKAw==
Enter secret key: mySecretKey123
Decrypted text: Hello Vedang
\`\`\`

## 🧠 How It Works
1. The user provides text and a secret key.
2. The key is converted into a secure AES key.
3. The text is encrypted using AES and encoded with Base64.
4. During decryption, the process is reversed to reveal the original message.

## 🚀 Future Enhancements
- File encryption and decryption support
- GUI implementation (Swing/JavaFX)
- Support for AES-256

## 📜 License
Licensed under the [MIT License](https://raw.githubusercontent.com/vedangdhuri/AES-Encryption-Decryption-Using-Java/main/LICENSE).
    `
  },
  {
    title: "To Do List Using React",
    shortDescription: "A responsive To-Do List app built with React.js that helps users efficiently organize tasks with an intuitive interface for adding, editing, deleting, and marking tasks as completed.",
    techStack: ["React", "JavaScript", "Vite", "Beginner level"],
    category: "personal",
    thumbnail: "/projects/todolist/to_do_list_using_react.webp",
    github: "https://github.com/vedangdhuri/To-Do-List-Using-REACT",
    liveUrl: "https://to-do-list-using-react-vd.netlify.app/",
    pagesInfoArr: [
      {
        title: "Task Dashboard",
        description: "The main task management screen showing active and completed to-do items.",
        imgArr: ["/projects/todolist/to_do_list_using_react.webp"]
      }
    ],
    readme: `
# ✅ TO-DO-LIST-USING-REACT

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

### Transform Tasks into Triumphs with Seamless Simplicity

## ✅ Overview
To-Do List Using React is a sleek, modular task management application designed to help developers organize tasks efficiently with a clean, scalable architecture. Built with modern tools like Vite and React, it emphasizes rapid development and maintainability.

## ✨ Why To-Do-List-Using-REACT?
- **🧩 Modular Components:** Reusable task cards, tags, and columns for flexible UI management.
- **🚀 Fast Development Setup:** Powered by Vite for quick builds and hot-reloading.
- **🔍 Code Quality:** Enforced through ESLint configuration, ensuring consistent, maintainable code.
- **📝 Interactive Task Management:** Create, categorize, and delete tasks seamlessly.
- **🌟 Clear Architecture:** Well-defined component interactions for easy customization.

## ⚙️ Installation & Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/vedangdhuri/To-Do-List-Using-REACT.git

# Install dependencies
npm install

# Start the dev server
npm run dev
\`\`\`
*The app will automatically open at \`http://localhost:5173/\`*

## 🚀 Future Enhancements
- 🌓 Dark mode toggle
- 🔍 Search and filter options
- 📁 Category-based organization
- 📶 PWA offline support

## 📜 License
Licensed under the [MIT License](https://github.com/vedangdhuri/To-Do-List-Using-REACT/blob/main/LICENSE).
    `
  },
  {
    title: "Weather App",
    shortDescription: "Weather-App is a fast, modern React project built with Vite. It includes hot module replacement, ESLint, and support for TypeScript and the React compiler, providing a solid foundation for building high-performance, maintainable weather applications.",
    techStack: ["React", "JavaScript", "Vite", "Beginner level"],
    category: "personal",
    thumbnail: "/projects/weatherapp/weather-app.webp",
    github: "https://github.com/vedangdhuri/Weather-App",
    liveUrl: "https://weather-app-vd69.netlify.app",
    pagesInfoArr: [
      {
        title: "Weather Report",
        description: "The current weather conditions and forecast overview.",
        imgArr: ["/projects/weatherapp/weather-app.webp"]
      }
    ]
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
