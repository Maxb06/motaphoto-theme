        </main>
        <footer>
            <div class="footer-menu">
                <?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>
                <p>TOUS DROITS RÉSERVÉS</p>
            </div>
        </footer>
        <div id="contactModal" class="modal">
            <div class="modal-content">
                <?php echo do_shortcode('[contact-form-7 id="b047b02" title="Modale Contact"]'); ?>
            </div>
        </div> 
    </div> <!-- #page -->
    <?php wp_footer(); ?>
</body>
</html>