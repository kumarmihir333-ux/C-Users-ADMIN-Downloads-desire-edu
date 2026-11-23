export function setupNavigation() {
  const menuToggle = document.querySelector("#menuToggle");
  const links = document.querySelector("#navLinks");
  menuToggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    links.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
  window.addEventListener("scroll", () => document.querySelector(".nav").classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });
}
