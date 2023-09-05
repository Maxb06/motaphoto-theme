<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motaphoto</title>
    <?php wp_head(); ?>
</head>
<body>
    <div class="container">
        <header>
            <div class="header-menu">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/Logo.png" alt="Logo du site">
                <nav>
                    <?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
                </nav>
            </div>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/nathalie-11.jpeg" alt="Image présentation site">
        </header>
        <main>

    
