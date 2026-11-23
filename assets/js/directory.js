import { isPrivateDeemed } from "./data.js";

export function setupDirectory(dataset) {
  const records = dataset.records;
  const grid = document.querySelector("#collegeGrid");
  const search = document.querySelector("#collegeSearch");
  const tabs = [...document.querySelectorAll(".tab")];
  const status = document.querySelector("#datasetStatus");
  const privateCount = records.filter(isPrivateDeemed).length;
  const otherCount = records.length - privateCount;

  document.querySelector("#countAll").textContent = records.length;
  document.querySelector("#countPrivate").textContent = privateCount;
  document.querySelector("#countOther").textContent = otherCount;
  status.textContent = `${records.length} starter records · not independently verified · file prepared ${dataset.updated_at}`;
  document.querySelector("#summaryCount").textContent = records.length;
  document.querySelector("#summaryPrivate").textContent = privateCount;
  document.querySelector("#summaryOther").textContent = otherCount;

  function render() {
    const filter = document.querySelector(".tab.is-active")?.dataset.filter || "all";
    const query = search.value.trim().toLowerCase();
    const shown = records.filter((record) => {
      const group = isPrivateDeemed(record) ? "private-deemed" : "other";
      const filterMatches = filter === "all" || filter === group;
      const queryMatches = !query || `${record.name} ${record.category} ${record.location} ${record.streams}`.toLowerCase().includes(query);
      return filterMatches && queryMatches;
    });

    grid.replaceChildren();
    if (!shown.length) {
      grid.innerHTML = '<p class="empty-state">No records matched that search. Try another college name or listed program.</p>';
      return;
    }
    for (const record of shown) {
      const card = document.createElement("article");
      card.className = "college-card";
      card.innerHTML = `<div class="college-card__top"><span class="college-card__number">${String(record.id).padStart(2, "0")}</span><span class="college-card__type"></span></div><h3></h3><p class="college-card__location"></p><p class="college-card__streams"></p><a class="college-card__link" target="_blank" rel="noopener noreferrer"><span>Listed website · unverified</span><span aria-hidden="true">↗</span></a>`;
      card.querySelector(".college-card__type").textContent = record.category;
      card.querySelector("h3").textContent = record.name;
      card.querySelector(".college-card__location").textContent = record.location;
      card.querySelector(".college-card__streams").textContent = record.streams;
      card.querySelector(".college-card__link").href = record.website;
      grid.append(card);
    }
  }

  tabs.forEach((button) => button.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
    render();
  }));
  search.addEventListener("input", render);
  render();
}
