function skroller (scrollEl) {
    let wrp,
        scrl,
        scrolledCnt = scrollEl.querySelector(".scrolled-container");
    function createScrollMarcup () {
        wrp = document.createElement("div");
        scrl = document.createElement("div");
        wrp.classList.add("scroll-wrapper");
        scrl.classList.add("scroll-scroller");
        wrp.appendChild(scrl);
    };
    function appendScroll () {
        scrolledCnt.style.position = "relative";
        scrolledCnt.style.overflow = "auto";        
        scrolledCnt.appendChild(wrp);
    };
    function getScrollerHeight (diff, cntHeight) {
        return cntHeight * diff;
    };
    createScrollMarcup();
    appendScroll();
    scrl.style.height = getScrollerHeight(scrollEl.offsetHeight / scrolledCnt.offsetHeight, scrollEl.offsetHeight) + "px";  

    let sCntH = scrolledCnt.offsetHeight,
        diff = sCntH - scrollEl.offsetHeight,
        scrlPeaceH = scrl.offsetHeight,
        trnst = 0,
        scrlKoef = 0;
    scrollEl.addEventListener("scroll", function (e) {
        scrollHandler(this);             
    });
    function scrollHandler (self) {
        scrlKoef = self.scrollTop / diff;
        scrlPeaceH = scrlKoef * scrl.offsetHeight;
        // if (mouseOn) {
            // trnst = scrlKoef * sCntH; 
            //сделать пустым и считать отдельно для скроллера
        // } else {
            trnst = scrlKoef * sCntH - scrlPeaceH;             
        // }       
        scrl.style.transform = "translateY(" + trnst + "px)";     
    };
    // let scrlHandler = debounce(scrollHandler, 10);

    let mouseOn = false,
        prev = 0,
        moveDiff = 0,
        p = 0;
    scrl.addEventListener("mousedown", function (e) {            
        prev = e.pageY;
        mouseOn = true;
    });
    document.addEventListener("mouseup", function (e) {
        mouseOn = false;
    });
    document.addEventListener("mousemove", function(e) {
        if (mouseOn) {
            dragHandler(e);
        };
    });
    function dragHandler (e) {
        moveDiff = e.pageY - prev;

        // p = ((moveDiff / diff) * scrl.offsetHeight) * 2;
        // console.log(p);
        // console.log(moveDiff);        

        scrollEl.scrollTop += moveDiff;
        prev = e.pageY;
        // считать отдельно для скроллера
    }
    // let drgHandler = debounce(dragHandler, 20);

    function setDimentions () {
        scrl.style.height = getScrollerHeight(scrollEl.offsetHeight / scrolledCnt.offsetHeight, scrollEl.offsetHeight) + "px";          
        sCntH = scrolledCnt.offsetHeight;
        diff = sCntH - scrollEl.offsetHeight;
        scrlPeaceH = scrl.offsetHeight;
    };
    skroller.setDimentions = setDimentions;
}
function debounce (fn, delay) {
    let access = true,
        args = false;
    return function f () {
        if (access) {
            fn(...arguments);
            access = false;
            setTimeout(function () {
                access = true;
                if (args) {
                    f(...args);
                    args = false;
                }
            }, delay);
            return
        } else {
            args = arguments;
            return;
        }
    };
};
window.addEventListener("resize", function () {
    console.log("resize");
    skroller.setDimentions();
});
skroller(document.querySelector(".side-items"));
