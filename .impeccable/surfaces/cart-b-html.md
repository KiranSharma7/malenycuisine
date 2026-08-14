---
version: 1
slug: "cart-b-html"
primary_target: "cart-b.html"
related_targets: ["cart.css","cart.js"]
---

## Scope and mode

The bag (cart) page and the slide-out mini bag that sits on top of it. Operate
mode: the visitor already decided to buy, so scanability, correct arithmetic and
familiar affordances outrank expression. It inherits the shipped visual system
unchanged apart from one sanctioned exception, the express-pay violet, which is
declared in `cart.css` and recorded in DESIGN.md.

Files: `cart-b.html`, `cart.css`, `cart.js`.

Two structures were built for the client to choose between. On 2026-08-13 the
client chose **The Counter** and asked for the other, `cart-a.html` (The Ledger),
to be removed. It and its `.ledger` block are gone; the file name `cart-b.html`
is the only trace left and can be renamed to `cart.html` on request.

## Audience, job and interaction

An Australian home shopper reviewing what they picked. The job is: confirm the
jars, change a quantity, drop something, see what is owed, go and pay.

Confirmed by the client:

- **Cart page plus a slide-out mini bag.** The header bag icon is a real link to
  the cart page, so it still works with JavaScript off; `cart.js` takes the click
  over and opens the panel instead.
- **The mini bag also lives on `index.html` and `archive-a.html`**, where Add to
  cart puts the jar in the bag and opens the panel over the page. Those two pages
  carry `cart.css`, `cart.js`, a hidden `<ul class="bag-store" data-cart>` that
  holds one line per product, and their own `[data-cart-status]` live region.
  The bag is still markup: the store is the record and the panel is the view, the
  same relationship the bag page has. `script.js` and `archive.js` keep owning
  the button's "Added" label and its spoken announcement, so the panel adds no
  second one.
- **A free-delivery meter** on the page and inside the mini bag. The $60
  threshold is the promotion already running on the site (announcement bar and
  promotion dialog), so the meter reports a fact rather than inventing one.
- **An empty-bag state.** It is a state of the same page, revealed when the last
  line is removed, not a separate file to maintain.

Not built, and not asked for: cross-sell rail, gift-note field, checkout form.

The promotion dialog is deliberately absent. `page-template.html` says to drop it
where the offer would intrude, and a bag already carrying the same offer as a
live meter is that page.

## Proof and content constraints

The sample bag holds four real products at their real prices — Spicy Tomato
Relish ×2, Caramelised Onion Marmalade, Special BBQ Sauce, Gluten Free Christmas
Pudding — subtotalling **$59.48**, which sits 52c under the free-delivery
threshold on purpose so the meter is doing visible work on first load and flips
to "Free" when the shopper adds one more.

Regulated text is copied verbatim and set at full ink on paper, on its own line,
never clamped: *Contains wheat* on the Special BBQ Sauce, *Contains egg* on the
Christmas Pudding. The allergen notes stay in the paper list and never move onto
the dark summary column.

**No shipping figure is invented.** Delivery reads "At checkout" until the
subtotal passes $60, when it reads "Free"; the total is the subtotal until an
address exists. The note under it says so in words. This is the one place the
client still has to supply real terms.

## Approved direction

**The Counter.** The jars on paper to the left, the money on a Chocolate Deep
column bleeding off the right edge, its contents sticky so the total and the
checkout actions never leave the screen. This spends the page's one **Dark Band
Allowance** — a defensible spend because the page has no hero at all, so the
Doorway Rule is untouched and the darkness lands on the one zone the shopper is
here to settle. Below 900px the column becomes the full-width band that closes
the page.

**The mini bag is one white surface**, head to foot — `--paper`, not the `--ivory`
the rest of the chrome uses. It is a working surface rather than chrome: it
carries packshots on white and a column of money, and the warm ground was tinting
both. The hairlines at the head and foot are what separate the three zones now.

**Its footer carries two actions, not an action and a link.** `Proceed to
checkout` is the standard outlined button; under it, `Pay now` is a filled
express-pay button in `--express-pay` violet with a white padlock — the direct
route that skips the bag page and the delivery step. The colour is the client's
own direction, from a supplied Shop Pay reference, and is recorded in DESIGN.md
as the second sanctioned exception to the One Family Rule after `--star-gold`.
Two brown controls stacked in a 440px panel read as one control repeated; the
violet is what lets a shopper tell the two apart before reading either. It
deepens rather than pales when pressed, and the padlock does not move on hover —
both halves of the signal are meaning, not decoration. The `View full bag` link
the panel used to carry is gone, at the client's direction.

Shared decisions worth keeping:

- The cart lines are **real HTML in the page**, not rendered by script, so the
  bag is readable and correct with JavaScript off. `cart.js` only recalculates,
  redraws the meter, swaps the empty state and drives the panel.
- `cart.css` restates `html, body { overflow-x: clip }` for the same reason
  `archive.css` does — `overflow-x: hidden` makes both elements scroll containers
  and silently breaks the sticky column. It is held behind a `page-cart` class on
  `<html>` so it applies to the bag page only: the mini bag brings `cart.css` onto
  the home page, which does have rails and marquees, and `clip` falls back to
  `visible` before iOS Safari 16 — which would undo the sideways-drag fix.
- Every region the script toggles carries an explicit `[hidden] { display: none }`
  in `cart.css`. An author `display` rule outranks the browser's own `[hidden]`
  rule, so a grid stays a grid while claiming to be hidden. This was a real bug:
  the drawer's empty state printed underneath the lines that contradicted it.
- The mini bag **traps focus**, which DESIGN.md records as a gap in the mobile
  drawer, and obeys the Mutual Exclusion Rule.
- The total uses the **prose-heading step verbatim** (`clamp(26px, 2.4vw, 34px)`
  / 1.2 / -0.02em) — the only serif step DESIGN.md puts between Body and
  Statement. No new step was invented. The design detector reads only the
  frontmatter typography block, where that step is not listed, so it may flag the
  34px endpoint as off-ramp; it is not.
- The meter grows with `transform: scaleX()` on a unitless 0–1 fraction, not by
  animating width.

## Unresolved decisions

- Real shipping terms. "At checkout" is a placeholder for a policy the client
  has not supplied; the Shipping Policy page is still an empty stub.
- Where `Pay now` and `Proceed to checkout` actually go. They point at
  `#payment` and `#checkout`, matching the other dead anchors in this prototype.
  The violet stands in for a provider that has not been named. Once one is, the
  button should carry that provider's own mark and colour, and `--express-pay`
  retires with it — the live site is Divi/WordPress, so Shop Pay itself is not
  available to it.
- Whether to rename `cart-b.html` to `cart.html` now that the other variation is
  gone. Doing so touches the header bag link on every page that has one.
- Whether the mini bag should also carry a sticky checkout bar on phones.
- **Whether the bag survives a page change.** It does not. There is no storage:
  the bag is markup, so adding jars on the home page and then opening the archive
  starts from empty, and the bag page always restores its sample. Now that Add to
  cart works on two shopping pages this is the most visible gap left — the fix is
  `sessionStorage`, and it is not built because nobody has asked for it yet.
- Whether `product.html` should get the same treatment. Its single-product button
  is `[data-single-add]`, not the product card's `[data-add-to-cart]`, so it is
  untouched and still only bumps the header count.
