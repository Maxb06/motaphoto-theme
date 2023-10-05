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

// Gestion ouverture/fermeture Menu Burger
jQuery(document).ready(function($) {

  // Affiche/Cache le menu selon la largeur de la fenêtre
  function toggleMenuBasedOnWidth() {
      if ($(window).width() <= 1024) {
          $("#site-navigation:not(.toggled)").hide();
          $(".menu-toggle").show();
      } else {
          $("#site-navigation").show();
          $(".menu-toggle, .close-menu").hide();
      }
  }

  // Initialisation
  toggleMenuBasedOnWidth();

  // Toggle du menu burger
  $(".menu-toggle").on('click', function() {
      $("#site-navigation").show().addClass("toggled");
      $(".menu-toggle").hide();
      $(".close-menu").show();
      $("body").addClass("menu-open");
  });

  // Fermeture du menu
  $(".close-menu").on('click', function() {
      $("#site-navigation").hide().removeClass("toggled");
      $(".menu-toggle").show();
      $(".close-menu").hide();
      $("body").removeClass("menu-open");
  });

  // Fermeture du menu quand un élément est cliqué
  $("#site-navigation ul li a").on('click', function() {
      if ($(window).width() <= 1025) {
          $("#site-navigation").hide().removeClass("toggled");
          $(".menu-toggle").show();
          $(".close-menu").hide();
          $("body").removeClass("menu-open");
      }
  });

  // Ecouteur sur le redimensionnement de la fenêtre
  $(window).resize(toggleMenuBasedOnWidth);

});
