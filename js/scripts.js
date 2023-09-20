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

/* Affichage miniature img au survol flèches nav page photo */

jQuery(document).ready(function($) {
    $(".previous a, .next a").hover(
        function() {
            var thumbnailUrl = $(this).data("thumbnail");
            // Ajout la miniature img au DOM
            $(this).append('<img class="hover-thumbnail" src="' + thumbnailUrl + '" />');
        },
        function() {
            // Retirer miniature img du DOM
            $(this).find(".hover-thumbnail").remove();
        }
    );
});

/* Chargement dynamique des options de filtres */

jQuery(document).ready(function($) {
  // Chargement dynamique des catégories
  $.get('/wp-json/wp/v2/categorie-photo', function(data) {
      const selectCategory = $('#filter-category');
      data.forEach(function(category) {
          selectCategory.append(`<option value="${category.id}">${category.name}</option>`);
      });
  });

  // Chargement dynamique des formats
  $.get('/wp-json/wp/v2/format-photo', function(data) {
      const selectFormat = $('#filter-format');
      data.forEach(function(format) {
          selectFormat.append(`<option value="${format.id}">${format.name}</option>`);
      });
  });
});

