const STREAMS = {
  Engineering: ["engineering", "b.tech", "polytechnic"],
  Computing: ["computer", "computing", "applications", " it", " it,"],
  Medical: ["medical", "mbbs", "md/ms", "ayurveda", "bams"],
  "Nursing & Health": ["nursing", "health", "paramedical", "physiotherapy", "biomedical", "allied"],
  Pharmacy: ["pharmacy"],
  Management: ["management", "mba", "bba"],
  Commerce: ["commerce", "business"],
  Law: ["law"],
  "Design & Architecture": ["design", "architecture"],
  "Media & Journalism": ["media", "journalism", "communication"],
  "Agriculture & Forestry": ["agriculture", "forestry"],
  Hospitality: ["hospitality", "hotel"],
  Sciences: ["science", "sciences", "biotechnology", "microbiology"],
  "Arts & Humanities": ["arts", "humanities", "languages", "liberal arts"],
  Education: ["education", "teaching"]
};

let colleges = [];
const grid = document.querySelector("#collegeGrid");
const matchList = document.querySelector("#matchList");
const matchCount = document.querySelector("#matchCount");
const modal = document.querySelector("#counselModal");

function typeFor(college) {
  return college.id <= 18 ? "Private & deemed university" : "Govt & autonomous college";
}

function isPublic(college) {
  return college.id > 18;
}

function matchesStream(college, stream) {
  const text = `${college.name} ${college.category} ${college.streams}`.toLowerCase();
  return (STREAMS[stream] || []).some((needle) => text.includes(needle));
}

function renderMatches() {
  const stream = document.querySelector("#streamSelect").value;
  const type = document.querySelector("#typeSelect").value;
  const found = colleges.filter((college) => matchesStream(college, stream) && (type === "any" || (type === "university" ? college.id <= 18 : isPublic(college))));
  matchCount.textContent = `${found.length} ${found.length === 1 ? "match" : "matches"} for ${stream}`;
  matchList.replaceChildren();
  found.slice(0, 7).forEach((college, index) => {
    const item = document.createElement("a");
    item.className = "match-item";
    item.href = college.website;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    item.innerHTML = `<span class="match-index">${String(index + 1).padStart(2, "0")}</span><span><span class="match-item__name"></span><span class="match-item__meta"></span></span><span class="match-item__link" aria-hidden="true">↗</span>`;
    item.querySelector(".match-item__name").textContent = college.name;
    item.querySelector(".match-item__meta").textContent = `${college.location} · ${new URL(college.website).hostname.replace(/^www\./, "")}`;
    matchList.append(item);
  });
  if (!found.length) matchList.innerHTML = '<p class="empty-state">No direct matches found. Try “Any institution” or contact a counsellor to explore related courses.</p>';
}

function renderDirectory() {
  const activeFilter = document.querySelector(".tab.is-active")?.dataset.filter || "all";
  const query = document.querySelector("#collegeSearch").value.trim().toLowerCase();
  const shown = colleges.filter((college) => {
    const typeOk = activeFilter === "all" || (activeFilter === "university" ? college.id <= 18 : isPublic(college));
    const queryOk = !query || `${college.name} ${college.category} ${college.location} ${college.streams}`.toLowerCase().includes(query);
    return typeOk && queryOk;
  });
  grid.replaceChildren();
  if (!shown.length) {
    grid.innerHTML = '<p class="empty-state">No colleges match that search. Try a different college name or course.</p>';
    return;
  }
  shown.forEach((college) => {
    const card = document.createElement("article");
    card.className = "college-card";
    card.innerHTML = `<div class="college-card__top"><span class="college-card__number">${String(college.id).padStart(2, "0")}</span><span class="college-card__type"></span></div><h3></h3><p class="college-card__location"></p><p class="college-card__streams"></p><a class="college-card__link" target="_blank" rel="noopener noreferrer"><span>Visit official website</span><span aria-hidden="true">↗</span></a>`;
    card.querySelector(".college-card__type").textContent = typeFor(college);
    card.querySelector("h3").textContent = college.name;
    card.querySelector(".college-card__location").textContent = college.location;
    card.querySelector(".college-card__streams").textContent = college.streams;
    const link = card.querySelector(".college-card__link");
    link.href = college.website;
    grid.append(card);
  });
}

async function loadColleges() {
  try {
    const response = await fetch("colleges.json");
    if (!response.ok) throw new Error("Could not load the college list.");
    colleges = await response.json();
    renderMatches();
    renderDirectory();
  } catch (error) {
    matchCount.textContent = "College list unavailable";
    grid.innerHTML = '<p class="empty-state">Start a local web server to load the college database. See README.md for the one-command setup.</p>';
    console.error(error);
  }
}

document.querySelectorAll("[data-open-coun]").forEach((button) => button.addEventListener("click", () => modal.showModal()));
document.querySelectorAll("#streamSelect, #typeSelect").forEach((select) => select.addEventListener("change", renderMatches));
document.querySelector("#collegeSearch").addEventListener("input", renderDirectory);
document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
  renderDirectory();
}));

document.querySelector("#menuToggle").addEventListener("click", (event) => {
  const links = document.querySelector("#navLinks");
  const open = links.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#navLinks a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector("#navLinks").classList.remove("is-open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", "false");
}));
window.addEventListener("scroll", () => document.querySelector(".nav").classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });

function prepareEnquiry(form, noteId) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const note = document.querySelector(noteId);
    note.textContent = `Thanks, ${data.get("name")}. Your enquiry is ready, but this static demo has no delivery service configured. Connect an email or CRM endpoint before collecting real enquiries.`;
    note.classList.add("is-ready");
  });
}
prepareEnquiry(document.querySelector("#inquiryForm"), "#formNote");
prepareEnquiry(document.querySelector("#modalForm"), "#modalNote");
loadColleges();
