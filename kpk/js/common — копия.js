$(document).ready(function() {

(function slider () {

	var eqElement = ".article-item"
	$(window).load(function(){equalheight(eqElement);}).resize(function(){equalheight(eqElement);});

	$(window).load(function () {

		var counter = 3;
		var length = $(".header-bg-items>li").length;
		var t;
		var delay = 3000; //задержка таймера
		var visibleItems = 3;
		var height = 0;
		var containerHeight = 0;
		var currentHeight = 0;
		var heightCommon = 0;

		function getHeight (numberOfItems, reverse) {
			containerHeight = 0;
			if (reverse) {
				for (var i = length; i > numberOfItems - 3; i--) {
					height = $(".header-bg-items>li").eq(i-1).height() + 8;
					containerHeight = containerHeight + height;
				}
				return containerHeight
			}
			for (var i = 0; i < numberOfItems; i++) {
				height = $(".header-bg-items>li").eq(i).height() + 8;
				containerHeight = containerHeight + height;
			}
			return containerHeight
		}
		containerHeight = getHeight(visibleItems);

		$(".carousel").height(containerHeight + "px");
		$(".header-bg-button a").on("click", function (event) {
			clearTimeout(t);
			event.preventDefault();
				if ($(".header-bg-items").hasClass("moving")) {
					return
				}
				$(".header-bg-items").addClass("moving");
				if (counter == length && $(this).parent(".header-bg-button").hasClass("up")) {
					$(".header-bg-items").animate({
						top: "0px"
					}, 200, function () {
						$(".header-bg-items").removeClass("moving");
						counter = 3;
						return
					});
				} else if (counter == 3 && $(this).parent(".header-bg-button").hasClass("down")) { 
					heightCommon = getHeight($(".header-bg-items li").length);
					$(".header-bg-items").animate({
						top: -heightCommon + (getHeight($(".header-bg-items li").length, true)) + "px"
					}, 200, function () {
						$(".header-bg-items").removeClass("moving");
						counter = length;
						return
					});
				} else {
					move($(this));
				};
		});
		function move (_this, auto) {
			if (auto == true) {
				if (counter == length) {
					$(".header-bg-items").animate({
						top: "0px"
					}, 200, function () {
						counter = 3;
						return
					});
				} else {
					currentHeight = $(".header-bg-items>li").eq(counter - 3).height() + 8;
					$(".header-bg-items").animate({
						top: "-=" + currentHeight + "px"
					}, 200,  function () {
						counter++;
					});
				};
				t = setTimeout(move, delay + 200, null, true);
			} else {
			if (_this.parent(".header-bg-button").hasClass("up")) {
				currentHeight = $(".header-bg-items>li").eq(counter - 3).height() + 8;
				$(".header-bg-items").animate({
					top: "-=" + currentHeight + "px"
				}, 200,  function () {
					$(".header-bg-items").removeClass("moving");
					counter++;
			});
			} else {
				currentHeight = $(".header-bg-items>li").eq(counter - 4).height() + 8;
				$(".header-bg-items").animate({
					top: "+=" + currentHeight + "px"
				}, 200,  function () {
					$(".header-bg-items").removeClass("moving");
					counter--;
				});
			};
			};
		};
		function automove () {
			t = setTimeout(move, delay, null, true);
		}
		automove();
	});
})();

	$("input[name='rashet']").on("click", function () {

		$("iframe").show();

	});

	// (function sliderBg () {

	// 	var width = $(".header-bg-wrapper").width();
	// 	var length = $(".header-bg-item-wrapper").length;
	// 	var counter = 1;
	// 	var delay = 500;
	// 	var delayBg = 5000;

	// 	var t = setTimeout(function slide () {

	// 		counter++

	// 		if (counter > length) {
	// 			counter = 1;
	// 		}

	// 		$(".header-bg-item-wrapper").eq(counter - 1).css("z-index", "-2");
	// 		$(".header-bg-item-wrapper").eq(counter - 1).css("opacity", "1");


	// 		$(".header-bg-item-wrapper.active").animate({

	// 			opacity: 0

	// 		}, delay, function () {
	// 			$(".header-bg-item-wrapper.active").css("position", "absolute");
	// 			$(".header-bg-item-wrapper.active").css("z-index", "-5");
	// 			$(".header-bg-item-wrapper.active").eq(0).removeClass("active");
	// 			$(".header-bg-item-wrapper").eq(counter - 1).css("position", "relative");
	// 			$(".header-bg-item-wrapper").eq(counter - 1).addClass("active");
	// 			$(".header-bg-item-wrapper.active").css("z-index", "-1");
	// 		});

	// 		t = setTimeout(slide, delayBg + delay);

	// 	}, delayBg);

	// })();

	$('.main-nav>ul>li>a').each(function () {
  		if($(this).attr('href') == location.pathname) $(this).parent("li").addClass('active');
	});
	$('.main-nav>ul ul li a').each(function () {
  		if($(this).attr('href') == location.pathname) $(this).parent("li").parent("ul").parent("li").addClass('active');
	});


});