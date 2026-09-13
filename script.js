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
  "https://script.google.com/macros/s/AKfycbxfJEfUiiPuOZDnUGbRWd0sKdpkXuHmGj5h5zdtqhrzJhZMiysxpOUQQ8_PhrYsxV4/exec",
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
// ==========================================
// FEEDBACK FORM
// ==========================================

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
feedbackForm.addEventListener("submit", async (event) => {
event.preventDefault();

if (!feedbackForm.checkValidity()) {  
  feedbackForm.reportValidity();  
  return;  
}  

const submitButton =  
  feedbackForm.querySelector('button[type="submit"]');  

const originalButtonText = submitButton.textContent;  

submitButton.disabled = true;  
submitButton.textContent = "Sending...";  

const formData = new FormData(feedbackForm);  

try {  
  
await fetch(
  "https://script.google.com/macros/s/AKfycbwFcgJ6kFL9FWpxPbkaG-jwYw_-KkuyzImi64ITbLFRM1Z5qRNP8Z1HLezlBWKLc-AC0g/exec",
  {
    method: "POST",
    mode: "no-cors",
    body: formData
  }
);


feedbackForm.reset();
  const successMessage = document.createElement("div");
successMessage.className = "feedback-success";

successMessage.innerHTML = `
  <div class="feedback-success-icon">✓</div>
  <h3>Thank you for your feedback!</h3>
  <p>
    We truly appreciate you taking the time to share your thoughts with us.
    Your feedback is valuable and helps us make our community events and activities even better.
  </p>
  <p>
    Warm wishes,<br>
    <strong>Ipswich Tamil Community</strong>
  </p>
`;
feedbackForm.insertAdjacentElement("afterend", successMessage);

successMessage.scrollIntoView({
  behavior: "smooth",
  block: "center"
});
} catch (error) {  
  console.error("Feedback submission error:", error);  
  alert("Unable to send feedback. Please try again.");  

} finally {  
  submitButton.disabled = false;  
  submitButton.textContent = originalButtonText;  
}

});
}
