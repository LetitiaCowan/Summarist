# Summarist

A modern web app for reading and listening to book summaries. Users can browse curated titles, search for books, save favourites, and listen to audio summaries — all inside a clean, fast interface.

👉 **Live Site:** https://summarist-indol.vercel.app/
👉 **Architecture Docs:** [/ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🚀 Features

- **Book discovery** — Curated recommendations and suggestions  
- **Search** — Debounced search with input sanitisation  
- **Personal library** — Save/remove books (persisted in `localStorage`)  
- **Audio player** — Custom playback with progress tracking and seeking  
- **Authentication** — Email/password, Google OAuth, and anonymous guest mode  
- **Subscription tiers** — Basic and Premium UI (payment not yet integrated)  
- **Responsive design** — Fully mobile, tablet, and desktop friendly  
- **Guest mode** — Browse freely; restricted actions prompt login  

---

## 🧰 Tech Stack

**Frontend**
- Next.js 15 (App Router)  
- React 19  
- TypeScript  
- Tailwind CSS  

**State & Logic**
- Redux Toolkit  
- Custom hooks  
- Local storage persistence  

**Backend**
- Firebase Authentication  
- Firebase Cloud Functions  
- Firestore (planned expansion)  

**Utilities**
- Axios for data fetching  
