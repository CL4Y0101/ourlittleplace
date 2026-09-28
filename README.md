# Our Little Place

Personal editorial scrapbook. Phases 1–4 of the project brief in [`docs/PRD_OUR_LITTLE_PLACE.md`](docs/PRD_OUR_LITTLE_PLACE.md) are implemented.

The prototype sends `noindex` metadata and disallows crawlers until real content and site access settings are decided.
Before sharing a deployed site, set `SITE_URL` to its public origin so the Open Graph image URL resolves correctly.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The first visit shows the intro; `our-little-place:intro-seen` in local storage remembers the choice. Use **replay intro** to see it again.

## Content and imagery

The public routes read published content from Firestore on every request. The source content in `lib/mock/` is used by the manual seed script and, only when `USE_MOCK_CONTENT=true` in local development, as a preview fallback if Firestore is unavailable or empty. Production renders safe empty sections in that case. Content shapes live in `types/content.ts`. Five generated, anonymous placeholder photos live in `public/photos/`; these are not personal photography. Their local paths are temporary Firestore photo sources until Phase 5.

## Motion

`motion/react` is the sole motion package. Timing is centralized in `lib/motion/tokens.ts`. The desktop `MemorySpread` uses scroll progress and MotionValues; coarse pointer, narrow viewport, and reduced-motion layouts use an editorial collage. `PaperTransition` covers only navigation among the four public routes. The overlay waits for the route pathname to change, then reveals the new page; browser back/forward uses native navigation without the overlay.

## Firebase Setup

1. Create or select a Firebase project and add a Web App. Copy its web config into `.env.local` using the `NEXT_PUBLIC_FIREBASE_*` names in `.env.example`.
2. Enable Authentication → Sign-in method → Email/Password. Create the administrator user manually in Firebase Console. There is no signup route.
3. Create a Cloud Firestore database in the intended region. Obtain the user's UID from Authentication, then create `admins/{uid}` manually in Firestore with the Boolean field `active: true`. An optional `email` field is informational only. Client SDK writes to `admins` are always denied.
4. Create a Firebase service account in Project settings → Service accounts. Set `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and `FIREBASE_ADMIN_PRIVATE_KEY` in `.env.local` or deployment server environment. For the private key in `.env.local`, use a quoted single-line value with escaped `\n` characters. Keep credentials out of Git and out of `NEXT_PUBLIC_` variables.
5. Set `SITE_URL` to the public origin when deployed. Keep `.env.local` private. The admin service account must have access to Firestore and Firebase Authentication.
6. Install Firebase CLI if needed, then run `firebase login` and `firebase use --add` to select the exact project. Deploy `firebase deploy --only firestore:rules` and `firebase deploy --only firestore:indexes` after reviewing the selected project. No project ID is hardcoded here.
7. Run `npm run seed:firestore` **manually** after setting credentials. It creates deterministic IDs from existing mock data, skips existing documents, and never deletes documents. Running it again preserves edits to existing records. It is not part of install, build, or deployment.
8. Run `npm run dev`, visit `/admin/login`, and sign in with the manually created account. The login exchanges a Firebase ID token for a five-day HttpOnly, SameSite=Lax server session cookie. Browser Auth uses memory persistence and signs out after the exchange. `/admin` checks the cookie and current `admins/{uid}.active` on the server.

The server uses Admin SDK reads, which bypass Firestore rules. Its public data layer explicitly queries `published` content and drops unpublished photo references and future-locked letters before rendering. Public pages use dynamic rendering and read Firestore on each request; a refresh or navigation shows updates. There is no long-lived content cache. An unconfigured production deployment builds but displays empty content. `USE_MOCK_CONTENT` has no effect in production.

`firestore.indexes.json` is intentionally empty: current public queries use one equality filter each and need no composite indexes.

### Rules checks before launch

Use Firestore Rules Playground or the Emulator Suite against `firestore.rules`:

- Unauthenticated: query `photos` with `published == true` and read a published document; deny a draft, any write, and `admins/{uid}`.
- Authenticated non-admin: allow the same public reads; deny a content write and creation of `admins/{ownUid}`.
- Authenticated active admin: read drafts and create, update, and delete a valid content document; still deny client writes to `admins`.
- For letters, allow a published unlocked document get; deny a future-locked document get and public collection list. Server pages exclude locked letters.

These are manual checks; no Emulator Suite test run is implied by the build checks.

## Deferred

Cloudinary, photo uploads/deletion, complete admin CRUD/CMS, scheduling, private access, full gallery/lightbox features, and letter detail routes belong to later phases.
