# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing/commerce site for Maleny Cuisine, an Australian gourmet condiment
brand (chutneys, sauces, jams, dressings, Christmas pudding). Hand-written HTML, CSS
and JS. **No framework, no build step, no package.json, no tests.**

The shipped site is exactly these files:

```
index.html        home — chrome, hero, all bands, footer
archive-a.html    the full catalogue
product.html      a single product
cart-b.html       the bag
checkout.html     the checkout
our-story.html    the brand's editorial page
contact.html      enquiry form
faq.html          questions and answers
work-with-us.html wholesale and food service

styles.css        the product stylesheet (tokens + every shared component)
script.js         header/menu/search, the product rail, reveals, marquees
testimonials.css  the customer review band          (index)
testimonials.js   the review carousel               (index)
archive.css       the catalogue grid and filters    (archive-a)
archive.js        "
cart.css          the bag, and the bag count in the header
cart.js           "
checkout.css      the pay step only                 (checkout)
checkout.js       "
our-story.css     the four story bands              (our-story)
pages.css         contact, faq and work-with-us
pages.js          "
assets/images/    photography, packshots, logo
```

Every page lives flat at the repository root and links its siblings by file name —
there is no build step and no sub-directory of pages. Do not create one.

The rest of the working directory is local docs or tooling: `.gitignore` keeps
`.agents/` and `design-references/` out. The four reference files —
`design-system.html`, `design-system.css`, `page-template.html` and `DESIGN.md` —
are tracked, read constantly, and linked from a shipped page never.

Form fields (`.field-group`, `.field`, `.field__label`, …) are a **shared primitive in
`styles.css`**, not a checkout component. Four pages use them. `checkout.css` keeps only
what belongs to paying: card fields, hints and card marks.

## The design system — read this before building any page

**`design-system.html`** is the reference. Open it in a browser. Everything in it
was extracted from the shipped home page and `styles.css`; nothing in it is invented.
It documents, with live examples and the copy-paste markup for each:

- the colour tokens, and which ground each band is allowed to use
- the type ramp (`--type-display`, `--type-section`, `--type-statement`, `--type-lede`,
  `--type-body`) and the tracking ladder
- radius, shadow, duration and spacing tokens
- the shared primitives: bands, headings, buttons, the underline wipe, the lift,
  focus states, the reveal
- the components: product card, collection chip, quantity stepper, purchase row,
  form controls, footer

`design-system.css` styles that page only. **It is documentation, not a stylesheet to
link.** Never load it from a shipped page, and never edit `styles.css` to match it —
the flow runs the other way.

**The one rule above all the others: if a value already has a token, use the token.**
A raw hex, a raw shadow or a raw duration in new CSS is a defect, not a shortcut.
When something genuinely has no token, add it to `:root` in `styles.css` and record
it in `design-system.html` — do not leave a literal behind.

**`page-template.html`** is the starting point for a new page. It already carries the
promotion dialog, header, mega menu, search panel, mobile drawer and split footer,
all wired to `script.js`. Copy it, replace the contents of `<main>`, and the chrome
is correct for free.

One thing to fix in anything copied out of `design-system.html`: it is a reference
page, so its own demo markup uses placeholder `href="#"` links. Replace them with the
real page names.

**`DESIGN.md`** is the companion prose: the named rules behind the tokens (the One
Family Rule, the Doorway Rule, the Dark Band Allowance, the Dietary Contrast Rule,
the Rare Serif Rule, the Flat-At-Rest Rule) and why each exists. `design-system.html`
shows you *what* the values are; `DESIGN.md` tells you *when* you are allowed to use
them.

## Selling points (client-supplied)

Use these as the argument on any new page or band. Wording may be adapted; the
dietary ones may not (see the regulated-text rule below).

**Retail / home shopper**
- Genuinely gluten free — *except the Special BBQ Sauce*
- Low sodium
- Vegan-friendly range
- Australian made
- Locally sourced from the Sunshine Coast
- Family owned since 1988 — 35+ years of heritage and experience
- Authentic Australian flavours, artisan-style
- Wide range of flavours
- Gourmet quality for everyday dining
- Pantry-friendly, long shelf life
- Ideal for gourmet hampers

