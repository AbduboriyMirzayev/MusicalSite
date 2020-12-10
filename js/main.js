
// Navigation bar animate

$(".nav-animate").waypoint(function(direction){
    $(".header-top__line").toggleClass('d-none',direction === "down");
    $(".header-bg").toggleClass("comeup",direction === "down");
    $(".scroll-top").toggleClass('d-block',direction === 'down');
},{
    offset:"10%"
});

$("#nav li a").bind('click',function(e){
    let anchor = $(this);
    $("html,body").stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
    },1200);
});

// Scroll top btn function

$(".scroll-top").bind("click",function(e){
    let anchor = $(this);
    $("html,body").stop().animate({
        scrollTop: $(anchor.attr("href")).offset().top
    },1200);
});
// Music controll 
let num = 1;
let intervarl;

let disc = document.querySelector(".disc-img");
function activeDisc() {
    interval = setInterval(function(){
        num = num+1
        disc.style.transform = `rotate(${num}deg)`;
    },20);
}

function removeDisc(params) {
    clearInterval(interval);
    disc.style.transform = `rotate(${num}deg)`;
    
}

let anchor = false;
function playPouse(){
    let audio = document.querySelector(".audio");
    setInterval(function(){
        if (audio.duration == audio.currentTime) {
            document.querySelector(".audio").pause();
            anchor = false;
            document.querySelector('.texts-icon').classList.add("fa-play");
            document.querySelector('.texts-icon').classList.remove("fa-pause");
            removeDisc();
        }
    },1000);
    if(anchor){
        document.querySelector(".audio").pause();
        anchor = false;
        removeDisc();
        document.querySelector('.texts-icon').classList.add("fa-play");
        document.querySelector('.texts-icon').classList.remove("fa-pause");
    }else{
        anchor = true;
        document.querySelector(".audio").play();
        document.querySelector('.texts-icon').classList.remove("fa-play");
        document.querySelector('.texts-icon').classList.add("fa-pause");
        activeDisc();
    };
        console.log(anchor);
};

function autoPlay() {
    
}



function nextElActive(el) {
    let parentEl = el.parentElement.parentElement;
            parentEl.classList.remove("music-block--active");
            parentEl.nextElementSibling.classList.add("music-block--active");
            parentEl.lastElementChild.firstElementChild.classList.add("fa-play");
            parentEl.lastElementChild.firstElementChild.classList.remove("fa-pause");
            parentEl.nextElementSibling.firstElementChild.play();
            parentEl.nextElementSibling.lastElementChild.firstElementChild.classList.add("fa-pause");
            parentEl.nextElementSibling.lastElementChild.firstElementChild.classList.remove("fa-play");
            document.querySelector(".music-block").setAttribute("data-status","active");
}

let musicToggler = true;
function musicPlayer(el) {
    let parentEl = el.parentElement.parentElement;
    setInterval(function(){
        if (parentEl.firstElementChild.currentTime == parentEl.firstElementChild.duration) {
            nextElActive(el);
        }
    },500);
    if (musicToggler) {
        parentEl.firstElementChild.play()
        parentEl.classList.add("music-block--active");
        el.classList.remove("fa-play");
        el.classList.add("fa-pause");
        musicToggler = false;
        activeDisc();
    }else{
        parentEl.firstElementChild.pause();
        parentEl.classList.remove("music-block--active");
        el.classList.remove("fa-pause");
        el.classList.add("fa-play");  
        musicToggler = true;
        removeDisc();
    }
}