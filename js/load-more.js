/* Chargement des photos & tri filtres page d'accueil */

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
            bindFilterEvents(); // Ajout fonction pour lier les events après avoir ajouté des éléments au DOM
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
            bindFilterEvents(); 
        }
    });

    // Chargement dynamique des dates
    $.ajax({
        url: load_more_params.ajax_url,
        data: { action: 'load_date_options' },
        success: function(response) {
            const data = JSON.parse(response);
            const dateList = $('#sort-date .filter-list');
            data.forEach(function(option) {
                dateList.append(`<div data-value="${option.value}">${option.label}</div>`);
            });
            bindFilterEvents(); 
        }
    });
    
    function bindFilterEvents() {
        $(".custom-filter .filter-list div").on('click', function() {
            const $filter = $(this).closest(".custom-filter");
            const $selectedOption = $filter.find(".selected-option p");
            const selectedValue = $(this).data('value');
            page = 1;

            if (selectedValue === "all" || selectedValue === "none") {
                $selectedOption.text(filterNames[$filter.attr('id')]);
                $filter.attr('data-selected-value', selectedValue);
            } else {
                $selectedOption.text($(this).text());
                $filter.attr('data-selected-value', selectedValue);
            }
            
            $filter.find(".filter-list").hide();
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            
            // Chargement filtré des photos - appenmode
            loadFilteredPhotos(false);
            
            // Réinitialise la mise en évidence des filtres et sélectionne le filtre actuel
            $('.custom-filter').removeClass('active-filter');// suppr pour avoir bordure bleue ts les filtres
            $filter.addClass('active-filter');
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
            }
        });
    }
    
    $(document).on('mousedown', function(event) {
        if (!$(event.target).closest('.custom-filter').length) {
            $('.custom-filter').removeClass('active-filter');
            $('.custom-filter .filter-list').hide();
            $('.selected-option').removeClass('expanded');
        }
    });
    
    // Pour l'événement des filtres
    $('.custom-filter .selected-option').on('click', function(event) {
        event.stopPropagation(); // Empêche l'événement clic de remonter

        // Ouvrir/Fermer le filtre
        const $list = $(this).next(".filter-list");
        $list.toggle();
        $(this).toggleClass('expanded');

    });

    // Événement de clic pour le bouton "Charger plus"
    $("#load-more-button").on("click", function() {
        page++;
        loadFilteredPhotos(true); // active mode Append
    });
});

/* Bouton "Charger plus" page single-photographie */
jQuery(document).ready(function($) {
    let offset = 3;  // Charge à partir de la 4ème photo
    const perPage = 12;
    const container = $(".container-photos");
    const loadMoreButton = $("#load-more-button");

    loadMoreButton.on("click", function() {
        const categoryId = $(this).data('category');
        loadMoreCategoryPhotos(categoryId, offset);
        offset += perPage;
    });

    function loadMoreCategoryPhotos(categoryId, offset) {
        $.ajax({
            url: load_more_params.ajax_url,
            type: 'post',
            data: {
                action: 'load_more_category_photos',
                category_id: categoryId,
                offset: offset
            },
            success: function(response) {
                container.append(response);
            },
            error: function() {
                // Gére ici les erreurs si besoin
            }
        });
    }
});
