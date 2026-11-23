import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(currentDir, "../../data");
const dataFile = path.join(dataDir, "leads.json");

export async function saveLead(lead) {
  await mkdir(dataDir, { recursive: true });
  let leads = [];

  try {
    leads = JSON.parse(await readFile(dataFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const savedLead = { id: crypto.randomUUID(), ...lead };
  leads.push(savedLead);
  await writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
  return { id: savedLead.id, name: savedLead.name, interest: savedLead.interest };
}
