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
            bindFilterEvents(); 
        }
    });

    function bindFilterEvents() {
        $(".custom-filter .filter-list div").on('click', function() {
            const $filter = $(this).closest(".custom-filter");
            const $selectedOption = $filter.find(".selected-option p");
            const selectedValue = $(this).data('value');
        
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
            
            // Chargement filtré des photos
            loadFilteredPhotos();
            
            // Réinitialise la mise en évidence des filtres et sélectionne le filtre actuel
           // $('.custom-filter').removeClass('active-filter');
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

