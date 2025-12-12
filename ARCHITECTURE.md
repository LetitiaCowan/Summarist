# Architecture Overview

This document explains the rendering model, component structure, state flow, and data handling used in **Summarist**.  
The app is built with **Next.js 15 (App Router)** and follows a hybrid **SSR + CSR** architecture.

---

## 🧩 Rendering Model

Summarist uses both **Server Components (SSR)** and **Client Components (CSR)** to optimise:

- performance  
- SEO  
- bundle size  
- interactivity  

### **Server Components (SSR)**  
Used for page shells and static content.

- Default for all files inside `app/**/page.tsx`
- Rendered on the server before being sent as HTML
- Good for SEO and initial page load
- Wrap client components inside `<Suspense>` for smooth hydration

Common server-rendered areas:
- Page layout  
- Book details page shell  
- Player page shell  
- Category and search results shells  

---

## 🎛️ Client Components (CSR)

Client components handle all interactive behaviour and stateful logic.  
These components include `"use client"` at the top.

Used for:
- user interactions  
- Firebase auth  
- library (saved books)  
- search logic  
- audio player  
- modals  
- Redux state  

Examples:
- `BookClientWrapper`
- `BooksClientWrapper`
- `PlayerClientWrapper`
- Components using hooks: `useRouter`, `useSearchParams`, custom hooks

---

## 🔄 How SSR + CSR Work Together

**Pattern used throughout the app:**

1. A **Server Component** (e.g., a page) renders the base structure.
2. It includes a **Client Wrapper**, which hydrates on the client.
3. React Suspense ensures transitions happen smoothly.
4. The Client Wrapper handles:
   - fetching user-specific data  
   - reacting to user input  
   - updating UI in real time  

This ensures:
- fast initial HTML render  
- small JavaScript bundle  
- no flash of unstyled or mismatched content  
- highly interactive UI  

---

## 🗂️ Component Structure

The app is organised into:

### **`/app`**
Route-based segments for page-level layout:
- `/book-info`
- `/player`
- `/library`
- `/auth`

### **`/components`**
Reusable UI components, client wrappers, and layout pieces.

### **`/hooks`**
Custom hooks for:
- audio player logic  
- search behaviour  
- authentication  
- UI interactions  

### **`/store`**
Redux Toolkit slices and store configuration:
- auth state  
- modal visibility  
- library state  

### **`/utils`**
Helper functions for:
- sanitising input  
- formatting durations  
- fetching data  

---

## 🎧 Audio Player System

The audio player uses a custom hook that handles:

- play / pause  
- tracking progress  
- updating UI while dragging the timeline  
- seeking  
- maintaining sync between waveform + UI  
- persistent state when navigating between pages  

The player runs entirely on the client since it relies on DOM events.

---

## 🔐 Authentication Flow

Firebase Authentication is wrapped in a custom abstraction:

**Supported modes:**
- Email + Password  
- Google OAuth  
- Anonymous Guest Mode  

**How it works:**
1. Firebase auth listener detects changes.
2. Redux updates global `auth` state.
3. UI components subscribe to this state.
4. Pages requiring auth prompt login if needed.

Anonymous users can interact with the app but are restricted from premium actions.

---

## 📚 Data Flow

- Book data comes from **Firebase Cloud Functions**.  
- Saved books are stored in **localStorage** for anonymous and guest users.
- Future version may sync user data to **Firestore**.

### Data layers:
- **Server** → static book metadata  
- **Client** → dynamic user interactions (saving, playback, etc.)

---

## 📱 Responsive Layout

Built with **Tailwind CSS**, ensuring:

- mobile-first design  
- flexible grid layouts  
- small reusable utility classes  
- consistent spacing and typography  

The app adapts cleanly to mobile, tablet, and desktop.

---

## 🚀 Future Improvements

- Subscription payments integration  
- Firestore user profiles  
- Listening history & recently played  
- Offline access for summaries  
- Bulk caching for audio files  

---

