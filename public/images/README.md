# Images Directory

Drop your images here. Reference them in code as `/images/filename.jpg`.

## Recommended files

| File | Used in |
|------|---------|
| `mohit.jpg` | Hero section — your profile photo |
| `safesim.jpg` | Projects → SafeSim card |
| `medisin.jpg` | Projects → Medisin card |
| `graphql-hack.jpg` | Projects → GraphQL Hackathon card |
| `achievement-ieee.jpg` | Achievements → IEEE paper card |
| `achievement-hacknova.jpg` | Achievements → HACKNOVA card |
| `achievement-graphql.jpg` | Achievements → GraphQL Hackathon card |

## How to swap images

**Hero photo**: Edit `components/Hero.tsx`, uncomment the `<Image>` tag and remove the placeholder div.

**Project images**: Edit `components/Projects.tsx`, set the `image` field in the `projects` array.

**Achievement images**: 
- In browser: Click **"+ Add Achievement"** and paste a URL or `/images/filename.jpg` path.
- Or via API: `POST /api/achievements` with `{ title, description, meta, image }`.
