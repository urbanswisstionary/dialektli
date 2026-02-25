# Dialektli UI Design Prompts for v0

> This document contains detailed, structured prompts for generating UI designs for each page/component of **Dialektli** — a community-driven Swiss dialect dictionary. Each prompt is self-contained and ready to paste into v0 or any UI generation tool.
>
> **Design System**: Tailwind CSS, Next.js App Router, fully responsive (mobile-first).
>
> **Last updated**: 2026-02-12

---

## Table of Contents

1. [Global Design Brief](#1-global-design-brief)
2. [Layout Shell (Navbar + Footer)](#2-layout-shell-navbar--footer)
3. [Home Page (Search + Browse)](#3-home-page-search--browse)
4. [Expression Card Component](#4-expression-card-component)
5. [Expression Detail Page](#5-expression-detail-page)
6. [New Expression Page](#6-new-expression-page)
7. [Edit Expression Page](#7-edit-expression-page)
8. [Sprachatlas (Dialect Atlas) Page](#8-sprachatlas-dialect-atlas-page)
9. [User Profile Page](#9-user-profile-page)
10. [Sign In Page](#10-sign-in-page)
11. [Welcome (Onboarding) Page](#11-welcome-onboarding-page)
12. [About Page](#12-about-page)
13. [Legal Pages (ToS, Privacy, DMCA, Accessibility)](#13-legal-pages)
14. [Contact Us Page](#14-contact-us-page)
15. [Bug Report Page](#15-bug-report-page)

---

## 1. Global Design Brief

### What is Dialektli?

Dialektli is a community-run dictionary for Swiss German dialects and expressions — think **Urban Dictionary but for Swiss German**. Users can:
- Browse and search dialect expressions
- Submit new expressions with definitions, examples, canton associations
- Like/dislike expressions
- Explore a geographic dialect atlas (interactive map of Switzerland)
- View their profile and manage their contributions

### Design Philosophy

- **Inspired by Urban Dictionary**: Search-first, content-centric, minimal chrome. The content (expressions and definitions) should be the star.
- **Clean and modern**: Not playful/childish — a mature, well-crafted tool that respects the cultural value of Swiss dialects.
- **Swiss identity**: Subtle Swiss design sensibility — precise, clean, functional. Think SBB, Migros, or Swiss government sites in their clarity. Not kitschy or overly themed.
- **Accessible**: WCAG AA compliant, good contrast ratios, keyboard navigable.

### Tech Stack (for v0 context)

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (we are migrating FROM MUI to Tailwind)
- **i18n**: 3 locales (DE, FR, EN) — all text comes from translation keys, so use placeholder text in the design
- **Auth**: next-auth (Google OAuth + dev credentials)
- **Data**: GraphQL (Apollo Client) — expressions, users, likes/dislikes, cantons
- **Font**: Inter or system font stack (clean, modern sans-serif)

### Color Palette Direction

- Primary: A warm, muted blue or teal (not electric/neon)
- Background: Clean whites/very light grays for light mode; dark grays/near-black for dark mode
- Accent: A warm color (amber/orange) for highlights, CTAs, and interactive elements
- Support both light and dark mode via Tailwind's `dark:` classes
- Canton flags and the Swiss map bring natural color — the UI itself should be restrained

### Typography

- Headlines: Bold, tight letter-spacing (negative tracking)
- Body: Regular weight, generous line-height (1.6-1.8) for readability
- Expression titles should feel prominent — they're the "word of the day" equivalent
- Definitions should read like prose — comfortable, bookish

### Spacing & Layout

- Max content width: 1024px, centered
- Generous whitespace — let content breathe
- Cards with subtle borders or very light shadows (not heavy Material-style elevation)
- Mobile: Full-width cards, stacked layout
- Desktop: Single column for content, side-by-side for filters

---

## 2. Layout Shell (Navbar + Footer)

### Prompt

```
Design a responsive layout shell (navbar + footer + main content area) for "Dialektli", a Swiss dialect dictionary web app (like Urban Dictionary for Swiss German).

NAVBAR REQUIREMENTS:
- Fixed/sticky at top, hides on scroll down, reveals on scroll up
- Left: Logo (small square icon) + brand name "Dialektli" (bold, tight tracking)
- Center-ish: A prominent search bar — this is the most important element. It should be wide (up to ~480px on desktop), with a subtle border, rounded corners, and a search icon. Placeholder text: "Search expressions..."
- Navigation links (text only, no icons on desktop): "Home", "Dialect Atlas" — with a subtle bottom-border active indicator
- Right side utilities (compact):
  - Locale selector: Shows a small flag icon + 2-letter code ("DE", "FR", "EN"). Dropdown on click.
  - Dark/light mode toggle: Simple icon button (sun/moon)
  - If logged in: User icon button → dropdown menu with "Profile", "My Expressions", "Sign Out"
  - If logged out: "Sign In" text button (outlined)
- Mobile (<768px):
  - Logo + search bar + hamburger icon
  - Hamburger opens a right-side drawer with all nav links, locale selector, theme toggle, and auth options
- Style: Clean white/light background, thin bottom border. No heavy shadows or gradients.

FOOTER REQUIREMENTS:
- Three columns on desktop, stacked on mobile:
  - "About" section: Link to About page
  - "Legal" section: Links to Terms of Service, Privacy Policy, DMCA, Accessibility
  - "Connect" section: Links to Contact Us, Bug Report
- Section headers in the accent/primary color
- Links are muted text, brighten on hover with a subtle left-shift animation
- Bottom bar: "© Dialektli {year}. All rights reserved." centered
- Generous top padding, separated from content by a thin divider line

MAIN CONTENT AREA:
- Centered, max-width 1024px
- Proper padding on sides (16px mobile, 24px desktop)
- Flex column, min-height 100vh (footer pushed to bottom)

Use Tailwind CSS. Support dark mode. Make it feel like a quality, modern web tool — not a template.
```

---

## 3. Home Page (Search + Browse)

### Prompt

```
Design the home page for "Dialektli", a Swiss dialect dictionary (like Urban Dictionary for Swiss German). This is the main browse/search page.

CONTEXT: The navbar already has a search bar. This page shows search results and filtering options below it.

PAGE LAYOUT (top to bottom):

1. HERO/SEARCH AREA (only visible on home, below navbar):
   - A secondary, larger search input + a prominent "Add New Expression" button side by side
   - On mobile: stacked vertically (button on top, then search)
   - The search input has the placeholder "Search Swiss expressions..."
   - The "Add New Expression" button is the primary CTA — filled accent color, bold

2. FILTER BAR:
   - Canton filter: An autocomplete/select dropdown labeled "Filter by canton" — shows all 26 Swiss cantons grouped by language region
   - Language filter: Simple select with options "All", "Deutsch", "Francais", "Italiano"
   - Sort: Select with "Random" (default) and "Most Popular"
   - On desktop: filters in a horizontal row
   - On mobile: stacked, full-width

3. LETTER FILTER (collapsible):
   - An expandable accordion labeled "Filter by first letter"
   - When expanded: shows A-Z + special characters as small pill/chip buttons in a wrapping row
   - Selected letter is highlighted (filled primary color)
   - Hidden when a search query is active

4. EXPRESSION CARDS LIST:
   - A vertical list of ExpressionCard components (see prompt #4)
   - Pagination at the bottom: simple "Previous / Page X of Y / Next" style
   - Loading state: subtle skeleton cards

5. EMPTY STATE:
   - When no results: A friendly message "No expressions found" with a suggestion to try different filters or add a new expression

DESIGN NOTES:
- The page should feel like a dictionary index — functional, scannable, efficient
- Filters should feel lightweight, not overwhelming
- Cards should have clear visual hierarchy: title > definition > metadata
- Use Tailwind CSS, responsive, dark mode support
```

---

## 4. Expression Card Component

### Prompt

```
Design an ExpressionCard component for "Dialektli", a Swiss dialect dictionary. This card is used in lists and as the detail view. Think of it as a dictionary entry card — like an Urban Dictionary definition card.

CARD STRUCTURE (top to bottom):

1. HEADER ROW:
   - Left side:
     - Canton flags: If the expression is associated with cantons, show small canton coat-of-arms/flag icons in a horizontal row. These are clickable (filter by that canton).
     - Below flags: A small, inline SVG mini-map of Switzerland with the associated cantons highlighted in the primary color. Size: ~300px wide, ~180px tall. This should feel like an elegant, subtle geographic indicator — not a full interactive map.
   - Right side: Share buttons (copy link, share) — small, icon-only, muted

2. TITLE AREA:
   - Expression title: Large, bold text (h3-equivalent). This is the "word."
   - Inline after title: If grammatical gender exists, show "(M)", "(F)", or "(N)" in small muted text
   - Inline after gender: If word type exists (noun, verb, etc.), show it as a small colored tag/badge

3. METADATA ROW:
   - Date posted as a clickable link to the expression detail page
   - Format: "February 12, 2026" — muted caption text

4. DEFINITION:
   - The main definition text. Body paragraph style, comfortable reading width
   - Should feel like prose — generous line-height

5. EXAMPLES SECTION (if examples exist):
   - Labeled "Examples:" in small bold text
   - Each example in italics or in a slightly indented/quoted style
   - Example cantons shown as small flag icons next to each example

6. SYNONYMS SECTION (if synonyms exist):
   - Labeled "Synonyms:" in small bold text
   - Synonym links in a horizontal row of pill-style chips — clickable, navigates to that expression

7. FOOTER / ACTION BAR:
   - Separated from content by a thin top border
   - Left: "Author: [name]" with the author name as a clickable link + "More from author" small outlined button
   - Right: Like/Dislike buttons with counts
     - Thumb up and thumb down icons
     - Each shows a small count badge
     - Filled/highlighted state when user has voted
     - If it's the user's own expression, voting is disabled with a tooltip

DESIGN NOTES:
- Card should have a very subtle border or shadow — not heavy Material elevation
- On hover, a slightly stronger shadow for depth
- Word-break for long Swiss German compound words (they can be very long!)
- The mini Switzerland map should be a tasteful, small visual element — not dominating
- Prioritize readability of the definition — this is the core content
- Use Tailwind CSS, responsive, dark mode
```

---

## 5. Expression Detail Page

### Prompt

```
Design the expression detail page for "Dialektli". This page shows a single expression in full.

LAYOUT:
- Simply renders one ExpressionCard (prompt #4) at full width within the standard page container (max-w-4xl centered)
- No additional chrome needed — the card IS the page content
- If the logged-in user is the author or an admin, show an "Edit" button/link in the top-right area above the card

STATES:
- Loading: Centered spinner or skeleton of the card
- Not found: "Expression not found" message with a link back to home
- Logged out: Card renders normally but like/dislike buttons show a tooltip "Sign in to vote"

Use Tailwind CSS, responsive, dark mode.
```

---

## 6. New Expression Page

### Prompt

```
Design the "Add New Expression" page for "Dialektli", a Swiss dialect dictionary.

CONTEXT: Authenticated users can submit new Swiss German expressions. The form should feel inviting but structured — like contributing to a real dictionary.

FORM LAYOUT (within a card/panel):

1. PAGE HEADER:
   - Title: "New Expression" (or localized equivalent)
   - Subtitle: "Share a Swiss expression with the community"

2. FORM FIELDS (stacked vertically):
   a. **Expression title** (required):
      - Text input, prominent, larger font
      - Validation: minimum 3 characters
      - Placeholder: "e.g., Chuchichäschtli"

   b. **Definition** (required):
      - Textarea, 3-4 rows
      - Validation: minimum 10 characters
      - Placeholder: "What does this expression mean? When is it used?"

   c. **Cantons** (optional):
      - Multi-select autocomplete for Swiss cantons
      - Helper text: "Which cantons use this expression?"
      - Shows selected cantons as removable chips/tags

   d. **Grammatical gender** (optional):
      - Radio group or segmented control: Masculine / Feminine / Neutral
      - Helper text: "Grammatical gender of the word"

   e. **Word type** (optional):
      - Select dropdown: Noun, Verb, Adjective, Adverb, etc.

   f. **Example** (optional):
      - Textarea, 2-3 rows
      - Placeholder: "Use it in a sentence..."
      - Helper text: "Show how this expression is used in context"

   g. **Example cantons** (conditional — only visible if example is filled):
      - Same canton multi-select as above
      - Helper text: "Which cantons would use this example phrasing?"

3. FORM ACTIONS:
   - "Cancel" — outlined/ghost button, goes back
   - "Submit" — filled primary button, right-aligned
   - Submit button shows loading spinner while saving

4. ERROR STATE:
   - Field-level validation errors below each field in red
   - Submission error: Alert banner at the top of the form

DESIGN NOTES:
- The form should feel like filling out a dictionary entry, not a boring admin form
- Clean, generous spacing between fields
- Labels above fields (not floating)
- The entire form in a clean card with subtle border
- Redirect to the new expression's detail page on success
- Use Tailwind CSS, responsive, dark mode
```

---

## 7. Edit Expression Page

### Prompt

```
Design the "Edit Expression" page for "Dialektli". Similar to the New Expression page but for editing an existing entry.

DIFFERENCES FROM NEW EXPRESSION:
- Title: "Edit Expression"
- All fields pre-populated with existing data
- Additional field at top: "Published" checkbox toggle — controls visibility
- Additional "Delete" button (destructive, red/outlined) alongside Cancel and Save
- If user is not the author AND not an admin: show a warning banner "You do not have permission to edit this expression"
- Save button disabled when no changes detected
- Cancel resets to original values (not navigate back)

Same form fields as New Expression (prompt #6): title, definition, cantons, gender, type.
Note: Example editing is not available in the edit form (only on creation).

DESIGN:
- Same card-based form layout
- Delete button should have a confirmation step (inline "Are you sure?" or dialog)
- Use Tailwind CSS, responsive, dark mode
```

---

## 8. Sprachatlas (Dialect Atlas) Page

### Prompt

```
Design the "Sprachatlas" (Dialect Atlas) page for "Dialektli". This is an interactive map exploration page where users can browse expressions by Swiss canton.

PAGE LAYOUT:

1. PAGE HEADER:
   - Title: "Sprachatlas" (Dialect Atlas)
   - No subtitle needed — the map speaks for itself

2. LANGUAGE FILTER:
   - Small select dropdown: "All", "Deutsch", "Francais", "Italiano"
   - Positioned above the map, left-aligned
   - Changing the language filter resets the selected canton and reloads data

3. INTERACTIVE MAP:
   - A large SVG map of Switzerland showing all 26 cantons
   - Cantons with expressions are highlighted (filled with a tint of the primary color, intensity based on count)
   - Cantons without expressions are light gray
   - On hover: canton border highlights, tooltip shows canton name + expression count
   - On click: selects that canton, scrolls to detail panel below
   - Map should be contained in a subtle bordered panel
   - Responsive: fills available width, maintains aspect ratio
   - Height: ~500px on desktop, ~300px on mobile

4. CANTON SUMMARY (when no canton selected):
   - Below the map: "X cantons with expressions"
   - Row of small chips/pills, one per canton with expressions, showing "Canton Name (count)"
   - Clicking a chip selects that canton (same as clicking the map)

5. CANTON DETAIL PANEL (when a canton is selected):
   - Replaces the summary section
   - Header: Canton name (large, bold) + expression count badge + "Clear" dismiss button
   - Below: A list of expressions from that canton
     - Each item: Expression title (clickable link to detail page) + language badge
     - Simple list format — not full ExpressionCards (too heavy for a list of 20)
     - Max 20 shown, with a "View all" link that navigates to home page filtered by that canton
   - Loading state: centered spinner while fetching canton expressions

DESIGN NOTES:
- The map is the hero of this page — give it visual prominence
- The map should feel like a modern data visualization, not a clip-art illustration
- Canton colors on the map should be accessible (not just color-coding — consider patterns or strong contrast)
- The detail panel transition should feel smooth
- This page should make people want to click around and explore
- Use Tailwind CSS, responsive, dark mode
```

---

## 9. User Profile Page

### Prompt

```
Design the user profile page for "Dialektli". This is a tabbed page that shows the user's info, their expressions, and (for admins) a user management table.

CONTEXT: This page is only accessible to authenticated users. It currently "looks like shit" (owner's words) — we need a clean, modern redesign.

PAGE LAYOUT:

1. PROFILE HEADER CARD:
   - Layout: Horizontal on desktop, stacked on mobile
   - Left: Avatar circle (80px) — shows initials fallback (no image upload supported)
   - Right of avatar:
     - Username (h4, bold) with a small edit icon button next to it
       - Clicking edit: inline text field replaces the name, with save/cancel icon buttons
     - Bio text below name (muted color). If no bio: "No bio yet" in italics
       - Small edit icon to toggle inline editing (textarea + save/cancel)
     - Location row: Canton and Country as small muted text badges/tags
     - Stats row: "X likes received" and "X dislikes received" as small text
   - The entire header in a clean card with subtle border

2. TAB BAR:
   - Tabs: "Profile" | "My Expressions" | (if admin) "Users"
   - Clean underline-style tabs, not boxed
   - Active tab: primary color underline + bold text
   - Tabs update the URL query parameter (?view=profile|expressions|users)

3. PROFILE TAB CONTENT:
   - Statistics card:
     - Two big numbers side by side:
       - Published expressions count (primary color, large number)
       - Unpublished expressions count (amber/warning color, large number)
     - Labels below each number in muted text
   - Future: This could show more stats, badges, activity feed — but for now just these two numbers

4. EXPRESSIONS TAB CONTENT:
   - A vertical list of the user's ExpressionCards (same component as prompt #4)
   - If no expressions: "You haven't submitted any expressions yet" + "Add your first expression" CTA button
   - Loading state: skeletons

5. USERS TAB (admin only):
   - A clean data table with columns:
     - Name | Email | Role (as a colored badge: ADMIN=red, USER=default) | Canton | Expressions (count) | Likes (count)
   - Table should be responsive: horizontal scroll on mobile, or stack into cards
   - Zebra striping or subtle row borders for readability
   - If no users: "No users found" message

DESIGN NOTES:
- The profile page should feel personal but not social-media-heavy. Think "account settings" meets "contributor dashboard"
- No image upload UI — avatar shows initials derived from the name
- Inline editing should feel seamless — not a separate "edit profile" page
- The stats should feel like achievements/milestones
- Keep it clean and functional
- Use Tailwind CSS, responsive, dark mode
```

---

## 10. Sign In Page

### Prompt

```
Design the sign-in page for "Dialektli", a Swiss dialect dictionary.

LAYOUT:
- Full viewport height, centered card
- Background: subtle gradient or the default background color — nothing distracting

SIGN-IN CARD:
- Max width: 400px
- Centered both horizontally and vertically
- Content:
  1. Title: "Sign In" (h4, centered)
  2. Subtitle: "Sign in to contribute to the Swiss dialect community" (muted text, centered)
  3. Google Sign In button:
     - Full width
     - Google blue (#4285F4) background
     - Google "G" icon on the left
     - Text: "Continue with Google"
     - Rounded corners
  4. Development-only section (visually separated by a divider with text "Development Only"):
     - Email input field
     - Password input field
     - "Sign in with Test Account" outlined button
     - Caption: "Use test@example.com / password" in muted text
     - This entire section should look clearly dev/debug — maybe a subtle dashed border or different background tint

DESIGN NOTES:
- Should feel trustworthy and simple — one-click sign in via Google is the main flow
- The dev section should be visually subordinate — it's only for development
- Card should have a subtle shadow and rounded corners
- Use Tailwind CSS, responsive, dark mode
```

---

## 11. Welcome (Onboarding) Page

### Prompt

```
Design the welcome/onboarding page for "Dialektli". This is shown to new users who have signed in for the first time but don't have a username yet.

LAYOUT:
- Centered card (like sign-in), max-width 500px
- Vertically centered on the page

CARD CONTENT:
1. Title: "Welcome to Dialektli!" (h4, centered, friendly)
2. Subtitle: "Choose a username to get started" (muted, centered)
3. Username text field:
   - Full width
   - Label: "Username"
   - Validation: minimum 3 characters, must be unique
   - Real-time uniqueness check — if taken, show error "This username is already taken"
   - Helper text: "Choose a unique name (at least 3 characters)"
4. Submit button:
   - Full width, primary color, "Continue"
   - Disabled while username < 3 chars or during submission
   - Shows spinner while saving

DESIGN NOTES:
- Should feel warm and inviting — this is the user's first real interaction
- Clean, focused — one task: pick a username
- Smooth validation feedback (not aggressive red on every keystroke)
- Use Tailwind CSS, responsive, dark mode
```

---

## 12. About Page

### Prompt

```
Design the About page for "Dialektli", a Swiss dialect dictionary.

CONTEXT: This is a long-form content page explaining what Dialektli is, its mission, and its inspiration. The text comes from translation keys (11 paragraphs).

LAYOUT:
- Single card, max-width 900px, centered
- Generous padding (especially on desktop)

CONTENT STRUCTURE:
1. Title: "About Dialektli" — large (h3), bold, primary color
2. Opening paragraph (paragraph1): Styled as a pull-quote / italic subtitle — sets the tone
3. Body paragraphs (paragraphs 2-10):
   - Regular prose paragraphs with generous line-height (1.8)
   - Paragraph 3 contains an inline link to Urban Dictionary
   - Paragraph 4 contains inline links to Idiotikon, Swiss Dialects Atlas Project, and Kleiner Sprachatlas
   - Links should be visually distinct (primary color, underline on hover)
4. Closing paragraph (paragraph11): Styled as a closing statement — semi-bold, primary color, italic. Like a motto or mission statement.

DESIGN NOTES:
- Should feel like reading a well-typeset article or essay
- Think medium.com article layout — clean, readable, focused
- The card should have very subtle styling — the text is the design
- Maybe a thin accent line at the top of the card or a subtle left border on the opening quote
- Use Tailwind CSS, responsive, dark mode
```

---

## 13. Legal Pages

### Prompt

```
Design a reusable layout for legal/policy pages on "Dialektli". Used for: Terms of Service, Privacy Policy, DMCA, and Accessibility pages.

LAYOUT:
- Single card, max-width 900px, centered
- Same structure as About page but more structured/formal

CONTENT STRUCTURE:
1. Title: Large (h3), bold, primary color (e.g., "Terms of Service")
2. Description / intro paragraphs
3. Table of Contents (for longer pages like ToS):
   - Boxed section with slightly different background
   - Numbered list of section titles
4. Sections:
   - Section header: h5, bold, generous top margin
   - Section body: Regular paragraphs, line-height 1.8
   - Bullet lists where applicable: Clean disc-style, proper indentation
5. Footer bar:
   - "Last updated" date in italic muted text
   - Copyright notice

DESIGN NOTES:
- Legal pages need to be readable above all else — generous spacing, clear hierarchy
- Don't over-design — clarity and readability are the goals
- Table of contents should be scannable
- Use Tailwind CSS, responsive, dark mode
```

---

## 14. Contact Us Page

### Prompt

```
Design the Contact Us page for "Dialektli".

LAYOUT:
- Single card, centered, comfortable width

CONTENT:
1. Title: "Contact Us" (h4)
2. Subtitle: Brief description text
3. Contact form:
   - Name field (text, required)
   - Email field (email, required)
   - Subject field (text, required)
   - Message field (textarea, 6 rows, required)
   - Submit button (primary, full width or right-aligned)

DESIGN NOTES:
- Simple, clean form — nothing fancy needed
- Same card styling as other pages
- Form fields should have clear labels, proper spacing
- Success state: Replace form with a "Thank you! We'll get back to you soon." message
- Use Tailwind CSS, responsive, dark mode
```

---

## 15. Bug Report Page

### Prompt

```
Design the Bug Report page for "Dialektli".

LAYOUT:
- Single card, centered

CONTENT:
1. Title: "Report a Bug" (h4)
2. Subtitle: Brief encouraging text ("Help us improve Dialektli")
3. Bug report form (structured for useful reports):
   - Email (required)
   - Bug description (textarea, 4 rows, required)
     - Helper: "Describe the issue you encountered"
   - Steps to reproduce (textarea, 4 rows, required)
     - Helper: "What steps lead to this bug?"
     - Placeholder: "1. Go to...\n2. Click on...\n3. See error"
   - Expected behavior (textarea, 3 rows, required)
     - Helper: "What did you expect to happen?"
   - Desktop details (text, optional)
     - Helper: "e.g., Windows 11, macOS 14"
   - Mobile details (text, optional)
     - Helper: "e.g., iPhone 15, Samsung Galaxy S24"
   - Browser (text, optional)
     - Helper: "e.g., Chrome 120, Safari 17"
   - Additional context (textarea, 3 rows, optional)
   - Submit button

DESIGN NOTES:
- More structured than Contact Us — guide the user to give useful info
- Required vs optional fields should be visually clear
- Same card styling as other pages
- Success state: "Thank you for your report!"
- Use Tailwind CSS, responsive, dark mode
```

---

## Appendix: Data Model Reference

For context when building components, here's the core data shape:

```typescript
// Expression (the core content type)
{
  id: string
  title: string           // The dialect word/phrase
  definition: string      // What it means
  published: boolean
  language: "DE" | "FR" | "IT"
  cantons: string[]       // e.g., ["ZH", "BE", "LU"]
  gender?: "M" | "F" | "N"
  type?: "NOUN" | "VERB" | "ADJECTIVE" | ... 
  author: { id, name }
  likesCount: number
  dislikesCount: number
  likedByMe: boolean
  dislikedByMe: boolean
  createdAt: string       // ISO date
  examples: Array<{ definition: string, cantons: string[] }>
  synonyms: Array<{ id: string, title: string }>
}

// User
{
  id: string
  name: string
  email: string
  bio?: string
  canton?: string         // e.g., "ZH"
  country?: string        // e.g., "CH"
  role: "USER" | "ADMIN"
  image?: string          // Exists in DB but NOT used in UI
  likesCount: number
  dislikesCount: number
  myPublishedExpressionsCount: number
  myUnpublishedExpressionsCount: number
}

// Swiss Cantons (26 total)
// Grouped by language region:
// German: ZH, BE, LU, UR, SZ, OW, NW, GL, ZG, SO, BS, BL, SH, AR, AI, SG, GR, AG, TG
// French: FR, VD, VS, NE, GE, JU
// Italian: TI
// Note: Some cantons are multilingual (BE, FR, GR, VS)
```

### Navigation Structure

```
/ (Home — search + browse expressions)
/sprachatlas (Dialect Atlas — interactive map)
/expressions/new (Add new expression — auth required)
/expressions/[id] (Expression detail)
/expressions/[id]/edit (Edit expression — auth required)
/account/profile (User profile — auth required)
/account/profile?view=expressions (User's expressions tab)
/account/profile?view=users (Admin users tab)
/account/welcome (First-time username selection — auth required)
/auth/signin (Sign in)
/about (About page)
/tos (Terms of Service)
/privacy-policy (Privacy Policy)
/dmca (DMCA)
/accessibility (Accessibility)
/contact-us (Contact Us)
/bug-report (Bug Report)
```

### Important UX Details

1. **Search** is the #1 action — it should be instantly accessible from any page via the navbar
2. **"Add New Expression"** is the #2 action — should be prominent on the home page
3. **Voting (like/dislike)** is the core engagement mechanic — should feel satisfying
4. **Canton association** is what makes this uniquely Swiss — the map and flags give geographic context
5. **Dark mode** is expected — many users will use it
6. **The app is trilingual** (DE, FR, EN) — all user-facing text comes from translation files, so designs should work with varying text lengths
