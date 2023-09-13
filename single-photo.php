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
				<h2><?php the_title(); ?></h2>
				<p>Référence : <?php the_field('reference'); ?></p>
				<p>Catégorie : <?php the_terms( $post->ID, 'categorie-photo', '', ', ', '' ); ?></p>
				<p>Format : <?php the_terms( $post->ID, 'format-photo', '', ', ', '' ); ?></p>
				<p>Type : <?php the_field('type'); ?></p>
				<p>Date : <?php the_date('Y'); ?></p>
			</div>
			<div class="right-column photo-display">
				<?php 
				if ( has_post_thumbnail() ) {
				the_post_thumbnail('large');
				} 
				?>
			</div>
		</div>
		<div class="bottom-column photo-actions">
		 	<div class="contact-link">
				<p>Cette photo vous intéresse ?</p>
        		<a href="#" class="contactButton" data-ref="<?php the_field('reference'); ?>">Contact</a>
    		</div>
			<div class="navigation-links">
				<div class="previous">
      				<?php previous_post_link('%link', '<img src="' . get_template_directory_uri() . '/assets/images/line6.png" alt="Photo précédente">', TRUE, ' ', 'categorie-photo'); ?>
    			</div>
    			<div class="next">
      				<?php next_post_link('%link', '<img src="' . get_template_directory_uri() . '/assets/images/line7.png" alt="Photo suivante"', TRUE, ' ', 'categorie-photo'); ?>
    			</div>
			</div>
		</div>

		<div class="title-related-photos">
			<h3>Vous aimerez aussi</h3>
		</div>

		<?php 
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
					<?php wp_reset_postdata(); ?>
					<?php else : ?>
					<p>Pas de photos apparentées.</p>
				<?php endif; ?>
			</div>
		</div>

	</div>

<?php
endwhile; // End of the loop.
 
get_footer();
 
