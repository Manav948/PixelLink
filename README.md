# PixelLink — URL Shortener

A pixel-perfect, high-performance URL shortener built with modern web architecture. Features Redis caching for sub-5ms redirects, BullMQ async analytics processing, Google Safe Browsing integration, rate limiting, and a sleek dark/light cyberpunk UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=flat-square&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?style=flat-square&logo=redis)
![BullMQ](https://img.shields.io/badge/BullMQ-Queue-FF6C37?style=flat-square)

---

## ✨ Features

- **⚡ Sub-5ms Redirects** — Redis cache-first architecture. Zero DB queries on cache hit.
- **🔗 Custom Slugs** — Create branded short links with your own alias.
- **📊 Click Analytics** — Browser, OS, device-type tracking via async BullMQ worker.
- **🛡️ Safety Scanning** — Every URL scanned against Google Safe Browsing API before shortening.
- **🚦 Rate Limiting** — Sliding-window Redis rate limiter on all endpoints.
- **🎨 Theme Switcher** — Circular ripple dark/light mode transition via View Transitions API.
- **🌐 Health Check** — `/api/health` endpoint for uptime monitoring.
- **📈 Analytics API** — Per-link and platform-wide overview endpoints.

---

## 🏗️ Architecture

```
Browser Request → Middleware (Rate Limiter)
    ↓
GET /:slug → Redis Cache Hit?
    ├── YES → Queue click analytics (BullMQ) → Return redirect (0 DB queries)
    └── NO  → PostgreSQL lookup → Cache result → Return redirect
              ↓
         BullMQ Worker (async)
              ↓
         Parse User Agent → Record click metrics in PostgreSQL
```

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database | PostgreSQL via Prisma ORM |
| Cache | Upstash Redis |
| Queue | BullMQ + ioredis |
| Safety | Google Safe Browsing API |
| Rate Limiting | Sliding window via Redis |
| ID Generation | nanoid |

### Frontend
| Layer | Technology |
|---|---|
| UI Framework | Next.js 16 + React 19 |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query v5 |
| Notifications | React Hot Toast |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Theme Transition | View Transitions API |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Upstash Redis account
- Google Safe Browsing API key (optional)

### 1. Clone & Install

```bash
git clone https://github.com/Manav948/url-shortener.git
cd url-shortener
npm install
```

### 2. Configure Environment

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Redis (Upstash)
REDIS_URL="https://your-instance.upstash.io"
REDIS_TOKEN="your-upstash-token"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google Safe Browsing (optional)
GOOGLE_SAFE_BROWSING_API_KEY="your-api-key"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Run Development Server

In two separate terminals:

```bash
# Terminal 1 — Next.js dev server
npm run dev

# Terminal 2 — BullMQ click analytics worker
npm run worker
```

App will be live at **http://localhost:3000**

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── url/           # POST - Create short link
│   │   ├── analytics/     # GET  - Per-link click data
│   │   │   └── overview/  # GET  - Platform-wide stats
│   │   └── health/        # GET  - System health check
│   ├── [slug]/            # Dynamic redirect handler
│   ├── globals.css        # Tailwind v4 + animations
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
│
├── components/
│   ├── navbar/            # Navigation bar with theme toggle
│   ├── footer/            # Footer with stats and links
│   ├── url/               # ShortenForm + ResultCard
│   └── ui/                # Reusable: Button, Input, ThemeButton, AnimatedGrid
│
├── provider/
│   ├── QueryProvider.tsx  # TanStack Query + Toast wrapper
│   ├── ThemeProvider.tsx  # Dark/Light mode with View Transitions API
│   └── LenisProvider.tsx  # Smooth scroll
│
├── services/
│   ├── shortLink.service.ts  # Core URL shortening logic
│   └── safety.service.ts     # Google Safe Browsing check
│
├── repositories/
│   └── cache.repository.ts   # Redis cache abstraction
│
├── workers/
│   └── click.worker.ts       # BullMQ async analytics processor
│
├── middleware.ts             # Rate limiting (Redis sliding window)
├── validators/               # Zod schemas
├── prisma/                   # Schema + migrations
└── queue/                    # BullMQ queue definitions
```

---

### `GET /api/health` — Health Check

```json
{
  "status": "ok",
  "services": {
    "database": "ok",
    "redis": "ok"
  }
}
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run worker` | Start BullMQ click analytics worker |
| `npm run lint` | Run ESLint |

> **Note:** The worker (`npm run worker`) must run alongside the dev/prod server for click analytics to be processed.

---

## 🔒 Security

- All URLs are scanned against **Google Safe Browsing** before being stored.
- URL case sensitivity is preserved to protect query parameters, YouTube video IDs, and signed URLs.

---

## 📝 License

MIT — feel free to use, modify, and distribute.

---

**Built with ❤️ by Manav valani**
