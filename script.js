// ===============================
// DIWALI REGISTRATION FORM
// ===============================

const form =
  document.getElementById("registration-form") ||
  document.getElementById("registrationForm");

if (form) {
  const message =
    document.getElementById("form-message") ||
    document.getElementById("formMessage");

  const adults = form.elements.adults;
  const children = form.elements.children;
  const total = form.elements.total;

  function syncTotal() {
    if (!adults || !children || !total) return;

    const a = Number(adults.value || 0);
    const c = Number(children.value || 0);

    total.value = Math.max(1, a + c);
  }

  if (adults && children && total) {
    adults.addEventListener("input", syncTotal);
    children.addEventListener("input", syncTotal);
    syncTotal();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nameField =
      form.elements.fullName ||
      document.getElementById("full-name");

    const name = nameField ? nameField.value.trim() : "";

    if (message) {
      message.textContent =
        `Thank you${name ? ", " + name : ""}! ` +
        "Your registration details are ready to be submitted.";

      message.style.color = "#18794e";
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
