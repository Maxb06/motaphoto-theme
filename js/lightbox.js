jQuery(document).ready(function($) {
    // Ouvrir la lightbox
    $('body').on('click', '.open-lightbox', function() {
        var imageUrl = $(this).data('image-url');
        $('#lightbox-image').attr('src', imageUrl);
        $('#lightbox-overlay').show();
    });

    // Fermer la lightbox
    $('#close-button').on('click', function() {
        $('#lightbox-overlay').hide();
    });

    // Gérer les boutons précédent/suivant
    $('#prev-button').on('click', function() {
        var currentImage = $('#lightbox-image').attr('src');
        var prevImage = $('.open-lightbox[data-image-url="' + currentImage + '"]').closest('.photo-item').prev('.photo-item').find('.open-lightbox').data('image-url');
    
        if (prevImage) {
            $('#lightbox-image').attr('src', prevImage);
        }
    });
    
    $('#next-button').on('click', function() {
        var currentImage = $('#lightbox-image').attr('src');
        var nextImage = $('.open-lightbox[data-image-url="' + currentImage + '"]').closest('.photo-item').next('.photo-item').find('.open-lightbox').data('image-url');
    
        if (nextImage) {
            $('#lightbox-image').attr('src', nextImage);
        }
    });
});

