<div class="photo-item">
    <?php if ( has_post_thumbnail() ) : ?>
        <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('full'); ?>
        </a>
        <div class="photo-overlay">
            <div class="eye-icon">
                <a href="<?php the_permalink(); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icon_eye.png" alt="Voir la photo">
                </a>
            </div>
            <div class="expand-icon">
                <img class="open-lightbox" data-image-url="<?php echo get_the_post_thumbnail_url(); ?>" src="<?php echo get_template_directory_uri(); ?>/assets/images/icon_fullscreen.png" alt="Agrandir la photo">
            </div>
            <div class="photo-title">
                <?php the_title(); ?>
            </div>
            <div class="photo-category">
                <?php
                    $categories = get_the_terms( $post->ID, 'categorie-photo' );
                    if ( ! empty( $categories ) ) {
                        echo esc_html( $categories[0]->name );   
                    }
                ?>
            </div>
        </div>
    <?php endif; ?>
</div>


