---
version: 1
slug: "archive-a-html"
primary_target: "archive-a.html"
related_targets: ["archive.css","archive.js"]
---

## Scope and mode

The archive page — the shop's category / collection surface. Built once as the
Shop All page; every category page (`shop-chutneys.html`, `shop-sauces.html`,
`shop-jams.html`, `shop-dressings.html`, `shop-puddings.html`) inherits the same
three bands and changes only the heading, the sentence, the active chip and
which products are in the grid.

Persuade, leaning operational: the visitor came to find a jar and buy it, so
scanability and a reachable filter outrank expression. It inherits the shipped
visual system unchanged and adds no tokens.

## Audience, job and interaction

An Australian home shopper browsing the range. The job is: understand what the
range is in one line, narrow to a line, compare jars, add to the bag.

Confirmed by the client on 2026-08-13:

- The hero is **heading and description only, centred, with no image**, and it
  is **short** — a label, not an event. Two words of heading, one sentence held
  to two lines, then product. This is the deliberate opposite of the home
  page's full-height photographic doorway.
- **The header block is pure white** — hero, filter bar and grid band are all
  `--paper`, so the page reads as one continuous shopping ground from the
  masthead to the footer. Only the chrome stays Ivory.
- The filter is the home page's chip row, but each chip is a **real link to that
  line's own page**, not an in-place toggle. So chips carry `aria-current`
  rather than `aria-pressed` and the row works with JavaScript off.
- **A sort control sits at the right end of the filter bar**, where an earlier
  draft put a product count. Featured (the client's shipped running order),
  name A–Z / Z–A, price low→high / high→low. It reorders the cards already on
  the page; nothing is fetched, hidden or replaced.
- The grid is **the home page rail unrolled** — the same card, the same gap,
  four across, and the same step-downs to three (≤1280), two (≤1000) and one
  (≤480).
- **Nothing sits below the grid.** The footer closes the page. No cross-sell
  row, no story band, no review carousel.

The bar sticks to the top of the viewport because sixteen cards is several
screens. This forced one change to the shipped stylesheet's guard: `styles.css`
locks `<html>` and `<body>` with `overflow-x: hidden`, which makes both scroll
containers and silently breaks `position: sticky` inside `<body>` — its own
comment says that was safe because nothing was sticky. `archive.css` restates
the lock as `overflow-x: clip` for these pages only. Safe because the page's
one horizontal scroller, the chip row below 860px, carries `contain: paint`,
which is what actually keeps its children out of the document's width.

The `<nav>` wraps only the chips. Sort is a control, not navigation, so it sits
beside the nav inside a plain `<div class="archive-filter">`.

## Proof and content constraints

The grid reuses the sixteen product cards from the home page rail verbatim —
names, prices, pairing lines and the two regulated notes (*Contains wheat* on
the Special BBQ Sauce, *Contains egg* on the Christmas Pudding). Nothing was
rewritten and no product was added.

No range-wide dietary claim is set in the hero: the hero is one sentence, and a
gluten-free or low-sodium claim there would have to carve out the Special BBQ
Sauce in the same breath. Sorting never invents a value — name comes from the
product title, price from the price the card already shows, and the sale card
sorts on the price actually being charged.

## Approved direction

`archive-a.html` — **Shelf.** A short white header block (Caslon heading, one
sentence, chips and sort), then four bordered cards across on the same white
ground. The first full row lands inside the first viewport and the second row
breaks the fold. Dense, familiar, and identical to the surface a shopper has
already met on the home page.

The rejected alternative, "Ledger" (Chocolate Deep hero, three borderless cards
on Cream mats), was deleted on the client's instruction.

This page also fixes a gap DESIGN.md records: `aria-current="page"` on a nav
link now rests with its underline wipe drawn.

## Unresolved decisions

- The five sibling category pages are not built yet; the chips already point at
  their filenames.
- Whether the sort control ever gains a dietary filter beside it.
