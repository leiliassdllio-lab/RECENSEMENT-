import { initializeApp } from "firebase-admin/app";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const githubToken = defineSecret("GITHUB_ACTIONS_TOKEN");
const githubOwner = defineSecret("GITHUB_OWNER");
const githubRepo = defineSecret("GITHUB_REPO");
const githubBranch = defineSecret("GITHUB_BRANCH");

async function triggerGithubCsvWorkflow(eventId) {
  const owner = githubOwner.value();
  const repo = githubRepo.value();
  const branch = githubBranch.value() || "main";
  const token = githubToken.value();

  if (!owner || !repo || !token) {
    throw new Error("Secrets GitHub manquants: GITHUB_OWNER, GITHUB_REPO ou GITHUB_ACTIONS_TOKEN.");
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/sync-recensements-csv.yml/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "recensement-csv-sync"
      },
      body: JSON.stringify({
        ref: branch,
        inputs: {
          source_event_id: eventId || "unknown"
        }
      })
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Impossible de déclencher le workflow GitHub (${response.status}): ${details}`);
  }
}

export const syncRecensementsCsvOnCreate = onDocumentCreated(
  {
    document: "recensements/{docId}",
    region: "europe-west1",
    secrets: [githubToken, githubOwner, githubRepo, githubBranch]
  },
  async (event) => {
    await triggerGithubCsvWorkflow(event.id);
  }
);
