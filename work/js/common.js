$(function() {
	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	if ($(".slider-container .slider > div").length == 3) {
		$(".slider-container .slider > div").eq(1).clone().appendTo(".slider");
	};
	if ($(".slider-container .slider > div").length == 2) {
		$(".slider-container .slider > div").clone().appendTo(".slider");
	};

	$('.slider').slick({
	  centerMode: true,
	  slidesToShow: 3,
	  lazyLoad: 'ondemand',
	  centerPadding: false,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	      	lazyLoad: 'ondemand',
	        arrows: true,
	        centerMode: true,
	        centerPadding: false,
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	      	lazyLoad: 'ondemand',
	        arrows: true,
	        centerMode: false,
	        centerPadding: false,
	        slidesToShow: 1
	      }
	    }
	  ]
	});

	$('.carousel').slick({
	  slidesToShow: 1,
	  lazyLoad: 'ondemand',
	  centerPadding: false,
	  arrows: false,
	  dots: true,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	      	lazyLoad: 'ondemand',
	        arrows: false,
	        centerMode: false,
	        centerPadding: false,
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	      	lazyLoad: 'ondemand',
	        arrows: false,
	        centerMode: true,
	        slidesToShow: 1
	      }
	    }
	  ]
	});

	$('.slider-container .slick-slide[data-slick-index="-2"] img').addClass("item-nv");
	$('.slider-container .slick-slide[data-slick-index="2"] img').addClass("item-nv");
	$(".slider-container .slick-arrow").on("click", function () {
		$(".slider-container .slick-slide img").removeClass("item-nv");
		$(".slider-container .slick-slide.slick-active:not(.slick-center)").next().children("img").addClass("item-nv");
		$(".slider-container .slick-slide.slick-active:not(.slick-center)").prev().children("img").addClass("item-nv");
	});

	$("#square-range, #rooms-range").on("input", function () {
		$(event.target).prev(".range-val").val($(event.target).val());
	});
	
    $('#scroll-a').click(function(){
        var speed = 300;
        var top = $('#scroll-point').offset().top;
        $('html, body').animate({scrollTop: top}, speed);
        return false;
    });
    $('.get-price button').click(function(){
        var speed = 300;
        var top = $('.calc-container').offset().top;
        $('html, body').animate({scrollTop: top}, speed);
        return false;
    });

function initMap() {
  var chicago = new google.maps.LatLng(52.099254, 23.768066);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 17
  });

  // var image = 'img/map-icon.png';
  // var beachMarker = new google.maps.Marker({
  //   position: {lat: 52.099254, lng: 23.768066},
  //   map: map,
  //   icon: image
  // });

  var coordInfoWindow = new google.maps.InfoWindow();
  coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
  coordInfoWindow.setPosition(chicago);
  coordInfoWindow.open(map);

  map.addListener('zoom_changed', function() {
    coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
    coordInfoWindow.open(map);
  });
}

var TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
  var scale = 1 << zoom;

  var worldCoordinate = project(latLng);

  var pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale));

  var tileCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale / TILE_SIZE),
      Math.floor(worldCoordinate.y * scale / TILE_SIZE));

  return [
    '<h1 class="map-titile">Гарант ремонт</h1>',
    '<p class="map-address">г. Брест ул. Сикорского 21 оф. 32</p>',
    '<h2 class="map-phone">Телефоны</h2>',
    '<p class="m-p-item">+375 29 225-56-54</p>',
	'<p class="m-p-item">+375 88 664-42-84</p>',
	'<h2 class="map-email">Электронная почта</h2>',
	'<p class="map-email-item">info@remont.com</p>',
	'<p class="map-email-item">spravka@remont.com</p>'
  ].join('');
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

initMap();

	$("#toggle").on("click", function () {
    	$(this).toggleClass("on");
    	$("nav").slideToggle();
    });

	$('.open-popup-link').magnificPopup({
		type:'inline'
	});

});
