export function setupForms() {
  const modal = document.querySelector("#counselModal");
  document.querySelectorAll("[data-open-coun]").forEach((button) => button.addEventListener("click", () => modal.showModal()));
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });

  for (const [formId, noteId] of [["inquiryForm", "formNote"], ["modalForm", "modalNote"]]) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = new FormData(form).get("name");
      const note = document.getElementById(noteId);
      note.textContent = `Thanks, ${name}. This is a UI preview only; the form does not send or save your details. Configure a reviewed backend before accepting real enquiries.`;
      note.classList.add("is-ready");
    });
  }
}
