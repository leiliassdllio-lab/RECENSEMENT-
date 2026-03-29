import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repoRoot, "data", "recensements.csv");

const CSV_HEADERS = [
  "username",
  "lieu",
  "date",
  "notes",
  "etat",
  "sousEtat",
  "environnement",
  "latitude",
  "longitude",
  "createdAt"
];

function readServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!raw) {
    throw new Error("La variable d'environnement FIREBASE_SERVICE_ACCOUNT_JSON est requise.");
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON n'est pas un JSON valide.");
  }
}

function initializeFirebase() {
  if (admin.apps.length) {
    return admin.app();
  }

  const serviceAccount = readServiceAccount();

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";

  const normalized = String(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (/["\n,]/.test(normalized)) {
    return `"${normalized.replace(/"/g, "\"\"")}"`;
  }

  return normalized;
}

function toIsoDate(value) {
  if (!value) return "";

  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function normalizeDoc(data) {
  return {
    username: data.username ?? "",
    lieu: data.lieu ?? "",
    date: data.date ?? "",
    notes: data.notes ?? "",
    etat: data.etat ?? "",
    sousEtat: data.sousEtat ?? "",
    environnement: data.environnement ?? "",
    latitude: data.latitude ?? "",
    longitude: data.longitude ?? "",
    createdAt: toIsoDate(data.createdAt)
  };
}

async function fetchRecensements() {
  initializeFirebase();
  const db = admin.firestore();
  const snapshot = await db.collection("recensements").get();

  const records = snapshot.docs.map((doc) => normalizeDoc(doc.data()));

  records.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return a.createdAt.localeCompare(b.createdAt);
    }

    return (a.date ?? "").localeCompare(b.date ?? "");
  });

  return records;
}

function buildCsv(records) {
  const header = CSV_HEADERS.join(",");
  const rows = records.map((record) =>
    CSV_HEADERS.map((key) => csvEscape(record[key])).join(",")
  );

  return [header, ...rows].join("\n") + "\n";
}

async function main() {
  const records = await fetchRecensements();
  const csv = buildCsv(records);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, csv, "utf8");

  console.log(`CSV mis à jour: ${records.length} recensement(s) exporté(s) vers ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
