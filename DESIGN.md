---
name: Maleny Cuisine
description: A sunlit kitchen table, entered through a dark doorway — crisp editorial commerce for handcrafted Queensland condiments.
colors:
  chocolate: "#4a261c"
  chocolate-deep: "#32150f"
  ink: "#2d150f"
  night: "#171310"
  paper: "#ffffff"
  ivory: "#f8f4ec"
  cream: "#eee4d6"
  lamplight: "#f7ede1"
  on-deep: "#fffaf3"
  on-chocolate: "#fffdf8"
  on-lamplight: "#23150f"
  ink-muted: "rgba(45, 21, 15, 0.72)"
  ink-soft: "rgba(45, 21, 15, 0.65)"
  ink-quiet: "rgba(45, 21, 15, 0.55)"
  hairline: "rgba(74, 38, 28, 0.2)"
  hairline-soft: "rgba(74, 38, 28, 0.12)"
  hairline-strong: "rgba(74, 38, 28, 0.45)"
  rule-on-dark: "rgba(247, 237, 225, 0.16)"
  star-gold: "#f0af1e"
  express-pay: "#5a31f4"
  express-pay-deep: "#4622cf"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(60px, 4.8vw, 82px)"
    fontWeight: 400
    lineHeight: 1.055
    letterSpacing: "-0.033em"
  product-title:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(46px, 4.3vw, 68px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.034em"
  product-price:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(28px, 2.1vw, 34px)"
    fontWeight: 400
    lineHeight: 1
  section-heading:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(38px, 4.2vw, 58px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.028em"
  footer-display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(48px, 5vw, 78px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.036em"
  statement:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(26px, 3vw, 50px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.028em"
  promotion-heading:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(32px, 3.1vw, 56px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.033em"
  review-quote:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(21px, 2.2vw, 28px)"
    fontWeight: 400
    lineHeight: 1.36
    letterSpacing: "-0.02em"
  review-quote-stacked:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(19px, 3.4vw, 24px)"
    fontWeight: 400
    lineHeight: 1.36
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.2
  signature:
    fontFamily: "Mrs Saint Delafield, Libre Caslon Display, cursive"
    fontSize: "clamp(36px, 3.6vw, 52px)"
    fontWeight: 400
    lineHeight: 0.9
  body-lead:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(16px, 1.15vw, 18px)"
    fontWeight: 400
    lineHeight: 1.72
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  tile-name:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(17px, 1.4vw, 20px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  product-name:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "17.5px"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "-0.008em"
  title:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    letterSpacing: "0.02em"
  price:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.12em"
  label-sm:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.11em"
  micro:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "2px"
  md: "4px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter: "clamp(28px, 3.2vw, 64px)"
  section-y: "clamp(64px, 7.5vw, 118px)"
  section-y-end: "clamp(56px, 6vw, 96px)"
  head-gap: "clamp(36px, 4vw, 64px)"
shadows:
  lift: "0 16px 26px -20px rgba(45, 21, 15, 0.6)"
  panel: "0 24px 40px -28px rgba(45, 21, 15, 0.45)"
  hero-text: "0 2px 24px rgba(0, 0, 0, 0.45)"
motion:
  fast: "160ms"
  base: "200ms"
  slow: "220ms"
  image: "400ms"
  reveal: "520ms"
  easing: "ease"
components:
  button-primary:
    backgroundColor: "rgba(250, 247, 240, 0.86)"
    textColor: "{colors.chocolate-deep}"
    borderColor: "{colors.chocolate-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "16px 30px"
    minWidth: "252px"
    height: "58px"
  button-primary-hover:
    backgroundColor: "{colors.chocolate-deep}"
    textColor: "{colors.on-deep}"
    transform: "translateY(-2px)"
  button-on-dark:
    backgroundColor: "rgba(23, 19, 16, 0.28)"
    textColor: "{colors.lamplight}"
    borderColor: "rgba(247, 237, 225, 0.75)"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "58px"
  button-on-dark-hover:
    backgroundColor: "{colors.lamplight}"
    textColor: "{colors.on-lamplight}"
  outline-button:
    backgroundColor: "transparent"
    borderColor: "{colors.chocolate-deep}"
    typography: "{typography.label-sm}"
    fontSize: "13px"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "58px"
  add-button:
    backgroundColor: "{colors.chocolate-deep}"
    textColor: "{colors.ivory}"
    typography: "{typography.micro}"
    rounded: "{rounded.sm}"
    padding: "11px 10px"
    minHeight: "46px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "#17100e"
    rounded: "{rounded.pill}"
    size: "42px"
  icon-button-hover:
    backgroundColor: "rgba(74, 38, 28, 0.08)"
  chip:
    backgroundColor: "rgba(238, 228, 214, 0.5)"
    textColor: "{colors.ink-soft}"
    borderColor: "{colors.hairline-soft}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
    minHeight: "42px"
    fontSize: "15px"
    fontWeight: 500
  chip-active:
    backgroundColor: "{colors.chocolate-deep}"
    textColor: "{colors.ivory}"
    borderColor: "{colors.chocolate-deep}"
  quantity-control:
    backgroundColor: "transparent"
    borderColor: "{colors.chocolate-deep}"
    rounded: "{rounded.sm}"
    width: "96px"
    minHeight: "46px"
  card-product:
    backgroundColor: "{colors.paper}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
    padding: "clamp(18px, 6cqw, 26px)"
  card-product-hover:
    borderColor: "{colors.hairline-strong}"
    transform: "translateY(-3px)"
    shadow: "{shadows.lift}"
  card-category:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px 18px 18px"
  input-newsletter:
    backgroundColor: "transparent"
    borderColor: "rgba(50, 21, 15, 0.54)"
    rounded: "{rounded.sm}"
    height: "58px"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "12px 4px"
  announcement-bar:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.on-chocolate}"
    typography: "{typography.micro}"
    height: "34px"
---

# Design System: Maleny Cuisine

> **The rendered catalogue is `design-system.html`.** It shows every token and
> component live, with copy-paste markup. **New pages start from
> `page-template.html`**, which carries the promotion, header, mega menu, mobile
> drawer and footer already assembled. This file is the written law behind both.

## Overview

**Creative North Star: "The Sunlit Kitchen Table"**

This is a table set in daylight: linen, ripe fruit, glass jars, people about to eat. The world is warm, pale and generous, built on a paper-and-ivory ground with fig-brown ink. Nothing here is clinical and nothing is precious. The brand has made the same recipes in the same kitchen since 1988, and the design should feel like that — settled, unhurried, sure of itself.

The one deliberate exception is the doorway. Editorial and landing pages open on a dark, full-bleed photographic hero — evening light, dark stone, the table after sundown — and then the site turns to daylight from the fold down. The dark is an entrance, not the house. It buys one moment of atmosphere and then gets out of the way so the shopping surfaces can be bright, legible and calm. A single-product page uses the Serve First exception documented under Layout: its sunlit meal and exact jar become the entrance instead of adding a dark hero.

The execution is crisp editorial, not rustic. Corners are nearly square (2px), borders are hairlines, shadows are almost absent, and typography does the work: a high-contrast Caslon display against a plain, tightly-set grotesque. Warmth comes entirely from the palette and the photography, never from soft corners, drop shadows or decorative flourish. The result should read as a serious food brand that happens to be family-run, not a craft-market stall.

**Key characteristics:**
- Paper content bands on an ivory chrome, fig-brown ink, and one photographic entrance per page — dark for editorial pages, sunlit Serve First for products
- Libre Caslon Display for voice, DM Sans for everything operational
- Near-square corners (2px / 4px); circles reserved for icon states and rail arrows
- Flat at rest — shadow only ever appears as a response to hover or focus
- Uppercase, wide-tracked labels as the only ornament
- Motion is short (160–220ms) and ease-only; nothing bounces

## Colours

A single warm brown family carried from near-black to pale linen, with no second accent hue anywhere in the system.

### Browns
- **Chocolate** (`--chocolate`, #4a261c): The structural brown. Full-width bands that must assert themselves — the announcement bar, the ground behind the footer photograph — and the base for the translucent tint behind icon hover states.
- **Chocolate Deep** (`--chocolate-deep`, #32150f): The darkest usable brown, and the closer. Headings, button borders and labels, the filled state of a primary button, filter chips when active, and every dark band below the hero.
- **Ink** (`--ink`, #2d150f): Body and interface text on pale grounds. Slightly redder and softer than the deep brown, so long-form reading never feels stamped on.
- **Night** (`--night`, #171310): The hero's dark ground and the fallback colour behind the hero photograph. Never used for cards, panels or type areas below the fold.

### Grounds
- **Paper** (`--paper`, #ffffff): The ground of every content band below the hero, and of the product card. This is where shopping happens.
- **Ivory** (`--ivory`, #f8f4ec): The chrome ground — header, search panel, mega menu, mobile drawer, footer. It is also the separator ground when two paper bands would otherwise merge into one.
- **Cream** (`--cream`, #eee4d6): One step down from ivory. Mega-menu cards, drawer thumbs and quiet fills — it is how a surface separates from its ground, since shadows are not used at rest.
- **Lamplight** (`--lamplight`, #f7ede1): Type and button strokes on dark grounds **only**. It is ivory warmed and lifted so it survives against photography.

### Type on filled grounds
Three near-neutrals that exist only as labels on a filled control, all warmer than pure white so a filled brown button does not glare: `--on-deep` (#fffaf3) on a filled deep-brown control, `--on-chocolate` (#fffdf8) on the announcement bar, `--on-lamplight` (#23150f) once a lamplight button fills on a dark ground.

### Ink at reduced strength
Three steps and nothing between them — `--ink-muted` (0.72), `--ink-soft` (0.65), `--ink-quiet` (0.55). A fourth opacity is how the palette starts to blur. Never use any of them for dietary, allergen or ingredient text.

### Named rules

**The One Family Rule.** There is no second accent hue. Every colour in this system is the same warm brown at a different lightness, plus the ground it sits on. If a screen needs emphasis, it changes tone or weight — it does not introduce a colour. This is why a sale price is a dimmed strike-through and a bolder now-price, not red.

**The one exception: the rating gold.** `--star-gold` (#f0af1e) exists solely for the five-star mark on the customer review band, at the client's explicit direction and from a reference they supplied. It is a warm gold rather than a pure yellow so it sits beside fig-brown ink instead of shouting over it. It is used for the star shape and nothing else — no text, border, fill, icon or hover state may take it, and a second use is a bug, not a precedent.

**The second exception: the express-pay violet.** `--express-pay` (#5a31f4), with `--express-pay-deep` (#4622cf) for its pressed state, exists solely for the direct-payment button in the mini bag, at the client's explicit direction and from a reference they supplied (a Shop Pay button). It is declared in `cart.css`, the way `--star-gold` is declared in `testimonials.css`, and it carries white type rather than a warm white — the warm whites are mixed for a brown ground and go faintly pink on violet. An express-pay control is the one place a foreign colour is correct rather than drift: its job is to say *this is not the shop, this is the payment step* before anyone reads the label, and the brown family cannot say that about itself. It is used for that one button and nothing else, and a second use is a bug, not a precedent. If the client names a real payment provider, this button should carry that provider's own mark and colour instead.

**The Doorway Rule.** Night Stone may appear once per page, in a conventional hero, and never below it. The dark is an entrance, not the house. A Serve First product page replaces that dark hero with its sunlit meal-and-jar stage; never use both.

**The Dark Band Allowance.** A page may carry **one** dark band below the hero, in Chocolate Deep with Lamplight type — never Night, so the Doorway Rule still holds, and always inside the One Family Rule. The home page spends its allowance twice, on the ethos band and the pantry CTA, because the CTA is photography with a brown fallback rather than a flat brown band. A new page gets one, and it should not be spent on content that could sit on paper.

**The Dietary Contrast Rule.** Dietary, allergen and ingredient text is safety information. It is set at full `--ink` on Paper, Ivory or Cream — never over photography, never in a translucent panel, never at reduced opacity, and never clipped by a line clamp. (The product card lifts its own two-line clamp on any card carrying an allergen note, for exactly this reason.) The one dark-ground exception is the ethos band's marketing copy, set in full-strength Lamplight on solid Chocolate Deep at roughly 13:1. Actual label and allergen text stays on a pale ground.

## Typography

**Display:** Libre Caslon Display (with Georgia, serif)
**Body:** DM Sans (with Arial, sans-serif)
**Signature:** Mrs Saint Delafield — one line on the site, the founders' signed name. Not a third text face.

**Character:** A high-contrast, slightly old-fashioned Caslon does all the speaking — headlines and one-sentence statements — while DM Sans handles every job that has to be read quickly and repeatedly. The pairing is deliberately lopsided: the serif is rare and large, the sans is everywhere and quiet.

### Hierarchy
- **Display** (`--type-display`, clamp(60px, 4.8vw, 82px) / 1.055 / -0.033em): Hero headings only. Set with hard line breaks so the phrase lands in three short lines; the negative tracking is what keeps it from looking like a book cover.
- **Product title** (`--type-product-title`, clamp(46px, 4.3vw, 68px) / 1.02 / -0.034em; clamp(42px, 12.5vw, 56px) below 620px): The single-product h1. It is slightly tighter and lower than Display so the price and purchase controls remain visible in the first screen.
- **Product price** (`--type-product-price`, clamp(28px, 2.1vw, 34px) / 1): A one-off commerce step for the lead price on a single-product page; card prices continue to use the 17px Price step.
- **Section heading** (`--type-section`, clamp(38px, 4.2vw, 58px) / 1.06 / -0.028em): The h2 that opens a band. It tops out below the Display step on purpose, so the hero is never rivalled by the page beneath it.
- **Footer display** (clamp(48px, 5vw, 78px) / 1.02 / -0.036em): The footer's closing line. The one place below the hero allowed to outrun the section step, because it is the last thing on the page and has nothing to compete with.
- **Panel statement** (`--type-panel-statement`, clamp(22px, 1.7vw, 27px) serif / 1.12 / -0.026em): The Statement step's job inside a narrow panel or column, where `--type-statement` at 50px would overrun the measure. First used for the lead line in the product page's facts accordion. It counts against the Rare Serif Rule like any other Caslon step.
- **Statement** (`--type-statement`, clamp(26px, 3vw, 50px) / 1.1): A centred sentence inside a band — the ethos claim, the founders' quote. Set with hard line breaks so it always lands in three lines, and capped at 50px so both the Display and Section steps stay above it.
- **Band-over-photography heading** (clamp(40px, 3.2vw, 54px) / 1.04): A section heading sitting on a photograph rather than a flat ground. It runs slightly tighter than the Section step because it has a scrim and an image competing with it, and it goes `white-space: nowrap` above 1181px so the line never breaks against the product row behind it.
- **Prose heading** (clamp(26px, 2.4vw, 34px) serif / 1.2 / -0.02em): A subheading *inside* long-form copy. The only serif step below Statement, and the only one that may appear more than twice on a page — a long article needs its structure more than it needs the Rare Serif Rule.
- **Review quote** (`--type-review`, clamp(21px, 2.2vw, 28px) serif / 1.36 / -0.02em): A customer review inside the review band. It exists because a real review is three or four sentences — too long for the Statement step without becoming a wall of serif — while still being the brand's voice rather than interface copy. Unlike every other step on this ramp, its size is not a free choice: the client's brief is that a review lands in **three lines or fewer**, and this clamp is what that costs against the longest review on file (~255 characters) in a 1240px container. Verified at 1440, 1280, 1100 and 940px. The 21px floor is the counterweight — without it the quote keeps shrinking towards body size on a small laptop just to save a line. **Re-measure this step if a longer review is ever supplied.**
- **Review quote, stacked** (`--type-review-stacked`, clamp(19px, 3.4vw, 24px) serif / 1.36 / -0.02em): The same quote below 900px. The three-line target is abandoned here on purpose: three lines needs roughly 85 characters a line, a 375px screen holds about 30, and closing that gap would mean setting the quote near 10px — unreadable, and below the system's 12px floor. So the phone takes five or six lines at a size that still reads as a quote. This is a physical limit of the screen, not a missed target.
- **Headline** (25px serif): The open search field's input. Its job is to make an interface element feel spoken rather than typed.
- **Body lead** (`--type-lede`, clamp(16px, 1.15vw, 18px) / 1.72): Standing copy in a full-width band, where 16px would look undersized next to a 50px serif.
- **Body** (`--type-body`, 16px / 1.7): Page copy, capped at 68ch by `.prose`.
- **Tile name** (clamp(17px, 1.4vw, 20px) / 600 / -0.01em): The label under a category tile or a dish.
- **Product name** (17.5px / 600 / -0.008em / 1.45): Product titles inside a card. The one place a sans-serif acts as a heading — the Rare Serif Rule would be broken sixteen times over by a rail of Caslon product names. Negative tracking relaxes at this size because it stops earning its keep.
- **Title** (17px / 600 / 0.02em): Navigation links, mega-menu links. The workhorse for anything clickable and short.
- **Price** (17px / 600 / -0.01em, `white-space: nowrap`).
- **Label** (15px / 600 / 0.12em, uppercase): Buttons.
- **Label small** (13–14px / 600 / 0.11em `--track-14`, uppercase): A control that sits in a tight row rather than standing alone. It ships at **14px** standing alone (the search submit, footer column headings) and at **13px** wherever the control shares a line or a narrow column with others — `.outline-button`, the product page's Add to cart / Buy now pair, and the facts accordion's summaries. The two sizes are one step, not two: 13px is what the same label costs when something sits beside it. Do not introduce a third value in this range.
- **Micro** (12px / 600 / 0.08em, uppercase): The floor of the ramp. Announcement bar (weight 500), product card category, allergen note, Add to cart, the legal bar. **Nothing in this system is set smaller than 12px.**
- **Signature** (clamp(36px, 3.6vw, 52px) / 0.9): The founders' signed name, once. A drawn mark, not a typeface for reading — it carries no information on its own, so it is hidden from assistive technology and a plain uppercase credit line always sits beneath it. It does not count against the Rare Serif Rule, because it is not the Caslon voice.

### The promotion dialog is off the ramp, on purpose

The promotion is the one component that does not use the page type ramp. Its box is aspect-locked (2.13:1 landscape, 0.66 portrait below 1000px), so its type has to scale against the *dialog*, not the viewport — every step is its own clamp, and a fixed ramp size would either overflow the box or float in it.

| Part | Desktop | ≤1000px | ≤1000px & ≤680px tall |
|---|---|---|---|
| Heading | clamp(32px, 3.1vw, 56px) | clamp(27px, 8.2vw, 39px) | clamp(25px, 7.5vw, 33px) |
| Offer (uppercase, 0.075em) | clamp(20px, 1.9vw, 35px) | clamp(18px, 5.5vw, 25px) | — |
| Threshold | clamp(15px, 1.3vw, 25px) | clamp(15px, 4.2vw, 19px) | — |
| Description | clamp(15px, 1.2vw, 22px) | clamp(14px, 4vw, 17px) | — |
| CTA (uppercase, 0.13em) | clamp(12px, 0.85vw, 15px) | clamp(16px, 4.7vw, 21px) | — |

Two consequences worth knowing. The CTA is the only label on the site that gets *bigger* on mobile — below 1000px it becomes a full-bleed bar across the foot of the sheet, so it takes bar sizing rather than button sizing. And the offer line's 0.075em tracking sits off the tracking ladder because it is display-scale uppercase, not a label.

**Do not copy these steps anywhere else.** If a second aspect-locked dialog is ever needed, give it its own scale by the same reasoning rather than reusing these numbers.

### Named rules

**The Rare Serif Rule.** Libre Caslon Display appears at most twice per screen. Practically that is the band's heading and, if the band has one, its statement. A voice that speaks constantly stops being heard.

**The Tracking Ladder Rule.** Uppercase text is always tracked, and the smaller it is the wider it tracks: 15px → 0.12em, 14px → 0.11em, 12px → 0.08em. Uppercase at default tracking is off-system.

## Layout

The page is full-bleed rather than boxed. Horizontal padding is a single fluid gutter, `--gutter` (clamp(28px, 3.2vw, 64px)), applied to the header and to every full-width band; only the mega menu's inner grid caps out, at 1560px. There is no page-wide container — measure caps (`--measure` 68ch, `--measure-tight` 62ch) do that job instead, per column.

Vertical rhythm is `--section-y` down to `--section-y-end`, with `--head-gap` from a band's heading to its content. Two bands sharing a ground split the standard break between them rather than each paying it in full.

The header is a three-column grid, `minmax(0, 1fr) auto minmax(0, 1fr)`, with the logo centred and links splitting left and right around it. Its total height is a token, `--header-height` (122px desktop = 34px announcement + 88px nav; 106px below 860px), because the hero, mega menu and drawer all position against it.

The dark hero fills `min(95vh, calc(100vh - var(--header-height)))`, so the first screen is always exactly one hero and nothing peeks.

### Single-product recipe: Serve First

The product page is **the stage band plus one related band**, not a stack. The stage settles the purchase; the related band offers the next jar and nothing else. There is still no dark after-fold statement, no serving photograph and no ingredients band: every fact about the jar lives in the ledger, one disclosure away from the price, which is where a shopper asks for it.

Above 900px the stage is a split — a `minmax(0, 1.15fr)` product ground on the left and a `minmax(540px, 1fr)` purchase ledger on the right, divided by a single hairline. Both halves are Paper.

**The ground is the packshot's own ground.** The image is the supplied product photograph with its background removed, shown at near life-size. It was shot on white, so white is the only ground that leaves no seam around the cut-out. A cut-out with nothing under it reads as a sticker, so the plinth draws two things and nothing else: a hairline horizon spanning wider than the jar, and a soft elliptical contact shadow beneath the glass. Both are positioned as percentages of the image frame, because the frame carries transparent air around the object — re-cut the PNG and those offsets move. **Never composite the jar into a food scene in HTML or CSS**; if a serving scene is wanted it must arrive as one production photograph.

**The ledger carries the whole decision.** Breadcrumb, h1, price, one verbatim sentence from `content/products.md`, the verified dietary claims in the open, then quantity, Add to cart and Buy now on one line, then the facts accordion. Add to cart is the filled site-wide control and Buy now is the same size in outline — one weight apart, so neither competes to be primary, and Buy now is a real link to `checkout.html` that works with script off.

Below 900px the ground and the ledger stack, ground first. Below 620px the purchase controls move ahead of the supporting copy so the primary action stays in the first viewport. The purchase row's own reflow is a **container** query on the ledger, not a viewport query — see the accordion and purchase-row entries under Components.

**The related band: "You may also like".** `.related` closes the page with four jars from the same category, on Paper — the same ground as the stage above it. The two bands are told apart by the stage's closing hairline and by the card borders, not by a change of ground.

The card is **the home page's `.product-card`, unchanged** — packshot, hover image, category, price, title, line, then the stepper and Add to cart. One card everywhere on the site: a shopper who learned it in the rail already knows it here. Its commerce is wired by `bindCardCommerce(root, announce)` in `script.js`, shared with the collection band, and the band carries its own polite live region (`[data-related-status]`). This does put two adds on one page. They are not in competition: the ledger's add is for *this* jar and sits beside its price, and a card's add is for a different jar and sits inside that jar's card.

The head is a flex row — title and lede left, one `.button` ("Shop all products") right — the same head shape the collection band uses, so a heading row reads alike on both pages.

It is a static four-column grid, not a rail: four cards fit without paging, so there are no arrows, no scroller and no `contain: paint`. It steps to two columns at 1000px and one at 620px; three-up is skipped, because with exactly four cards it strands one on its own row. Between product pages the only thing that changes in this band is the four cards.

### Breakpoints
All max-width. Two are structural, the rest re-fit type and art.

| Width | What changes |
|---|---|
| 1280px | Product rail steps from 4 cards to 3 |
| 1180px | Nav gaps and type compress; footer lead stacks |
| 1000px | Rail steps to 2; two-column band bodies stack; promotion goes portrait |
| **900px** | Category grid, mission and footer all go to one column; the customer-review split stacks image first, then content |
| **860px** | **The real break.** Nav collapses to the hamburger drawer, mega menu is removed entirely, search toggle and account link hide |
| 780px | Ethos proof marks stack into full-width rows |
| 660 / 620 / 520px | Rail card width, tile crops, hero and search sizing |

Below 860px the mega menu does not degrade into an accordion — it does not exist, and the drawer carries the same links.

### The horizontal-scroll rule
Any horizontal scroller — a product rail, a chip row, a marquee — must carry `contain: paint`. Without it, off-screen children still count towards the document's scrollable width (the root measured 4759px on a 414px phone), and iOS Safari lets the whole page be dragged sideways while ignoring `overflow-x: hidden` on the root. `<html>` and `<body>` also both carry `overflow-x: hidden`, `overscroll-behavior-x: none` and `text-size-adjust: 100%` for the same reason.

## Elevation & depth

The system is flat. Depth comes from tonal layering — Paper ground, Ivory chrome, Cream surface, Chocolate Deep band — and from hairline borders, not from shadow. Three shadows exist, and each is attached to a state or to a job.

- **`--shadow-lift`** (`0 16px 26px -20px rgba(45, 21, 15, 0.6)`): Hover or focus on an interactive card or tile, always paired with a 3px upward translate.
- **`--shadow-panel`** (`0 24px 40px -28px rgba(45, 21, 15, 0.45)`): A panel overlaying the page — the open mega menu. It reads as separation from the page, not as height.
- **`--shadow-hero-text`** (`0 2px 24px rgba(0, 0, 0, 0.45)`): Legibility insurance for display type over photography. Not a style choice, and not to be reused off the hero.

**The Flat-At-Rest Rule.** No surface carries a shadow in its default state. If a card needs to look separate while idle, change its tone to Cream or give it a hairline — do not add a shadow.

## Shapes

Corners are almost square, on a three-value scale and nothing between: **2px** (`--radius-sm`) for buttons, inputs and chips; **4px** (`--radius-md`) for cards, image tiles and panels; **999px** (`--radius-pill`) for circular things only — the icon-button hover disc, rail arrows, drawer thumbs, social buttons. Pill-shaped buttons and chips are not part of this system.

Borders are hairlines. 1px solid Chocolate Deep for a control outline and for the search field's single bottom rule; 1px of a `--hairline*` token for structure; 1px `--rule-on-dark` inside a dark band. There are no thick strokes, no double rules, no decorative frames.

The recurring silhouette is the flat rectangle with a hairline: bar, panel, card, field. The only circles are hover states and navigation arrows.

## Motion

Short and ease-only. `--dur-fast` 160ms for a small state flip, `--dur` 200ms as the default, `--dur-slow` 220ms for a lift or an underline wipe, `--dur-image` 400ms reserved for image scale, `--dur-reveal` 520ms for a band settling into view.

**The two-speed gesture** is the site's signature: on hover a card rises at 220ms while its image scales at 400ms. Two speeds, one gesture.

**The underline wipe** is the link signature — a 1px rule scaling in over 220ms. Direction is the vocabulary: header nav wipes in from the right, content and footer links from the left, a centred tile label from its middle. Never a colour change.

`prefers-reduced-motion` is honoured globally: all transitions collapse to 0.01ms, smooth scrolling turns off, and the recipes marquee becomes an ordinary scrollable row with its duplicate half removed. Anything new must survive that.

## Components

Full specs, live specimens and copy-paste markup live in **`design-system.html`**. In summary:

- **Buttons** — `.button` (primary, 252×58px, translucent ivory fill, inverts to solid deep brown and lifts 2px), the same button restated for dark grounds, `.outline-button` (58px, label left and chevron right), `.add-button` (filled 12px micro label, sized to a card), `.icon-button` (42px hit area, 25px 1.6-weight stroked SVG, circular 8%-brown disc scaling up from 0.72 on hover).
- **Controls** — `.collection-chip` (a toggle, so `aria-pressed`; clicking the active one clears the filter), `.collection-arrow` (disables at each end rather than disappearing; hidden below 860px where swipe takes over), `.quantity-control` (96px, three cells in one hairline box, 1–99, uses `<output>`), `.drawer-tab` (roving tabindex with arrow keys).
- **Single product** — `.product-stage` (the one band: product ground and purchase ledger across a hairline), `.product-plinth` (the cut-out packshot with its drawn horizon and contact shadow), `.product-claims` (verified claims only, always in the open), `.product-stage__controls` (quantity, Add to cart and Buy now on one line) and `.product-facts` (the facts accordion). The implemented reference is `product.html`.
- **The purchase row** — `.product-stage__controls` is a three-track grid: a 124px stepper and two equal button tracks. It reflows on a **container** query against `.product-stage__purchase`, not the viewport, so it is correct at every ledger width the stage produces. A size container is measured on its **content box**, so those thresholds are row widths, already net of the ledger's inline padding: below 488px the stepper takes its own line and the buttons split the next; below 356px all three stack. Never lift one of the three on hover — they share a line, and a lift breaks it; they depress on press instead.
- **The facts accordion** — `.product-facts` is native `<details>` / `<summary>` sharing one `name`, so exclusivity, keyboard operation and a script-off fallback all come from the platform. The marker is one drawing, not two icons: a plus whose upright stroke collapses about its own centre. Panels open on a real transition through `::details-content` with `height: 0 → auto`, which is why `interpolate-size: allow-keywords` is set on `:root`; without support the panel simply snaps, which is the native behaviour. **Disclosure is not clipping** — a panel opens to full-strength ink at body size on solid Paper, nothing truncated — but the three dietary claims still stand in the open above it, so no regulated claim is ever behind a click.
- **Cards** — `.product-card` (paper, hairline, `container-type: inline-size`, purchase row pinned with `margin-top: auto` so every card in a rail aligns), `.range-tile` (photograph on the ground at its own ratio via `--tile-ratio`, no mat), `.dish` (square photograph, centred label), `.mega-card` and `.drawer-card` (navigation only).
- **Customer review carousel** — One sunlit product photograph and one Paper review field share an equal split above 900px, then stack image first. Exactly one review is visible at a time. Circular 52px arrows (48px below 620px) wrap in both directions; the focused viewport also accepts Left and Right Arrow. There is no autoplay. A changed review settles in over `--dur-slow` with a 10px rise, and that arrival animation is removed for reduced motion. Hide the controls when fewer than two reviews exist.
- **Forms** — three treatments, each belonging to one place: the boxed 58px newsletter field (copy this one for new forms), the search panel's rule-only "written line", and the drawer's filled cream field.
- **Bands** — `.hero--dark` (the doorway), the rail band, `.section--deep` (the dark statement band), the full-bleed CTA over photography, the two-column feature.
- **Chrome** — announcement bar, header + mega menu + search panel + mobile drawer, split footer, promotion dialog, skip link. All of it lives in `page-template.html` and should stay byte-identical across pages.

### The Mutual Exclusion Rule
The mega menu, the search panel and the mobile drawer are never open at once. Opening any one closes the other two, and Escape closes all three.

### The Single Review Rule
Customer proof arrives as one generous table-side story at a time, never a wall of review cards. Review text and the product it names must be real; reviewer names stay explicit placeholders until the client supplies them. Do not infer identities, and do not add scores, totals, averages, awards or badges — the per-review five-star mark is the only rating vocabulary this system has, and it does not add up to anything.

The slides are stacked in one grid cell rather than laid out in a row, so the band sizes itself to the longest review and never changes height as the reader pages through. That is the whole reason four reviews of different lengths can share one viewport without the page jumping under the reader's thumb.

## Accessibility floor

The home page already ships all of this; a new page that drops any of it is a regression.

Skip link first in `<body>`. One `<h1>`. `aria-labelledby` on every `<section>`, pointing at its own heading. `aria-label` on every `<nav>`. `aria-label` on every icon-only control with `aria-hidden="true"` on its SVG. A real `<label>` for every input, visually hidden if need be — a placeholder is never the only label. A visible focus state on everything focusable (`outline: 3px solid var(--ink)` with `outline-offset: 3px` for dense controls inside a card, which also lift to `z-index: 2`; `2px solid var(--chocolate-deep)` at 4–6px offset everywhere else). A polite live region for anything that changes without a page load. Control labels that name their subject — *"Increase quantity of Chilli Jam"*, never *"Increase"*. Decorative images at `alt=""`; clones out of the tab order. A real pause control for anything moving longer than five seconds (WCAG 2.2.2).

For the customer review carousel, the focusable viewport names the carousel and exposes its Left/Right Arrow behavior through conventional keyboard handling. Previous and next buttons name their direction and subject. Keep one visually hidden `aria-live="polite"`, `aria-atomic="true"` status for the whole review change; update that single status with position, review, customer and product rather than scattering announcements across the slide.

**Known gaps — fix them, do not copy them:** the header search input removes its native outline and has no visible focus treatment of its own; there is no styled `aria-current` state for the nav; the mobile drawer does not trap focus the way the promotion dialog does; the promotion reappears on every page load with no memory of being dismissed.

## Do's and Don'ts

### Do
- Ground every screen in Paper or Ivory with Ink text.
- Use a token wherever one exists — colour, shadow, duration, radius, gutter.
- Obey the three-radius scale exactly: 2px controls, 4px surfaces, 999px circles only.
- Track every uppercase string on the ladder.
- Set dietary, allergen and ingredient text at full ink on a solid pale surface, at body size or larger, never clipped.
- Reproduce regulated claims verbatim from `content/products.md`, and carve out the Special BBQ Sauce from any range-wide claim.
- Pair `:hover` with `:focus-visible` on every interactive element.
- Give every below-fold image `width`, `height`, `loading="lazy"` and `decoding="async"`.
- Keep testimonial review, customer and product data explicitly marked as placeholders until the client supplies verified copy.
- Add `contain: paint` to any new horizontal scroller.
- Check a new page at 1440, 1180, 900, 860, 620 and 375px, and once with reduced motion on.

### Don't
- Introduce a second accent hue, or a fourth ink opacity.
- Put a resting shadow on any surface.
- Use Night below the hero, or run two flat dark bands on one page.
- Set Libre Caslon Display more than twice per screen, or use it for body copy.
- Use pill-shaped buttons, chips or inputs — the pill radius is for circles only.
- Grow the announcement bar past 34px (30px mobile); truncate instead of wrapping.
- Let the mega menu, search panel and drawer be open at once.
- Go below 12px, or set uppercase without tracking.
- Invent scores, review totals, average ratings, review copy, customer identities, badges, award marks, stockist addresses or shipping promises — there is no visual vocabulary for them because there is no evidence for them. The one sanctioned exception is the per-review five-star mark on the review band, added at the client's direction and drawn in `--chocolate-deep` rather than gold; it never aggregates into a score or a count.
