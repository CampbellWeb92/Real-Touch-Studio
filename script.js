"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

function closeMenu() {
  if (!menuToggle || !nav) return;
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("nav-open");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const willOpen = !nav.classList.contains("open");
    nav.classList.toggle("open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("nav-open", willOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("open") && !nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeMenu(); menuToggle.focus(); }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1020) closeMenu(); });
}

const page = document.body.dataset.page;
document.querySelectorAll("[data-page]").forEach((link) => {
  const active = link.dataset.page === page;
  link.classList.toggle("active", active);
  if (active) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});

document.querySelectorAll(".current-year").forEach((element) => { element.textContent = new Date().getFullYear(); });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
  revealElements.forEach((element) => observer.observe(element));
}

const dateInput = document.querySelector("#date");
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = localDate;
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  const status = document.querySelector("#formStatus");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      if (status) status.textContent = "Please complete the required fields before continuing.";
      return;
    }

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();
    const details = [
      `Hello Real Touch Studio, my name is ${name}.`,
      `I would like to request a ${service} appointment${date ? ` for ${date}` : ""}.`,
      `My contact number is ${phone}.`,
      message ? `Additional message: ${message}` : ""
    ].filter(Boolean).join(" ");

    const url = `https://wa.me/27688733966?text=${encodeURIComponent(details)}`;
    if (status) status.textContent = "Opening your WhatsApp booking message…";
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) window.location.href = url;
  });
}
