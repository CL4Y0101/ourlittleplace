# Product Requirements Document  
## Our Little Place

**Version:** 1.0  
**Project Type:** Personal interactive memory website  
**Build Type:** Greenfield / from scratch  
**Primary User:** Girlfriend  
**Admin User:** Website owner  
**Core Principle:** A living digital scrapbook that grows over time.

---

# 1. Product Vision

Build a highly personal, cinematic, warm, and continuously updateable website dedicated to one person.

The website must not feel like:

- a generic Valentine's Day website,
- a photo dump,
- a developer portfolio,
- a component showcase,
- or a typical CRUD website with romantic styling.

It should feel like:

> a private place on the internet where memories, photos, small details, letters, and stories continue to accumulate over time.

The emotional experience should be closer to:

**editorial photography × physical scrapbook × personal diary × modern web interaction.**

The content itself should always be the star.

Animation must support the storytelling rather than becoming the storytelling.

---

# 2. Primary Goals

The website must allow the owner to:

1. Upload new photos without touching source code.
2. Add memories, captions, letters, timeline entries, and notes from `/admin`.
3. Change the current favorite photo and current message anytime.
4. Publish new content without Git commit or redeployment.
5. Reuse uploaded photos across multiple sections.
6. Maintain the website comfortably from desktop or mobile.
7. Keep infrastructure within free tiers for normal personal usage.

The visitor should experience the website as an unfolding story rather than a conventional application.

---

# 3. Technical Stack

Use:

```text
Next.js 16
React 19
TypeScript
Tailwind CSS

motion/react

Firebase Authentication
Cloud Firestore

Cloudinary

Vercel or Cloudflare deployment
```

Use the App Router.

Do not introduce Three.js unless a later feature specifically requires it.

Do not introduce GSAP unless an interaction cannot be implemented cleanly with Motion or native browser APIs.

Avoid unnecessary dependencies.

---

# 4. Animation Library Standard

Use:

```text
motion/react
```

as the primary animation library across the entire application.

Do not simultaneously maintain separate animation systems using both:

```text
framer-motion
```

and:

```text
motion/react
```

The supplied RevealText reference currently uses `framer-motion`, while the StackSpread reference uses `motion/react`. 

Port the RevealText behavior to `motion/react`.

Native `requestAnimationFrame` may still be used for extremely frequent pointer-driven animation where routing every frame through React state would be wasteful.

---

# 5. Design Identity

## Mood

The experience should feel:

```text
intimate
warm
nostalgic
quiet
editorial
playful
personal
slightly imperfect
```

Avoid excessive:

```text
pink
hearts
sparkles
gradient blobs
glassmorphism
neon
particles
3D effects
```

Romance should come primarily from the content.

---

# 6. Color System

Use a warm neutral palette.

```css
:root {
  --paper: #F4EFE7;
  --paper-dark: #E5DDD0;

  --ink: #272421;
  --ink-soft: #514C47;
  --muted: #777067;

  --rose: #B98282;
  --sage: #8D9884;
  --brown: #816C5E;

  --white: #FFFDF9;

  --border: rgba(39, 36, 33, 0.14);
  --shadow: rgba(39, 36, 33, 0.12);
}
```

Do not use pure white as the main page background.

Optional future dark mode:

```css
--night: #181716;
--night-paper: #242220;
--night-text: #ECE7DF;
```

Dark mode is secondary and must not delay the initial release.

---

# 7. Typography

Use three typographic roles.

### Display Serif

Recommended:

```text
Cormorant Garamond
```

or:

```text
Playfair Display
```

Used for:

- hero titles,
- large statements,
- emotional quotes,
- section titles.

### Interface Sans

Recommended:

```text
Geist
```

Used for:

- navigation,
- dates,
- admin UI,
- buttons,
- metadata,
- captions.

### Handwriting Accent

Recommended:

```text
Caveat
```

Used sparingly for handwritten annotations.

Never use handwriting typography for long paragraphs.

---

# 8. Information Architecture

Primary routes:

```text
/
├── story
├── gallery
├── letters
└── admin
```

The homepage must still contain the main storytelling journey.

The additional routes exist for deeper exploration.

Avoid creating unnecessary pages.

---

# 9. Homepage Experience

Homepage sequence:

```text
INTRO

↓

HERO

↓

RIGHT NOW

↓

OUR STORY

↓

LITTLE MOMENTS

↓

HER

↓

THINGS I LOVE

↓

LETTERS

↓

LATEST MEMORY

↓

ENDING
```

