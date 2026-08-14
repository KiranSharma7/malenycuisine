---
version: 1
slug: "index2-html"
primary_target: "index2.html"
related_targets: ["styles.css","script.js"]
---

## Scope and mode

Homepage testimonial-section extension in Persuade mode. It inherits the established Maleny Cuisine visual system and leaves all other page bands unchanged.

## Audience, job and interaction

Home shoppers should be able to read one customer review without competing cards. Previous and next arrow buttons wrap through the available reviews; the focused review viewport also supports the Left and Right Arrow keys. There is no autoplay.

## Proof and content constraints

The client supplied four review texts on 2026-08-12; they are reproduced verbatim and cover the Spicy Tomato Relish, Special BBQ Sauce, Gluten Free Christmas Pudding and Mediterranean Eggplant Relish — all real catalogue names.

Reviewer names remain **placeholders** ("Rebecca H, Maleny Customer" and so on) until the client supplies real attribution.

A five-star mark was added at the client's explicit direction, from the reference they supplied, and — after they saw the brown version — set in gold (`--star-gold`, #f0af1e). This is the single sanctioned exception to the One Family Rule and is recorded as such in DESIGN.md. No score, review total, average rating or badge is shown, because none is evidenced — only the per-review five stars the client asked for.

## Approved direction

Two variations are built for the client to choose between, each as a full standalone page so the rest of the home page is unchanged:

- `index2-reviews-a.html` — **Centred**. **Chosen by the client.** An ivory band with no visible heading: large gold stars open it, then one Caslon review centred, attribution, then arrows either side of a dot row. The `<h2>` is kept visually hidden so the section still names itself.

  Tuned to the client's "max three lines" instruction. The inner container is 1240px and the quote runs `clamp(21px, 2.2vw, 28px)`; measured against the longest review (~255 characters), every desktop width from 940px up lands in three lines or fewer. Below 900px no phone can hold ~85 characters a line, so the quote wraps to five or six lines by necessity — that is a physical limit, not a missed target.

- `index2-reviews-b.html` — **At the table**. The previously approved image-led comp at `.impeccable/mocks/testimonial-variation-3-image-led-v2.png`: the sunlit jar photograph left, the review field right, with a position counter beside the controls.

Both share `testimonials.css` and `testimonials.js`.

Placement, at the client's direction: directly after **Shop by category** (`.range`) and before Recipes. The band is Ivory because both neighbours are Paper. Those two neighbours were built to touch and each paid only half the standard section break; with an Ivory band between them that reasoning no longer holds, so `testimonials.css` restores the full break on both sides (`.range:has(+ .reviews-*)` and `.reviews-* + .recipes`). Any future move of this band must carry that adjustment with it.

## Unresolved decisions

- Which variation ships.
- Real reviewer names.
- Whether more than four reviews will be supplied.
- Whether the five-star mark stays once real attribution arrives.
