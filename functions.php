<?php 

function motaphoto_enqueue_styles() {
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri() );  
    wp_enqueue_style( 'custom-stylesheet', get_template_directory_uri() . '/css/styles.css' );
}
add_action( 'wp_enqueue_scripts', 'motaphoto_enqueue_styles' );


function enqueue_my_scripts() {
  wp_enqueue_script( 'my-script', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true );
  wp_enqueue_script( 'load-more', get_template_directory_uri() . '/js/load-more.js', array('jquery'), '1.0', true );

}
add_action( 'wp_enqueue_scripts', 'enqueue_my_scripts' );


// Nav menu
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' ),
      'footer-menu' => __( 'Footer Menu' ),
      'extra-menu' => __( 'Extra Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );

/* fonction pour traiter la requête Ajax */
/*
function load_more_posts() {
    $paged = $_POST['page'] + 1;

    $query = new WP_Query([
        'post_type' => 'post',
        'posts_per_page' => 8, // Nombre d'articles à charger (selon votre besoin)
        'paged' => $paged
    ]);

    if ($query->have_posts()):
        while ($query->have_posts()): $query->the_post();
            get_template_part('template-parts/photo-block'); // Votre propre template pour chaque post
        endwhile;
    endif;

    die();
}

add_action('wp_ajax_load_more', 'load_more_posts');
add_action('wp_ajax_nopriv_load_more', 'load_more_posts');
*/

/* Enqueue Javascript */
/*
function enqueue_load_more_script() {
  wp_enqueue_script('load-more', get_template_directory_uri() . '/js/load-more.js', ['jquery'], null, true);

  wp_localize_script('load-more', 'load_more_params', [
      'ajax_url' => admin_url('admin-ajax.php')
  ]);
}

add_action('wp_enqueue_scripts', 'enqueue_load_more_script');
*/