Scrolling through `/` should feel like reading a visual diary.

---

# 10. Intro Experience

First visit should initially show a minimal screen.

Example structure:

```text
for [name].

I made you
a little place
on the internet.

[ enter ]
```

Do not reveal all imagery immediately.

When `Enter` is activated:

1. intro text disappears gently,
2. paper/background transition begins,
3. first photograph reveals,
4. hero page becomes accessible.

Persist intro completion in localStorage.

Example:

```text
our-little-place:intro-seen
```

Returning visitors should not be forced through the full intro every time.

Provide a subtle mechanism to replay it.

---

# 11. Hero

Possible composition:

```text
OUR
LITTLE
PLACE

            [portrait]

some memories deserve
more than staying
inside my gallery.

since xx.xx.xxxx
```

The photograph should dominate the design.

Use layered physical elements:

```text
photo
paper
masking tape
small handwritten note
date stamp
subtle shadow
```

Never let decorative elements interfere with the face in portrait photography.

---

# 12. Living Photo Interaction

The supplied MascotPortfolioHero component should NOT be visually recreated.

Its pointer interaction architecture should only be used as behavioral inspiration.

The original uses multiple independently moving visual layers to create perceived depth: body, head, face, eyes, nose, brows, etc.

Adapt this principle into:

```text
LivingPhoto
```

Layers might include:

```text
background paper
portrait photo
tape
caption
foreground decoration
```

Example depth:

```text
background        0–2px
photo             2–4px
tape              4–6px
handwritten note  5–8px
foreground        6–10px
```

The movement must be slow and almost invisible.

Do NOT manipulate the subject's face.

Do NOT create an effect where her eyes or facial features follow the cursor.

The source also provides explicit reduced-motion handling.

LivingPhoto must disable pointer depth when:

```text
prefers-reduced-motion: reduce
```

or when the device primarily uses coarse/touch input.

---

# 13. Right Now Section

Purpose:

Make the website feel alive and current.

Content fields:

```text
current favorite photo
current note
current song
current mood text
last updated
```

Example:

```text
RIGHT NOW
28 September 2026

currently thinking about

you.

[current favorite photo]

song on repeat
Song — Artist

little note
"hope today treats you gently."
```

The owner must be able to update this entire section from `/admin`.

---

# 14. Our Story

This section represents meaningful milestones.

Each timeline event may contain:

```text
date
title
description
photo
optional location
optional song
optional private note
```

The layout should feel irregular and scrapbook-like rather than like a conventional vertical timeline.

Example:

```text
our first conversation

        [screenshot]

"I didn't know this conversation
would matter this much."

              ↓

the first photo

                   [photo]

              ↓

that random day
I still remember
```

Timeline animation:

- line grows according to scroll,
- image reveal occurs near viewport entry,
- copy reveals slightly after its corresponding image,
- large motion is limited.

---

# 15. Little Moments

This section contains smaller memories.

The key interaction will be:

```text
MemorySpread
```

The supplied StackSpread component is the behavioral reference.

The original component defines a scroll window where stacked image cards progressively scatter between defined scroll progress values.

The original also detects coarse pointer devices and switches to a simpler mobile arrangement rather than forcing desktop pointer behavior.

Rebuild the concept as:

```tsx
<MemorySpread
  memories={memories}
/>
```

Never retain hard-coded demo image URLs.

Data must come from Firestore.

Initial state:

```text
       [photo]
    [photo][photo]
      [photo]
```

During scroll:

```text
↖ photo      photo ↗

       text

← photo       photo →

    photo       photo
```

Center text:

```text
little moments.

things that probably
don't matter
to anyone else.
```

After spread completes, subtle pointer parallax may activate on desktop.

Disable pointer parallax on touch devices.

---

# 16. MemorySpread Mobile Behavior

Desktop:

- stacked cards,
- scroll-linked scattering,
- depth parallax,
- multiple positions.

Mobile:

Do not shrink desktop behavior until it barely fits.

Instead transform the interaction into a controlled editorial collage.

Possible arrangement:

```text
photo      photo

      photo

photo      photo

      photo
```

Movement should be primarily:

```text
translateY
scale
opacity
```

Avoid expensive continuous pointer animation.

---

# 17. Her Section

Section title:

```text
her.
```

Subtitle:

```text
my favorite subject.
```

This section is a curated photography exhibition.

Do not treat it as a basic image grid.

Supported layouts:

