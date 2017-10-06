"use strict"
let inp = document.querySelector(".msg-input");
let inpH = inp.clientHeight;
inp.addEventListener("input", function (ev) {
    if (this.clientHeight > inpH || this.clientHeight < inpH) {
        inpH = this.clientHeight;
        setTimeout(cScr.setDimentions, 4);           
    };
});    
inp.addEventListener("keydown", function (ev) {
    if (ev.key == "Enter" && !ev.shiftKey) {
        setTimeout(function () {
            inp.innerHTML = "";
        }, 4);
    };
});

let aside = document.querySelector(".aside-chat-wrapper");
let asideChatContainer = document.querySelector(".aside-chat-container");
let channelWork = document.querySelector(".channel-work");
addEvents(document.querySelectorAll(".channel-work .icon"), "click", function (e) {
    setTimeout(cScr.setDimentions, 4);   
    if (!this.dataset.cnt) {
        return;
    }
    if (this.classList.contains("active-showed")) {
        aside.style.display = "none";
        this.classList.remove("active-showed");				
    } else {
        aside.style.display = "block";
        // channelWork.querySelectorAll(".active-showed").forEach(function (el) {
        //     el.classList.remove("active-showed");
        // });
        let cw = channelWork.querySelectorAll(".active-showed");
        for (let i = 0, l = cw.length; i < l; i++) {
            cw[i].classList.remove("active-showed");
        };
        this.classList.add("active-showed");
        setTimeout(csScr.setDimentions, 4);
    }
    // asideChatContainer.querySelectorAll(".active-showed").forEach(function (el) {
    //     el.style.display = "none";
    //     el.classList.remove("active-showed");
    // });
    let ac = asideChatContainer.querySelectorAll(".active-showed");
    for (let i = 0, l = ac.length; i < l; i++) {
        ac[i].style.display = "none";
        ac[i].classList.remove("active-showed");
    };
    // asideChatContainer.querySelectorAll("div[data-name=" + this.dataset.cnt + "]").forEach(function (el) {
    //     el.style.display = "block";
    //     el.classList.add("active-showed");
    // });
    let acc = asideChatContainer.querySelectorAll("div[data-name=" + this.dataset.cnt + "]");
    for (let i = 0, l = acc.length; i < l; i++) {
        acc[i].style.display = "block";
        acc[i].classList.add("active-showed");
    };
});

function addEvents (el, ev, handler) {
    // el.forEach(function(el) {
    //     el.addEventListener(ev, handler);	
    // });
    for (let i = 0, l = el.length; i < l; i++) {
        el[i].addEventListener(ev, handler);
    };
};

document.querySelector(".aside-chat-head .i-close").addEventListener("click", function () {
    setTimeout(cScr.setDimentions, 4);       
    aside.style.display = "none";
    // asideChatContainer.querySelectorAll(".active-showed").forEach(function (el) {
    //     el.style.display = "none";
    //     el.classList.remove("active-showed");
    // });
    let acc = asideChatContainer.querySelectorAll(".active-showed");
    for (let i = 0, l = acc.length; i < l; i++) {
        acc[i].style.display = "none";
        acc[i].classList.remove("active-showed");
    };
    // channelWork.querySelectorAll(".active-showed").forEach(function (el) {
    //     el.classList.remove("active-showed");
    // });
    let cw = channelWork.querySelectorAll(".active-showed");
    for (let i = 0, l = cw.length; i < l; i++) {
        cw[i].classList.remove("active-showed");
    };
});

addEvents(document.querySelectorAll(".ac-item summary"), "click", function (e) {
    setTimeout(csScr.setDimentions, 4); 
});

let scrolls = [];
let siScr = skroller(document.querySelector(".side-items"));
let cScr = skroller(document.querySelector(".chat-scroller"), {
    full: true,
    setOverflow: false
});
let csScr = skroller(document.querySelector(".aside-chat-items-scroller"), {
    full: true,
    setOverflow: false
});
scrolls.push(siScr);
scrolls.push(cScr);
scrolls.push(csScr);
window.addEventListener("resize", function () {
    ScrollsResizeHandler();
});
function ScrollsResizeHandler () {
    scrolls.forEach(function (fn) {
        fn.setDimentions()
    });  
}