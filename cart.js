/* ===========================================================================
   CART — quantities, totals, the free-delivery meter, the empty state and the
   slide-out mini bag. Used by cart-b.html, and by any page that carries the
   mini bag markup.

   Loads after script.js and depends on nothing. Every block is guarded by an
   existence check, the same way script.js is, so this file is inert on a page
   that has no bag.

   The lines themselves are real HTML in the page, not rendered here: with
   JavaScript off a shopper still sees what is in the bag, what each line costs
   and what the total is. This file only does the four things markup cannot —
   recalculate after a change, redraw the meter, swap in the empty state, and
   open the mini bag.
   =========================================================================== */

(function () {
  const cart = document.querySelector("[data-cart]");
  if (!cart) return;

  /* The published promotion, in cents. It is a real offer already running on
     the site — the announcement bar and the promotion dialog both carry it —
     so the meter reports a fact rather than inventing an incentive. */
  const FREE_DELIVERY = 6000;
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 99;

  const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* From the document, not from the cart. On the bag page the live region sits
     inside the bag; on a shopping page the bag itself is a hidden record, and a
     live region inside a `hidden` element is never announced. */
  const status = document.querySelector("[data-cart-status]");
  /* Plural, not singular: the page hides two regions when the bag empties —
     the list and the dark summary column beside it. */
  const filled = cart.querySelectorAll("[data-cart-filled]");
  const empty = cart.querySelectorAll("[data-cart-empty]");
  const bagLink = document.querySelector(".bag-link");
  const bagCount = document.querySelector(".bag-count");

  /* ---------------------------------------------------------------------
     Money is held and added up in cents. A cart is the one place on this
     site where a floating-point cent actually reaches the customer's eye.
     --------------------------------------------------------------------- */

  function toCents(value) {
    return Math.round(Number.parseFloat(value) * 100) || 0;
  }

  function money(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }

  function plural(count, one, many) {
    return `${count} ${count === 1 ? one : many}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (character) => {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character];
    });
  }

  function lines() {
    return Array.from(cart.querySelectorAll("[data-cart-line]"));
  }

  function quantityOf(line) {
    return Number.parseInt(line.dataset.quantity, 10) || MIN_QUANTITY;
  }

  function announce(message) {
    if (!status) return;
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = message;
    });
  }

  /* ---------------------------------------------------------------------
     Rendering. One pass writes every derived number on the page, in the
     mini bag and in the header, so there is only ever one place a total
     can be wrong.
     --------------------------------------------------------------------- */

  function setQuantityControl(control, quantity, name) {
    if (!control) return;

    const output = control.querySelector("[data-quantity]");
    const decrease = control.querySelector("[data-decrease]");
    const increase = control.querySelector("[data-increase]");

    if (output) {
      output.value = quantity;
      output.textContent = quantity;
    }

    /* The floor is 1 rather than 0: taking the last one out of the bag is
       "Remove", which is its own button and says so. */
    if (decrease) {
      decrease.disabled = quantity <= MIN_QUANTITY;
      decrease.setAttribute("aria-label", `Decrease quantity of ${name}`);
    }

    if (increase) {
      increase.disabled = quantity >= MAX_QUANTITY;
      increase.setAttribute("aria-label", `Increase quantity of ${name}`);
    }
  }

  function drawMeter(meter, subtotal) {
    if (!meter) return;

    const text = meter.querySelector("[data-meter-text]");
    const fill = meter.querySelector("[data-meter-fill]");
    const remaining = FREE_DELIVERY - subtotal;
    const reached = remaining <= 0;

    meter.classList.toggle("is-complete", reached);

    /* A unitless 0–1 fraction: the bar grows with transform: scaleX(), not by
       changing its width, so the redraw stays off the layout path. */
    if (fill) {
      const progress = Math.min(1, subtotal / FREE_DELIVERY);
      fill.style.setProperty("--meter-progress", progress.toFixed(4));
    }

    if (!text) return;

    text.innerHTML = reached
      ? "Your order qualifies for <span class=\"delivery-meter__amount\">free delivery</span>."
      : `<span class="delivery-meter__amount">${money(remaining)}</span> more and delivery is free — the offer applies to orders over $60.`;
  }

  function miniBagLine(line) {
    const name = line.dataset.name;
    const quantity = quantityOf(line);
    const total = money(toCents(line.dataset.price) * quantity);
    const note = line.dataset.note
      ? `<span class="cart-line__note">${escapeHtml(line.dataset.note)}</span>`
      : "";

    return `
      <li class="cart-line" data-mini-line data-cart-ref="${escapeHtml(line.id)}">
        <div class="cart-line__item">
          <span class="cart-line__thumb">
            <img src="${escapeHtml(line.dataset.image)}" alt="" width="72" height="72" loading="lazy" decoding="async" />
          </span>
          <div class="cart-line__text">
            <p class="cart-line__category">${escapeHtml(line.dataset.category)}</p>
            <p class="cart-line__name">${escapeHtml(name)}</p>
            ${note}
          </div>
        </div>

        <button class="icon-button cart-line__remove" type="button" data-remove aria-label="Remove ${escapeHtml(name)} from your bag">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        <div class="cart-line__figures">
          <div class="quantity-control" role="group" aria-label="Quantity of ${escapeHtml(name)}">
            <button class="quantity-control__button" type="button" data-decrease aria-label="Decrease quantity of ${escapeHtml(name)}"${quantity <= MIN_QUANTITY ? " disabled" : ""}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>
            </button>
            <output class="quantity-control__value" data-quantity>${quantity}</output>
            <button class="quantity-control__button" type="button" data-increase aria-label="Increase quantity of ${escapeHtml(name)}"${quantity >= MAX_QUANTITY ? " disabled" : ""}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          </div>
          <p class="cart-line__total">${total}</p>
        </div>
      </li>
    `;
  }

  const miniBag = document.querySelector("[data-mini-bag]");
  /* Assigned once the panel is wired, below. Adding from a product card has to
     be able to open the panel, and the opener is built inside that block. */
  let openMiniBag = null;
  const miniList = miniBag && miniBag.querySelector("[data-mini-list]");
  const miniEmpty = miniBag && miniBag.querySelector("[data-mini-empty]");
  const miniFoot = miniBag && miniBag.querySelector("[data-mini-foot]");

  /* The panel's rows are only rebuilt when the set of lines actually changes.
     Redrawing them on every quantity change would throw focus off the stepper
     the shopper is still pressing. */
  function syncMiniList(all) {
    if (!miniList) return;

    const signature = all.map((line) => line.id).join("|");

    if (miniList.dataset.signature !== signature) {
      miniList.innerHTML = all.map(miniBagLine).join("");
      miniList.dataset.signature = signature;
    } else {
      Array.from(miniList.children).forEach((row) => {
        const line = document.getElementById(row.dataset.cartRef);
        if (!line) return;

        const quantity = quantityOf(line);
        setQuantityControl(row.querySelector(".quantity-control"), quantity, line.dataset.name);

        const total = row.querySelector(".cart-line__total");
        if (total) total.textContent = money(toCents(line.dataset.price) * quantity);
      });
    }

    miniList.hidden = all.length === 0;
  }

  function render() {
    const all = lines();
    let items = 0;
    let subtotal = 0;

    all.forEach((line) => {
      const quantity = quantityOf(line);
      const lineTotal = toCents(line.dataset.price) * quantity;

      items += quantity;
      subtotal += lineTotal;

      setQuantityControl(line.querySelector(".quantity-control"), quantity, line.dataset.name);

      const total = line.querySelector("[data-line-total]");
      if (total) total.textContent = money(lineTotal);
    });

    const hasLines = all.length > 0;

    filled.forEach((region) => {
      region.hidden = !hasLines;
    });

    empty.forEach((region) => {
      region.hidden = hasLines;
    });

    /* Queried from the document, not from the cart: the mini bag carries the
       same subtotal and the same meter, and it sits outside <main>. */
    document.querySelectorAll("[data-cart-count]").forEach((slot) => {
      slot.textContent = plural(items, "jar", "jars");
    });

    document.querySelectorAll("[data-subtotal]").forEach((slot) => {
      slot.textContent = money(subtotal);
    });

    /* Delivery has no figure until an address exists and this project may not
       invent one, so the free case is the only one that can be priced. */
    document.querySelectorAll("[data-delivery-word]").forEach((slot) => {
      slot.textContent = subtotal >= FREE_DELIVERY ? "Free" : "At checkout";
    });

    /* The total is the subtotal until delivery is known. Saying so in the note
       beneath it is honest; putting a guessed number in the figure is not. */
    document.querySelectorAll("[data-total]").forEach((slot) => {
      slot.textContent = money(subtotal);
    });

    document.querySelectorAll("[data-delivery-meter]").forEach((meter) => {
      drawMeter(meter, subtotal);
    });

    if (bagCount && bagLink) {
      bagCount.textContent = items;
      bagLink.setAttribute("aria-label", `Shopping bag, ${plural(items, "item", "items")}`);
    }

    syncMiniList(all);

    if (miniEmpty) miniEmpty.hidden = hasLines;
    if (miniFoot) miniFoot.hidden = !hasLines;

    return { items, subtotal };
  }

  /* ---------------------------------------------------------------------
     Changing the bag.
     --------------------------------------------------------------------- */

  function changeQuantity(line, step) {
    const next = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, quantityOf(line) + step));
    if (next === quantityOf(line)) return;

    line.dataset.quantity = next;
    const totals = render();
    announce(`${line.dataset.name}, quantity ${next}. Bag total ${money(totals.subtotal)}.`);
  }

  /* Focus has to land somewhere real when the row under it disappears. The
     next line's remove button is the nearest equivalent control; when the bag
     empties, the empty state's heading is what replaced everything. */
  function focusAfterRemoval(line) {
    const remaining = lines().filter((item) => item !== line);
    const index = lines().indexOf(line);
    const next = remaining[index] || remaining[remaining.length - 1];

    if (next) {
      const button = next.querySelector("[data-remove]");
      if (button) button.focus();
      return;
    }

    const heading = cart.querySelector("[data-empty-title]");
    if (heading) heading.focus();
  }

  function removeLine(line) {
    const name = line.dataset.name;

    function finish() {
      line.remove();
      const totals = render();
      announce(
        totals.items > 0
          ? `${name} removed. ${plural(totals.items, "jar", "jars")} in your bag, ${money(totals.subtotal)}.`
          : `${name} removed. Your bag is empty.`
      );
    }

    focusAfterRemoval(line);

    if (calmMotion.matches) {
      finish();
      return;
    }

    /* Collapse the row's own height as it fades, so the lines beneath close
       the gap instead of jumping up into it. */
    const height = line.getBoundingClientRect().height;
    line.style.height = `${height}px`;
    line.classList.add("is-leaving");

    window.requestAnimationFrame(() => {
      line.style.transition = `height var(--dur) ease, opacity var(--dur) ease, transform var(--dur) ease`;
      line.style.height = "0px";
      line.style.paddingTop = "0px";
      line.style.paddingBottom = "0px";
    });

    window.setTimeout(finish, 220);
  }

  cart.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const line = button.closest("[data-cart-line]");
    if (!line) return;

    if (button.hasAttribute("data-remove")) {
      removeLine(line);
      return;
    }

    if (button.hasAttribute("data-decrease")) changeQuantity(line, -1);
    if (button.hasAttribute("data-increase")) changeQuantity(line, 1);
  });

  /* ---------------------------------------------------------------------
     Mini bag.

     The header's bag icon is a real link to this page, so the header still
     works with JavaScript off. Here that link is taken over and the panel
     opens instead.
     --------------------------------------------------------------------- */

  if (miniBag && bagLink) {
    const panel = miniBag.querySelector(".mini-bag__panel");
    const scrim = miniBag.querySelector("[data-mini-scrim]");
    let previouslyFocused;

    function focusable() {
      return Array.from(
        panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => element.offsetParent !== null);
    }

    function setMiniBag(open) {
      miniBag.classList.toggle("is-open", open);
      miniBag.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("mini-bag-open", open);
      bagLink.setAttribute("aria-expanded", String(open));

      if (open) {
        previouslyFocused = document.activeElement;

        /* The Mutual Exclusion Rule: the mega menu, the search panel and the
           mobile drawer are never open alongside this. */
        if (typeof setMega === "function") setMega(false);
        if (typeof setSearch === "function") setSearch(false);
        if (typeof setMenu === "function") setMenu(false);

        const close = miniBag.querySelector("[data-mini-close]");
        window.setTimeout(() => close && close.focus({ preventScroll: true }), 60);
        return;
      }

      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus({ preventScroll: true });
      }
    }

    openMiniBag = () => setMiniBag(true);

    bagLink.setAttribute("aria-expanded", "false");
    bagLink.setAttribute("aria-controls", miniBag.id);

    bagLink.addEventListener("click", (event) => {
      event.preventDefault();
      setMiniBag(!miniBag.classList.contains("is-open"));
    });

    miniBag.querySelectorAll("[data-mini-close]").forEach((button) => {
      button.addEventListener("click", () => setMiniBag(false));
    });

    if (scrim) scrim.addEventListener("click", () => setMiniBag(false));

    /* The promotion dialog traps focus and the mobile drawer does not, which
       DESIGN.md records as a known gap. This panel follows the dialog. */
    miniBag.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMiniBag(false);
        return;
      }

      if (event.key !== "Tab") return;

      const stops = focusable();
      if (stops.length === 0) return;

      const first = stops[0];
      const last = stops[stops.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* A change made inside the panel is a change to the same bag. The line in
       the page is the record; the panel's row only points at it. */
    miniBag.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const row = button.closest("[data-mini-line]");
      if (!row) return;

      const line = document.getElementById(row.dataset.cartRef);
      if (!line) return;

      if (button.hasAttribute("data-remove")) {
        const name = line.dataset.name;
        /* The panel's list is redrawn wholesale, so the button the shopper
           just pressed stops existing. Remember where it was and put focus on
           whatever takes its place. */
        const position = Array.from(miniList.children).indexOf(row);

        line.remove();
        const totals = render();

        const rows = Array.from(miniList.children);
        const next = rows[position] || rows[rows.length - 1];
        const target = next
          ? next.querySelector("[data-remove]")
          : miniBag.querySelector("[data-mini-close]");
        if (target) target.focus();

        announce(
          totals.items > 0
            ? `${name} removed. ${plural(totals.items, "jar", "jars")} in your bag, ${money(totals.subtotal)}.`
            : `${name} removed. Your bag is empty.`
        );
        return;
      }

      if (button.hasAttribute("data-decrease")) changeQuantity(line, -1);
      if (button.hasAttribute("data-increase")) changeQuantity(line, 1);
    });
  }

  /* ---------------------------------------------------------------------
     Adding from a product card.

     The home page rail and the archive grid both use the same card, so one
     document-level listener serves both rather than two copies bound to two
     bands. It runs after script.js and archive.js have handled the button's
     own "Added" confirmation and spoken announcement — this block does the
     part neither of them can: put the jar in the bag and show the bag.

     The bag is still markup. On these pages `[data-cart]` is an empty hidden
     list rather than a visible one, and a line is appended to it; everything
     downstream — the totals, the meter, the header count, the panel's rows —
     reads that list exactly as it does on the bag page.
     --------------------------------------------------------------------- */

  function text(node) {
    return node ? node.textContent.trim() : "";
  }

  function readCard(card, button) {
    const name = (button.dataset.product || "").trim() ||
      text(card.querySelector(".product-card__title"));

    /* A card on sale prints two figures. `.price-now` is the one being charged;
       reading the container instead would concatenate the struck price into it. */
    const price = text(card.querySelector(".price-now")) ||
      text(card.querySelector(".product-card__price"));

    /* The first image only. The second is the hover frame and is decorative. */
    const image = card.querySelector(".product-card__image:not(.product-card__image--alt)");

    /* Allergen text travels with the product. It is regulated, so it belongs to
       the line, not to the card it was added from. */
    const note = text(card.querySelector(".product-card__note"));

    const quantityField = card.querySelector("[data-quantity]");
    const quantity = Number.parseInt(quantityField && quantityField.textContent, 10) || MIN_QUANTITY;

    return {
      name,
      category: text(card.querySelector(".product-card__category")),
      price: price.replace(/[^0-9.]/g, ""),
      image: image ? image.getAttribute("src") : "",
      note,
      quantity,
    };
  }

  /* One line per product, keyed by name. Adding a jar already in the bag raises
     its quantity instead of opening a second line for the same thing. */
  function lineIdFor(name) {
    return "bag-line-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function addToBag(details) {
    if (!details.name || !details.price) return;

    const id = lineIdFor(details.name);
    let line = document.getElementById(id);

    if (line) {
      line.dataset.quantity = Math.min(MAX_QUANTITY, quantityOf(line) + details.quantity);
    } else {
      line = document.createElement("li");
      line.id = id;
      line.setAttribute("data-cart-line", "");
      line.dataset.name = details.name;
      line.dataset.category = details.category;
      line.dataset.price = details.price;
      line.dataset.quantity = Math.min(MAX_QUANTITY, details.quantity);
      line.dataset.image = details.image;
      if (details.note) line.dataset.note = details.note;
      cart.appendChild(line);
    }

    render();
  }

  if (document.querySelector("[data-add-to-cart]")) {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-to-cart]");
      if (!button) return;

      const card = button.closest(".product-card");
      if (!card) return;

      addToBag(readCard(card, button));

      /* Opened after the bag is rendered, so the panel slides in already
         showing the jar that was just added rather than filling in behind it. */
      if (openMiniBag) openMiniBag();
    });
  }

  render();
})();