```text
full bleed portrait
editorial split
film strip
large landscape
polaroid
cropped portrait
black and white
```

Example:

```text
                         [portrait]

I don't think you realize
how pretty you looked here.



[wide photo]

                    17.08.2026
```

Photo ordering should be manually controllable from admin.

---

# 18. Gallery Page

Route:

```text
/gallery
```

Purpose:

Provide access to more photos without polluting the storytelling homepage.

Features:

```text
masonry layout
filter by year
filter by memory tag
photo detail
lightbox
swipe navigation
keyboard navigation
```

Photo detail may display:

```text
title
caption
date
location
related memory
song
```

Do not expose Cloudinary technical URLs in UI.

---

# 19. Things I Love

Layout:

```text
things I love about you

not in any particular order.

01
the way...

02
...

03
...
```

Each item:

```text
id
number
text
optional image
createdAt
order
published
```

Some entries may reveal an image on hover or tap.

Do not force every entry to have an image.

---

# 20. Letters

Homepage should preview several letters.

Dedicated route:

```text
/letters
```

Letter categories may include:

```text
open when you miss me
open when you're tired
open when you're having a bad day
birthday
just because
```

Visual metaphor:

```text
envelope
paper
fold
stamp
```

Opening interaction:

```text
tap/click envelope
↓
envelope flap moves
↓
letter slides upward
↓
content appears
```

Do not make the animation excessively long.

Target total interaction time:

```text
700–1200ms
```

Provide immediate accessibility fallback where the letter simply expands.

---

# 21. TextReveal Primitive

Use the supplied RevealText source only as behavioral reference.

The source currently implements word-level animation using:

```text
opacity
vertical translation
blur
stagger
```

with configurable stagger, duration, offset, and blur.

Build:

```tsx
<TextReveal>
  some memories deserve more than staying inside my gallery.
</TextReveal>
```

Recommended defaults:

```text
duration: 0.65
stagger: 0.035
yOffset: 18px
blur: 8px
once: true
```

Do not animate every paragraph.

Use TextReveal for:

```text
hero statements
section headings
major emotional lines
ending
```

Normal captions should usually appear without complex animation.

---

# 22. Motion Philosophy

Motion must follow:

```text
60% natural/static
30% subtle reveal
10% signature motion
```

Signature motion locations:

```text
intro
hero
MemorySpread
letters
page transitions
ending
```

If every element moves, nothing feels special.

---

# 23. Motion Tokens

Create:

```text
lib/motion/tokens.ts
```

Example:

```ts
export const motionTokens = {
  duration: {
    micro: 0.18,
    fast: 0.3,
    base: 0.55,
    slow: 0.85,
    cinematic: 1.15,
  },

  ease: {
    standard: [0.22, 1, 0.36, 1],
    soft: [0.25, 0.1, 0.25, 1],
    exit: [0.4, 0, 1, 1],
  },

  stagger: {
    fast: 0.025,
    base: 0.045,
    slow: 0.07,
  },
}
```

Components should reference these tokens instead of inventing random motion values.

---

# 24. Page Transition

Build custom:

```text
PaperTransition
```

Used only between major routes.

Example:

```text
current page

↓ click

cream paper covers viewport

███████████████

route changes

███████████████

paper reveals new page
```

Timing target:

```text
0ms      click
0–400ms  page cover
400ms    route swap
400–850ms reveal
```

Do not play this transition:

- when clicking photo lightboxes,
- when changing filters,
- when opening small UI controls,
- inside admin forms.

---

# 25. Custom Cursor

Desktop only.

Default:

```text
•
```

Context states:

```text
view
open
drag
```

Disable on:

```text
pointer: coarse
```

Never hide the system cursor unless the custom cursor is fully initialized.

---

# 26. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced motion behavior:

```text
disable parallax
disable smooth scrolling
disable cursor depth
disable long page transitions
disable photo scattering animation
disable blur-heavy reveal
```

Replace with:

```text
opacity
small translate
instant layout
```

Content functionality must remain identical.

---

# 27. Firebase Architecture

Use Firebase for:

```text
Authentication
Firestore
```

Do NOT use the Git repository as photo storage.

---

# 28. Authentication

Only admin requires authentication.

Public users should not require Firebase Authentication unless private-site mode is enabled later.

Initial implementation:

```text
Firebase Email/Password
```

Admin allowlist should exist server-side.

Example:

```env
ADMIN_EMAIL=
```

Do not rely only on hiding `/admin`.

Firestore security rules must reject unauthorized writes.

