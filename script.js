const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector("#site-search");
const searchForm = document.querySelector(".search-form");

/* Promotional delivery offer ------------------------------------------------
   It appears on every page load, remains a real accessible dialog, and sends
   the customer straight to the product collection. */
const promotion = document.querySelector("[data-promotion]");

if (promotion) {
  const dialog = promotion.querySelector(".promotion__dialog");
  const closeButton = promotion.querySelector("[data-promotion-close]");
  const shopLink = promotion.querySelector("[data-promotion-shop]");
  let previouslyFocused;

  function closePromotion() {
    promotion.classList.remove("is-visible");
    document.body.classList.remove("promotion-open");

    window.setTimeout(() => {
      promotion.hidden = true;
      previouslyFocused?.focus?.();
    }, 220);
  }

  function showPromotion() {
    previouslyFocused = document.activeElement;
    promotion.hidden = false;
    document.body.classList.add("promotion-open");
    window.requestAnimationFrame(() => {
      promotion.classList.add("is-visible");
      closeButton.focus({ preventScroll: true });
    });
  }

  window.setTimeout(showPromotion, 550);

  closeButton.addEventListener("click", () => closePromotion());
  shopLink.addEventListener("click", () => closePromotion());

  promotion.addEventListener("click", (event) => {
    if (event.target === promotion) closePromotion();
  });

  promotion.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePromotion();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

const megaTrigger = document.querySelector(".has-mega > a");
const megaMenu = document.querySelector(".mega-menu");
let megaCloseTimer;

function setMega(open) {
  if (!megaMenu || !megaTrigger) return;

  window.clearTimeout(megaCloseTimer);
  megaTrigger.setAttribute("aria-expanded", String(open));
  megaMenu.setAttribute("aria-hidden", String(!open));
  megaMenu.classList.toggle("is-open", open);

  if (open) setSearch(false);
}

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.setAttribute("aria-hidden", String(!open));
  mobileMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);

  if (open) setSearch(false);
}

function setSearch(open) {
  searchToggle.setAttribute("aria-expanded", String(open));
  searchPanel.setAttribute("aria-hidden", String(!open));
  searchPanel.classList.toggle("is-open", open);

  if (open) {
    setMenu(false);
    setMega(false);
    window.setTimeout(() => searchInput.focus(), 180);
  }
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

searchToggle.addEventListener("click", () => {
  setSearch(searchToggle.getAttribute("aria-expanded") !== "true");
});

searchClose.addEventListener("click", () => setSearch(false));

if (megaMenu && megaTrigger) {
  const megaItem = megaTrigger.closest(".has-mega");
  const isDesktop = () => window.innerWidth > 860;
  const closeSoon = () => {
    window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(() => setMega(false), 160);
  };

  [megaItem, megaMenu].forEach((zone) => {
    zone.addEventListener("mouseenter", () => {
      if (isDesktop()) setMega(true);
    });
    zone.addEventListener("mouseleave", () => {
      if (isDesktop()) closeSoon();
    });
  });

  megaTrigger.addEventListener("focus", () => {
    if (isDesktop()) setMega(true);
  });

  megaTrigger.addEventListener("click", (event) => {
    if (!isDesktop()) return;
    event.preventDefault();
    setMega(megaTrigger.getAttribute("aria-expanded") !== "true");
  });

  megaMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMega(false));
  });

  document.addEventListener("focusin", (event) => {
    if (!megaMenu.classList.contains("is-open")) return;
    if (!megaMenu.contains(event.target) && !megaItem.contains(event.target)) setMega(false);
  });
}

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const drawerTabs = Array.from(document.querySelectorAll(".drawer-tab"));

function selectDrawerTab(tab) {
  drawerTabs.forEach((item) => {
    const isActive = item === tab;
    const panel = document.getElementById(item.getAttribute("aria-controls"));

    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;

    if (panel) {
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    }
  });
}

drawerTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDrawerTab(tab));

  tab.addEventListener("keydown", (event) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;

    event.preventDefault();
    const next = drawerTabs[(index + step + drawerTabs.length) % drawerTabs.length];
    selectDrawerTab(next);
    next.focus();
  });
});

