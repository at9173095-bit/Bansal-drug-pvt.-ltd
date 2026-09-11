const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 850);
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;
    products.forEach(product => {
      const show = selected === "all" || product.dataset.category === selected;
      product.classList.toggle("hidden", !show);
    });
  });
});

const toast = document.getElementById("toast");
let toastTimer;
document.querySelectorAll("[data-toast]").forEach(button => {
  button.addEventListener("click", () => {
    toast.textContent = button.dataset.toast;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Subtle parallax for the hero visual on desktop.
const visual = document.querySelector(".hero-visual");
window.addEventListener("scroll", () => {
  if (window.innerWidth > 900 && visual) {
    const y = Math.min(window.scrollY * 0.08, 35);
    visual.style.transform = `translateY(${y}px)`;
  }
}, { passive: true });
