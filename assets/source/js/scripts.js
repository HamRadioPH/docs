(function($){
    "use strict";


    if($('.articlesx').length > 0){
        $.ajax({
            url: '/medium.json',
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (response) {
                if(response.success = true){
                    var _article = $('.articles');
                    var limit = _article.data('show');
                    var excerpt = _article.data('excerpt');
                    var tags = _article.data('tags');
                    var pagination = _article.data('pagination');
                    var i = 1;
                    $.each(response.payload.references.Post, function(id, post) {                        
                        var article_div = $('#article-' + i);
                        if(article_div.length > 0){
                            _article.removeClass('preloading');
                            var featured_image = 'https://cdn-images-1.medium.com/fit/300/200/' + post.virtuals.previewImage.imageId;                            
                            
                            article_div.attr('href','/articles/' + post.slug + '?refid=home');
                            article_div.find('.card-img-top')
                                .empty()
                                .hide()
                                .append('<img src="'+featured_image+'" alt="' + post.title + '" title="' + post.title + '" />')                                
                                .fadeIn(900);

                            article_div.find('.card-title')
                                .empty()
                                .hide()
                                .html(post.title)
                                .fadeIn(1000);
                            if(excerpt == true){
                                article_div.find('.excerpt').remove();
                                article_div.find('.card-body')
                                    .hide()
                                    .append('<p>'+post.content.subtitle+'</p>')
                                    .fadeIn(1000);
                            }
                            if(tags == true){
                                var _tags = [];                                
                                $.each(post.virtuals.tags, function(id, tag) {                        
                                    _tags.unshift(tag.name);
                                });
                                var tag_string = _tags.join(' / ');
                               
                                article_div.find('.card-tags')
                                    .empty()
                                    .hide()
                                    .append('<p>'+tag_string+'</p>')
                                    .fadeIn(1000);
                            }
                            i++;
                            if(i == (limit + 1)){
                                if(pagination == false){
                                    _article.hide().append('<div class="col-md-12 text-center mb-5"><a href="/articles" class="btn btn-primary">Read More</a></div>').fadeIn(1000);
                                }                                
                                return false;
                            }
                        }

                    });
                }
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
    }

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
    
    function loadFBAPI() {

    }
    window.onscroll = function () {
        var rect = document.getElementById('comments').getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            var js = document.createElement('script');
            js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=822714894740746&version=v3.2&autoLogAppEvents=1';
            document.body.appendChild(js);
            window.onscroll = null;
        } 
    }
})(jQuery);