const drawerSearchForm = document.querySelector(".drawer-search");
const drawerSearchInput = document.querySelector("#drawer-search-input");

if (drawerSearchForm && drawerSearchInput) {
  drawerSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = drawerSearchInput.value.trim();
    if (query) {
      window.location.hash = `search=${encodeURIComponent(query)}`;
      setMenu(false);
    }
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    window.location.hash = `search=${encodeURIComponent(query)}`;
    setSearch(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    setSearch(false);
    setMega(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setMenu(false);
  else setMega(false);
});

/* ---------------------------------------------------------------
   Card commerce — the stepper and Add to cart inside a .product-card
   --------------------------------------------------------------- */

/* The same card appears in the home page's rail and in the product page's
   "You may also like" grid, so the behaviour lives here once rather than being
   copied per band. Each band owns its own live region, so it passes its own
   announce() in. Delegation means a band can add or hide cards freely. */

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;
const ADD_CONFIRM_MS = 1600;

const addConfirmTimers = new WeakMap();

function readCardQuantity(card) {
  return Number.parseInt(card.querySelector("[data-quantity]").textContent, 10) || MIN_QUANTITY;
}

function setCardQuantity(card, next) {
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
  const bagLink = document.querySelector(".bag-link");
  const bagCount = document.querySelector(".bag-count");
  if (!bagCount || !bagLink) return;

  const total = (Number.parseInt(bagCount.textContent, 10) || 0) + quantity;
  bagCount.textContent = total;
  bagLink.setAttribute("aria-label", `Shopping bag, ${total} ${total === 1 ? "item" : "items"}`);
}

function bindCardCommerce(root, announce) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const card = button.closest(".product-card");
    if (!card) return;

    if (button.hasAttribute("data-decrease") || button.hasAttribute("data-increase")) {
      const step = button.hasAttribute("data-increase") ? 1 : -1;
      const name = card.querySelector(".product-card__title").textContent.trim();
      announce(`${name} quantity ${setCardQuantity(card, readCardQuantity(card) + step)}.`);
      return;
    }

    if (button.hasAttribute("data-add-to-cart")) {
      const label = button.querySelector("[data-add-label]");
      const quantity = readCardQuantity(card);
      const name = button.dataset.product;

      label.textContent = "Added";
      button.classList.add("is-added");
      bumpBagCount(quantity);
      announce(`${name} added to cart. ${quantity} ${quantity === 1 ? "item" : "items"}.`);

      window.clearTimeout(addConfirmTimers.get(button));
      addConfirmTimers.set(
        button,
        window.setTimeout(() => {
          label.textContent = "Add to cart";
          button.classList.remove("is-added");
        }, ADD_CONFIRM_MS)
      );
    }
  });

  /* Every stepper starts at one with its minus already disabled, so the control
     never opens in a state the buttons cannot produce. */
  root.querySelectorAll(".product-card").forEach((card) => setCardQuantity(card, MIN_QUANTITY));
}

/* ---------------------------------------------------------------
   Shop the collection — category filter, rail paging, add to cart
   --------------------------------------------------------------- */

const collection = document.querySelector(".collection");

