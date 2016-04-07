$(function() {

	if ($(document).width() < 768) {
		$(".advantage-item").removeClass("advantage-item-eq");
		$(".advantage-item").removeAttr("style");

	}
	$(window).resize(function () {
		if ($(document).width() < 768) {
			$(".advantage-item").removeClass("advantage-item-eq");
			$(".advantage-item").removeAttr("style");
		} else {
			$(".advantage-item").addClass("advantage-item-eq");
			equalheight(".advantage-item-eq");
		}
	});

	// Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {
	};

	$(".pay-type button").on("click", function (event) {
		event.preventDefault();
		$(".pay-type button").removeClass("active");
		$(this).addClass("active");
	});

	$('.open-popup-link').magnificPopup({
		type:'inline'
	});

	  $(".carousel").owlCarousel({
	  	items: 1,
	  	startPosition: 1,
	  	nav: true,
	  	navText: [],
	  	loop: true,
	  	responsive:{
	  	481:{
            items: 2
        },
        768:{
            items: 4
        }
    	}
	 });

	$(".g-slider1").owlCarousel({
	  	items: 1,
	  	animateOut: "fadeOut",
	  	animateIn: "fadeIn",
	  	autoplay: true,
	  	autoplayTimeout: 9000,
	  	loop: true
	 });
	 $(".g-slider2").owlCarousel({
	  	items: 1,
	  	animateOut: "fadeOut",
	  	animateIn: "fadeIn",
	  	autoplay: true,
	  	autoplayTimeout: 6000,
	  	loop: true
	 });
	 $(".g-slider3").owlCarousel({
	  	items: 1,
	  	animateOut: "fadeOut",
	  	animateIn: "fadeIn",
	  	autoplay: true,
	  	autoplayTimeout: 8000,
	  	loop: true
	 });
	 $(".g-slider4").owlCarousel({
	  	items: 1,
	  	animateOut: "fadeOut",
	  	animateIn: "fadeIn",
	  	autoplay: true,
	  	autoplayTimeout: 5000,
	  	loop: true
	 });

	$('#scroll-a').click(function(){
        var speed = 300;
        var top = $('#scroll-point').offset().top;
        $('html, body').animate({scrollTop: top}, speed);
        return false;
    });

    $(".open-popup-link a").on("click", function (event) {
		event.preventDefault();
	});

});

	$(window).load(function(){equalheight(".advantage-item-eq");}).resize(function(){equalheight(".advantage-item");});
	$(window).load(function(){equalheight(".f-item-eq");}).resize(function(){equalheight(".f-item-eq");});
	$(window).load(function(){equalheight(".features h5");}).resize(function(){equalheight(".features h5");});
