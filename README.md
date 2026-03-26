# Herisson

Projet web statique autour du recensement des herissons.

## Licence

Le code du depot est distribue sous licence MIT. Voir `LICENSE`.
Le rapport dans `rapport/` est distribue sous licence CC BY 4.0. Voir `rapport/LICENSE`.

## Structure

Le depot est maintenant organise en deux dossiers principaux :

- `site-internet/` : tout le site web statique
- `rapport/` : le rapport LaTeX et ses fichiers generes

Pages principales du site dans `site-internet/` :
- `site-internet/index.html` : page d'accueil
- `site-internet/login.html` : connexion / creation de compte
- `site-internet/recensement.html` : formulaire principal de recensement
- `site-internet/quiz.html` : quiz
- `site-internet/Cartographie.html` : carte des observations
- `site-internet/conseils.html` : conseils pratiques
- `site-internet/profil.html` : profil utilisateur
- `site-internet/fiche-scientifique.html` : fiche scientifique
- `site-internet/confirmation.html` : confirmation apres envoi

Anciennes pages dans `site-internet/legacy/` :
- `site-internet/legacy/recensement-legacy.html`
- `site-internet/legacy/quiz-legacy.html`
- `site-internet/legacy/equipe.html`

Ressources classees dans `site-internet/assets/` :
- `site-internet/assets/css/` : feuille de style partagee
- `site-internet/assets/images/badges/` : badges du profil
- `site-internet/assets/images/cards/` : images des cartes de l'accueil
- `site-internet/assets/images/observations/` : etats du herisson
- `site-internet/assets/images/environment/` : types d'environnement
- `site-internet/assets/images/science/` : images de la fiche scientifique
- `site-internet/assets/media/` : video et fond

Fichiers du rapport dans `rapport/` :
- `rapport/rapport.tex` : source principale du rapport
- `rapport/rapport.pdf` : PDF genere
- `rapport/refs.bib` et `rapport/sources_web.bib` : bibliographie

## Notes

- Les pages du dossier `site-internet/legacy/` sont secondaires ou conservent d'anciennes versions.
- La navigation principale du site part de `site-internet/index.html`.

## Export CSV des recensements

Le depot contient maintenant un export CSV versionne dans `data/recensements.csv`.

Fonctionnement :
- le script `scripts/export-recensements-to-csv.mjs` lit la collection Firestore `recensements`
- le workflow GitHub Actions `.github/workflows/sync-recensements-csv.yml` regenere le CSV complet
- si le fichier change, GitHub commit automatiquement la nouvelle version
- une Cloud Function Firebase dans `functions/index.js` declenche ce workflow a chaque nouveau recensement

Configuration necessaire sur GitHub :
- ajouter un secret `FIREBASE_SERVICE_ACCOUNT_JSON`
- sa valeur doit etre le JSON complet d'un compte de service Firebase / Google Cloud ayant acces en lecture a Firestore

Configuration necessaire pour la Cloud Function Firebase :
- deploiement de la fonction `syncRecensementsCsvOnCreate`
- secrets Firebase a definir :
- `GITHUB_ACTIONS_TOKEN` : token GitHub avec droit de declencher des workflows
- `GITHUB_OWNER` : proprietaire du depot GitHub
- `GITHUB_REPO` : nom du depot GitHub
- `GITHUB_BRANCH` : branche a mettre a jour, par exemple `main`

Commandes utiles :
- `npm install`
- `npm run sync:recensements-csv`
- `cd functions && npm install`
- `firebase functions:secrets:set GITHUB_ACTIONS_TOKEN`
- `firebase functions:secrets:set GITHUB_OWNER`
- `firebase functions:secrets:set GITHUB_REPO`
- `firebase functions:secrets:set GITHUB_BRANCH`
- `firebase deploy --only functions --project herisson-f80ba`

Resultat :
- le CSV inclut aussi les anciennes donnees, car chaque synchronisation relit toute la collection `recensements`
- a chaque nouveau recensement, la fonction declenche GitHub, qui regenere puis commit le CSV