if (collection) {
  const rail = collection.querySelector("[data-rail]");
  const items = Array.from(collection.querySelectorAll(".collection__item"));
  const chips = Array.from(collection.querySelectorAll("[data-filter]"));
  const prevButton = collection.querySelector("[data-rail-prev]");
  const nextButton = collection.querySelector("[data-rail-next]");
  const emptyMessage = collection.querySelector("[data-collection-empty]");
  const status = collection.querySelector("[data-collection-status]");
  const shopAll = collection.querySelector("[data-shop-all]");

  /* The band opens on the best sellers rather than the whole catalogue: six
     jars is a choice a visitor can make, sixteen is a list they have to read. */
  const DEFAULT_FILTER = "best";

  let statusTimer;

  function announce(message) {
    if (!status) return;
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = message;
    });
  }

  /* Rail paging */

  function pageDistance() {
    const visible = items.find((item) => !item.hidden);
    if (!visible) return rail.clientWidth;

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const step = visible.getBoundingClientRect().width + gap;
    const pages = Math.max(1, Math.floor(rail.clientWidth / step));

    return step * pages;
  }

  function updateArrows() {
    if (!prevButton || !nextButton) return;

    const max = rail.scrollWidth - rail.clientWidth;
    prevButton.disabled = max <= 1 || rail.scrollLeft <= 1;
    nextButton.disabled = max <= 1 || rail.scrollLeft >= max - 1;
  }

  function page(direction) {
    rail.scrollBy({
      left: pageDistance() * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  /* Filtering */

  /* Three kinds of slug, not two: "all" is the whole catalogue, "best" reads a
     flag set on the item rather than its category, and anything else matches a
     category. Keeping "best" as a filter rather than a separate list means the
     same rail, arrows and add-to-cart code serve both views. */
  function matchesFilter(item, slug) {
    if (slug === "all") return true;
    if (slug === "best") return item.hasAttribute("data-bestseller");
    return item.dataset.category === slug;
  }

  function applyFilter(slug, { silent = false } = {}) {
    let shown = 0;

    items.forEach((item) => {
      const match = matchesFilter(item, slug);
      item.hidden = !match;
      if (match) shown += 1;
    });

    chips.forEach((chip) => {
      const active = chip.dataset.filter === slug;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    if (emptyMessage) emptyMessage.hidden = shown > 0;
    rail.hidden = shown === 0;
    rail.scrollTo({ left: 0, behavior: "auto" });
    updateArrows();

    /* The opening filter is the page's resting state, not something the visitor
       did, so it is not read out. Only a real change is announced. */
    if (silent) return;

    const chosen = chips.find((chip) => chip.dataset.filter === slug);
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      announce(
        `${chosen ? chosen.textContent.trim() : "All products"}: ${shown} ${shown === 1 ? "product" : "products"}.`
      );
    }, 120);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // Clicking the active chip clears the filter and shows everything again.
      applyFilter(chip.classList.contains("is-active") ? "all" : chip.dataset.filter);
    });
  });

  if (prevButton) prevButton.addEventListener("click", () => page(-1));
  if (nextButton) nextButton.addEventListener("click", () => page(1));

  rail.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);

  bindCardCommerce(collection, announce);

  /* Range band tiles jump into this rail with their line already filtered.
     The anchor's own href does the scrolling, so the link still works if this
     listener never runs. */
  document.querySelectorAll("[data-jump-filter]").forEach((link) => {
    link.addEventListener("click", () => applyFilter(link.dataset.jumpFilter));
  });

  /* "Shop all products" is a real link to the shop page for the no-JavaScript
     case. While the whole catalogue still lives in this rail, take it over and
     drop the filter instead of leaving the page. */
  if (shopAll) {
    shopAll.addEventListener("click", (event) => {
      event.preventDefault();
      applyFilter("all");
    });
  }

  /* applyFilter calls updateArrows itself, so this is also the arrows' setup. */
  applyFilter(DEFAULT_FILTER, { silent: true });
}

/* ---------------------------------------------------------------
   You may also like — the product page's related grid
   --------------------------------------------------------------- */

/* Same card, same behaviour as the rail, minus the filtering and paging a grid
   of four does not need. Guarded, so the home page never enters it. */
const related = document.querySelector(".related");

if (related) {
  const relatedStatus = related.querySelector("[data-related-status]");

  bindCardCommerce(related, (message) => {
    if (!relatedStatus) return;
    relatedStatus.textContent = "";
    window.requestAnimationFrame(() => {
      relatedStatus.textContent = message;
    });
  });
}

/* Band reveal — the content settles upward once, the first time the band
   comes into view. A band is only armed (hidden) when the browser can observe
   it and the visitor accepts motion, so the content is never left invisible
   by a failed script or a reduced-motion setting. */
