const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const service = document.querySelector('#service').value;
    const date = document.querySelector('#date').value;
    const message = document.querySelector('#message').value.trim();

    const text = `Hello Real Touch Studio, my name is ${name}. I would like to book ${service}${date ? ` on ${date}` : ''}.${message ? ` Message: ${message}` : ''}`;
    const whatsappNumber = '27688733966'; // Replace with the real WhatsApp number, using country code and no + sign.
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  });
}

document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
