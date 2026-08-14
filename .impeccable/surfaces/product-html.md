---
version: 1
slug: "product-html"
primary_target: "product.html"
related_targets: ["styles.css","script.js","design-system.html","DESIGN.md"]
---

## Scope and mode

The single-product commerce surface, implemented first for Spicy Tomato Relish and intended to become the repeatable pattern for the remaining Maleny Cuisine jars. Persuade: show the real jar, establish the verified dietary and ingredient facts, and make quantity, Add to cart and Buy now immediately reachable.

## Audience, job and action

An Australian home shopper deciding whether this jar belongs in their pantry or on an entertaining table. They need to understand what it tastes good with, see the price, confirm dietary suitability, choose a quantity and add it to the presentation-only bag.

## Approved direction

**Serve First**, approved by the user on 2026-08-13 and revised by the user on 2026-08-14. Original comp: `.impeccable/mocks/product-page-variation-3-serve-first.png` — superseded on the points below.

Revision, as directed by the user:

- **The real product image, not a generated scene.** The left half shows the supplied packshot with its background removed (`assets/images/generated/product-page/spicy-tomato-relish-cutout.png`), at near life-size, standing on a drawn hairline horizon with a soft contact shadow. The generated grazing-table composite is retired.
- **All white.** Both halves of the split are Paper, divided by one hairline. The Cream/Ivory grounds are gone.
- **One band.** The Chocolate Deep portals band, the serving-ideas band and the ingredients band are all removed. The statement "A jar that earns its place at the table" and the "Cheese and crackers / Cold meats..." pairing list are gone with them; the pairing list was a verbatim restatement of the description sentence that now leads the Serving ideas panel.
- **Facts as an accordion in the ledger**, not as bands elsewhere on the page: Ingredients (list, provenance note, dietary row) and Serving ideas. The dietary claims also stay in the open above the accordion.
- **Buy now** sits beside Add to cart, and quantity, Add to cart and Buy now share one line.
- No "Shop the full range" link and no pack-size caption; the footer already carries "Shop all products".

The page now refuses the food-styled scene as much as the packshot card: it sells on the truth of the label, with every fact one disclosure from the price.

## Content and constraints

- Product: Spicy Tomato Relish, $10.50.
- Product description and ingredient list come verbatim from `content/products.md`.
- Gluten free, low sodium and vegan-suitable are verified by `PRODUCT.md` for this bottled product.
- No aggregate rating, review count, award, discount, shipping estimate or stockist claim.
- The product image must be the supplied packshot. No generated or composited serving scene on this surface.
- Commerce remains presentation-only under the static HTML/CSS/JS stack.

## Responsive and interaction notes

At 900px the product ground and the ledger stack, ground first. At 620px the purchase controls move ahead of the supporting copy so the primary action stays in the first viewport, and the dietary claims wrap as full-width readable lines.

The purchase row reflows on a **container** query against the ledger, measured on its content box: three abreast above a 488px row, stepper-then-buttons below it, all three stacked below 356px.

Quantity changes and Add to cart update one polite live region, respect the 1-99 limits and bump the shared bag count. Buy now is a real link to `checkout.html` and makes the same announcement and bag bump before the browser navigates, so it still works with script off.

Motion is one authored moment - the jar lands, its contact shadow tightening as it arrives - plus the accordion open/close and short control-state transitions. All of it is disabled under reduced motion.

## Unresolved decisions

- Whether each of the remaining products becomes a separate static HTML page or the pattern is later templated by a commerce backend.
- Whether a live cart/checkout replaces the presentation-only bag interaction.
