// ===============================
// DIWALI 2026 REGISTRATION FORM
// ===============================

const form = document.getElementById("registration-form");

if (form) {
  const adults = form.elements.adults;
  const children = form.elements.children;
  const total = form.elements.total;

  const submitButton = form.querySelector('button[type="submit"]');
  const message = form.querySelector(".form-note");

  function syncTotal() {
    const adultCount = Number(adults?.value || 0);
    const childCount = Number(children?.value || 0);

    if (total) {
      total.value = adultCount + childCount;
    }
  }

  if (adults && children) {
    adults.addEventListener("input", syncTotal);
    children.addEventListener("input", syncTotal);
    syncTotal();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    form.classList.add("form-attempted");

    if (!form.checkValidity()) {
  if (message) {
    message.textContent =
      "❌ Please complete all mandatory fields marked with * before submitting.";
    message.style.color = "#b42318";
  }

  form.reportValidity();

  const firstInvalidField = form.querySelector(":invalid");

  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    firstInvalidField.focus();
  }

  return;
}

    syncTotal();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (message) {
      message.textContent = "Submitting your registration...";
    }

    try {
      const formData = new FormData(form);
      const data = new URLSearchParams(formData);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwJC9UXWnsOVBggPfB5X8dEju5996jCMXNDQHCM5G-yUgSooSdzaJ-1N_eGXr9KRVzY/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: data
        }
      );

      if (message) {
  message.innerHTML =
    '✅ Thank you! Your Diwali 2026 registration has been submitted.<br><br>' +
    'Please join our WhatsApp group for event updates: ' +
    '<a href="https://chat.whatsapp.com/JsBXXoKezpjDxWF7bLFXHq" ' +
    'target="_blank" rel="noopener noreferrer"><strong>Join WhatsApp Group</strong></a>';
      }

      form.reset();

form.classList.remove("form-attempted");

if (adults) adults.value = 1;
if (children) children.value = 0;

syncTotal();

    } catch (error) {
      console.error("Registration error:", error);

      if (message) {
        message.textContent =
          "❌ Something went wrong. Please try again.";
      }

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Register for Diwali 2026";
      }
    }
  });
}


// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}
