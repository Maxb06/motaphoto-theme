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
		 <div class="left-column">
		 <h2><?php the_title(); ?></h2>
			<p><strong>Référence :</strong> <?php the_field('reference'); ?></p>
			<p><strong>Catégorie :</strong> <?php the_terms( $post->ID, 'categorie-photo', '', ', ', '' ); ?></p>
			<p><strong>Format :</strong> <?php the_terms( $post->ID, 'format-photo', '', ', ', '' ); ?></p>
			<p><strong>Type :</strong> <?php the_field('type'); ?></p>
			<p><strong>Date :</strong> <?php the_date('Y'); ?></p>
		 </div>
		 <div class="right-column">
			<?php 
			if ( has_post_thumbnail() ) {
			the_post_thumbnail('full');
			} 
			?>
		 </div>
		 <div class="bottom-column">
		 	<div class="contact-link">
        		<a href="#" class="contactButton" data-ref="<?php the_field('reference'); ?>">Contact</a>
    		</div>
			<div class="navigation-links">
				<div class="previous">
      				<?php previous_post_link('%link', 'Photo précédente', TRUE, ' ', 'categorie'); ?>
    			</div>
    			<div class="next">
      				<?php next_post_link('%link', 'Photo suivante', TRUE, ' ', 'categorie'); ?>
    			</div>
			</div>
		 </div>
	 </div>
	 <?php
 endwhile; // End of the loop.
 
 get_footer();
 
