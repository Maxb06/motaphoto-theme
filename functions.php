<?php 

function motaphoto_enqueue_styles() {
    // Charger le fichier CSS principal de WordPress (style.css)
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri() );
    
    // Charger le fichier CSS personnalisé (styles.css)
    wp_enqueue_style( 'custom-stylesheet', get_template_directory_uri() . '/css/styles.css' );
}

add_action( 'wp_enqueue_scripts', 'motaphoto_enqueue_styles' );

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
  
