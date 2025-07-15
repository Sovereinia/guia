# App Guide - Sovereinia

**Welcome Hackathoners!**  
This project is participating in the OnlyDust Open Source Hackathon! See below for how to get involved.

The **App Guide** is an interactive tool to help people discover and compare decentralized, self-hosted platforms. It presents alternatives to centralized services and highlights how these technologies promote autonomy, privacy, and digital sovereignty. It is focused on the Brazilian audience, hence why it's in Portuguese - but we want to add more languages! 

🔗 Try it live: [https://sovereinia.org/guia](https://sovereinia.org/guia)

---

## 📌 Purpose

To make it easier for people to understand and adopt platforms that don’t rely on Big Tech. Our guide explains:

- What each app does
- How it works
- Pros and cons
- How to get started

## ✨ Features

- Visual display of apps with concise descriptions
- Organized by categories (social media, productivity tools, open protocols, etc.)
- Search and filtering system (in development)
- Multi-language support planned (PT, EN, ES)

## 🛠 Run the project locally

To set up the project on your machine:

```bash
git clone https://github.com/Sovereinia/guia.git
cd guia
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Folder overview

- `src/data/apps.ts` — List of apps  
- `src/data/alternatives.ts` — Alternative services  
- `src/data/protocols.ts` — Open protocols  
- `public/apps/icons/` — App icons used on cards  
- `public/apps/logos/` — App logos used in modals  
- `src/components/` — Vue components like cards, modals, filters  
- `src/utils/` — Utility functions (e.g., sorting, filtering)

---

## 🧪 How to Contribute

Check out our open issues - some are labeled [`good first issue`](https://github.com/Sovereinia/guia/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to help you get started.  

Once you've picked one:

- Hop into our Hackathon Discord channel. Add Viny and he'll invite you to the server: viny.bk
- Ask questions, discuss ideas, or request feedback
- For additional tips and contributor guidelines, see our [CONTRIBUTING.md](./CONTRIBUTING.md)

We’re excited to collaborate with you!

---

## 🧰 Technologies Used

- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## 💬 Hackathon Discord Channel

We’ve created a **dedicated Discord channel** just for hackathon participants to connect directly with the maintainers:  
👉 Add Viny and he'll invite you to the server: viny.bk

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

---

🔗 Learn more about Sovereinia: [https://www.linkedin.com/company/sovereinia](https://www.linkedin.com/company/sovereinia)
