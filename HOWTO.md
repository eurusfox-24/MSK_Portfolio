# MSK Portfolio — How to Use

This portfolio runs as two separate apps:
- **Frontend** → Vite + React, hosted on **GitHub Pages**
- **CMS (Content Manager)** → Strapi, runs **locally on your laptop**

---

## 🗂 Project Structure

```
MSK_Portfolio/
├── src/                   ← React frontend source code
│   ├── sections/          ← Page sections (Hero, Projects, Certifications, Homelab, Footer, Navigation)
│   ├── hooks/             ← Utility hooks
│   ├── lib/               ← Utility functions
│   ├── App.tsx            ← Main app layout
│   ├── main.tsx           ← Entry point
│   └── index.css          ← Global styles
├── public/                ← Static assets (images, certs, cv)
│   ├── images/            ← Project images (fallback)
│   ├── certs/             ← Certificate images (fallback)
│   └── cv/                ← Your CV
├── cms/                   ← Strapi headless CMS (local only)
│   └── src/
│       ├── api/           ← Content types (project, certification, homelab)
│       └── index.ts       ← Bootstrap & seed script
├── index.html
├── package.json           ← Frontend dependencies
├── vite.config.ts
└── HOWTO.md               ← This file
```

---

## 🚀 Daily Usage (Running Locally)

You need **two terminals** open every time you want to work.

### Terminal 1 — Start the CMS
```bash
cd cms
npm run dev
```
- Opens Strapi at → `http://localhost:1337/admin`
- **Must be running** for the portfolio to show live CMS data
- If you get a port error, the script auto-kills the old session first

### Terminal 2 — Start the Frontend
```bash
npm run dev
```
- Opens your portfolio at → `http://localhost:5173`

---

## ✏️ Adding New Content (Projects / Certifications / Homelab)

1. Open `http://localhost:1337/admin` in your browser
2. Log in with your admin credentials
3. Click **Content Manager** in the left sidebar
4. Choose **Project**, **Certification**, or **Homelab**
5. Click **Create new entry**
6. Fill in the fields:

### For a Project:
| Field | Example |
|:------|:--------|
| title | My New Project |
| description | What the project does |
| image | Upload via Media Library |
| tags | React, Python, AWS *(comma-separated)* |
| color | from-purple-500/20 to-pink-500/20 |

### For a Certification:
| Field | Example |
|:------|:--------|
| name | CompTIA Security+ |
| issuer | CompTIA |
| image | Upload via Media Library |
| date | 2026 |
| category | Cybersecurity |
| description | Brief description |

> 💡 **The stats panel at the bottom of the Certifications section automatically updates** — it reads the total count, number of unique categories, and date range directly from whatever you've entered. No manual editing needed!

### For Homelab:
| Field | Example |
|:------|:--------|
| title | Live Attack Surface Monitoring |
| description | What your homelab does |
| image | Upload a screenshot |
| status | Active |
| onlineText | Online |
| features | JSON array (see below) |
| stats | JSON array (see below) |

**Features JSON format:**
```json
[
  { "title": "Real-time Monitoring", "description": "Live attack surface visualization" },
  { "title": "Docker", "description": "20+ containerized services" }
]
```

**Stats JSON format:**
```json
[
  { "label": "Containers", "value": "20+" },
  { "label": "Uptime", "value": "99.9%" }
]
```

7. Click **Save**, then **Publish**
8. Switch to your portfolio tab and **refresh the page** — you're done! ✅

---

## 🌐 Deploying the Frontend to GitHub Pages

The public portfolio on GitHub Pages always shows the **fallback static data** if the CMS is offline. This means your site is always presentable, even without a backend.

### First-time setup (already done, just for reference):
```bash
npm run build    # builds the dist/ folder
npm run deploy   # pushes dist/ to the gh-pages branch
```

### Every time you want to update the live site:
```bash
npm run build
npm run deploy
```

> ⚠️ **Important:** GitHub Pages only serves your *built* frontend. It does **not** connect to your local CMS. This means your live GitHub Pages site always shows the static fallback data (the arrays in your `.tsx` files). Your local dev version at `localhost:5173` shows live CMS data.

### To update the "live" content on GitHub Pages:
1. Update the fallback arrays in these files with your latest data:
   - `src/sections/Projects.tsx` → `fallbackProjects`
   - `src/sections/Certifications.tsx` → `fallbackCertifications`
   - `src/sections/Homelab.tsx` → `fallbackFeatures` / `fallbackStats`
2. Run `npm run build && npm run deploy`

---

## 🔑 CMS Login

Your Strapi admin credentials are whatever you created the **first time** you ran `npm run dev` inside `cms/`.  
If you forget your password, run:
```bash
cd cms
npx strapi admin:reset-user-password --email=YOUR_EMAIL
```

---

## 🛑 Stopping the Servers

- Press `Ctrl + C` in any terminal to stop it
- The `npm run dev` in `cms/` automatically kills any existing session on port 1337 on start

---

## ⚙️ Tailwind Gradient Color Reference

Use these as the `color` field values for Projects:

| Look | Value |
|:-----|:------|
| Green/Teal | `from-emerald-500/20 to-teal-500/20` |
| Blue/Cyan | `from-blue-500/20 to-cyan-500/20` |
| Red/Orange | `from-red-500/20 to-orange-500/20` |
| Purple/Pink | `from-purple-500/20 to-pink-500/20` |
| Yellow/Amber | `from-yellow-500/20 to-amber-500/20` |
| Indigo/Violet | `from-indigo-500/20 to-violet-500/20` |
