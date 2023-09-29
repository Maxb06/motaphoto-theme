jQuery(document).ready(function($) {
    let page = 1;

  // Chargement dynamique des catégories
    $.ajax({
        url: load_more_params.ajax_url,
        data: {
        action: 'load_categories'
    },
        success: function(response) {
            const data = JSON.parse(response);
            const selectCategory = $('#filter-category');
            data.forEach(function(category) {
            selectCategory.append(`<option value="${category.id}">${category.name}</option>`);
        });
    }
});

  // Chargement dynamique des formats
    $.ajax({
        url: load_more_params.ajax_url,
        data: {
        action: 'load_formats'
    },
    success: function(response) {
        const data = JSON.parse(response);
        const selectFormat = $('#filter-format');
        data.forEach(function(format) {
            selectFormat.append(`<option value="${format.id}">${format.name}</option>`);
        });
    }
  });

  function loadFilteredPhotos(appendMode = false) {
    const selectedCategory = $('#filter-category').val();
    const selectedFormat = $('#filter-format').val();
    const orderByDate = $('#sort-date').val();

    $.ajax({
        url: load_more_params.ajax_url,
        type: 'post',
        data: {
            action: 'filter_and_sort',
            page: page,
            category: selectedCategory,
            format: selectedFormat,
            order_by_date: orderByDate
        },
        success: function(response) {
            if (appendMode) {  
              $("#photo-container").append(response);
            } else {
              $("#photo-container").html(response);
            }
        }
    });
  }

  // Événement de changement pour les filtres et le tri
    $('#filter-category, #filter-format, #sort-date').on('change', function() {
    page = 1;
    loadFilteredPhotos();

      const selectedValue = $(this).val();
      if (selectedValue !== "all" && selectedValue !== "none") {
          $(this).css('background-color', '#E00000');
          $(this).addClass('selected-filter'); // Ajoute la bordure bleue
      } else {
          $(this).css('background-color', '');
          $(this).removeClass('selected-filter'); // Supprime la bordure bleue
      }
    
    });

  // Événement de clic pour le bouton de chargement de plus de photos
    $("#load-more-button").on("click", function() {
      page++;
      loadFilteredPhotos(true); // active le mode Append
    });
});

/*
jQuery(document).ready(function($) {

  // Ouvrir/fermer le menu déroulant
  $('.selected-option').on('click', function() {
      const isExpanded = $(this).attr('aria-expanded') === 'true';
      $('.selected-option').attr('aria-expanded', 'false'); // ferme tous les autres menus déroulants
      $('.filter-list').hide(); // cache toutes les listes de filtres

      $(this).attr('aria-expanded', !isExpanded); // inverse l'état actuel
      $(this).next('.filter-list').toggle(); // affiche/cache le menu déroulant

      // Rotation du chevron
      const chevron = $(this).find('img');
      if (!isExpanded) {
          chevron.css('transform', 'rotate(180deg)');
      } else {
          chevron.css('transform', 'rotate(0deg)');
      }
  });

  // Fermer le menu déroulant lorsqu'un clic est effectué en dehors
  $(document).on('click', function(event) {
      if (!$(event.target).closest('.custom-filter').length) {
          $('.selected-option').attr('aria-expanded', 'false');
          $('.filter-list').hide();
          $('.selected-option img').css('transform', 'rotate(0deg)');
      }
  });

  // Sélection d'une option dans le menu déroulant
  $('.filter-list div').on('click', function() {
      page = 1;

      const selectedValue = $(this).data('value');
      $(this).parent().prev('.selected-option').find('p').text($(this).text()).data('value', selectedValue);

      loadFilteredPhotos();

      if (selectedValue !== "all" && selectedValue !== "none") {
          $(this).closest('.custom-filter').addClass('selected-filter'); // Ajoute un style personnalisé
      } else {
          $(this).closest('.custom-filter').removeClass('selected-filter'); // Supprime le style personnalisé
      }
  });

  // Chargement dynamique des catégories
  $.ajax({
      url: load_more_params.ajax_url,
      data: {
          action: 'load_categories'
      },
      success: function(response) {
          const data = JSON.parse(response);
          const filterListCategory = $('#filter-category .filter-list');
          data.forEach(function(category) {
              filterListCategory.append(`<div data-value="${category.id}">${category.name}</div>`);
          });
      }
  });

  // Vous pouvez ajouter d'autres logiques et appels AJAX comme le chargement dynamique des formats ici...
});

function loadFilteredPhotos() {
  // Votre logique actuelle pour charger les photos filtrées...
}
*/