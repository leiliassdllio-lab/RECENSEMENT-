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
- le workflow GitHub Actions `.github/workflows/sync-recensements-csv.yml` regenere le CSV
- si le fichier change, GitHub commit automatiquement la nouvelle version

Configuration necessaire sur GitHub :
- ajouter un secret `FIREBASE_SERVICE_ACCOUNT_JSON`
- sa valeur doit etre le JSON complet d'un compte de service Firebase / Google Cloud ayant acces en lecture a Firestore

Limite importante :
- dans cette version, la synchronisation tourne toutes les 15 minutes et peut aussi etre lancee manuellement
- pour une mise a jour strictement immediate a chaque nouveau recensement, il faudrait ajouter une fonction serveur declenchee a l'ecriture dans Firestore
