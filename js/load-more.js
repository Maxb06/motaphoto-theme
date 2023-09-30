/*jQuery(document).ready(function($) {
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
});*/


jQuery(document).ready(function($) {
    let page = 1;

    const filterNames = {
        "filter-category": "CATÉGORIES",
        "filter-format": "FORMATS",
        "sort-date": "TRIER PAR"
    };

    // Chargement dynamique des catégories
    $.ajax({
        url: load_more_params.ajax_url,
        data: { action: 'load_categories' },
        success: function(response) {
            const data = JSON.parse(response);
            const categoryList = $('#filter-category .filter-list');
            data.forEach(function(category) {
                categoryList.append(`<div data-value="${category.id}">${category.name}</div>`);
            });
            bindFilterEvents(); // Ajout fonction pour lier les événements après avoir ajouté des éléments au DOM
        }
    });

    // Chargement dynamique des formats
    $.ajax({
        url: load_more_params.ajax_url,
        data: { action: 'load_formats' },
        success: function(response) {
            const data = JSON.parse(response);
            const formatList = $('#filter-format .filter-list');
            data.forEach(function(format) {
                formatList.append(`<div data-value="${format.id}">${format.name}</div>`);
            });
            bindFilterEvents(); // Ajout fonction pour lier les événements après avoir ajouté des éléments au DOM
        }
    });

    function bindFilterEvents() {
        // Gérer les Clics sur les Options du Dropdown
        $(".custom-filter .filter-list div").on('click', function() {
            const $filter = $(this).closest(".custom-filter");
            const $selectedOption = $filter.find(".selected-option p");
            const selectedValue = $(this).data('value');
    
            if (selectedValue === "all" || selectedValue === "none") {
                $selectedOption.text(filterNames[$filter.attr('id')]);
                $filter.attr('data-selected-value', "");
            } else {
                $selectedOption.text($(this).text());
                $filter.attr('data-selected-value', selectedValue);
            }
            
            $filter.find(".filter-list").hide();
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            
            // Chargement filtré des photos
            loadFilteredPhotos();
        });
    }
    
    function loadFilteredPhotos(appendMode = false) {
        const selectedCategory = $('#filter-category').attr('data-selected-value');
        const selectedFormat = $('#filter-format').attr('data-selected-value');
        const orderByDate = $('#sort-date').attr('data-selected-value');

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

                if (selectedCategory && selectedCategory !== "all") {
                    $('#filter-category .selected-option').css('background-color', '#E00000');
                } else {
                    $('#filter-category .selected-option').css('background-color', '');
                }

                if (selectedFormat && selectedFormat !== "all") {
                    $('#filter-format .selected-option').css('background-color', '#E00000');
                } else {
                    $('#filter-format .selected-option').css('background-color', '');
                }

                if (orderByDate && orderByDate !== "none") {
                    $('#sort-date .selected-option').css('background-color', '#E00000');
                } else {
                    $('#sort-date .selected-option').css('background-color', '');
                }
            }
        });
    }

    $(document).on('click', function(event) {
        // Si l'élément cliqué n'est pas un élément du filtre (ou un de ses descendants)
        if (!$(event.target).closest('.custom-filter').length) {
            // Fermez tous les filtres ouverts
            $('.custom-filter .filter-list').hide();
            $('.selected-option').removeClass('expanded');
        }
    });
    
    // Pour l'événement click de vos filtres
    $('.custom-filter .selected-option').on('click', function(event) {
        event.stopPropagation(); // Empêche l'événement click de remonter jusqu'au document
    
        // Ouvrir/Fermer le Dropdown
        const $list = $(this).next(".filter-list");
        $list.toggle();
        $(this).toggleClass('expanded');
    });

    // Événement de clic pour le bouton de chargement de plus de photos
    $("#load-more-button").on("click", function() {
        page++;
        loadFilteredPhotos(true); // active le mode Append
    });
});

