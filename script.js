document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  const closeMenu = () => {
    nav.classList.remove("open");
    body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  };

  menuButton.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 50), { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  document.querySelectorAll(".service-more").forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.closest(".service");
      const open = service.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      lightboxImage.src = card.dataset.full;
      lightboxImage.alt = card.querySelector("img").alt;
      lightboxCaption.textContent = card.dataset.caption;
      lightbox.showModal();
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });

  const cards = [...document.querySelectorAll(".testimonial-card")];
  const count = document.querySelector(".slider-count b");
  let current = 0;
  const showCard = (index) => {
    cards[current].classList.remove("active");
    current = (index + cards.length) % cards.length;
    cards[current].classList.add("active");
    count.textContent = String(current + 1).padStart(2, "0");
  };
  document.querySelector(".slider-prev").addEventListener("click", () => showCard(current - 1));
  document.querySelector(".slider-next").addEventListener("click", () => showCard(current + 1));

  document.querySelectorAll(".accordion article button").forEach((button) => {
    button.addEventListener("click", () => {
      const article = button.closest("article");
      const wasOpen = article.classList.contains("open");
      document.querySelectorAll(".accordion article").forEach((item) => {
        item.classList.remove("open");
        item.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        article.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
});
