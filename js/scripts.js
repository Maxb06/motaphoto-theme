/* Modale de contact, Header et page photographie avec remplissage réf */

jQuery(document).ready(function($) {
  // Sélection de tous les boutons de contact
  const contactButtons = $(".contactButton");
  const modal = $("#contactModal");
  const refField = modal.find("#photo-reference");

  // Initialiser propriétés modale mise en forme
  if (modal.length) {
    modal.css({
      "display": "none",
      "justify-content": "center",
      "align-items": "center"
    });
  }
  // Écouter événements du clic pour tous les boutons de contact
  contactButtons.on("click", function(event) {
    event.preventDefault();
    const photoRef = $(this).attr("data-ref"); // Récupération de la référence de la photo

    if (refField.length) {
      refField.val(photoRef); // Remplissage automatique du champ
    }

    if (modal.length) {
      if (modal.css("display") === "none") {
        modal.css("display", "flex");
      } else {
        modal.css("display", "none");
      }
    }
  });
  // Pour fermer la modale en cliquant en dehors
  $(window).on("click", function(event) {
    if (event.target === modal.get(0)) {
      modal.css("display", "none");
    }
  });
});

