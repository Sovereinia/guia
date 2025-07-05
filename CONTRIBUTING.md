# Contributing to the Sovereinia App Guide

Thank you for your interest in contributing! Here are some useful guidelines, conventions, and tips to help you collaborate with us more smoothly.

---

## 🧠 Project Conventions

### ✨ Visual Style

- We use [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) components.
- Components should adapt to both **light** and **dark** themes.
- Consistent spacing, button styles, and typography are appreciated.
- Code formatting is standardized using the Prettier extension in VSCode.

### 🌐 Languages

- Portuguese is the default, and we also support Spanish and English
- We plan to add more languages in the future
- Write your code and comments in English

### 🖼️ Images

- **App Icons** go in `public/apps/icons/`
  - Format: `.svg` preferred
  - Dimensions: if only png available, best: 660x660px minimum: 512x512px
  - Background: transparent
- **Alternative Icons** go in `public/alternatives/`
  - Format: `.svg` preferred
  - Dimensions: if only png available, best: 180x180px minimum: 140x140px
  - Background: transparent
- **App Logos** for modals go in `public/apps/logos/`
  - Format: `.png`
  - Dimensions: height best: 320px, minimum 256px
  - Border: white, around logo, following the style
  - Background: transparent
- **Protocol Logos** go in `public/protocols/`
  - Format: `.png` 
  - Dimensions: height best: 80px, minimum 60px
  - Background: color, white or logo default
- Optimize images using tools like [GIMP](https://www.gimp.org/), TinyPNG, or export with compression.

---

## 🧪 Manual Testing Checklist

Before submitting a PR, please test:

- [ ] App loads with no console errors
- [ ] Clicking on a card opens the correct modal
- [ ] Modal opens and closes more than once
- [ ] Search updates the visible app list
- [ ] Filters work and reset correctly
- [ ] Buttons inside modals are correctly styled and functional
- [ ] Light and dark mode are working
- [ ] Layout is responsive on mobile

---

## 🏷️ Issue Labels and Difficulty

We use stars to indicate issue difficulty:

- `⭐️◽️◽️` - Easy (good for newcomers)
- `⭐️⭐️◽️` - Medium (some knowledge of the project needed)
- `⭐️⭐️⭐️` - Advanced (requires familiarity or discussion)

Use these as a reference when browsing issues!

---

## 💡 Want to Suggest an Idea?

Open an issue or come chat with us in our Hackathon Discord channel. Add Viny and he'll invite you to the server: viny.bk
We love creative proposals - new features, UI ideas, improvements to the experience, etc.

---

## 🚀 Installing and Running the Project Locally

To test or develop locally, follow these steps:

### 📦 Dependencies

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

### 🖥️ Installing and running the app
   ```bash
   git clone https://github.com/Sovereinia/guia.git
   cd guia
   npm install
   npm run dev
   ```

   This will launch the app at [http://localhost:5173](http://localhost:5173).

---



## 🙏 Thank You!

Your contribution - big or small - helps make this guide more useful for everyone. Obrigado!
