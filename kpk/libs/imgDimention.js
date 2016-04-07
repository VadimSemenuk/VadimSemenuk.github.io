$(document).ready(function(){		
            var k = ($(".ni").width())/($(".ni").height());
            var articleImgK = ($(".article-img").width())/($(".article-img").height());

;(function ($) {
    $.fn.bindImageLoad = function (callback) {
        function isImageLoaded(img) {
            // Во время события load IE и другие браузеры правильно
            // определяют состояние картинки через атрибут complete.
            // Исключение составляют Gecko-based браузеры.
            if (!img.complete) {
                return false;
            }
            // Тем не менее, у них есть два очень полезных свойства: naturalWidth и naturalHeight.
            // Они дают истинный размер изображения. Если какртинка еще не загрузилась,
            // то они должны быть равны нулю.
            if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            // Картинка загружена.
            return true;
        }

        return this.each(function () {
            var ele = $(this);
            if (ele.is("img") && $.isFunction(callback)) {
                ele.one("load", callback);
                if (isImageLoaded(this)) {
                    ele.trigger("load");
                }
            }
        });
    };
})(jQuery);
$(".article-img img").bindImageLoad(function () {
        var height = $(".article-img").height();
        var width = $(".article-img").width();
					var ki = ($(this).width())/($(this).height());
					if (ki <= articleImgK) {
					// if (($(this).height())/($(this).width()) <= k) {
						$(this).css("width", width + "px");
						$(this).css("height", "auto");
					} else {
						$(this).css("height", height + "px");
						$(this).css("width", "auto");
					}
				// }
});

$(".ni img").bindImageLoad(function () {
        var height = $(".ni").height();
        var width = $(".ni").width();
                    var ki = ($(this).width())/($(this).height());
                    if (ki <= k) {
                    // if (($(this).height())/($(this).width()) <= k) {
                        $(this).css("width", width + "px");
                        $(this).css("height", "auto");
                    } else {
                        $(this).css("height", height + "px");
                        $(this).css("width", "auto");
                    }
                // }
});

})  ;