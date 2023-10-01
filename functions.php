<?php 

function motaphoto_enqueue_styles() {
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri() );  
    wp_enqueue_style( 'custom-stylesheet', get_template_directory_uri() . '/css/styles.css' );
}
add_action( 'wp_enqueue_scripts', 'motaphoto_enqueue_styles' );


/* Chargement de mes fichiers JS */
function enqueue_my_scripts() {
  wp_enqueue_script( 'my-script', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true );
  wp_enqueue_script( 'load-more', get_template_directory_uri() . '/js/load-more.js', array('jquery'), '1.0', true );
  wp_enqueue_script('lightbox', get_template_directory_uri() . '/js/lightbox.js', array('jquery'), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'enqueue_my_scripts' );


/* Enqueue Ajax 'load-more.js' charger plus */
function enqueue_load_more_script() {
  wp_enqueue_script('load-more', get_template_directory_uri() . '/js/load-more.js', ['jquery'], null, true);

  wp_localize_script('load-more', 'load_more_params', [
      'ajax_url' => admin_url('admin-ajax.php')
  ]);
}
add_action('wp_enqueue_scripts', 'enqueue_load_more_script');


/* fonction pour traiter la requête Ajax */
function load_more () {
  
    $paged = $_POST['page'];
    
    $query = new WP_Query ([
        'post_type' => 'photographie',
        'posts_per_page' => 12,
        'paged' => $paged
    ]);

    if ($query->have_posts()):
        while ($query->have_posts()): $query->the_post();
            get_template_part('template-parts/photo-block'); // Le template partiel vignette photo
        endwhile;
    endif;

    die();
}

add_action('wp_ajax_load_more', 'load_more');
add_action('wp_ajax_nopriv_load_more', 'load_more');

/* chargement dynamique des catégories et formats */
function load_categories() {
  $categories = get_terms([
      'taxonomy' => 'categorie-photo',
      'hide_empty' => false,
  ]);

  $output = [];

  foreach ($categories as $category) {
      $output[] = [
          'id' => $category->term_id,
          'name' => $category->name,
      ];
  }

  echo json_encode($output);
  die();
}
add_action('wp_ajax_load_categories', 'load_categories');
add_action('wp_ajax_nopriv_load_categories', 'load_categories');


function load_formats() {
  $formats = get_terms([
      'taxonomy' => 'format-photo',
      'hide_empty' => false,
  ]);

  $output = [];

  foreach ($formats as $format) {
      $output[] = [
          'id' => $format->term_id,
          'name' => $format->name,
      ];
  }

  echo json_encode($output);
  die();
}
add_action('wp_ajax_load_formats', 'load_formats');
add_action('wp_ajax_nopriv_load_formats', 'load_formats');

/* chargement dynamique des dates */
function load_date_options() {
  $options = array(
      array('value' => 'none', 'label' => 'TRIER PAR'),
      array('value' => 'desc', 'label' => 'Plus récentes'),
      array('value' => 'asc', 'label' => 'Plus anciennes')
  );
  
  echo json_encode($options);
  wp_die();
}
add_action('wp_ajax_load_date_options', 'load_date_options');
add_action('wp_ajax_nopriv_load_date_options', 'load_date_options');

/* fonction filtres et date photographie */
function filter_and_sort_photos() {
  $paged = isset($_POST['page']) ? $_POST['page'] : 1;
  $category = isset($_POST['category']) ? $_POST['category'] : '';
  $format = isset($_POST['format']) ? $_POST['format'] : '';
  $order_by_date = isset($_POST['order_by_date']) ? $_POST['order_by_date'] : 'none'; 

  $args = [
      'post_type' => 'photographie',
      'posts_per_page' => 12,
      'paged' => $paged,
  ];

  if ($category && $category !== 'all') {
    $args['tax_query'][] = [
        'taxonomy' => 'categorie-photo',
        'field' => 'id',
        'terms' => $category
    ];
}

if ($format && $format !== 'all') {
    $args['tax_query'][] = [
        'taxonomy' => 'format-photo',
        'field' => 'id',
        'terms' => $format
    ];
}

  if ($order_by_date === 'desc' || $order_by_date === 'asc') {
    $args['orderby'] = 'date';
    $args['order'] = strtoupper($order_by_date);
}

  $query = new WP_Query($args);

  $output = '';

  if ($query->have_posts()):
      while ($query->have_posts()): $query->the_post();
          ob_start();
          get_template_part('template-parts/photo-block'); 
          $output .= ob_get_clean();
      endwhile;
  endif;

  echo $output;
  die();
}
add_action('wp_ajax_filter_and_sort', 'filter_and_sort_photos');
add_action('wp_ajax_nopriv_filter_and_sort', 'filter_and_sort_photos');


/* Nav menu */
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

