# Manual Testing Checklist

Use this checklist before opening a PR against [Sovereinia/guia](https://github.com/Sovereinia/guia). It is **manual** (not automated) — aimed at catching regressions quickly during hackathons and day-to-day contributions.

Run the app locally first:

```bash
npm install
npm run dev
```

Open `http://localhost:5173/guia/` (or the URL Vite prints). Prefer one pass on desktop (~1280px) and a quick pass on a narrow viewport (~375px) or DevTools device mode.

---

## Core flows

- [ ] **App loads** — home renders; no red errors in the browser console on first paint
- [ ] **Cards render** — app cards are visible in the grid (icons + titles readable)
- [ ] **Open modal from card** — clicking a card opens the modal for **that** app (title/banner match the card)
- [ ] **Close modal** — close button and/or backdrop closes the modal cleanly
- [ ] **Re-open modal** — open and close the same or another card **at least twice** without UI stuck open/blank
- [ ] **Deep link** — opening `?app=<slug>` (e.g. `?app=mastodon`) opens the matching modal when the slug is valid

## Search & filters

- [ ] **Search updates list** — typing in the search box reduces/changes visible cards to matches
- [ ] **No results** — a nonsense query does not leave broken layout (empty grid is OK; no crash)
- [ ] **Clear search** — clearing the input restores a fuller list (combined with category as applicable)
- [ ] **Category filters** — changing category (when filters are shown) updates the grid sensibly
- [ ] **Filters + search together** — applying both does not freeze the UI; clearing works

## Modal content & actions

- [ ] **Description / features** — long description and feature bullets render when present
- [ ] **Reason / challenges** — “Reason to use” and “Challenges” show when data exists; no orphaned headings when missing
- [ ] **Protocols & alternatives** — protocol logos and alternative icons appear when the app has them
- [ ] **External links** — modal action buttons open the expected destinations (new tab; URLs look correct)
- [ ] **Share** — share control copies a link (or shows the success toast) without errors
- [ ] **Prev / next navigation** — if arrows are present, they move within the **current filtered** list; disabled at ends; left/right keys work while the modal is open
- [ ] **URL stays in sync** — navigating prev/next updates `?app=` on the address bar

## Theme, language & layout

- [ ] **Light / dark toggle** — theme switch changes surfaces (cards, modal, navbar) without unreadable contrast
- [ ] **Language switcher** — switching PT / EN / ES updates visible UI strings (titles, modal labels) without a full page crash
- [ ] **Mobile layout** — at ~375px width: no horizontal scroll on the home grid; modal is usable (scroll inside if needed; close control reachable)
- [ ] **Desktop layout** — modal is centered/readable; content wraps; close and nav controls remain accessible

## Optional / feature-specific

Run these only if your change touches the related area:

- [ ] **Surprise me / reshuffle** — buttons still behave (open a modal or re-order cards) without errors
- [ ] **Keyboard on cards** — focusing a card and pressing Enter/Space opens the modal (accessibility)
- [ ] **Self-hosting difficulty** — stars/level display only when the app defines a level

## Quick automated gate (still run locally)

These do not replace the checklist above but catch type/build breaks early:

```bash
npm run test:unit -- --run
npm run build
```

---

## Reporting failures

If something fails, note **browser + viewport**, the **steps**, and whether it happens on `main` vs your branch. Screenshots help. For questions, use the project Discord or the issue discussion on GitHub.

Thanks for testing — it keeps the guide reliable for everyone.
