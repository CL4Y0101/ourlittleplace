# Our Little Place

Frontend prototype for a personal editorial scrapbook. This repository currently implements phases 1–3 of the project brief in [`docs/PRD_OUR_LITTLE_PLACE.md`](docs/PRD_OUR_LITTLE_PLACE.md).

The prototype sends `noindex` metadata and disallows crawlers until real content and site access settings are decided.
Before sharing a deployed site, set `SITE_URL` to its public origin so the Open Graph image URL resolves correctly.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The first visit shows the intro; `our-little-place:intro-seen` in local storage remembers the choice. Use **replay intro** to see it again.

## Content and imagery

All copy and content is neutral placeholder data in `lib/mock/`. Content shapes live in `types/content.ts`. Five generated, anonymous placeholder photos live in `public/photos/`; these are not personal photography. Replace mock sources with real content only when the backend phases are implemented.

## Motion

`motion/react` is the sole motion package. Timing is centralized in `lib/motion/tokens.ts`. The desktop `MemorySpread` uses scroll progress and MotionValues; coarse pointer, narrow viewport, and reduced-motion layouts use an editorial collage. `PaperTransition` covers only navigation among the four public routes. The overlay waits for the route pathname to change, then reveals the new page; browser back/forward uses native navigation without the overlay.

## Deferred

Firebase, Firestore, authentication, Cloudinary, admin CMS, live content, private access, scheduled publishing, full gallery/lightbox features, and letter detail routes belong to later phases. No backend configuration or fake API is included.
