// Changer la photo localement
const photoInput = document.getElementById('photoUpload');
const userPhoto = document.getElementById('userPhoto');

photoInput.addEventListener('change', function() {
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      userPhoto.src = e.target.result;
      // Ici tu peux ajouter l'envoi vers le serveur si nécessaire
    }
    reader.readAsDataURL(file);
  }
});

// Données utilisateur simulées (ou à récupérer depuis ton API)
const userData = {
  quizCompleted: true,
  recensements: 7,
  votedBestPhoto: false
};

// Gestion des badges dynamiques
function updateBadges() {
  const badges = [
    {id: 'badge-quiz', condition: userData.quizCompleted},
    {id: 'badge-1', condition: userData.recensements >= 1},
    {id: 'badge-5', condition: userData.recensements >= 5},
    {id: 'badge-10', condition: userData.recensements >= 10},
    {id: 'badge-photo', condition: userData.votedBestPhoto}
  ];

  badges.forEach(badge => {
    const el = document.getElementById(badge.id);
    if(!badge.condition) {
      el.classList.add('locked'); // grisé et inactif via CSS
    }
  });
}

// Initialisation
updateBadges();
