<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motaphoto</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Space+Mono:ital,wght@0,400;1,400;1,700&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body>
    <div id="page">
        <header>
            <div class="header-menu">
                <a href="http://motaphoto.local/"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/Logo.png" alt="Logo du site"></a>
                <nav>
                    <?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
                </nav>
            </div>
        </header>
        <main>

    
