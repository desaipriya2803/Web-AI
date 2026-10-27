# Signal Journal

Signal is a responsive editorial site about artificial intelligence, built with React, TypeScript, Vite, Framer Motion, and a small Express API proxy.

## Run locally

Requirements: Node.js 20.19+ or 22.12+, and npm.

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The development command starts both Vite and the API proxy.

## Live news feed

The site starts with clearly labeled AI-generated sample stories. They are demonstration content, not current news. To display current publisher headlines, request a NewsAPI key and put it in a local `.env` file:

```dotenv
NEWS_API_KEY=your_newsapi_key
PORT=8787
```

The Express proxy keeps the key on the server and requests recent English-language AI coverage from NewsAPI. Live headlines link to the original publisher. Without a key, the site stays on the sample edition; a failed provider request also leaves the sample stories in place.

## Checks

```bash
npm run lint
npm run build
```

## Routes

- `/` — editorial home
- `/latest`, `/trending`, `/category/:category` — story collections
- `/article/:slug` — readable article pages with source links and related stories
- `/search?q=...` — search results
- `/saved` — locally saved reading list
- `/about`, `/contact` — publication information and contact form

Bookmarks, color theme, newsletter signups, and contact form entries are stored in the browser's local storage. Newsletter and contact submissions are local demo interactions; no email is sent. The site honors reduced-motion preferences and adapts to mobile screens.