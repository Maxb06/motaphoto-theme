<?php
/**
* The template for displaying photographie post
*
* @package WordPress
* @subpackage Motaphoto
* @since Motaphoto 1.0
*/

get_header();
 
/* Start the Loop */
while ( have_posts() ) :
	the_post();
	?>
	<div class="container">
		<div class="both-columns">
			<div class="left-column photo-info">
				<h2><?php the_title(); ?></h2> <!-- récupération des éléments CPT -->
				<p>Référence : <?php the_field('reference'); ?></p>
				<p>Catégorie : <?php the_terms( $post->ID, 'categorie-photo', '', ', ', '' ); ?></p>
				<p>Format : <?php the_terms( $post->ID, 'format-photo', '', ', ', '' ); ?></p>
				<p>Type : <?php the_field('type'); ?></p>
				<p>Date : <?php the_date('Y'); ?></p>
			</div>
			<div class="right-column photo-display">
				<?php                           // Vignette image de droite
				if ( has_post_thumbnail() ) {
				the_post_thumbnail('full');
				} 
				?>
			</div>
		</div>
		<div class="bottom-column photo-actions">
			<div class="bottom-column-left">	
				<div class="contact-link">
					<p>Cette photo vous intéresse ?</p> <!-- bouton contact -->
					<button class="contactButton" data-ref="<?php the_field('reference'); ?>">Contact</button>
				</div>
			</div>	
			<div class="bottom-column-right">
				
				<div class="navigation-links"> <!-- Flèches navigations -->
					
					<div class="previous">
						<?php 
							$previous_post = get_adjacent_post(true, '', true, 'categorie-photo');
							if($previous_post) {
								$previous_post_id = $previous_post->ID;
								$thumbnail_url = get_the_post_thumbnail_url($previous_post_id, 'thumbnail');
								?>
								<a href="<?php echo get_permalink($previous_post->ID); ?>" data-thumbnail="<?php echo $thumbnail_url; ?>">
									<img src="<?php echo get_template_directory_uri(); ?>/assets/images/line6.png" alt="Photo précédente">
								</a>
								<?php
							} else {
								// Quand pas de post précédent
								echo "Ø";
							}
						?>
					</div>

					<div class="next">
						<?php 
							$next_post = get_adjacent_post(true, '', false, 'categorie-photo');
							if($next_post) {
								$next_post_id = $next_post->ID;
								$thumbnail_url = get_the_post_thumbnail_url($next_post_id, 'thumbnail');
								?>
								<a href="<?php echo get_permalink($next_post->ID); ?>" data-thumbnail="<?php echo $thumbnail_url; ?>">
									<img src="<?php echo get_template_directory_uri(); ?>/assets/images/line7.png" alt="Photo suivante">
								</a>
								<?php
							} else {
								// Quand pas de post suivant
								echo "Ø";
							}
						?>
					</div>

				</div>
			</div>
		</div>
		<div class="container-bottom">
			<div class="title-related-photos">
				<h3>Vous aimerez aussi</h3>
			</div>
			
			<?php // ARRAY requête wp_query pour les 2 photos images apparentées selon leur catégorie
				$current_post_id = get_the_ID();
				$categories = wp_get_post_terms( $current_post_id, 'categorie-photo', array( 'fields' => 'ids' ) );
				$args = array(
					'post_type' => 'photographie',
					'post__not_in' => array( $current_post_id ),
					'tax_query' => array(
						array(
							'taxonomy' => 'categorie-photo',
							'field'    => 'id',
							'terms'    => $categories,
						),
					),
					'posts_per_page' => 2,  // Nombre de photos à afficher
				);
				$related_photos = new WP_Query( $args );
			?>

			<div class="related-photos"> <!-- Les 2 vignettes photos --> 
				<div class="container-photos">	
					<?php if ( $related_photos->have_posts() ) : ?>
						<?php while ( $related_photos->have_posts() ) : $related_photos->the_post(); ?>
						<div class="related-photo-item">
							
							<?php get_template_part('template-parts/photo-block'); ?>
						
						</div>
						<?php endwhile; ?>
						<?php wp_reset_postdata(); ?> <!-- Si pas d'images supplémentaires -->
						<?php else : ?> 
						<p>De nouvelles photos seront ajoutées prochainement 📷</p>
					<?php endif; ?>
				</div>
			</div>
			<div class="related-btn">
                <button id="load-more-button">Toutes les photos</button>
            </div>
		</div>					
	</div>

<?php
endwhile; // End of the loop.
 
get_footer();
 
