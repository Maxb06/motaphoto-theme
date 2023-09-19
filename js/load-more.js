let page = 1; // initialisation de la variable page

jQuery(document).ready(function($) {
  $('#load-more-button').on('click', function() {
    page++; // incrémenter le numéro de page
    $.ajax({
      url: `https://motaphoto.local/wp-json/wp/v2/photographie?page=${page}&per_page=12`,
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
  });
});
