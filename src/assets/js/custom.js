$(window).scroll(function(){
    var header = $("#search-bar");
     var sticky = header.offset().top,
   scroll = $(window).scrollTop();
 if (scroll >= 100) header.addClass('sticky');
 else header.removeClass('sticky');
});
