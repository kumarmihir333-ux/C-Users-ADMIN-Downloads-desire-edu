const STREAM_TERMS = {
  Engineering: ["engineering", "b.tech", "polytechnic"],
  Computing: ["computer", "computing", "applications", "information technology"],
  Medical: ["medical", "mbbs", "md/ms", "ayurveda", "bams"],
  "Nursing & Health": ["nursing", "health", "paramedical", "physiotherapy", "biomedical", "allied"],
  Pharmacy: ["pharmacy"], Management: ["management", "mba", "bba"], Commerce: ["commerce", "business"], Law: ["law"],
  "Design & Architecture": ["design", "architecture"], "Media & Journalism": ["media", "journalism", "communication"],
  "Agriculture & Forestry": ["agriculture", "forestry"], Hospitality: ["hospitality", "hotel"],
  Sciences: ["science", "biotechnology", "microbiology"], "Arts & Humanities": ["arts", "humanities", "languages", "liberal arts"],
  Education: ["education", "teaching"]
};

function containsTerm(text, term) {
  if (term === "information technology") return /\binformation technology\b|\bit\b/i.test(text);
  return text.includes(term);
}

export function setupFinder(records) {
  const streamSelect = document.querySelector("#streamSelect");
  const typeSelect = document.querySelector("#typeSelect");
  const list = document.querySelector("#matchList");
  const count = document.querySelector("#matchCount");

  function render() {
    const stream = streamSelect.value;
    const type = typeSelect.value;
    const terms = STREAM_TERMS[stream] || [];
    const found = records.filter((record) => {
      const text = `${record.name} ${record.category} ${record.streams}`.toLowerCase();
      const matches = terms.some((term) => containsTerm(text, term));
      const groupMatches = type === "any" || (type === "private-deemed" ? record.provenance.directory_group === "private_deemed" : record.provenance.directory_group === "other");
      return matches && groupMatches;
    });

    count.textContent = `${found.length} ${found.length === 1 ? "listed match" : "listed matches"} for ${stream}`;
    list.replaceChildren();
    found.slice(0, 7).forEach((record, index) => {
      const link = document.createElement("a");
      link.className = "match-item";
      link.href = record.website;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = `<span class="match-index">${String(index + 1).padStart(2, "0")}</span><span><span class="match-item__name"></span><span class="match-item__meta"></span></span><span class="match-item__link" aria-hidden="true">↗</span>`;
      link.querySelector(".match-item__name").textContent = record.name;
      link.querySelector(".match-item__meta").textContent = `${record.location} · listed website, not independently checked`;
      list.append(link);
    });
    if (!found.length) list.innerHTML = '<p class="empty-state">No listed program text matched. This search does not assess eligibility. Check college sites or broaden your search.</p>';
  }

  streamSelect.addEventListener("change", render);
  typeSelect.addEventListener("change", render);
  render();
}
