        </main>
        <footer>
            <div class="footer-menu">
                <?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>
                <p>TOUS DROITS RÉSERVÉS</p>
            </div>
            <?php get_template_part('template_parts/contact-modal'); ?>
        </footer>
    </div> <!-- #page -->
    <?php wp_footer(); ?>
</body>
</html>