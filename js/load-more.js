let page = 1; // initialisation de la variable page

jQuery(document).ready(function($) {
  
  function loadPhotos(page, category = null, format = null, sort = null) {
    let url = `https://motaphoto.local/wp-json/wp/v2/photographie?page=${page}&per_page=12`;
              
    if (category && category !== 'all') {
      url += `&categorie-photo=${category}`;
    }

    if (format && format !== "all") {
      url += `&format-photo=${format}`;
    }

    if (sort && sort !== "none") {
      if (sort === 'asc' || sort === 'desc') {
          url += `&orderby=date&order=${sort}`;
      } else {
          url += `&order=${sort}`;
      }
    }
    
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        data.forEach(function(post) {
          let imageUrl = post.content.rendered.match(/src="([^"]+)"/)[1];
          let html = `
          <div class="photo-item">
            <a href="${post.link}">
              <img src="${imageUrl}" alt="${post.title.rendered}">
            </a>
          </div>`;
          $('#photo-container').append(html);
        });
      },
      error: function(err) {
        console.log('Erreur :', err);
      }
    });
  }

  $('#load-more-button').on('click', function() {
    const selectedCategory = $('#filter-category').val();
    const selectedFormat = $('#filter-format').val();
    const selectedSort = $('#sort-date').val();
    
    page++; // incrémenter le numéro de page
    loadPhotos(page, selectedCategory, selectedFormat, selectedSort);
  });

  $('#filter-category, #filter-format, #sort-date').on('change', function() {
    $('#photo-container').empty();
    page = 1; // réinitialisation du numéro de page
    const selectedCategory = $('#filter-category').val();
    const selectedFormat = $('#filter-format').val();
    const selectedSort = $('#sort-date').val();
    
    loadPhotos(page, selectedCategory, selectedFormat, selectedSort);
  });
});

/* 
//load More
jQuery(document).ready(function($) {
    let page = 1; 

    $("#load-more-button").on("click", function() {
        page++;
        $.ajax({
            url: load_more_params.ajax_url,
            type: 'post',
            data: {
                action: 'load_more',
                page: page
            },
            success: function(response) {
                $(".photo-catalog").append(response);
            }
        });
    });
});
*/