function armBandReveal(band) {
  if (!band) return;

  band.classList.add("is-armed");

  /* A negative bottom margin holds the reveal until the band is properly in
     the frame, rather than the instant its first pixel appears. Threshold
     stays at the default 0 so the callback fires on the crossing itself. */
  const observer = new IntersectionObserver(
    (entries, self) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal();
        self.disconnect();
      });
    },
    { rootMargin: "0px 0px -18% 0px" }
  );

  /* Safety net: whatever happens to the observer, the band is never left
     hidden. Copy that cannot be read is a worse failure than no animation. */
  const fallback = window.setTimeout(reveal, 2500);

  observer.observe(band);

  function reveal() {
    window.clearTimeout(fallback);
    band.classList.add("is-revealed");
  }
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  armBandReveal(document.querySelector(".ethos"));
}

/* ---------------------------------------------------------------
   Marquees — the recipes strip and the footer's assurance bar. Both
   drift from CSS alone, so they still move without this file. Script
   only does the two things CSS cannot: hold the drift at one constant
   speed whatever the content measures out to, and give the visitor a
   real stop button (WCAG 2.2.2).
   --------------------------------------------------------------- */

const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function armMarquee(root, options) {
  if (!root) return;

  const track = root.querySelector(options.trackSelector);
  const pauseButton = root.querySelector(options.pauseSelector);

  function syncDuration() {
    if (!track || calmMotion.matches) return;

    /* The loop distance is one copy of the content plus the gap that follows
       it — the same correction the keyframe makes, and the reason `copies` has
       to match the number of times the set is repeated in the markup. */
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const distance = (track.scrollWidth + gap) / options.copies;
    if (distance <= 0) return;

    root.style.setProperty(
      options.durationProperty,
      `${(distance / options.speed).toFixed(2)}s`
    );
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(syncDuration, 150);
  });

  /* Images and webfonts arrive after first paint and change the track width,
     so measure again once they have all landed. */
  window.addEventListener("load", syncDuration);
  if (calmMotion.addEventListener) calmMotion.addEventListener("change", syncDuration);
  syncDuration();

  if (pauseButton) {
    pauseButton.addEventListener("click", () => {
      const paused = pauseButton.getAttribute("aria-pressed") !== "true";

      root.classList.toggle("is-paused", paused);
      pauseButton.setAttribute("aria-pressed", String(paused));
      pauseButton.setAttribute(
        "aria-label",
        `${paused ? "Play" : "Pause"} the moving ${options.subject}`
      );
    });
  }
}

/* Pixels per second. The content is fluid, so a fixed duration would drift
   faster on a wide screen than a narrow one; the duration is derived from the
   measured width instead so reading speed stays the same everywhere. The bar
   runs slower than the recipe tiles: its claims are read, not glanced at. */
armMarquee(document.querySelector(".recipes"), {
  trackSelector: "[data-recipes-track]",
  pauseSelector: "[data-recipes-pause]",
  durationProperty: "--marquee-duration",
  copies: 2,
  speed: 42,
  subject: "recipe strip",
});

armMarquee(document.querySelector(".assurance"), {
  trackSelector: "[data-assurance-track]",
  pauseSelector: "[data-assurance-pause]",
  durationProperty: "--assurance-duration",
  copies: 3,
  speed: 60,
  subject: "information bar",
});

/* ---------------------------------------------------------------------------
   Footer — keep the copyright year current without editing the markup.
   --------------------------------------------------------------------------- */

/* ---------------------------------------------------------------
   Single product purchase - quantity, bag count and live feedback
   --------------------------------------------------------------- */

const productPurchase = document.querySelector("[data-product-purchase]");

