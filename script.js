// ===============================
// DIWALI 2026 REGISTRATION FORM
// ===============================

const form = document.getElementById("registration-form");

if (form) {
  const adults = form.elements.adults;
  const children = form.elements.children;
  const underFive = form.elements.underFive;
  const total = form.elements.total;

  const submitButton = form.querySelector('button[type="submit"]');
  const message = form.querySelector(".form-note");

  function syncTotal() {
    const adultCount = Number(adults?.value || 0);
    const childCount = Number(children?.value || 0);
    const underFiveCount = Number(underFive?.value || 0);

    if (total) {
      total.value = adultCount + childCount + underFiveCount;
    }

    const ticketTotal =
      document.getElementById("ticket-total");

    const amount =
      (adultCount * 23) +
      (childCount * 10);
    
const amountToPayField =
  document.getElementById("amount-to-pay");

if (amountToPayField) {
  amountToPayField.value = amount;
}
    

    if (ticketTotal) {
      ticketTotal.value = `£${amount}`;
    }
  }

if (adults && children && underFive) {
  adults.addEventListener("input", syncTotal);
  children.addEventListener("input", syncTotal);
  underFive.addEventListener("input", syncTotal);
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

      const firstInvalidField =
        form.querySelector(":invalid");

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

    // Save payment information BEFORE resetting the form
    const adultCount = Number(adults?.value || 0);
    const childCount = Number(children?.value || 0);

    const amountToPay =
      (adultCount * 23) +
      (childCount * 10);

    const nameField = form.elements.fullName;

    const paymentReference = nameField
      ? nameField.value.trim()
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (message) {
      message.textContent =
        "Submitting your registration...";
      message.style.color = "";
    }

    try {
      
const formData = new FormData(form);
formData.set("amountToPay", amountToPay);

await fetch(
  "https://script.google.com/macros/s/AKfycbwJC9UXWnsOVBggPfB5X8dEju5996jCMXNDQHCM5G-yUgSooSdzaJ-1N_eGXr9KRVzY/exec",
  {
    method: "POST",
    mode: "no-cors",
    body: formData
  }
);
      if (message) {
        message.style.color = "";

        message.innerHTML =
          '<div class="success-message">' +
            '<strong>✅ Registration Successful!</strong><br>' +
            'Thank you! Your Diwali 2026 registration has been submitted.' +
          '</div>' +

          '<div class="payment-box">' +
            '<strong>💳 Payment Details</strong>' +
            '<div class="amount-to-pay">' +
              'Total to pay: £' + amountToPay +
            '</div>' +

            '<p><strong>Account name:</strong> Indumathy Arun Sagar</p>' +
            '<p><strong>Sort code:</strong> 04-00-03</p>' +
            '<p><strong>Account number:</strong> 88571712</p>' +

            '<p><strong>Payment reference:</strong> ' +
              (paymentReference || "Your full name") +
            '</p>' +

            '<p>Please make the payment to confirm your registration.</p>' +
          '</div>' +

          '<div class="whatsapp-box">' +
            '<strong>📱 Don’t miss important event updates!</strong>' +
            '<p>Please join our Diwali 2026 WhatsApp group.</p>' +

            '<a class="whatsapp-button" ' +
            'href="https://chat.whatsapp.com/JsBXXoKezpjDxWF7bLFXHq" ' +
            'target="_blank" ' +
            'rel="noopener noreferrer">' +
              'Join WhatsApp Group →' +
            '</a>' +
          '</div>';

      }

      form.reset();

      setTimeout(() => {
  if (message) {
    const messageTop =
      message.getBoundingClientRect().top +
      window.scrollY -
      20;

    window.scrollTo({
      top: messageTop,
      behavior: "smooth"
    });
  }
}, 200);

      form.classList.remove("form-attempted");

      if (adults) adults.value = 1;
      if (children) children.value = 0;
      if (underFive) underFive.value = 0;

      syncTotal();

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      if (message) {
        message.textContent =
          "❌ Something went wrong. Please try again.";

        message.style.color = "#b42318";
      }

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          "Register for Diwali 2026";
      }
    }
  });
}


// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle =
  document.querySelector(".menu-toggle");

const mainNav =
  document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.textContent =
      isOpen ? "✕" : "☰";
  });

  mainNav
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "☰";
      });
    });
}

/* Gallery year styling */
.gallery-year {
  margin-top: 28px;
  margin-bottom: 35px;
}

.gallery-year h2 {
  font-family: "DM Sans", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #7f203d;
  margin: 0 0 18px;
}

.gallery-album {
  text-decoration: none;
  color: inherit;
}

.gallery-album h3 {
  font-family: "DM Sans", sans-serif;
  font-size: 1.5rem;
  color: #7f203d;
  margin: 8px 0;
}

@media (max-width: 620px) {
  .gallery-year {
    margin-top: 18px;
    margin-bottom: 28px;
  }
}
