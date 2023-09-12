<?php 

function motaphoto_enqueue_styles() {
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri() );  
    wp_enqueue_style( 'custom-stylesheet', get_template_directory_uri() . '/css/styles.css' );
}

add_action( 'wp_enqueue_scripts', 'motaphoto_enqueue_styles' );


function enqueue_my_scripts() {
  wp_enqueue_script( 'my-script', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_my_scripts' );


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


