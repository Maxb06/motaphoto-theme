<?php get_header(); ?>

        <section>
            <div class="hero-header">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/nathalie-11.jpeg" alt="Grande photo en-tête">
            </div>
        </section>

        <section class="photo-catalog">
            
            <?php
                $args = array(
                    'post_type' => 'photographie',
                    'posts_per_page' => 8, 
                );
                $the_query = new WP_Query( $args );
            ?>

            <?php if ( $the_query->have_posts() ) : ?>

            <!-- Boucle requête perso -->
            <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
                
            <?php get_template_part('template-parts/photo-block'); ?>

            <!-- fin de la boucle -->
                <?php endwhile; ?> 
                <?php wp_reset_postdata(); ?>

            <?php else : ?> 
                <p><?php _e( 'Désolé, aucune photo n\'a été trouvée.' ); ?></p>
            <?php endif; ?>

        </section>

<?php get_footer(); ?>
