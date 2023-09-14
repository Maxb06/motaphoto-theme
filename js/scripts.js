/* Modale de contact, Header et page photographie avec remplissage réf */
document.addEventListener("DOMContentLoaded", function() {
  const contactButtons = document.querySelectorAll(".contactButton"); // Sélection de tous les boutons de contact
  const modal = document.querySelector("#contactModal");
  const refField = modal.querySelector("#photo-reference"); 

  // Initialiser propriétés modale mise en forme
  if (modal) {
    modal.style.display = 'none';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
  }

  // Écouter événements du clic pour tous les boutons de contact
  contactButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      const photoRef = this.getAttribute("data-ref"); // Récupération de la référence de la photo
      
      if (refField) {
        refField.value = photoRef; // Remplissage automatique du champ
      }

      if (modal) {
        if (modal.style.display === 'none') {
          modal.style.display = 'flex';
        } else {
          modal.style.display = 'none';
        }
      }
    });
  });

  // Pour fermer la modale en cliquant en dehors
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});


