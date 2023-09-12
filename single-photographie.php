<?php
/**
 * The template for displaying photographie post
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
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
			 <!-- Utiliser PHP pour afficher dynamiquement le titre, la référence, la catégorie, le format, et la date de prise de vue de la photo -->
		 </div>
		 <div class="right-column">
			 <!-- Utiliser PHP pour afficher la photo -->
		 </div>
		 <div class="bottom-column">
			 <!-- Utiliser PHP pour les interactions -->
		 </div>
	 </div>
	 <?php
 endwhile; // End of the loop.
 
 get_footer();
 