---

# 29. Cloudinary

All personal photography should be stored in Cloudinary.

Do not put girlfriend photos inside:

```text
/public
```

Repository `/public` is only for static design assets such as:

```text
paper textures
grain
tape SVG
decorative marks
icons
placeholder assets
```

---

# 30. Image Upload Flow

Admin flow:

```text
/admin
↓
choose image
↓
client preview
↓
server-authorized Cloudinary upload
↓
Cloudinary returns asset metadata
↓
metadata stored in Firestore
↓
public website updates
```

Never expose:

```text
CLOUDINARY_API_SECRET
```

to the browser.

---

# 31. Cloudinary Transformations

Do not render original 8 MB smartphone photos directly.

Generate contextual variants.

Suggested widths:

```text
thumbnail       400px
small           700px
gallery        1000px
content        1400px
hero           1800px
```

Prefer:

```text
f_auto
q_auto
```

where appropriate.

Use responsive `sizes`.

Use blur/low-quality placeholder while image loads.

---

# 32. Firestore Data Model

Collections:

```text
settings
memories
photos
timeline
letters
loveThings
```

---

# 33. settings

Document:

```text
settings/site
```

Example:

```ts
{
  siteTitle: "Our Little Place",

  girlfriendName: "",

  relationshipStartDate: "",

  heroPhotoId: "",

  currentFavoritePhotoId: "",

  currentNote: "",

  currentSong: {
    title: "",
    artist: "",
    url: ""
  },

  introEnabled: true,

  siteAccess: "public",

  updatedAt: Timestamp
}
```

---

# 34. photos

