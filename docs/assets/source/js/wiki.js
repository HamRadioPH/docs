(function($){
    "use strict";
    // Collapse Navbar
    var navbarCollapse = function() {
        if ($('nav').offset().top > 100) {
            $('body').addClass("scrolled");
        } else {
            $('body').removeClass("scrolled");
        }
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);   

})(jQuery);