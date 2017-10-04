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
    scrollEl.classList.add("scroller");

    let sCntH = scrolledCnt.offsetHeight,
        sElH = scrollEl.offsetHeight,
        scrlH = scrl.offsetHeight,
        diff = sCntH - sElH,
        scrlPeaceH = scrl.offsetHeight,
        trnst = 0,
        scrlKoef = 0;
    scrollEl.addEventListener("scroll", function (e) {
        scrlHandler(this);             
    });
    function scrollHandler (self) {
        scrlKoef = self.scrollTop / diff;
        scrlPeaceH = scrlKoef * scrlH;
        if (mouseOn) {       
            trnst = dAcc + moveD;
        } else {
            dAcc = (self.scrollTop * (sElH - scrlH)) / diff;          
            trnst = scrlKoef * sCntH - scrlPeaceH;             
        }       
        scrl.style.transform = "translateY(" + trnst + "px)";     
    };
    let scrlHandler = debounce(scrollHandler, 10);

    let mouseOn = false,
        prev = 0,
        moveDiff = 0,
        p = 0,
        moveD = 0,
        dAcc = 0;
    scrl.addEventListener("mousedown", function (e) {            
        prev = e.pageY;
        mouseOn = true;
    });
    document.addEventListener("mouseup", function (e) {
        mouseOn = false;
    });
    document.addEventListener("mousemove", function(e) {
        if (mouseOn) {
            drgHandler(e);
        };
    });
    function dragHandler (e) {
        moveDiff = e.pageY - prev;  
        dAcc += moveDiff;
        moveD = (dAcc / (sElH - scrlH)) * diff;         
        if (moveD >= diff && moveDiff > 0) {
            moveD = diff; 
            dAcc = sElH - scrlH;
            scrollEl.scrollTop = moveD;                                  
            return
        };
        if (moveD <= 0 && moveDiff < 0) {
            moveD = 0; 
            dAcc = 0; 
            scrollEl.scrollTop = moveD;              
            return
        };       
        scrollEl.scrollTop = moveD;
        prev = e.pageY;
    }
    let drgHandler = debounce(dragHandler, 20);

    function setDimentions () {
        scrl.style.height = getScrollerHeight(scrollEl.offsetHeight / scrolledCnt.offsetHeight, scrollEl.offsetHeight) + "px";          
        sCntH = scrolledCnt.offsetHeight;  
        sElH = scrollEl.offsetHeight;    
        diff = sCntH - sElH;
        scrlH = scrl.offsetHeight;    
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
    skroller.setDimentions();
});
skroller(document.querySelector(".side-items"));
