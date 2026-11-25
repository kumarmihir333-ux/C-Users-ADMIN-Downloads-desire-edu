const API_PATH = "/api/tullu";

function addMessage(container, text, kind, sources = []) {
  const message = document.createElement("div");
  message.className = `tullu-message tullu-message--${kind}`;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);
  if (sources.length) {
    const sourceList = document.createElement("div");
    sourceList.className = "tullu-message__sources";
    for (const source of sources) {
      const link = document.createElement("a");
      let sourceUrl;
      try { sourceUrl = new URL(source.url || source.website); } catch { continue; }
      if (sourceUrl.protocol !== "https:") continue;
      link.href = sourceUrl.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = source.type === "directory" || !source.type
        ? `${source.name} · directory link (unverified)`
        : `${source.name} · web source`;
      sourceList.append(link);
    }
    message.append(sourceList);
  }
  container.append(message);
  container.scrollTop = container.scrollHeight;
}

function findLocalMatches(question, records) {
  const normalized = question.toLowerCase();
  const words = normalized.match(/[\p{L}\p{N}]+/gu) || [];
  const stop = new Set(["which", "where", "what", "when", "does", "have", "with", "from", "about", "college", "colleges", "institution", "institutions", "listed", "program", "programs", "show", "tell", "find", "this", "that", "there", "their", "they", "page", "your", "are", "the", "and", "for", "how", "can", "you"]);
  const terms = words.filter((word) => word.length > 2 && !stop.has(word));
  return records.map((record) => {
    const searchable = `${record.name} ${record.category} ${record.location} ${record.streams}`.toLowerCase();
    const score = terms.reduce((sum, term) => sum + (searchable.includes(term) ? 1 : 0), 0);
    return { record, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map((item) => item.record);
}

function localAnswer(question, records) {
  const normalized = question.toLowerCase();
  if (/fee|tuition|scholarship|deadline|admission date|eligib|rank|recognition|accredit|placement/.test(normalized)) {
    return { answer: "This page does not contain verified information about fees, scholarships, deadlines, eligibility, rankings, recognition, or placements. Please confirm those details with the institution. The listed website links are also unverified.", sources: [] };
  }
  if (/unverif|verify|reliable|accurate|trust|limitations|limit/.test(normalized)) {
    return { answer: "The 28 records are an unverified starter dataset. Names, locations, categories, program text, and listed websites have not been independently checked. Program matches are text matches only. Fees, scholarships, eligibility, admissions, and recognition are not supplied as verified facts.", sources: [] };
  }
  if (/how many|count|number of colleges/.test(normalized)) {
    return { answer: `The page currently loads ${records.length} starter college records. They have not been independently verified.`, sources: [] };
  }
  const matches = findLocalMatches(question, records);
  if (!matches.length) {
    return { answer: "I couldn’t find an answer to that in this page’s college list. Try a college name, location, or program keyword. Fees, admissions, and eligibility are not verified here.", sources: [] };
  }
  const answer = matches.map((record) => `${record.name} — ${record.streams}. Listed location: ${record.location}.`).join("\n");
  return { answer: `${answer}\n\nThese are text matches in an unverified starter dataset, not confirmed course availability or eligibility.`, sources: matches };
}

async function askLive(question) {
  const response = await fetch(API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  if (!response.ok) throw new Error(`Tullu endpoint returned ${response.status}.`);
  const result = await response.json();
  if (typeof result.answer !== "string" || !Array.isArray(result.sources)) throw new Error("Tullu returned an invalid answer.");
  return result;
}

export function setupTullu(records) {
  const form = document.querySelector("#tulluForm");
  const input = document.querySelector("#tulluInput");
  const messages = document.querySelector("#tulluMessages");
  const send = document.querySelector("#tulluSend");
  const status = document.querySelector("#tulluStatus");

  async function submit(question) {
    const trimmed = question.trim();
    if (!trimmed || send.disabled) return;
    addMessage(messages, trimmed, "user");
    input.value = "";
    send.disabled = true;
    send.textContent = "Thinking…";
    try {
      const result = await askLive(trimmed);
      status.textContent = result.webSearchUsed ? "Gemini · page + live web" : "Gemini · page guide";
      addMessage(messages, result.answer, "assistant", result.sources);
    } catch {
      status.textContent = "Local page guide · Gemini not connected";
      const result = localAnswer(trimmed, records);
      addMessage(messages, result.answer, "assistant", result.sources);
    } finally {
      send.disabled = false;
      send.innerHTML = 'Ask <span aria-hidden="true">↑</span>';
      input.focus();
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submit(input.value);
  });
  document.querySelectorAll("[data-tullu-prompt]").forEach((button) => button.addEventListener("click", () => submit(button.dataset.tulluPrompt)));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
}

