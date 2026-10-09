# Maya's Kitchen — Food Creator Platform

A full-stack recipe database + personal brand site for an Instagram/YouTube Shorts food
creator, built with React (Vite) + Tailwind + Framer Motion on the frontend and
Node/Express + MongoDB on the backend.

```
foodcreator/
├── backend/     Express API, MongoDB models, JWT auth, Cloudinary uploads
└── frontend/    React app — recipe database, single recipe pages, creator
                 dashboard, about/contact pages, dark mode, PWA
```

## 1. What's included

**Frontend**
- Home, Recipe Database (search + filters), Single Recipe (interactive steps,
  reviews, favorites, print, JSON-LD recipe schema), About, Contact,
  Login/Register, and a role-gated Creator Dashboard (recipes, videos, analytics).
- Reusable components: `RevealSection`, `AnimatedCard`, `AnimatedButton`,
  `FloatingIngredient`, `SteamTrail` (signature hero animation), `CookingLoader`,
  `RecipeCard`, `VideoCard`, `SearchBar`, `FilterPanel`, `IngredientList`,
  `CookingSteps`, `Modal`, `Navbar`, `Footer`.
- Dark mode, PWA manifest (via `vite-plugin-pwa`), SEO meta tags + Recipe
  schema.org markup, `robots.txt` / `sitemap.xml`.
- AI Recipe Assistant UI ("What can I cook?") wired to `/api/ai/suggest`.

**Backend**
- Models: `User`, `Recipe` (with embedded reviews/ratings), `Video`, `Contact`.
- JWT auth with role-based access (`user` / `creator` / `admin`).
- Recipe CRUD, full-text + filter/sort/paginate search, favorites, reviews,
  analytics summary.
- Video and Contact endpoints.
- Cloudinary + Multer image/video upload pipeline.
- Ingredient-based AI recipe suggester, structured so a real OpenAI call can
  be dropped in (`backend/src/controllers/aiController.js`).
- Centralized error handling, rate limiting, `helmet`, mongo-sanitize.
- Seed script with a demo creator account and sample recipes/videos.

## 2. What's intentionally left as a scaffold

This is a large brief. A few pieces are stubbed with clear extension points
rather than fully built out, so you can wire them up for your real content:
- The dashboard's "Add recipe" form covers the core fields; ingredient/step
  add-remove rows and image upload (vs. URL) are the natural next additions,
  following the same pattern as the fields already there.
- The AI assistant does ingredient-overlap matching against your own recipe
  DB out of the box; `callOpenAI()` in `aiController.js` is ready to wire in
  with an `OPENAI_API_KEY` for open-ended suggestions.
- Collections (saved recipe folders) exist on the `User` model but don't yet
  have dedicated UI — `favorites` (single list) is fully wired end-to-end.

## 3. Installation

### Prerequisites
- Node.js 18+
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [Cloudinary](https://cloudinary.com) account (free tier is fine) for image/video uploads

### Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your MongoDB URI, JWT secret, and Cloudinary keys
npm run seed   # optional: populates demo creator + recipes
npm run dev    # starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL defaults to http://localhost:5000/api — adjust if needed
npm run dev    # starts on http://localhost:5173
```

Demo creator login after seeding: **maya@kitchen.com / password123**

## 4. Environment variables

**backend/.env**
| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string for signing tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `30d` |
| `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET` | Cloudinary credentials |
| `OPENAI_API_KEY` | Optional — enables open-ended AI recipe suggestions |

**frontend/.env**
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

## 5. API reference

Base URL: `/api`

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create an account |
| POST | `/auth/login` | Public | Log in, returns JWT |
| GET | `/auth/me` | Private | Current user profile |

### Recipes
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/recipes` | Public | List recipes — supports `?q=`, `?category=`, `?difficulty=`, `?dietType=`, `?cookingTime[lte]=`, `?sort=`, `?page=`, `?limit=` |
| GET | `/recipes/:id` | Public | Single recipe by id or slug, increments views, returns related recipes |
| POST | `/recipes` | Creator/Admin | Create recipe |
| PUT | `/recipes/:id` | Creator/Admin | Update recipe |
| DELETE | `/recipes/:id` | Creator/Admin | Delete recipe |
| POST | `/recipes/:id/reviews` | Private | Add a rating/review |
| POST | `/recipes/:id/favorite` | Private | Toggle favorite |
| GET | `/recipes/analytics/summary` | Creator/Admin | Views, popular recipes, totals |

### Videos
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/videos` | Public | List videos, `?platform=youtube\|instagram` |
| POST | `/videos` | Creator/Admin | Add a video |
| DELETE | `/videos/:id` | Creator/Admin | Remove a video |

### Contact
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/contact` | Public | Submit a collaboration inquiry |
| GET | `/contact` | Creator/Admin | List submissions |

### AI Assistant
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/ai/suggest` | Public | `{ "ingredients": ["eggs","tomato","rice"] }` → matching recipes |

All authenticated routes expect `Authorization: Bearer <token>`.

## 6. Deployment

**Backend** — any Node host works (Render, Railway, Fly.io, an EC2 box, etc.):
1. Set the environment variables from the table above in your host's dashboard.
2. Build/start command: `npm install && npm start`.
3. Point `CLIENT_URL` at your deployed frontend origin for CORS.

**Frontend** — static hosts work well (Vercel, Netlify, Cloudflare Pages):
1. Build command: `npm install && npm run build` → output in `dist/`.
2. Set `VITE_API_URL` to your deployed backend's `/api` URL as a build-time env var.
3. Add a SPA rewrite rule (`/* → /index.html`) so client-side routes don't 404 on refresh.

**Database** — MongoDB Atlas free tier is enough to start; whitelist your
backend host's IP (or `0.0.0.0/0` for simplicity during development).

**Images/video** — Cloudinary handles storage and delivery; no extra config
needed beyond the three env vars once your account is set up.

## 7. Design notes

Palette: cream `#F6EFE3`, burnt orange `#D9591C`, espresso brown `#3A2318`,
sage green `#5B6B3E`, near-black `#14100C` for premium sections — matching the
"luxury modern kitchen" brief. Typography pairs **Fraunces** (display serif,
food-editorial character) with **Manrope** (body) and **IBM Plex Mono** for
stats/timers. The signature motion element is the animated steam trail rising
off the hero dish (`SteamTrail.jsx`), echoed in loading and section transitions
throughout rather than scattering unrelated effects everywhere.