**Wholesale / food service**
- Commercial pack sizes, built for professional kitchens
- Wholesale and bulk supply
- Premium condiments at commercial scale
- Suitable for cafés, restaurants, hotels, hospitality and caterers
- Low-sodium and vegan-friendly options for modern menus
- Long shelf life for inventory management

## Running it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

There is nothing to build, lint or test. Verification is visual: check a change at
1440, 1180, 900, 860, 620 and 375px, and once with reduced motion turned on.

## Architecture

### CSS

`styles.css` is one file in a fixed order: `:root` tokens → global/reset → shared
primitives (bands, headings, buttons, underline wipe, lift, focus, reveal) → each
component in page order, each with its media queries next to it. Keep that order;
do not start a second product stylesheet.

Everything is a CSS custom property on `:root`: colours, type steps, tracking,
radius, shadow, duration, spacing, `--gutter`, `--header-height`. **Use an existing
token before writing a literal value.** New literals are how this system drifts.
Every token is listed with a live swatch in `design-system.html`; look there first
rather than grepping `styles.css` for a value that looks close.

Layout is full-bleed, not boxed: horizontal padding is `--gutter` on the header and
on each band; line length is limited per-column by `--measure` / `--measure-tight`,
not by a page container. `--header-height` is a token because the hero, mega menu
and drawer all measure against it.

`testimonials.css` is a separate file only because the review band arrived late; it
uses the same `:root` tokens and loads after `styles.css`.

### JS

Two plain scripts, no modules, no dependencies. `script.js` loads first,
`testimonials.js` second.

`script.js` is a set of independent blocks, each guarded by an existence check
(`if (collection) { … }`) so nothing throws on a page that lacks the section:

- **Chrome** — mega menu, search panel, mobile drawer. These three are mutually
  exclusive: opening one closes the other two, Escape closes all.
- **Collection band** — the product rail. Category chips filter in place, arrows page
  by whole cards, quantity steppers and add-to-cart update a live region. The `best`
  filter reads a `data-bestseller` attribute rather than a category, so the same rail
  code serves both the six-jar default view and the full catalogue.
- **Band reveal** — an IntersectionObserver settles the ethos band upward, once. It
  only arms when the observer exists and motion is accepted, and it carries a 2.5s
  timeout fallback so content is never left invisible.
- **Marquees** — the drift is CSS; JS only normalises the speed to the measured track
  width and supplies a real pause button.

`testimonials.js` binds to `data-review-*` attributes, never to layout classes, so the
band can be restyled without touching it.

Commerce is presentation only. There is no cart backend, no checkout, no payment.

## Conventions that matter here

- **Australian English** in all copy: "flavour", "caramelised".
- **Dietary, allergen and ingredient text is regulated.** Copy it verbatim, set it at
  full-strength ink on a solid pale surface, never at reduced opacity, never over
  photography, never line-clamped. The Special BBQ Sauce is not gluten free, not low
  sodium and not vegan — carve it out of any range-wide claim. The Christmas Pudding
  contains egg.
- **Invent nothing.** No ratings, review counts, awards, stockist addresses, shipping
  rates or delivery times. Reviewer names in the review band are explicit placeholders
  until the client supplies real ones.
- **Accessibility floor already shipped — do not regress it:** skip link first in
  `<body>`, one `<h1>`, `aria-labelledby` on every `<section>`, `aria-label` on every
  `<nav>` and every icon-only control (with `aria-hidden` on its SVG), a real `<label>`
  for every input, a visible focus state on everything focusable, a polite live region
  for anything that changes without a page load, and a pause control for anything that
  moves for more than five seconds.
- Give every below-fold image `width`, `height`, `loading="lazy"` and `decoding="async"`.
- Any new horizontal scroller needs `contain: paint`. Without it, off-screen children
  still count towards the document width and iOS Safari lets the whole page be dragged
  sideways, ignoring `overflow-x: hidden` on the root.
- Pair `:hover` with `:focus-visible` on every interactive element, and make sure
  anything new still works under `prefers-reduced-motion`.
- Comments in this codebase explain *why* a rule exists, not what it does. Match that.
