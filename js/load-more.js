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
  });

  // Événement de clic pour le bouton de chargement de plus de photos
  $("#load-more-button").on("click", function() {
      page++;
      loadFilteredPhotos(true); // active le mode Append
  });
});

