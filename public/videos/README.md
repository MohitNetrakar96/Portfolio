# public/videos/ — Video Placeholder Guide

This directory holds the video files used by the Zentry-style hero, story, and features sections.
Replace each stub file below with your actual screen recordings or clips.

---

## Hero Videos (`ZentryHero.tsx`)

| File | Suggested Content | Duration |
|------|-------------------|----------|
| `hero-1.mp4` | Main intro — you typing code in VS Code / terminal | 8–15 s loop |
| `hero-2.mp4` | Project demo — EventX, Medisin, or SafeSim in action | 8–15 s loop |
| `hero-3.mp4` | Hackathon / conference moment (HACKNOVA, ISRO) | 8–15 s loop |
| `hero-4.mp4` | Abstract B-roll — circuit board, dark desk setup, glowing screen | 8–15 s loop |

**How the swap works:** The mini preview window in the center shows the *next* video.
Clicking it triggers a GSAP scale animation that expands the next video to fill the full frame.

---

## Feature Videos (`Features.tsx`)

| File | Card | Suggested Content |
|------|------|-------------------|
| `feature-1.mp4` | EventX (large card) | Full demo: booking flow, dashboard |
| `feature-2.mp4` | Medisin | AI chat, prescription UI |
| `feature-3.mp4` | SafeSim | 3D simulation, scoring view |
| `feature-4.mp4` | IEEE Research | Data visualization, paper highlights |
| `feature-5.mp4` | B-roll | Code editor scrolling, terminal, dark workspace |

---

## Tips for Recording

- **Resolution:** 1280×720 or 1920×1080
- **Format:** H.264 MP4 (best browser compatibility)
- **Duration:** 8–20 s, set to loop (no audio required — all videos are `muted`)
- **Compression:** Use HandBrake or `ffmpeg -crf 28` to keep files under 5 MB each
- **ffmpeg one-liner:** `ffmpeg -i input.mov -vcodec libx264 -crf 28 -preset fast -an output.mp4`

---

## Current Status

The `.mp4` files in this directory are **empty stubs** (0 bytes).
Videos will appear black until you replace them with real footage.
The GSAP animations work correctly regardless — replace at your convenience.
