<div class="photo-item">
    <?php if ( has_post_thumbnail() ) : ?>
        <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('full'); ?>
        </a>
        <div class="photo-overlay">
            <a href="<?php the_permalink(); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icon_eye.png" alt="Voir la photo">
            </a>
            <img class="open-lightbox" data-image-url="<?php echo get_the_post_thumbnail_url(); ?>" src="<?php echo get_template_directory_uri(); ?>/assets/images/icon_fullscreen.png" alt="Agrandir la photo">
        </div>
    <?php endif; ?>
</div>

