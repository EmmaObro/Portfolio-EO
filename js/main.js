const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const backToTop = document.querySelector("[data-back-to-top]");

document.querySelector("[data-current-year]").textContent =
  new Date().getFullYear();

const cvTimeline = document.querySelector("[data-cv-timeline]");
if (cvTimeline) {
  cvTimeline.innerHTML = `
    <li>
      <span>En cours</span>
      <h3>Licence G&eacute;nie Logiciel</h3>
      <p>&Eacute;cole Sup&eacute;rieure de l&rsquo;Enseignement Technique et Commercial (ESETEC).</p>
    </li>
    <li>
      <span>Projet web</span>
      <h3>R&eacute;sidence La Paix</h3>
      <p>D&eacute;veloppement d&rsquo;un site vitrine avec pr&eacute;sentation des services, r&eacute;servation de chambres et de tables, et optimisation de l&rsquo;exp&eacute;rience utilisateur. Technologies : PHP, CodeIgniter, HTML, CSS, Bootstrap et JavaScript.</p>
    </li>
    <li>
      <span>Projet personnel</span>
      <h3>BRIDGE</h3>
      <p>Conception no-code d&rsquo;un site pour une agence &eacute;v&eacute;nementielle de football : web design, organisation du contenu et identit&eacute; num&eacute;rique avec Softr.</p>
    </li>
    <li>
      <span>Entrepreneuriat</span>
      <h3>Design et personnalisation d&rsquo;ordinateurs</h3>
      <p>Cr&eacute;ation visuelle, relation client et r&eacute;solution de probl&egrave;mes techniques dans le cadre d&rsquo;une activit&eacute; personnelle.</p>
    </li>`;
}

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
const plastikHubCard = [...document.querySelectorAll(".project-card")].find(
  (card) => card.querySelector("h3")?.textContent.trim() === "PlastikHub",
);

if (plastikHubCard) {
  const [designLink, demoLink] = plastikHubCard.querySelectorAll(
    ".project-links a",
  );
  const figmaLinks = [
    "https://www.figma.com/design/I2X9kHl30mlGCvdRow5LFO/plastikHub?node-id=106-2&t=e8j9tSNqVYqqXcK0-1",
    "https://www.figma.com/proto/I2X9kHl30mlGCvdRow5LFO/plastikHub?node-id=106-2&t=e8j9tSNqVYqqXcK0-1",
  ];

  [designLink, demoLink].forEach((link, index) => {
    link.href = figmaLinks[index];
    link.target = "_blank";
    link.rel = "noreferrer";
    link.removeAttribute("data-placeholder-link");
  });
}

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

document.querySelectorAll("[data-placeholder-link]").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.alert(
      "Le lien sera ajouté dès que tu me transmettras l’adresse GitHub ou la démo du projet.",
    );
  }),
);

document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector(".form-status");
    if (!form.checkValidity()) {
      status.textContent = "Merci de compléter correctement tous les champs.";
      form.reportValidity();
      return;
    }
    status.textContent =
      "Le formulaire est prêt. Il sera relié à un service d’envoi après ton choix.";
  });
