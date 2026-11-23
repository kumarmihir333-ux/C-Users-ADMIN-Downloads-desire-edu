import { loadCollegeDataset } from "./data.js";
import { setupFinder } from "./finder.js";
import { setupDirectory } from "./directory.js";
import { setupForms } from "./forms.js";
import { setupNavigation } from "./navigation.js";

async function startSite() {
  setupNavigation();
  setupForms();
  try {
    const dataset = await loadCollegeDataset();
    setupFinder(dataset.records);
    setupDirectory(dataset);
  } catch (error) {
    document.querySelector("#matchCount").textContent = "College data unavailable";
    document.querySelector("#matchList").textContent = "See docs/DATA_MODEL.md for the expected data structure.";
    document.querySelector("#collegeGrid").textContent = "The directory could not load. Check data/colleges.json and run the local web server described in README.md.";
    console.error("Site startup stopped because the college data failed validation.", error);
  }
}

startSite();