if (productPurchase) {
  const quantity = productPurchase.querySelector("[data-single-quantity]");
  const decrease = productPurchase.querySelector("[data-single-decrease]");
  const increase = productPurchase.querySelector("[data-single-increase]");
  const addButton = productPurchase.querySelector("[data-single-add]");
  const addLabel = productPurchase.querySelector("[data-single-add-label]");
  const buyNow = productPurchase.querySelector("[data-single-buynow]");
  const status = productPurchase.querySelector("[data-single-status]");
  const bagLink = document.querySelector(".bag-link");
  const bagCount = document.querySelector(".bag-count");
  const productName = productPurchase.dataset.product;
  const minimum = 1;
  const maximum = 99;
  const confirmationTimers = new WeakMap();

  function readQuantity() {
    return Number.parseInt(quantity.textContent, 10) || minimum;
  }

  function announce(message) {
    if (!status) return;
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = message;
    });
  }

  function setQuantity(next) {
    const value = Math.min(maximum, Math.max(minimum, next));
    quantity.value = value;
    quantity.textContent = value;
    decrease.disabled = value <= minimum;
    increase.disabled = value >= maximum;
    announce(`${productName} quantity ${value}.`);
    return value;
  }

  function bumpBagCount(amount) {
    if (!bagCount || !bagLink) return;
    const total = (Number.parseInt(bagCount.textContent, 10) || 0) + amount;
    bagCount.textContent = total;
    bagLink.setAttribute("aria-label", `Shopping bag, ${total} ${total === 1 ? "item" : "items"}`);
  }

  /* The add itself, with no opinion about which button asked for it. The ledger's
     Add to cart and the phone dock's both call this, so the quantity, the bag
     count and the announcement have one implementation between them. */
  function addToCart() {
    const amount = readQuantity();
    bumpBagCount(amount);
    announce(`${productName} added to cart. ${amount} ${amount === 1 ? "item" : "items"}.`);
  }

  /* The confirmation is per-button: whichever one was pressed says "Added", and
     the other is either off-screen or on the other side of a breakpoint. */
  function confirmAdded(button, label) {
    label.textContent = "Added";
    button.classList.add("is-added");

    window.clearTimeout(confirmationTimers.get(button));
    confirmationTimers.set(
      button,
      window.setTimeout(() => {
        label.textContent = "Add to cart";
        button.classList.remove("is-added");
      }, 1600)
    );
  }

  decrease.addEventListener("click", () => setQuantity(readQuantity() - 1));
  increase.addEventListener("click", () => setQuantity(readQuantity() + 1));

  addButton.addEventListener("click", () => {
    addToCart();
    confirmAdded(addButton, addLabel);
  });

  /* Buy now is a real link to checkout, so navigation is the browser's job and it
     keeps working with script off. All this adds is the same bag bump and the
     same announcement Add to cart makes, so the count the shopper sees on the
     way out matches what they chose. */
  if (buyNow) {
    buyNow.addEventListener("click", () => {
      const amount = readQuantity();
      bumpBagCount(amount);
      announce(`${productName} added to cart. Going to checkout.`);
    });
  }

  /* The phone purchase dock. On a phone the ledger's buy row leaves the screen
     within one flick and roughly 2,400px of page follow it, so the dock keeps
     the action in thumb reach for the rest of the scroll.

     It owns no state. There is no second stepper and no second quantity: the
     dock's button calls the same addToCart() the ledger's does, reading the same
     value. CSS decides whether the bar is ever visible (phone only) — this only
     decides when.

     The observer watches the buy row and the extra top < 0 test means the bar
     only arrives once the row has gone UP past the viewport, never while the
     shopper is still scrolling down towards it. Without the observer — an old
     browser, or script disabled — the dock simply never docks, and the ledger's
     own controls are untouched. */
  const dock = document.querySelector("[data-product-dock]");
  const buyRow = productPurchase.querySelector(".product-stage__buy");

  if (dock && buyRow) {
    const dockAdd = dock.querySelector("[data-dock-add]");
    const dockAddLabel = dock.querySelector("[data-dock-add-label]");

    if (dockAdd && dockAddLabel) {
      dockAdd.addEventListener("click", () => {
        addToCart();
        confirmAdded(dockAdd, dockAddLabel);
      });
    }

    if ("IntersectionObserver" in window) {
      const dockObserver = new IntersectionObserver(
        ([entry]) => {
          dock.classList.toggle("is-docked", !entry.isIntersecting && entry.boundingClientRect.top < 0);
        },
        { threshold: 0 }
      );

      dockObserver.observe(buyRow);
    }
  }
}


document.querySelectorAll("[data-year]").forEach((slot) => {
  slot.textContent = String(new Date().getFullYear());
});
