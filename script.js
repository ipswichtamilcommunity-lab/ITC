const form = document.getElementById('registrationForm');
const message = document.getElementById('formMessage');

const adults = form.elements.adults;
const children = form.elements.children;
const total = form.elements.total;

function syncTotal(){
  const a = Number(adults.value || 0);
  const c = Number(children.value || 0);
  total.value = Math.max(1, a + c);
}
adults.addEventListener('input', syncTotal);
children.addEventListener('input', syncTotal);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = form.elements.fullName.value.trim();
  message.textContent = `Thank you${name ? ', ' + name : ''}! Your registration details are ready to be submitted.`;
  message.style.color = '#18794e';
});
