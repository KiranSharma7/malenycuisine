# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS, hand-written, no framework and no build step — continuing the existing `index.html` / `styles.css` / `script.js` pattern. Confirmed by the user. Commerce is presentation-only under this stack: product, category and cart UI are built as static markup, and no live checkout or payment integration is in scope unless the user later adds one.

## Users

Primary user: an Australian home shopper buying jars online — home cooks, entertainers and gift buyers who already know or have just discovered the brand and want to order direct. They arrive to browse the range, understand what a product tastes like and what it goes with, and complete a purchase.

Secondary audiences exist in the source content and must not be deleted, but do not lead the design:

- People looking for a nearby stockist (Stockists page, currently powered by the WP Store Locator plugin).
- Cafes, restaurants and retailers interested in the Food Service range in cartons of 48 (Food Service page).

## Product Purpose

Maleny Cuisine sells handcrafted gourmet condiments — chutneys, relishes, sauces, jams and marmalades, salad dressings, and a Christmas pudding — made in the company's own commercial kitchen on Queensland's Sunshine Coast. The site exists to sell the range direct to consumers and to carry the brand's story and product truth.

Success means a home shopper can find a product, trust the quality and dietary claims, and buy it without friction.

## Positioning

Founded 1988 in the town of Maleny; over 35 years family owned and operated, currently by Marina, Will & Family. Production moved to Marcoola, QLD for logistics but kept the Maleny Cuisine name and the original recipes.

The mechanism a competitor could not truthfully copy: fresh local Queensland produce bought whole and processed entirely on site, minimum processing, no artificial preservatives, colours or flavours — combined with a dietary profile that is unusual for gourmet condiments. The entire bottled range is free of dairy, eggs, nuts and oil; apart from the Special BBQ Sauce, everything bottled is gluten free, low sodium and vegan-suitable. The salad dressings are oil-free. The company states it does not even keep salt in its kitchen.

## Operating Context

- Live site today: WordPress + Divi theme + WooCommerce at https://www.malenycuisine.com.au, 17 published products.
- This repository is a content backup taken 2026-08-07 via the site's Novamira MCP connection, plus an early static rebuild of the header and hero.
- Existing pages on the live site: Home, Products, the five category pages, Recipes, Stockists, Food Service, About Us, Contact Us, FAQ, Work With Us, Privacy Policy, Shipping Policy.
- Shopping context: shelf-stable pantry goods, ~18–20 months unopened, refrigerate after opening. Products are commonly bought as gifts and for entertaining, which makes gifting and platter/serving suggestions real usage, not marketing invention.
- Existing announcement in the current build: "Free Shipping on orders over $60."

## Capabilities and Constraints

- 17 products across five lines: Chutneys & Relishes, Sauces, Jams & Marmalades, Salad Dressings, Christmas Puddings. Prices range $9.35–$18.00.
- Product terminology to keep: chutney, relish, sauce, conserve, marmalade, dressing. Australian English spelling throughout ("flavour", "caramelised").
- Regulated food claims must be reproduced exactly, never paraphrased or extended: gluten free, low sodium, vegan-suitable, dairy/egg/nut/oil free, "Contains wheat" on the Special BBQ Sauce, "Contains egg" on the Christmas Pudding. Ingredient lists and their percentages are legal text — copy verbatim from `content/products.md`.
- The Special BBQ Sauce is the standing exception: it contains soy sauce, so it is **not** low sodium, **not** gluten free and **not** vegan. Any range-wide claim must carve it out.
- The Christmas Pudding contains egg white albumen, so it is not vegan.
- Undecided / not yet answered:
  - Whether a real checkout is ever added to the static site, and if so how.
  - Whether the stockist list is exported from the WP Store Locator plugin into this project.
  - Whether individual recipe posts are exported; only the Recipes listing page was captured.
  - Shipping Policy copy — the WordPress page is an empty stub. Real shipping terms must come from the client; do not invent rates, carriers or delivery times.
  - Whether the Christmas Puddings line is sold year-round or seasonally.

## Brand Commitments

Confirmed fixed by the user:

- Name "Maleny Cuisine" and the existing logo at `images/logo.png`.
- Tagline from site settings: "Gourmet low sodium and gluten free condiments".
- All 17 product names, descriptions and prices as recorded in `content/products.md` — nothing invented, nothing dropped.
- The health and dietary claims listed above, word for word.

Voice, from existing site copy: warm, plain, first-person family ("we", "our kitchen"), practical about how to use each product, proud of place. Signed "— Marina, Will & Family."

Not fixed: the user did **not** make the existing product photography binding, so new or generated imagery is allowed.

## Evidence on Hand

- `content/products.md` — full 17-product catalog with prices, descriptions and ingredients.
- `content/pages.md` — copy for Home, Contact, FAQ, Food Service, the four category pages, Stockists, Work With Us, Privacy Policy, Shipping Policy (stub).
- `content/about-us.md` — company story.
- `content/media-library.md` and `content/removed-images.md` — record of the original 138 images and why 51 were removed.
- `images/` — 85 cleaned images including logo and category tiles. Flagged as unused but kept: three `Recipes-Home-Page-Image*` files, `Pudding.png` (never assigned as the Christmas Puddings category thumbnail), and `Tomato-and-bread-salad-e1604551586429.jpg`.
- `design-references/` — six generated header/hero direction studies from earlier exploration.
- Real address and contact: 4/25 Runway Drive, Marcoola QLD 4564; postal PO Box 9487, Pacific Paradise QLD 4564; sales@malenycuisine.com.au.

Client-supplied 2026-08-12: four customer review texts, covering the Spicy Tomato Relish, Special BBQ Sauce, Gluten Free Christmas Pudding and Mediterranean Eggplant Relish. The words are real and are used verbatim. The reviewer **names are still placeholders** — real attribution has not been supplied. The client also directed that each review carry a five-star mark.

Absences that must not be fabricated: no reviewer identities, no aggregate rating or review count, no awards or press, no sales figures, no stockist addresses, no shipping rates or delivery estimates, no phone number.

## Product Principles

1. **The label is the law.** Dietary and ingredient claims are regulated text. Reproduce them exactly and always carve out the BBQ Sauce and the Christmas Pudding.
2. **Sell the jar by how it is used.** Every product's own copy already says what it goes with; that pairing is the sales argument, not adjectives.
3. **Place and family are the proof.** Queensland produce, one kitchen at Marcoola, 35+ years, Marina, Will & Family. This is the brand's only real credibility and it is documented.
4. **Invent nothing.** No testimonials, ratings, awards, stockists or shipping promises until the client supplies them.
5. **Buying leads; finding and trade follow.** Design for the home shopper first, but keep the stockist and food service paths intact and findable.

## Accessibility & Inclusion

No client-specific standard has been established. The existing build already ships a skip link, ARIA-labelled navigation and controls, so treat that baseline as the floor rather than a nice-to-have. Dietary information is the site's most safety-relevant content and must be readable, not decorative.
