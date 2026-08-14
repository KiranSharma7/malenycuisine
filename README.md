# Maleny Cuisine — Site Content Backup (for revamp)

Everything pulled from the live WordPress/WooCommerce site at https://www.malenycuisine.com.au on 2026-08-07, via the site's Novamira MCP connection.

## Folders

- `images/` — 85 images, cleaned down from the original 138. I checked every image against what's actually referenced across the live pages, products, category thumbnails, site icon, and header/footer templates in the WordPress database, then removed 51 that were confirmed unused: old draft banner versions, superseded category tiles, discontinued product photos, exact duplicates, and oversized raw originals where a proper web version already existed. See `content/removed-images.md` for the full list of what was deleted and why.
- `content/media-library.md` — table of every image originally found: ID, title, file type, and original URL (kept as a full record even though some of these files were later removed from `images/`).
- `content/about-us.md` — the About Us page copy (company story).
- `content/pages.md` — text content from every other page (Home, Contact, FAQ, Food Service, Sauces, Chutneys, Jams, Salad Dressings, Stockists, Work With Us, Privacy Policy, Shipping Policy).
- `content/products.md` — full product catalog (17 products): name, price, description, ingredients, category, grouped by product line.

## Quick facts for the revamp

- Business name: Maleny Cuisine
- Tagline (from site settings): "Gourmet low sodium and gluten free condiments"
- Founded 1988 in the town of Maleny; production later moved to Marcoola, QLD (kept the Maleny Cuisine name)
- Family owned and operated — current owners: Marina, Will & Family
- Address: 4/25 Runway Drive, Marcoola QLD 4564 (postal: PO Box 9487, Pacific Paradise QLD 4564)
- Email: sales@malenycuisine.com.au
- Product lines: Chutneys & Relishes, Sauces, Jams & Marmalades, Salad Dressings, Christmas Puddings
- Platform: WordPress + Divi theme + WooCommerce (17 published products)

## Kept but flagged (not deleted, worth a look)

- `Recipes-Home-Page-Image.jpg`, `Recipes-Home-Page-Image-1-scaled.jpg`, `Recipes-Home-Page-Image2.jpg` — recently uploaded (Jan 2025) but not wired into any live page. Looks like prep work for a Recipes page redesign that never got finished.
- `Pudding.png` — labeled "2024 Christmas Pudding Product Category Image" but never actually set as the Christmas Puddings category thumbnail in WooCommerce. Looks like an oversight — worth assigning it during the revamp.
- `Tomato-and-bread-salad-e1604551586429.jpg` — attached to a recipe post that isn't currently live.

## Not pulled (flag if you want these too)

- Stockist list (addresses/postcodes) — lives in the WP Store Locator plugin's own database table, not page content.
- Recipe posts — the Recipes page is a listing grid; individual recipe posts weren't exported (let me know if you want them).
- Shipping Policy page body — it's an empty stub in WordPress, nothing to export; will need fresh copy written.
