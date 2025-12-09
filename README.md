# Summarist

A web app for reading and listening to book summaries. The idea is to help people get the key insights from books without having to read the whole thing. Users can browse recommended titles, search for specific books, save favorites to their library, and listen to audio summaries on the go.

## What it does

Summarist pulls book summaries from a Firebase backend and presents them in a clean interface. Users can:
- Browse curated recommended and suggested book lists
- Search through the library by title, author, or keywords
- Save books to a personal library (stored in localStorage for now)
- Read full summaries with book descriptions and author info
- Listen to audio summaries with a custom audio player
- Access different content tiers based on subscription (Basic/Premium)

The subscription system is set up but payment processing isn't fully integrated yet. Authentication works with email/password, Google OAuth, and anonymous guest access.

## Tech stack

**Next.js 15 (App Router)** - Chose this for the built-in routing, server components, and good performance out of the box. The App Router makes it easy to organize pages and handle client/server boundaries.

**React 19** - Latest React version. Using hooks throughout for state management and side effects.

**Redux Toolkit** - Needed global state for auth (user, login status, modals). Redux Toolkit makes it way less boilerplate-heavy than vanilla Redux. Auth state syncs with Firebase automatically.

**Firebase (Auth + Firestore)** - Firebase Auth handles all the authentication (email, Google, anonymous). Firestore would be for user data if its expanded later. Firebase was chosen because it's quick to set up and handles the bulk of the security/auth complexity.

**Tailwind CSS** - For styling. Makes it fast to build responsive UI without writing custom CSS. The utility classes work well with the component-based structure.

**TypeScript** - Type safety to catch errors prior to runtime. (specifically with Redux and Firebase)

**Axios** - Simple HTTP client for fetching book data from the Cloud Functions.

## Key features

- **Book discovery** - Recommended and suggested book lists fetched from Firebase Cloud Functions
- **Search** - Debounced search that navigates to results page, with input sanitization
- **Personal library** - Save/remove books, persisted in localStorage
- **Audio player** - Custom hook managing playback, seeking, progress tracking, and drag interactions
- **Authentication** - Email/password, Google OAuth, and anonymous guest mode
- **Subscription tiers** - UI for Basic and Premium plans (payment not wired up)
- **Responsive design** - Works on mobile, tablet, and desktop
- **Guest mode** - Anonymous users can browse but get prompted to login for certain actions
