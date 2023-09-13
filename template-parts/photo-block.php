<div class="photo-item">
    <a href="<?php the_permalink(); ?>">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail('full'); ?>
        <?php endif; ?>
    </a>
</div>
