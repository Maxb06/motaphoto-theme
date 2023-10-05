        </main>
        <footer id="footer-container">
            <div class="footer-menu">
                <?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>
                <p>TOUS DROITS RÉSERVÉS</p>
            </div>
        </footer>
    </div> <!-- #page -->
    <?php get_template_part('template-parts/contact-modal'); ?>
    <?php get_template_part('template-parts/lightbox-modal'); ?>
    
    <?php wp_footer(); ?>
</body>
</html>