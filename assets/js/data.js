const REQUIRED_FIELDS = ["id", "name", "category", "location", "streams", "website", "provenance"];
const VERIFICATION_STATES = new Set(["unverified", "verified", "conflict", "needs_review"]);

export async function loadCollegeDataset() {
  const response = await fetch("data/colleges.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Dataset request failed (${response.status}).`);
  const dataset = await response.json();
  if (dataset.schema_version !== "1.0" || !Array.isArray(dataset.records)) {
    throw new Error("Unsupported dataset schema. Read docs/DATA_MODEL.md before changing it.");
  }

  const ids = new Set();
  for (const [index, record] of dataset.records.entries()) {
    const missing = REQUIRED_FIELDS.filter((field) => record[field] === undefined || record[field] === null || record[field] === "");
    if (missing.length) throw new Error(`Record ${index + 1} is missing: ${missing.join(", " )}.`);
    if (!Number.isInteger(record.id) || ids.has(record.id)) throw new Error(`Record ${index + 1} has a missing or duplicate id.`);
    ids.add(record.id);
    const url = new URL(record.website);
    if (url.protocol !== "https:") throw new Error(`Record ${record.id} has a non-HTTPS website URL.`);
    if (!record.provenance.verification_status || !Array.isArray(record.provenance.evidence_urls)) {
      throw new Error(`Record ${record.id} has incomplete provenance metadata.`);
    }
    if (!VERIFICATION_STATES.has(record.provenance.verification_status)) {
      throw new Error(`Record ${record.id} has an unknown verification state.`);
    }
    if (record.provenance.verification_status === "verified" && (!record.provenance.verified_at || record.provenance.evidence_urls.length === 0)) {
      throw new Error(`Verified record ${record.id} must include a review date and evidence URL.`);
    }
    const expectedGroup = isPrivateDeemed(record) ? "private_deemed" : "other";
    if (record.provenance.directory_group !== expectedGroup) {
      throw new Error(`Record ${record.id} has a directory group that conflicts with its category.`);
    }
  }
  return dataset;
}

export function isPrivateDeemed(record) {
  return record.category.toLowerCase().includes("private / deemed university");
}
