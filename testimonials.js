/* ===========================================================================
   MALENY CUISINE — CUSTOMER REVIEW CAROUSEL
   Loaded after script.js. It binds to data attributes rather than to layout
   classes, so the band can be restyled or re-laid-out without touching this.

   Contract (see the review band in index.html):
     [data-review-carousel]   the section
     [data-review-slide]      one review, stacked in a single grid cell
     [data-review-prev/next]  the two circular arrows, wrapping both ways
     [data-review-dot]        one jump button per review
     [data-review-status]     a visually hidden aria-live="polite" region
     [data-review-count]      optional visible "01 / 04" counter

   There is no autoplay. Nothing here moves on its own, so no pause control is
   needed (WCAG 2.2.2).
   =========================================================================== */

(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-review-carousel]");

  Array.prototype.forEach.call(carousels, function (root) {
    var slides = root.querySelectorAll("[data-review-slide]");
    var dots = root.querySelectorAll("[data-review-dot]");
    var prev = root.querySelector("[data-review-prev]");
    var next = root.querySelector("[data-review-next]");
    var status = root.querySelector("[data-review-status]");
    var counter = root.querySelector("[data-review-count]");
    var viewport = root.querySelector("[data-review-viewport]");
    var controls = root.querySelector("[data-review-controls]");

    // One review is not a carousel. Hide the controls rather than shipping a
    // dead pair of arrows.
    if (slides.length < 2) {
      if (controls) {
        controls.hidden = true;
      }
      return;
    }

    var index = 0;

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }

    /* One announcement for the whole change — position, then the review, then
       who wrote it and which jar it is about. Scattering this across the slide
       would make a screen reader read the band three times. */
    function announce() {
      if (!status) {
        return;
      }
      var slide = slides[index];
      var quote = slide.querySelector("[data-review-quote]");
      var who = slide.querySelector("[data-review-customer]");
      var what = slide.querySelector("[data-review-product]");

      status.textContent =
        "Review " +
        (index + 1) +
        " of " +
        slides.length +
        ". " +
        (quote ? quote.textContent.trim() + " " : "") +
        (who ? who.textContent.trim() + ". " : "") +
        (what ? what.textContent.trim() + "." : "");
    }

    function show(nextIndex, shouldAnnounce) {
      index = (nextIndex + slides.length) % slides.length;

      Array.prototype.forEach.call(slides, function (slide, i) {
        var isActive = i === index;
        slide.classList.toggle("is-active", isActive);
        // `visibility: hidden` already removes the inactive slides from the
        // accessibility tree; this keeps the intent explicit in the DOM.
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      Array.prototype.forEach.call(dots, function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });

      if (counter) {
        counter.textContent = pad(index + 1) + " / " + pad(slides.length);
      }

      if (shouldAnnounce) {
        announce();
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1, true);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        show(index + 1, true);
      });
    }

    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener("click", function () {
        show(i, true);
      });
    });

    // The focused review itself also takes Left and Right Arrow, which is what
    // a keyboard user tries first once the viewport has focus.
    if (viewport) {
      viewport.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          show(index - 1, true);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          show(index + 1, true);
        }
      });
    }

    // First paint: set the state without announcing it, so a screen reader is
    // not told about a review the moment the page loads.
    show(0, false);
  });
})();
