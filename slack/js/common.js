let inp = document.querySelector(".msg-input");
inp.addEventListener("keydown", function (ev) {
    if (ev.key == "Enter" && !ev.shiftKey) {
        setTimeout(function () {
            inp.innerHTML = ""
        }, 4);
    };
});

let aside = document.querySelector(".aside-chat-wrapper");
let asideChatContainer = document.querySelector(".aside-chat-container");
let channelWork = document.querySelector(".channel-work");
addEvents(document.querySelectorAll(".channel-work .icon"), "click", function (e) {
    if (!this.dataset.cnt) {
        return;
    }
    if (this.classList.contains("active-showed")) {
        aside.style.display = "none";
        this.classList.remove("active-showed");				
    } else {
        aside.style.display = "block";
        channelWork.querySelectorAll(".active-showed").forEach(function (el) {
            el.classList.remove("active-showed");
        });
        this.classList.add("active-showed");
    }
    asideChatContainer.querySelectorAll(".active-showed").forEach(function (el) {
        el.style.display = "none";
        el.classList.remove("active-showed");
    });
    asideChatContainer.querySelectorAll("div[data-name=" + this.dataset.cnt + "]").forEach(function (el) {
        el.style.display = "block";
        el.classList.add("active-showed");
    });
});

function addEvents (el, ev, handler) {
    el.forEach(function(el) {
        el.addEventListener(ev, handler);	
    });
};

document.querySelector(".aside-chat-head").addEventListener("click", function () {
    aside.style.display = "none";
    asideChatContainer.querySelectorAll(".active-showed").forEach(function (el) {
        el.style.display = "none";
        el.classList.remove("active-showed");
    });
    channelWork.querySelectorAll(".active-showed").forEach(function (el) {
        el.classList.remove("active-showed");
    });
});