```ts
{
  id: string,

  cloudinaryPublicId: string,
  secureUrl: string,

  width: number,
  height: number,

  alt: string,

  title?: string,
  caption?: string,

  takenAt?: Timestamp,

  tags: string[],

  featured: boolean,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Use Cloudinary `public_id` for deletion and transformations.

---

# 35. memories

```ts
{
  id: string,

  title: string,
  story: string,

  date: Timestamp,

  photoIds: string[],

  location?: string,

  song?: {
    title: string,
    artist: string,
    url?: string
  },

  tags: string[],

  featured: boolean,

  showOnTimeline: boolean,

  status: "draft" | "published",

  order?: number,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

# 36. timeline

Timeline may optionally reference a memory rather than duplicate data.

```ts
{
  id: string,

  memoryId?: string,

  date: Timestamp,

  title: string,
  description?: string,

  photoId?: string,

  order: number,

  published: boolean
}
```

---

# 37. letters

```ts
{
  id: string,

  title: string,

  slug: string,

  category: string,

  content: string,

  coverText?: string,

  unlockDate?: Timestamp,

  published: boolean,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

If `unlockDate` is set and the current time has not reached it, only the envelope/preview should appear.

Do not send locked letter content to the client before its unlock date.

---

# 38. loveThings

```ts
{
  id: string,

  text: string,

  photoId?: string,

  order: number,

  published: boolean,

  createdAt: Timestamp
}
```

---

# 39. Admin Dashboard

Route:

```text
/admin
```

Dashboard should prioritize simplicity.

Example:

```text
Our Little Place

Photos        137
Memories       24
Letters        12
Things I Love  37

Quick Add

[ + Photo ]
[ + Memory ]
[ + Letter ]
[ + Timeline ]
[ + Love Thing ]
```

---

# 40. Admin Navigation

```text
Overview
Photos
Memories
Timeline
Letters
Things I Love
Homepage
Settings
```

Mobile admin navigation may become bottom sheet or drawer.

---

# 41. Photo Manager

Features:

```text
upload
preview
edit caption
edit alt text
tags
mark featured
delete
copy/reuse
search
sort
```

Deleting a photo that is referenced elsewhere must show a warning.

Do not silently break memory references.

---

# 42. Memory Editor

Fields:

```text
title
story
date
location
photos
song
tags
featured
show on timeline
status
```

Actions:

```text
Save Draft
Preview
Publish
Delete
```

Preview should resemble the real public component.

---

# 43. Homepage Editor

The admin must be able to change:

```text
hero photo
current favorite photo
current note
current song
latest memory
featured gallery photos
featured love things
featured letters
```

No redeployment required.

---

# 44. Ordering

Sections where manual order matters:

```text
timeline
Her gallery
Things I Love
letters
featured memories
```

Admin should support reorder controls.

Drag-and-drop is preferred on desktop.

Simple move-up / move-down fallback must exist for touch devices.

---

# 45. Draft / Publish System

Content should have:

```text
draft
published
```

Draft content must not appear publicly.

Admin should clearly display status.

Example:

```text
Draft
Published
Scheduled
```

Scheduled publishing is optional after MVP.

---

# 46. Dynamic Greeting

Homepage may alter a small greeting based on visitor local time.

Morning:

```text
good morning, pretty.
```

Afternoon:

```text
hope your day is treating you well.
```

Night:

```text
you're probably supposed
to be sleeping right now.
```

This must be a subtle detail rather than the main hero headline.

---

# 47. Special Dates

Support configurable special dates.

Possible types:

```text
birthday
anniversary
custom
```

Examples:

Birthday:

```text
today isn't
a normal day.

it's your birthday.
```

Anniversary:

```text
365 days.
```

Special states should automatically expire after their configured period.

Do not hardcode dates in React components.

---

# 48. Easter Eggs

Support intentionally small surprises.

Potential examples:

```text
hidden click target
flippable photo
secret note
click sequence
unexpected caption
```

Do not add more than a few.

They should feel discovered, not advertised.

---

# 49. Privacy Mode — Future Ready

Architecture should support:

```text
public
private
```

without redesigning the whole app.

Private mode may later include:

```text
access code
session cookie
```

This is not mandatory for MVP unless explicitly enabled.

Admin must always remain protected.

---

# 50. Responsive Strategy

Design mobile intentionally.

Do not build desktop first and simply shrink everything.

Breakpoints should be driven by layout needs rather than device names.

Mobile priorities:

```text
portrait photography
comfortable reading
swipe interactions
fast loading
large touch targets
minimal pointer-specific animation
```

---

# 51. Performance

Target:

```text
LCP < 2.5s on reasonable mobile connection
CLS < 0.1
INP < 200ms where practical
```

Use:

```text
Next Image or optimized Cloudinary image component
lazy loading
code splitting
dynamic import for expensive interactions
server components where possible
client components only when required
```

Avoid mounting every motion component globally.

---

# 52. Accessibility

Minimum requirements:

```text
semantic headings
keyboard navigation
visible focus state
image alt text
aria labels where needed
reduced-motion support
reasonable contrast
touch targets >= ~44px
```

Photo captions must not substitute proper alt text.

Decorative imagery should use empty alt values.

---

# 53. SEO / Indexing

Because this is a personal site, SEO is not a priority.

Provide:

```text
title
description
Open Graph image
favicon
robots configuration
```

Admin routes must never be indexed.

If private mode is enabled, public indexing must be disabled.

---

# 54. Suggested Project Structure

```text
app/
├── layout.tsx
├── page.tsx
│
├── gallery/
│   └── page.tsx
│
├── story/
│   └── page.tsx
│
├── letters/
│   ├── page.tsx
│   └── [slug]/
│
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── photos/
│   ├── memories/
│   ├── timeline/
│   ├── letters/
│   ├── love/
│   └── settings/
│
└── api/
    └── cloudinary/

components/
├── sections/
│   ├── Intro.tsx
│   ├── Hero.tsx
│   ├── RightNow.tsx
│   ├── StoryTimeline.tsx
│   ├── LittleMoments.tsx
│   ├── HerGallery.tsx
│   ├── ThingsILove.tsx
│   ├── LettersPreview.tsx
│   └── Ending.tsx
│
├── motion/
│   ├── TextReveal.tsx
│   ├── ImageReveal.tsx
│   ├── MemorySpread.tsx
│   ├── LivingPhoto.tsx
│   ├── PaperTransition.tsx
│   └── Cursor.tsx
│
├── gallery/
├── letters/
├── admin/
└── ui/

lib/
├── firebase/
│   ├── client.ts
│   ├── admin.ts
│   └── queries.ts
│
├── cloudinary/
│   ├── config.ts
│   └── transforms.ts
│
├── motion/
│   └── tokens.ts
│
└── auth/

types/
├── memory.ts
├── photo.ts
├── letter.ts
└── site.ts

public/
├── textures/
├── paper/
├── tape/
├── icons/
└── decorations/
```

---

# 55. 21st.dev Reference Rules

The supplied components are references.

They are NOT requirements to preserve exact markup or styling.

### Reference A — MascotPortfolioHero

Use only for:

```text
pointer depth concepts
layer movement
idle behavior concepts
RAF animation strategy
reduced-motion awareness
```

Do not copy:

```text
portfolio visual style
mascot
services list
hire badges
portfolio typography
```

The source's depth illusion comes from different layer offsets rather than actual 3D rendering.

### Reference B — StackSpread

Use for:

```text
scroll-linked image scattering
sticky stage
card transforms
depth-based pointer parallax
touch fallback
reduced motion
```

Rebuild it as a dynamic Firestore-backed `MemorySpread`.

The source defines card movement through scroll-driven translation, scale and rotation rather than a static gallery.

### Reference C — RevealText

Use for:

```text
word splitting
stagger reveal
blur to sharp
viewport trigger
configurable timing
```

Remove demo-specific:

```text
dark background
green text
Space Grotesk styling
portfolio copy
```

The component's interface already exposes delay, duration, stagger, y-offset, blur, and viewport behavior, which should inform the rewritten API.

---

# 56. Build Phases

## Phase 1 — Foundation

Create project.

Implement:

```text
Next.js
TypeScript
Tailwind
fonts
design tokens
global layout
responsive container system
```

No backend yet.

---

## Phase 2 — Static Story Prototype

Build homepage using placeholder local images.

Implement:

```text
Intro
Hero
Right Now
Our Story
Little Moments
Her
Things I Love
Letters
Ending
```

Goal:

Validate storytelling and visual hierarchy before introducing infrastructure.

---

## Phase 3 — Motion Foundation

Build:

```text
TextReveal
ImageReveal
LivingPhoto
MemorySpread
PaperTransition
```

Centralize tokens.

Test:

```text
desktop
touch
reduced motion
```

---

## Phase 4 — Firebase

Implement:

```text
Firebase Auth
Firestore
security rules
admin authorization
```

Convert static content to Firestore data.

---

## Phase 5 — Cloudinary

Implement:

```text
secure uploads
image transformations
responsive delivery
photo metadata
deletion
```

Replace placeholder image system.

---

## Phase 6 — Admin CMS

Build:

```text
overview
photo manager
memory manager
timeline manager
letters manager
things I love manager
homepage editor
settings
```

---

## Phase 7 — Public Dynamic Content

Connect all homepage sections to Firestore.

Ensure content can be updated without deployment.

---

## Phase 8 — Gallery & Letters

Build:

```text
/gallery
/letters
/letters/[slug]
/story
```

---

## Phase 9 — Responsive Polish

Test:

```text
small phone
large phone
tablet
laptop
desktop
ultrawide
```

---

## Phase 10 — Performance & Accessibility

Audit:

```text
Lighthouse
keyboard navigation
reduced motion
image loading
bundle size
Firestore reads
mobile interaction
```

---

# 57. MVP Acceptance Criteria

The project is considered MVP-ready when:

```text
✓ website can be deployed

✓ homepage tells a coherent story

✓ admin login works

✓ unauthorized writes are blocked

✓ owner can upload a photo

✓ photo is stored in Cloudinary

✓ photo metadata is stored in Firestore

✓ owner can create a memory

✓ owner can publish/unpublish content

✓ owner can create/edit letters

✓ owner can update Right Now section

✓ uploaded content appears publicly without redeploying

✓ MemorySpread uses dynamic photos

✓ mobile experience is intentionally designed

✓ reduced-motion mode works

✓ photos do not live inside the Git repository

✓ Cloudinary secret is never exposed client-side

✓ page transitions do not interfere with navigation

✓ website remains usable without animation
```

---

# 58. Codex Implementation Rules

Codex must follow these rules.

Do not try to complete the entire project in one pass.

Work phase-by-phase.

Before beginning each phase:

```text
inspect existing project
identify reusable implementation
plan changed files
implement
run typecheck
run lint
run build where appropriate
report results
```

Never rewrite working unrelated code unnecessarily.

Do not hardcode demo photography into final components.

Do not introduce fake relationship information.

Use placeholder content until real content is provided.

Do not invent:

```text
girlfriend name
relationship date
birthday
locations
song titles
memory captions
letters
```

All such personal content must remain configurable.

---

# 59. Initial Development Content

Until real content is added, use neutral placeholders such as:

```text
Photo 01
Photo 02

A little moment.

Something worth remembering.

Your note goes here.
```

Avoid fake romantic sentences that may accidentally imply real events.

---

# 60. Final Product Principle

Every technical decision must answer:

> Does this make the website easier to maintain, more personal, or more enjoyable to experience?

If not, do not add it.

The product should not demonstrate how many frontend techniques can be used.

The product should make one person feel that someone cared enough to remember the details.