# Herisson

Projet web statique autour du recensement des herissons.

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
