/* ==========================================================================
   PAGES — the enquiry and contact forms.

   PRESENTATION ONLY. Neither form is wired to anything: there is no backend
   behind this site, so nothing typed here is sent, stored or emailed. The
   script validates what was typed, says plainly that this is a design preview,
   and points at the real email address instead. It must never be made to look
   like it succeeded at something it did not do.

   Written the way script.js and checkout.js are: a plain script, no modules,
   no dependencies, every block guarded by an existence check so the file is
   safe on any page that includes it.

   The field markup, the error element and the invalid state are the shared
   vocabulary in styles.css; this file only decides what counts as a problem
   and how to say it.
   ========================================================================== */

(function () {
  "use strict";

  var forms = document.querySelectorAll("[data-page-form]");
  if (!forms.length) return;

  /* Every message names the problem and the way out of it. None of them claims
     anything this page could not know — there is no "we could not reach the
     server", because there is no server. */
  var checks = {
    name: function (value) {
      return value ? "" : "Enter your name, so we know who we are replying to.";
    },
    email: function (value) {
      if (!value) return "Enter your email address, so we have somewhere to reply.";
      /* Deliberately loose, the same shape check the checkout uses. A tighter
         pattern rejects real addresses, and the shape is the only thing that
         can honestly be checked here. */
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "That does not look like an email address. Check for a typo.";
      }
      return "";
    },
    "enquiry-type": function (value) {
      return value ? "" : "Choose what your enquiry is about.";
    },
    message: function (value) {
      if (!value) return "Tell us what you would like to talk about.";
      if (value.length < 10) return "Add a little more, so we can answer properly.";
      return "";
    }
  };

  function errorNodeFor(field) {
    var described = field.getAttribute("aria-describedby");
    if (!described) return null;

    var ids = described.split(/\s+/);
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
      return;
    }

    field.removeAttribute("aria-invalid");
    if (node) {
      node.textContent = "";
      node.hidden = true;
    }
  }

  function validate(field) {
    var check = checks[field.name];
    if (!check) return true;

    var message = check(field.value.trim());
    setError(field, message);
    return !message;
  }

  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector("[data-form-status]");
    var note = form.querySelector("[data-form-note]");

    /* One polite live region per form, cleared first: re-writing the same
       string does not re-announce in several screen readers, so clearing on
       the next frame is what makes a repeated result speak. */
    function announce(message) {
      if (!status) return;
      status.textContent = "";
      window.requestAnimationFrame(function () {
        status.textContent = message;
      });
    }

    var fields = Array.prototype.filter.call(
      form.querySelectorAll("input[name], select[name], textarea[name]"),
      function (field) {
        return Object.prototype.hasOwnProperty.call(checks, field.name);
      }
    );

    fields.forEach(function (field) {
      /* Checked on the way out of a field, then re-checked live but only to
         clear a message already on screen. Validating from the first keystroke
         tells someone their half-typed email is wrong. */
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

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = null;
      var failed = 0;

      fields.forEach(function (field) {
        if (validate(field)) return;
        failed += 1;
        if (!firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (note) note.hidden = true;
        firstInvalid.focus();
        announce(
          failed === 1
            ? "There is one thing to fix before this can be sent."
            : "There are " + failed + " things to fix before this can be sent."
        );
        return;
      }

      /* Nothing was sent, and the page says so in the same breath as it says
         the form is complete. Anyone clicking through this build should never
         be left wondering whether an enquiry reached the kitchen. */
      if (note) note.hidden = false;
      announce(
        "This form is a design preview and nothing was sent. Email " +
          "sales@malenycuisine.com.au to reach Maleny Cuisine today."
      );
    });
  });
})();
