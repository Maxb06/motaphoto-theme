document.addEventListener("DOMContentLoaded", function() {
  const contactButton = document.querySelector(".contactButton");
  const modal = document.querySelector("#contactModal");

  // Initialiser les propriétés de la modale
  if (modal) {
    modal.style.display = 'none';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
  }

  if (contactButton) {
    contactButton.addEventListener("click", function() {
      if (modal) {
        if (modal.style.display === 'none') {
          modal.style.display = 'flex';
        } else {
          modal.style.display = 'none';
        }
      }
    });
  }

  // Pour fermer la modale en cliquant en dehors
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});


