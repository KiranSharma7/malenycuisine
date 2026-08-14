/* ===========================================================================
   ARCHIVE — the category / collection page.

   Loads after script.js, which already owns the header, drawer, search, the
   assurance marquee and the footer year. This file owns only what the archive
   page adds, in two independent blocks, each guarded so nothing throws on a
   page that lacks the section.

   There is no filter code here on purpose. Each category chip is a real link
   to that line's own page, so filtering is the browser's job and the row works
   with JavaScript off. Sort is the one thing on this page that does change the
   grid in place, so it is the one thing here that needs script.
   =========================================================================== */

/* ---------------------------------------------------------------
   Purchase — quantity steppers and add to cart, on a grid instead
   of the home page's rail. Same behaviour and the same live region,
   because a shopper should not have to learn the card twice.
   --------------------------------------------------------------- */

const archiveGrid = document.querySelector("[data-archive-grid]");

if (archiveGrid) {
  const status = document.querySelector("[data-archive-status]");
  const bagLink = document.querySelector(".bag-link");
  const bagCount = document.querySelector(".bag-count");

  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 99;
  const CONFIRM_MS = 1600;

  const confirmTimers = new WeakMap();

  function announce(message) {
    if (!status) return;
    /* Cleared first so two identical messages in a row are still two
       announcements rather than one silent no-change. */
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = message;
    });
  }

  function readQuantity(card) {
    return Number.parseInt(card.querySelector("[data-quantity]").textContent, 10) || MIN_QUANTITY;
  }

  function setQuantity(card, next) {
    const output = card.querySelector("[data-quantity]");
    const decrease = card.querySelector("[data-decrease]");
    const increase = card.querySelector("[data-increase]");
    const clamped = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, next));

    output.value = clamped;
    output.textContent = clamped;
    decrease.disabled = clamped <= MIN_QUANTITY;
    increase.disabled = clamped >= MAX_QUANTITY;

    return clamped;
  }

  function bumpBagCount(quantity) {
    if (!bagCount || !bagLink) return;

    const total = (Number.parseInt(bagCount.textContent, 10) || 0) + quantity;
    bagCount.textContent = total;
    bagLink.setAttribute("aria-label", `Shopping bag, ${total} ${total === 1 ? "item" : "items"}`);
  }

  archiveGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const card = button.closest(".product-card");
    if (!card) return;

    if (button.hasAttribute("data-decrease") || button.hasAttribute("data-increase")) {
      const step = button.hasAttribute("data-increase") ? 1 : -1;
      const name = card.querySelector(".product-card__title").textContent.trim();
      announce(`${name} quantity ${setQuantity(card, readQuantity(card) + step)}.`);
      return;
    }

    if (button.hasAttribute("data-add-to-cart")) {
      const label = button.querySelector("[data-add-label]");
      const quantity = readQuantity(card);
      const name = button.dataset.product;

      label.textContent = "Added";
      button.classList.add("is-added");
      bumpBagCount(quantity);
      announce(`${name} added to cart. ${quantity} ${quantity === 1 ? "item" : "items"}.`);

      window.clearTimeout(confirmTimers.get(button));
      confirmTimers.set(
        button,
        window.setTimeout(() => {
          label.textContent = "Add to cart";
          button.classList.remove("is-added");
        }, CONFIRM_MS)
      );
    }
  });

  /* Sets the disabled state on every minus button at rest, so the floor is
     visible before anyone presses anything. */
  archiveGrid.querySelectorAll(".product-card").forEach((card) => setQuantity(card, MIN_QUANTITY));
}

/* ---------------------------------------------------------------
   Sort — reorders the cards already on the page.

   Nothing is fetched, hidden or replaced: the same sixteen items
   are re-appended in a new order, so quantities already set and
   the card that currently has focus all survive the change.

   "Featured" is the order the markup shipped in — the client's
   own running order — so it is recorded once at load and is
   always returnable. No sort invents a value: name comes from the
   product title, price from the price the card already shows.
   --------------------------------------------------------------- */

const sortSelect = document.querySelector("[data-archive-sort]");

if (sortSelect && archiveGrid) {
  const status = document.querySelector("[data-archive-status]");
  const items = Array.from(archiveGrid.children);

  function nameOf(item) {
    return item.querySelector(".product-card__title").textContent.trim();
  }

  /* A sale card shows two prices; the one that sorts is the one being charged. */
  function priceOf(item) {
    const price = item.querySelector(".price-now") || item.querySelector(".product-card__price");
    return Number.parseFloat(price.textContent.replace(/[^0-9.]/g, "")) || 0;
  }

  const ORDERS = {
    featured: null,
    "name-asc": (a, b) => nameOf(a).localeCompare(nameOf(b), "en-AU"),
    "name-desc": (a, b) => nameOf(b).localeCompare(nameOf(a), "en-AU"),
    "price-asc": (a, b) => priceOf(a) - priceOf(b),
    "price-desc": (a, b) => priceOf(b) - priceOf(a),
  };

  function applySort(announceIt) {
    const compare = ORDERS[sortSelect.value];
    const ordered = compare ? items.slice().sort(compare) : items;

    /* One fragment, one write: the grid reflows once instead of sixteen times. */
    const fragment = document.createDocumentFragment();
    ordered.forEach((item) => fragment.append(item));
    archiveGrid.append(fragment);

    if (announceIt && status) {
      const label = sortSelect.options[sortSelect.selectedIndex].textContent.trim();
      status.textContent = "";
      window.requestAnimationFrame(() => {
        status.textContent = `Sorted by ${label}. ${ordered.length} products.`;
      });
    }
  }

  sortSelect.addEventListener("change", () => applySort(true));

  /* Browsers restore a select's value on a back-navigation or a reload but not
     the DOM order that went with it, so the grid is squared up once at load.
     Silent: nothing changed under the shopper, it was already like this. */
  if (sortSelect.value !== "featured") applySort(false);
}

/* ---------------------------------------------------------------
   Filter bar — the shadow that says it is floating.

   The bar sticks from CSS alone; script only says when it has
   actually left the flow, so the shadow is a response to a state
   rather than a resting decoration. Losing this file costs the page
   a shadow and nothing else.

   A sentinel is watched rather than the scroll position: nothing
   runs on every frame, and this never needs to know where in the
   page the bar sits.
   --------------------------------------------------------------- */

const filterBar = document.querySelector("[data-filter-bar]");

if (filterBar && "IntersectionObserver" in window) {
  /* In the flow, immediately above the bar, and pulled back out of the layout
     by its own height — so it marks the bar's resting top edge exactly and
     costs the page nothing. */
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "height:1px;margin-bottom:-1px;";
  filterBar.before(sentinel);

  new IntersectionObserver(
    ([entry]) => filterBar.classList.toggle("is-stuck", !entry.isIntersecting),
    { threshold: 0 }
  ).observe(sentinel);
}
