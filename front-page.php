<?php get_header(); ?>

        <?php 
        // Récupèration de toutes les photos
        $args = array(
            'post_type' => 'photographie',
            'posts_per_page' => -1,  // -1 pour tous les posts
        );

        $all_photos = new WP_Query($args);

        // Sélectionne une photo aléatoire
        if ($all_photos->have_posts()):
            $random_key = array_rand($all_photos->posts, 1);
            $random_photo = $all_photos->posts[$random_key];
            $photo_url = get_the_post_thumbnail_url($random_photo->ID, 'full');
        endif;
        ?>

        <section>
            <div class="hero-header" style="background-image: url('<?php echo $photo_url ?>');">
                
                <div class="photo-event">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/photographe_event.png" alt="Photographe Event">
                </div>
            </div>
        </section>

        <section class="photo-catalog">
            
            <?php  // Tableau requête wp_query nombre de posts par page 
                $args = array(
                    'post_type' => 'photographie',
                    'posts_per_page' => 8, 
                );
                $the_query = new WP_Query( $args ); 
            ?>

            <?php if ( $the_query->have_posts() ) : ?>

            <!-- Boucle requête perso -->
            <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
                
            <?php get_template_part('template-parts/photo-block'); ?><!--Inclusion template partiel bloc photo-->

            <!-- fin de la boucle -->
                <?php endwhile; ?> 
                <?php wp_reset_postdata(); ?>

            <?php else : ?> 
                <p><?php _e( 'Désolé, aucune photo n\'a été trouvée.' ); ?></p>
            <?php endif; ?>

            <button id="load-more-button">Charger plus</button>
        </section>

<?php get_footer(); ?>
