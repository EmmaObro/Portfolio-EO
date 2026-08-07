const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const backToTop = document.querySelector("[data-back-to-top]");
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

document.querySelector("[data-current-year]").textContent =
  new Date().getFullYear();

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }),
);

const updateScrollState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
  backToTop?.classList.toggle("is-visible", window.scrollY > 500);
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  header?.style.setProperty("--scroll-progress", String(Math.min(progress, 1)));
};
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();
backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

const observer = new IntersectionObserver(
  (entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    observer.observe(element);
  });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!activeEntry) return;

    navLinks.forEach((link) =>
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeEntry.target.id}`),
    );
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
);

document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(".skill-card, .project-card, .career-card")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const tiltX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
        const tiltY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-0.35rem)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
}

document.querySelectorAll("[data-placeholder-link]").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.alert("Pas encore disponible.");
  }),
);

document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", (event) => {
    const form = event.currentTarget;
    const status = form.querySelector(".form-status");
    if (!form.checkValidity()) {
      event.preventDefault();
      status.textContent = "Merci de compléter correctement tous les champs.";
      form.reportValidity();
    }
  });
