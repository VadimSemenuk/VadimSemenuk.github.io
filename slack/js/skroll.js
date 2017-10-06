"use strict"
function skroller (scrollEl, pars) {
    let wrp,
        scrl,
        scrolledCnt = scrollEl.querySelector(".scrolled-container");
    
    let def = {
        full: false,
        setOverflow: true
    };
    if (!pars) {
        pars = {};
    }


    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { 
                'use strict';
                if (target == null) { 
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource != null) { 
                        for (var nextKey in nextSource) {
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
    }

    let params = Object.assign(def, pars);

    function createScrollMarcup () {
        wrp = document.createElement("div");
        scrl = document.createElement("div");
        wrp.classList.add("scroll-wrapper");
        scrl.classList.add("scroll-scroller");
        wrp.appendChild(scrl);
    };
    function appendScroll () {
        scrolledCnt.style.position = "relative";
        if (params.setOverflow) {
            scrolledCnt.style.overflow = "auto";
        }        
        scrolledCnt.appendChild(wrp);
    };
    function getScrollerHeight (diff, cntHeight) {
        return cntHeight * diff;
    };
    createScrollMarcup();
    appendScroll();
    scrollEl.classList.add("scrolls");
    scrollEl.classList.add("scroller");
    scrl.style.height = getScrollerHeight(scrollEl.offsetHeight / scrolledCnt.offsetHeight, scrollEl.offsetHeight) + "px";  
    if (scrolledCnt.offsetHeight - scrollEl.offsetHeight <= 0) {
        scrollEl.classList.add("hidden");    
    };
    if (params.full) {
        scrollEl.classList.add("full");
    };

    let moz = scrollEl.style["-moz-animation"] != undefined;

    let sCntH = scrolledCnt.offsetHeight,
        sElH = scrollEl.offsetHeight,
        scrlH = scrl.offsetHeight,
        diff = sCntH - sElH,
        scrlPeaceH = scrl.offsetHeight,
        trnst = 0,
        scrlKoef = 0;
    if (moz) {         
        scrollEl.classList.add("scrollerFF");                    
        scrollEl.addEventListener("MozMousePixelScroll", function (e) {
            this.scrollTop += e.detail;
            scrollHandler(this);             
        });  
    } else {    
        scrollEl.addEventListener("scroll", function (e) {
            scrollHandler(this);             
        });
    }
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
    // let scrlHandler = debounce(scrollHandler, 10);

    let mouseOn = false,
        prev = 0,
        moveDiff = 0,
        moveD = 0,
        dAcc = 0;
    scrl.addEventListener("mousedown", function (e) {            
        prev = e.pageY;
        mouseOn = true;
        scrollEl.classList.remove("scrolls");    
    });
    document.addEventListener("mouseup", function (e) {
        mouseOn = false;
        scrollEl.classList.add("scrolls");            
    });
    document.addEventListener("mousemove", function(e) {
        if (mouseOn) {
            dragHandler(e);
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
            if (moz) {        
                scrollHandler(scrollEl);   
            };     
            return
        };
        if (moveD <= 0 && moveDiff < 0) {
            moveD = 0; 
            dAcc = 0; 
            scrollEl.scrollTop = moveD;
            if (moz) {        
                scrollHandler(scrollEl);
            };        
            return
        };       
        scrollEl.scrollTop = moveD;
        if (moz) {        
            scrollHandler(scrollEl);
        };
        prev = e.pageY;
    }
    // let drgHandler = debounce(dragHandler, 20);

    let toBot = false;
    function setDimentions () {
        if (scrollEl.scrollTop == diff && diff != 0) {
            toBot = true;
        }
        scrl.style.height = getScrollerHeight(scrollEl.offsetHeight / scrolledCnt.offsetHeight, scrollEl.offsetHeight) + "px";          
        sCntH = scrolledCnt.offsetHeight;  
        sElH = scrollEl.offsetHeight;    
        diff = sCntH - sElH;
        scrlH = scrl.offsetHeight;    
        scrlPeaceH = scrl.offsetHeight;
        if (sCntH - sElH <= 0) {
            scrollEl.classList.add("hidden");    
        } else {
            scrollEl.classList.remove("hidden");                
        };   
        if (toBot) {
            scrollEl.scrollTop = diff;
        };
    };
    return {
        setDimentions: setDimentions
    };
}
function debounce (fn, delay) {
    let access = true,
        args = false;
    return function f () {
        if (access) {
            // fn(...arguments);
            fn.apply(this, arguments);
            access = false;
            setTimeout(function () {
                access = true;
                if (args) {
                    // f(...args);
                    f.apply(this, args);
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




