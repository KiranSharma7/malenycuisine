/* ==========================================================================
   CHECKOUT — the payment page.

   PROTOTYPE ONLY. Nothing here talks to a payment processor and nothing here
   should ever be pointed at one: card data belongs in a provider's own hosted
   field, never in this page's markup. This file formats what is typed, checks
   the shape of it, and stops.

   Written the same way script.js is: plain script, no modules, no
   dependencies, a set of independent blocks each guarded by an existence
   check so nothing throws on a page that lacks the region. Every region the
   script shows or hides is toggled by a class rather than the `hidden`
   attribute, because checkout.css changes what those regions do at 900px and
   an attribute set by script would survive a resize the CSS cannot see.
   ========================================================================== */

(function () {
  "use strict";

  var status = document.querySelector("[data-checkout-status]");

  /* One polite live region for the whole page, so a validation result and a
     coupon result never talk over each other. */
  function announce(message) {
    if (!status) return;
    status.textContent = "";
    /* Re-writing the same string does not re-announce in several screen
       readers; clearing on the next frame is what makes a repeat speak. */
    window.requestAnimationFrame(function () {
      status.textContent = message;
    });
  }

  /* ------------------------------------------------------------------------
     Order summary disclosure.

     Phones only. The button is display:none above 900px, so it cannot be
     reached there, and the panel is open by default at that width — the class
     this toggles means nothing until the media query brings it into play.
     ------------------------------------------------------------------------ */

  var summary = document.querySelector("[data-summary]");
  var summaryToggle = document.querySelector("[data-summary-toggle]");
  var summaryToggleText = document.querySelector("[data-summary-toggle-text]");

  if (summary && summaryToggle) {
    summaryToggle.addEventListener("click", function () {
      var open = summary.classList.toggle("is-open");
      summaryToggle.setAttribute("aria-expanded", String(open));
      if (summaryToggleText) {
        summaryToggleText.textContent = open ? "Hide order summary" : "Show order summary";
      }
    });
  }

  /* ------------------------------------------------------------------------
     Coupon.

     No code is invented and none is seeded here. The client has not issued
     any, so every code entered is unrecognised, and the message says exactly
     that rather than pretending to check a list. When real codes exist, this
     is the one place that has to change.
     ------------------------------------------------------------------------ */

  var couponToggle = document.querySelector("[data-coupon-toggle]");
  var couponForm = document.querySelector("[data-coupon-form]");
  var couponMessage = document.querySelector("[data-coupon-message]");

  if (couponToggle) {
    var coupon = couponToggle.closest(".coupon");

    couponToggle.addEventListener("click", function () {
      var open = coupon.classList.toggle("is-open");
      couponToggle.setAttribute("aria-expanded", String(open));

      if (open) {
        var input = coupon.querySelector(".coupon__input");
        if (input) input.focus();
      }
    });
  }

  if (couponForm && couponMessage) {
    couponForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var input = couponForm.querySelector(".coupon__input");
      var code = input ? input.value.trim() : "";
      var message = code
        ? "That code was not recognised. Check it and try again."
        : "Enter a coupon code first.";

      couponMessage.textContent = message;
      couponMessage.hidden = false;
      announce(message);
    });
  }

  /* ------------------------------------------------------------------------
     Card formatting.

     The spacing is not decoration: a sixteen-digit run is unreadable, and a
     shopper checking a number against the card in their hand is reading it in
     the groups printed on the card. American Express prints 4-6-5, everyone
     else prints 4-4-4-4, so the grouping follows the number.
     ------------------------------------------------------------------------ */

  function digitsOnly(value) {
    return value.replace(/\D/g, "");
  }

  function groupCardNumber(digits) {
    /* 34 and 37 are American Express, which prints its number 4-6-5. */
    var amex = /^3[47]/.test(digits);
    var groups = amex ? [4, 6, 5] : [4, 4, 4, 4];
    var out = [];
    var at = 0;

    for (var i = 0; i < groups.length && at < digits.length; i += 1) {
      out.push(digits.slice(at, at + groups[i]));
      at += groups[i];
    }

    if (at < digits.length) out.push(digits.slice(at));
    return out.join(" ");
  }

  function formatExpiry(digits) {
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + " / " + digits.slice(2, 4);
  }

  /* Reformatting rewrites the whole value, which would otherwise throw the
     caret to the end mid-edit. Counting digits rather than characters is what
     survives the separators being added and removed underneath it. */
  function reformat(input, format, maxDigits) {
    var start = input.selectionStart;
    var digitsBefore = digitsOnly(input.value.slice(0, start)).length;
    var digits = digitsOnly(input.value).slice(0, maxDigits);
    var formatted = format(digits);

    input.value = formatted;

    var seen = 0;
    var caret = formatted.length;
    for (var i = 0; i < formatted.length; i += 1) {
      if (/\d/.test(formatted[i])) {
        seen += 1;
        if (seen === digitsBefore) {
          caret = i + 1;
          break;
        }
      }
    }
    if (digitsBefore === 0) caret = 0;

    try {
      input.setSelectionRange(caret, caret);
    } catch (error) {
      /* Some browsers refuse setSelectionRange on inputs that are not text;
         the formatting has already landed, so there is nothing to recover. */
    }
  }

  var cardNumber = document.querySelector("[data-card-number]");
  var cardExpiry = document.querySelector("[data-card-expiry]");
  var cardCvc = document.querySelector("[data-card-cvc]");

  if (cardNumber) {
    cardNumber.addEventListener("input", function () {
      reformat(cardNumber, groupCardNumber, 16);
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener("input", function () {
      reformat(cardExpiry, formatExpiry, 4);
    });
  }

  if (cardCvc) {
    cardCvc.addEventListener("input", function () {
      cardCvc.value = digitsOnly(cardCvc.value).slice(0, 4);
    });
  }

  /* ------------------------------------------------------------------------
     Validation.

     Every message names the problem and the way out of it, and every one of
     them is a fact about the shape of what was typed — no message here claims
     anything about a bank, a card or an address that this prototype could not
     know.
     ------------------------------------------------------------------------ */

  var form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  /* Luhn's check digit, the arithmetic every card number satisfies. It catches
     a mistyped digit before a shopper waits on a decline; it says nothing at
     all about whether the card exists. */
  function passesLuhn(digits) {
    var sum = 0;
    var double = false;

    for (var i = digits.length - 1; i >= 0; i -= 1) {
      var digit = Number(digits[i]);
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  }

  function expiryProblem(value) {
    var digits = digitsOnly(value);
    if (digits.length < 4) return "Enter the expiry date as MM / YY.";

    var month = Number(digits.slice(0, 2));
    var year = 2000 + Number(digits.slice(2, 4));
    if (month < 1 || month > 12) return "The month must be between 01 and 12.";

    var now = new Date();
    var lastDay = new Date(year, month, 0, 23, 59, 59);
    if (lastDay < now) return "That date has passed. Check the expiry on your card.";

    return "";
  }

  var checks = {
    email: function (value) {
      if (!value) return "Enter your email address so we can send your receipt.";
      /* Deliberately loose. A tighter pattern rejects real addresses, and the
         only thing this can honestly check is the shape. */
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "That does not look like an email address. Check for a typo.";
      }
      return "";
    },
    "first-name": function (value) {
      return value ? "" : "Enter your first name.";
    },
    "last-name": function (value) {
      return value ? "" : "Enter your last name.";
    },
    address: function (value) {
      return value ? "" : "Enter the street address we should deliver to.";
    },
    suburb: function (value) {
      return value ? "" : "Enter your suburb.";
    },
    state: function (value) {
      return value ? "" : "Choose your state or territory.";
    },
    postcode: function (value) {
      if (!value) return "Enter your postcode.";
      if (!/^\d{4}$/.test(value)) return "An Australian postcode is four digits.";
      return "";
    },
    "card-number": function (value) {
      var digits = digitsOnly(value);
      if (!digits) return "Enter the long number across the front of your card.";
      if (digits.length < 13 || !passesLuhn(digits)) {
        return "That card number is not complete. Check it against your card.";
      }
      return "";
    },
    "card-expiry": function (value) {
      if (!value) return "Enter the expiry date as MM / YY.";
      return expiryProblem(value);
    },
    "card-cvc": function (value) {
      if (!value) return "Enter the security code from your card.";
      if (!/^\d{3,4}$/.test(value)) {
        return "The security code is the three or four digits on the back of your card.";
      }
      return "";
    }
  };

  function errorNodeFor(field) {
    var id = field.getAttribute("aria-describedby");
    if (!id) return null;
    /* The CVC field is described by its hint as well as its error, so the
       attribute can hold more than one id. */
    var ids = id.split(/\s+/);
    for (var i = 0; i < ids.length; i += 1) {
      var node = document.getElementById(ids[i]);
      if (node && node.hasAttribute("data-error")) return node;
    }
    return null;
  }

  function setError(field, message) {
    var node = errorNodeFor(field);

    if (message) {
      field.setAttribute("aria-invalid", "true");
      if (node) {
        node.textContent = message;
        node.hidden = false;
      }
    } else {
      field.removeAttribute("aria-invalid");
      if (node) {
        node.textContent = "";
        node.hidden = true;
      }
    }
  }

  function validate(field) {
    var check = checks[field.name];
    if (!check) return true;

    var message = check(field.value.trim());
    setError(field, message);
    return !message;
  }

  var fields = Array.prototype.filter.call(
    form.querySelectorAll("input[name], select[name]"),
    function (field) {
      return Object.prototype.hasOwnProperty.call(checks, field.name);
    }
  );

  fields.forEach(function (field) {
    /* Checked on the way out of a field, then re-checked live but only to
       clear a message already on screen. Validating every keystroke from the
       first one tells a shopper their half-typed email is wrong. */
    field.addEventListener("blur", function () {
      validate(field);
    });

    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });

    if (field.tagName === "SELECT") {
      field.addEventListener("change", function () {
        validate(field);
      });
    }
  });

  var payNote = document.createElement("p");
  payNote.className = "checkout-form__note";
  payNote.hidden = true;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    var failed = 0;

    fields.forEach(function (field) {
      if (!validate(field)) {
        failed += 1;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      payNote.hidden = true;
      firstInvalid.focus();
      announce(
        failed === 1
          ? "There is one thing to fix before you can pay."
          : "There are " + failed + " things to fix before you can pay."
      );
      return;
    }

    /* The order is complete and this is where a real checkout would hand off.
       It says so plainly rather than pretending to succeed, because a client
       clicking through a prototype should never be left wondering whether a
       card was charged. */
    var message =
      "This is a design preview. No payment was taken and no card details left this page.";
    payNote.textContent = message;
    payNote.hidden = false;

    var foot = form.querySelector(".checkout-form__foot");
    if (foot && payNote.parentNode !== form) form.insertBefore(payNote, foot);

    announce(message);
  });
})();
