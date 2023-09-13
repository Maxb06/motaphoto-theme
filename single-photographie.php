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
		<div class="left-column photo-info">
		 	<h2><?php the_title(); ?></h2>
			<p><strong>Référence :</strong> <?php the_field('reference'); ?></p>
			<p><strong>Catégorie :</strong> <?php the_terms( $post->ID, 'categorie-photo', '', ', ', '' ); ?></p>
			<p><strong>Format :</strong> <?php the_terms( $post->ID, 'format-photo', '', ', ', '' ); ?></p>
			<p><strong>Type :</strong> <?php the_field('type'); ?></p>
			<p><strong>Date :</strong> <?php the_date('Y'); ?></p>
		</div>
		<div class="right-column photo-display">
			<?php 
			if ( has_post_thumbnail() ) {
			the_post_thumbnail('full');
			} 
			?>
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
		<div class="related-photos">
		
		</div>
	</div>
<?php
 endwhile; // End of the loop.
 
 get_footer();
 
