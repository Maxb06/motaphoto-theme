jQuery(document).ready(function($) {
    // Ouvrir la lightbox
    $('body').on('click', '.open-lightbox', function() {
        var imageUrl = $(this).data('image-url');
        var imageTitle = $(this).data('image-title');
        var imageReference = $(this).data('image-reference');

        $('#lightbox-image').attr('src', imageUrl);
        $('#lightbox-title').text(imageTitle);
        $('#lightbox-reference').text(imageReference);
        $('#lightbox-overlay').show();
    });

    // Fermer la lightbox
    $('#close-button').on('click', function() {
        $('#lightbox-overlay').hide();
    });

    // Gérer les boutons précédent/suivant
    $('#prev-button').on('click', function() {
        var currentImage = $('#lightbox-image').attr('src');
        var prevElement = $('.open-lightbox[data-image-url="' + currentImage + '"]').closest('.photo-item').prev('.photo-item').find('.open-lightbox');
        
        if (prevElement.length) {
            var prevImage = prevElement.data('image-url');
            var prevTitle = prevElement.data('image-title');
            var prevReference = prevElement.data('image-reference');
            
            $('#lightbox-image').attr('src', prevImage);
            $('#lightbox-title').text(prevTitle);
            $('#lightbox-reference').text(prevReference);
        }
    });
    
    $('#next-button').on('click', function() {
        var currentImage = $('#lightbox-image').attr('src');
        var nextElement = $('.open-lightbox[data-image-url="' + currentImage + '"]').closest('.photo-item').next('.photo-item').find('.open-lightbox');
        
        if (nextElement.length) {
            var nextImage = nextElement.data('image-url');
            var nextTitle = nextElement.data('image-title');
            var nextReference = nextElement.data('image-reference');
            
            $('#lightbox-image').attr('src', nextImage);
            $('#lightbox-title').text(nextTitle);
            $('#lightbox-reference').text(nextReference);
        }
    });
});

