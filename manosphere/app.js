

 
const link = document.getElementById('niglet');
const div = document.querySelector('.random-div');

link.addEventListener('click', () => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // If the random number is greater than 0.5, show the div, otherwise hide it
  if (randomNumber > 0.5) {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
});
  



   
    document.getElementById('share-button').addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Web Share API Demo',
                    text: 'Check out this awesome demo!',
                    url: 'https://example.com'
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    });
  

 
  document.addEventListener('DOMContentLoaded', function() {
      for (let i = 1; i <= 10; i++) {
          document.getElementById('link' + i).addEventListener('click', function(e) {
              e.preventDefault();
              let div = document.getElementById('div' + i);
              if (div.style.display === 'none' || div.style.display === '') {
                  div.style.display = 'block';
              } else {
                  div.style.display = 'none';
              }
          });
      }
  });
  
  
   
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js')
              .then(registration => {
                  console.log('Service Worker registered with scope:', registration.scope);
              })
              .catch(error => {
                  console.log('Service Worker registration failed:', error);
              });
      }

      const links = document.querySelectorAll('.link');
      const modal = document.getElementById('modal');
      const modalContent = document.getElementById('modal-content');
      const modalClose = document.querySelector('.modal-close');



      modalClose.addEventListener('click', (e) => {
          e.preventDefault();
          modal.style.display = 'none';
      });

      window.addEventListener('click', (e) => {
          if (e.target === modal) {
              modal.style.display = 'none';
          }
      });
    


 
document.getElementById('about').addEventListener('click', function(event) {
    event.preventDefault();
    var aboutDiv = document.getElementById('aboutDiv');
    if (aboutDiv.style.display === 'none' || aboutDiv.style.display === '') {
        aboutDiv.style.display = 'block';
    } else {
        aboutDiv.style.display = 'none';
    }
});
  

 
document.getElementById('showVideoLink').addEventListener('click', function(event) {
    event.preventDefault();
    var videoDiv = document.getElementById('videoDiv');
    if (videoDiv.style.display === 'none' || videoDiv.style.display === '') {
        videoDiv.style.display = 'block';
    } else {
        videoDiv.style.display = 'none';
    }
});
  



 
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

/*
   NOTE:
     + imgWidth, imgHeight will work for video
     + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
     + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
     + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
for (var i = 0; i < aEle.length; i++) {
  aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
  aEle[i].style.transition = "transform 1s";
  aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
}
}

function applyTranform(obj) {
// Constrain the angle of camera (between 0 and 180)
if(tY > 180) tY = 180;
if(tY < 0) tY = 0;

// Apply the angle
obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

// auto spin
if (autoRotate) {
var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
document.onpointerdown = function (e) {
clearInterval(odrag.timer);
e = e || window.event;
var sX = e.clientX,
    sY = e.clientY;

this.onpointermove = function (e) {
  e = e || window.event;
  var nX = e.clientX,
      nY = e.clientY;
  desX = nX - sX;
  desY = nY - sY;
  tX += desX * 0.1;
  tY += desY * 0.1;
  applyTranform(odrag);
  sX = nX;
  sY = nY;
};

this.onpointerup = function (e) {
  odrag.timer = setInterval(function () {
    desX *= 0.95;
    desY *= 0.95;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    playSpin(false);
    if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
      clearInterval(odrag.timer);
      playSpin(true);
    }
  }, 17);
  this.onpointermove = this.onpointerup = null;
};

return false;
};

document.onmousewheel = function(e) {
e = e || window.event;
var d = e.wheelDelta / 20 || -e.detail;
radius += d;
init(1);
};

  

 
window.addEventListener('load', () => {
  var
      carousels = document.querySelectorAll('.carousel')
  ;

  for (var i = 0; i < carousels.length; i++) {
      carousel(carousels[i]);
  }
});

function carousel(root) {
  var
      figure = root.querySelector('figure'),
      nav = root.querySelector('nav'),
      images = figure.children,
      n = images.length,
      gap = root.dataset.gap || 0,
      bfc = 'bfc' in root.dataset,
      
      theta =  2 * Math.PI / n,
      currImage = 0
  ;
  
  setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  window.addEventListener('resize', () => { 
      setupCarousel(n, parseFloat(getComputedStyle(images[0]).width)) 
  });

  setupNavigation();

  function setupCarousel(n, s) {
      var	
          apothem = s / (2 * Math.tan(Math.PI / n))
      ;
      
      figure.style.transformOrigin = `50% 50% ${- apothem}px`;

      for (var i = 0; i < n; i++)
          images[i].style.padding = `${gap}px`;
      for (i = 1; i < n; i++) {
          images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
          images[i].style.transform = `rotateY(${i * theta}rad)`;
      }
      if (bfc)
          for (i = 0; i < n; i++)
               images[i].style.backfaceVisibility = 'hidden';
      
      rotateCarousel(currImage);
  }

  function setupNavigation() {
      nav.addEventListener('click', onClick, true);
      
      function onClick(e) {
          e.stopPropagation();
          
          var t = e.target;
          if (t.tagName.toUpperCase() != 'BUTTON')
              return;
          
          if (t.classList.contains('next')) {
              currImage++;
          }
          else {
              currImage--;
          }
          
          rotateCarousel(currImage);
      }
          
  }

  function rotateCarousel(imageIndex) {
      figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
  }
  
}
  

 
document.getElementById('toggleButton').addEventListener('click', function() {
    var qrDiv = document.getElementById('qrdiv');
    if (qrDiv.style.display === 'none' || qrDiv.style.display === '') {
        qrDiv.style.display = 'block';
    } else {
        qrDiv.style.display = 'none';
    }
});
  



 
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
showSlides(slideIndex = n);
}

function showSlides(n) {
let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
if (n > slides.length) {slideIndex = 1}
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
}
for (i = 0; i < dots.length; i++) {
  dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";
dots[slideIndex-1].className += " active";
}
  



 
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.text');
    textElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = element.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Text copied to clipboard:', textToCopy);
            }).catch(err => {
                console.error('Failed to copy text:', err);
            });
        });
    });
});
  


 

let currentSlide = 1;
showSlide(currentSlide);

function showSlide(n) {
  const slides = document.getElementsByClassName('odd-slide');
  if (n > slides.length) { currentSlide = 1 }
  if (n < 1) { currentSlide = slides.length }
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
  }
  slides[currentSlide - 1].style.display = 'block';
}

function changeSlide(n) {
  showSlide(currentSlide += n);
}

function copyToClipboard(text) {
  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = text;
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Copied: ' + text);
}


  


 
document.querySelector('.toggle-shade').addEventListener('click', function() {
    window.location.href = 'index.html';
});
  


 
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index >= slides.length) {
      currentIndex = 0;
  } else if (index < 0) {
      currentIndex = slides.length - 1;
  } else {
      currentIndex = index;
  }
  const offset = -currentIndex * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard');
  }).catch(err => {
      console.error('Failed to copy text: ', err);
  });
}

showSlide(currentIndex);
setInterval(() => {
  showSlide(currentIndex + 1);
}, 3000);

  



 
for (let i = 1; i <= 10; i++) {
    document.getElementById(`extras${i}`).addEventListener('click', function (event) {
        event.preventDefault();
        let div = document.getElementById(`div${i}`);
        if (div.style.display === 'none') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
}
  


 
document.addEventListener('DOMContentLoaded', (event) => {
  for (let i = 1; i <= 10; i++) {
    document.getElementById(`cryptodiv${i}`).addEventListener('click', function (event) {
      event.preventDefault();
      let div = document.getElementById(`div${i}`);
      if (div.style.display === 'none' || div.style.display === '') {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });
  }
});
  



 
      document.getElementById('showVideoLink').addEventListener('click', function(event) {
            event.preventDefault();
            var videoDiv = document.getElementById('videoDiv');
            if (videoDiv.style.display === 'none') {
                videoDiv.style.display = 'block';
            } else {
                videoDiv.style.display = 'none';
            }
        });
  


 

    const slides = document.querySelector('.slides');
    const slide = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    
    let index = 0;
    
    function showSlide(index) {
        const offset = -index * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }
    
    prev.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : slide.length - 1;
        showSlide(index);
    });
    
    next.addEventListener('click', () => {
        index = (index < slide.length - 1) ? index + 1 : 0;
        showSlide(index);
    });
    
    // Auto-slide functionality (optional)
    setInterval(() => {
        next.click();
    }, 4000);
    
    
      


 
   
   document.getElementById('toggleSliderLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the link
    var slider = document.getElementById('slider');
    if (slider.style.display === 'none' || slider.style.display === '') {
        slider.style.display = 'block'; // Show the slider
    } else {
        slider.style.display = 'none'; // Hide the slider
    }
});


  




 

    const slides = document.querySelector('.slides');
    const slide = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    
    let index = 0;
    
    function showSlide(index) {
        const offset = -index * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }
    
    prev.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : slide.length - 1;
        showSlide(index);
    });
    
    next.addEventListener('click', () => {
        index = (index < slide.length - 1) ? index + 1 : 0;
        showSlide(index);
    });
    
    // Auto-slide functionality (optional)
    setInterval(() => {
        next.click();
    }, 4000);
    
    
      
    

 
    document.getElementById('toggleVideoLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of the link
        var videoDiv = document.getElementById('videoDiv');
        if (videoDiv.style.display === 'none' || videoDiv.style.display === '') {
            videoDiv.style.display = 'block';
            videoDiv.classList.add('fade-in');
        } else {
            videoDiv.style.display = 'none';
            videoDiv.classList.remove('fade-in');
        }
    });
  


 
    document.getElementById('shareButton').addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this page:',
                    url: window.location.href,
                });
                console.log('Page shared successfully');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API not supported in your browser.');
        }
    });
      

 
    document.getElementById('toggleLink').addEventListener('click', function(event) {
        event.preventDefault();
        var slider = document.getElementById('slider');
        if (slider.style.display === 'none' || slider.style.display === '') {
            slider.style.display = 'block';
        } else {
            slider.style.display = 'none';
        }
    });
  


















$(function () {
  "use strict";

  // Showing page loader
  $(window).on("load", function () {
    populateColorPlates();
    setTimeout(function () {
      $(".page_loader").fadeOut("fast");
    }, 100);

    if ($("body .filter-portfolio").length > 0) {
      $(function () {
        $(".filter-portfolio").filterizr({
          delay: 0,
        });
      });
      $(".filteriz-navigation li").on("click", function () {
        $(".filteriz-navigation .filtr").removeClass("active");
        $(this).addClass("active");
      });
    }
  });
  //progressive webapp
  class PWAConfApp {
    constructor() {
      this.speakersDiv = document.querySelector(".speakers");
      this.scheduleDiv = document.querySelector(".schedule");
      this.init();
    }

    async init() {
      this.loadSpeakers();
      this.loadSchedule();
    }

    async loadSpeakers() {
      this.speakers = await this.fetchJSON("./speakers.json");

      this.speakersDiv.innerHTML = this.speakers
        .map(this.toSpeakerBlock)
        .join("\n");
    }

    async loadSchedule() {
      const rawSchedule = await this.fetchJSON("./schedule.json");

      // Add speaker details to array
      this.schedule = rawSchedule.map(this.addSpeakerDetails, this);
      this.scheduleDiv.innerHTML = this.schedule
        .map(this.toScheduleBlock)
        .join("\n");
    }

    toSpeakerBlock(speaker) {
      return `
          <div class="speaker">
            <img src="${speaker.picture}" alt="${speaker.name}">
            <div>${speaker.name}</div>
          </div>`;
    }

    toScheduleBlock(scheduleItem) {
      return `
        <div class="schedule-item ${scheduleItem.category}">
          <div class="title-and-time">
            <div class="time">${scheduleItem.startTime}</div>
            <div class="title-and-speaker">
              <div class="title">${scheduleItem.title}</div>
              <div class="speaker">${
                scheduleItem.speaker ? scheduleItem.speaker.name : "&nbsp;"
              }</div>
            </div>
          </div>
          <p class="description">${scheduleItem.description}</p>
        </div>
      `;
    }

    addSpeakerDetails(item) {
      if (item.speakerId) {
        return Object.assign({}, item, {
          speaker: this.speakers.find((s) => s.id === item.speakerId),
        });
      }
      return Object.assign({}, item);
    }

    async fetchJSON(url) {
      const res = await fetch(url);
      return res.json();
    }
  }

  window.addEventListener("load", (e) => {
    new PWAConfApp();
    registerSW();
  });
  async function registerSW() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("./sw.js");
      } catch (e) {
        alert("ServiceWorker registration failed. Sorry about that.");
      }
    } else {
      document.querySelector(".alert").removeAttribute("hidden");
    }
  }
  // Made the left sidebar's min-height to window's height
  var winHeight = $(window).height();
  $(".dashboard-nav").css("min-height", winHeight);

  // Magnify activation
  $(".portfolio-item").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: { enabled: true },
  });

  $(".car-magnify-gallery").lightGallery();

  $(document).on("click", ".compare-btn", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $.jnoty("Car has been removed from compare list", {
        header: "Warning",
        sticky: true,
        theme: "jnoty-warning",
        icon: "fa fa-check-circle",
      });
    } else {
      $(this).addClass("active");
      $.jnoty("Car has been added to compare list", {
        header: "Success",
        sticky: true,
        theme: "jnoty-success",
        icon: "fa fa-check-circle",
      });
    }
  });

  $(document).on("click", ".wishlist-btn", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $.jnoty("Car has been removed from wishlist list", {
        header: "Warning",
        sticky: true,
        theme: "jnoty-warning",
        icon: "fa fa-check-circle",
      });
    } else {
      $(this).addClass("active");
      $.jnoty("Car has been added to wishlist list", {
        header: "Success",
        sticky: true,
        theme: "jnoty-success",
        icon: "fa fa-check-circle",
      });
    }
  });

  // Header shrink while page scroll
  adjustHeader();
  doSticky();
  placedDashboard();
  $(window).on("scroll", function () {
    adjustHeader();
    doSticky();
    placedDashboard();
  });

  // Header shrink while page resize
  $(window).on("resize", function () {
    adjustHeader();
    doSticky();
    placedDashboard();
  });

  function adjustHeader() {
    var windowWidth = $(window).width();
    if (windowWidth > 0) {
      if ($(document).scrollTop() >= 100) {
        if ($(".header-shrink").length < 1) {
          $(".sticky-header").addClass("header-shrink");
        }
        if ($(".do-sticky").length < 1) {
          $(".company-logo img").attr("src", "img/logos/black-logo.png");
        }
      } else {
        $(".sticky-header").removeClass("header-shrink");
        if (
          $(".do-sticky").length < 1 &&
          $(".fixed-header").length == 0 &&
          $(".fixed-header2").length == 0
        ) {
          $(".company-logo img").attr("src", "img/logos/logo.png");
        } else {
          $(".company-logo img").attr("src", "img/logos/black-logo.png");
        }
      }
    } else {
      $(".company-logo img").attr("src", "img/logos/black-logo.png");
    }
  }

  function doSticky() {
    if ($(document).scrollTop() > 40) {
      $(".do-sticky").addClass("sticky-header");
      //$('.do-sticky').addClass('header-shrink');
    } else {
      $(".do-sticky").removeClass("sticky-header");
      //$('.do-sticky').removeClass('header-shrink');
    }
  }

  function placedDashboard() {
    var headerHeight = parseInt($(".main-header").height(), 10);
    $(".dashboard").css("top", headerHeight);
  }

  // Banner slider
  (function ($) {
    //Function to animate slider captions
    function doAnimations(elems) {
      //Cache the animationend event in a variable
      var animEndEv = "webkitAnimationEnd animationend";
      elems.each(function () {
        var $this = $(this),
          $animationType = $this.data("animation");
        $this.addClass($animationType).one(animEndEv, function () {
          $this.removeClass($animationType);
        });
      });
    }

    //Variables on page load
    var $myCarousel = $("#carousel-example-generic");
    var $firstAnimatingElems = $myCarousel
      .find(".item:first")
      .find("[data-animation ^= 'animated']");
    //Initialize carousel
    $myCarousel.carousel();

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);
    //Pause carousel
    $myCarousel.carousel("pause");
    //Other slides to be animated on carousel slide event
    $myCarousel.on("slide.bs.carousel", function (e) {
      var $animatingElems = $(e.relatedTarget).find(
        "[data-animation ^= 'animated']"
      );
      doAnimations($animatingElems);
    });
    $("#carousel-example-generic").carousel({
      interval: 3000,
      pause: "false",
    });
  })(jQuery);

  // Page scroller initialization.
  $.scrollUp({
    scrollName: "page_scroller",
    scrollDistance: 300,
    scrollFrom: "top",
    scrollSpeed: 500,
    easingType: "linear",
    animation: "fade",
    animationSpeed: 200,
    scrollTrigger: false,
    scrollTarget: false,
    scrollText: '<i class="fa fa-chevron-up"></i>',
    scrollTitle: false,
    scrollImg: false,
    activeOverlay: false,
    zIndex: 2147483647,
  });

  // Counter
  function isCounterElementVisible($elementToBeChecked) {
    var TopView = $(window).scrollTop();
    var BotView = TopView + $(window).height();
    var TopElement = $elementToBeChecked.offset().top;
    var BotElement = TopElement + $elementToBeChecked.height();
    return BotElement <= BotView && TopElement >= TopView;
  }

  $(window).on("scroll", function () {
    $(".counter").each(function () {
      var isOnView = isCounterElementVisible($(this));
      if (isOnView && !$(this).hasClass("Starting")) {
        $(this).addClass("Starting");
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 3000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      }
    });
  });

  // Countdown activation
  $(function () {
    // Add background image
    //$.backstretch('../img/nature.jpg');
    var endDate = "December  27, 2019 15:03:25";
    $(".countdown.simple").countdown({ date: endDate });
    $(".countdown.styled").countdown({
      date: endDate,
      render: function (data) {
        $(this.el).html(
          "<div>" +
            this.leadingZeros(data.days, 3) +
            " <span>Days</span></div><div>" +
            this.leadingZeros(data.hours, 2) +
            " <span>Hours</span></div><div>" +
            this.leadingZeros(data.min, 2) +
            " <span>Minutes</span></div><div>" +
            this.leadingZeros(data.sec, 2) +
            " <span>Seconds</span></div>"
        );
      },
    });
    $(".countdown.callback")
      .countdown({
        date: +new Date() + 10000,
        render: function (data) {
          $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
        },
        onEnd: function () {
          $(this.el).addClass("ended");
        },
      })
      .on("click", function () {
        $(this)
          .removeClass("ended")
          .data("countdown")
          .update(+new Date() + 10000)
          .start();
      });
  });

  $(".range-slider-ui").each(function () {
    var minRangeValue = $(this).attr("data-min");
    var maxRangeValue = $(this).attr("data-max");
    var minName = $(this).attr("data-min-name");
    var maxName = $(this).attr("data-max-name");
    var unit = $(this).attr("data-unit");

    $(this).append(
      "" +
        "<span class='min-value'></span> " +
        "<span class='max-value'></span>" +
        "<input class='current-min' type='hidden' name='" +
        minName +
        "'>" +
        "<input class='current-max' type='hidden' name='" +
        maxName +
        "'>"
    );
    $(this).slider({
      range: true,
      min: minRangeValue,
      max: maxRangeValue,
      values: [minRangeValue, maxRangeValue],
      slide: function (event, ui) {
        event = event;
        var currentMin = parseInt(ui.values[0], 10);
        var currentMax = parseInt(ui.values[1], 10);
        $(this)
          .children(".min-value")
          .text(currentMin + " " + unit);
        $(this)
          .children(".max-value")
          .text(currentMax + " " + unit);
        $(this).children(".current-min").val(currentMin);
        $(this).children(".current-max").val(currentMax);
      },
    });

    var currentMin = parseInt($(this).slider("values", 0), 10);
    var currentMax = parseInt($(this).slider("values", 1), 10);
    $(this)
      .children(".min-value")
      .text(currentMin + " " + unit);
    $(this)
      .children(".max-value")
      .text(currentMax + " " + unit);
    $(this).children(".current-min").val(currentMin);
    $(this).children(".current-max").val(currentMax);
  });

  // Select picket
  $(".selectpicker").selectpicker();

  // Search option's icon toggle
  $(".search-options-btn").on("click", function () {
    $(".search-section").toggleClass("show-search-area");
    $(".search-options-btn .fa").toggleClass("fa-chevron-down");
  });

  // Carousel with partner initialization
  (function () {
    $("#ourPartners").carousel({ interval: 3600 });
  })();

  (function () {
    $(".our-partners .item").each(function () {
      var itemToClone = $(this);
      for (var i = 1; i < 4; i++) {
        itemToClone = itemToClone.next();
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(":first");
        }
        itemToClone
          .children(":first-child")
          .clone()
          .addClass("cloneditem-" + i)
          .appendTo($(this));
      }
    });
  })();

  // Background video playing script
  $(document).ready(function () {
    $(".player").mb_YTPlayer({
      mobileFallbackImage: "img/banner/banner-1.jpg",
    });
  });

  // Multilevel menuus
  $("[data-submenu]").submenupicker();

  // Expending/Collapsing advance search content
  $(".show-more-options").on("click", function () {
    if ($(this).find(".fa").hasClass("fa-minus-circle")) {
      $(this).find(".fa").removeClass("fa-minus-circle");
      $(this).find(".fa").addClass("fa-plus-circle");
    } else {
      $(this).find(".fa").removeClass("fa-plus-circle");
      $(this).find(".fa").addClass("fa-minus-circle");
    }
  });

  var videoWidth = $(".sidebar-widget").width();
  var videoHeight = videoWidth * 0.61;
  $(".sidebar-widget iframe").css("height", videoHeight);

  // Megamenu activation
  $(".megamenu").on("click", function (e) {
    e.stopPropagation();
  });

  // Dropdown activation
  $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
    if (!$(this).next().hasClass("show")) {
      $(this)
        .parents(".dropdown-menu")
        .first()
        .find(".show")
        .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");

    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function (e) {
        $(".dropdown-submenu .show").removeClass("show");
      });

    return false;
  });

  // Full  Page Search Activation
  $(function () {
    $('a[href="#full-page-search"]').on("click", function (event) {
      event.preventDefault();
      $("#full-page-search").addClass("open");
      $('#full-page-search > form > input[type="search"]').focus();
    });

    $("#full-page-search, #full-page-search button.close").on(
      "click keyup",
      function (event) {
        if (
          event.target == this ||
          event.target.className == "close" ||
          event.keyCode == 27
        ) {
          $(this).removeClass("open");
        }
      }
    );
  });

  // Slick Sliders
  $(".slick-carousel").each(function () {
    var slider = $(this);
    $(this).slick({
      infinite: true,
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: "0",
    });

    $(this)
      .closest(".slick-slider-area")
      .find(".slick-prev")
      .on("click", function () {
        slider.slick("slickPrev");
      });
    $(this)
      .closest(".slick-slider-area")
      .find(".slick-next")
      .on("click", function () {
        slider.slick("slickNext");
      });
  });

  $(".dropdown.btns .dropdown-toggle").on("click", function () {
    $(this).dropdown("toggle");
    return false;
  });

  // Dropzone initialization
  Dropzone.autoDiscover = false;
  $(function () {
    $("div#myDropZone").dropzone({
      url: "/file-upload",
    });
  });

  // Filterizr initialization
  $(function () {
    //$('.filtr-container').filterizr();
  });

  function toggleChevron(e) {
    $(e.target)
      .prev(".panel-heading")
      .find(".fa")
      .toggleClass("fa-minus fa-plus");
  }

  $(".panel-group").on("shown.bs.collapse", toggleChevron);
  $(".panel-group").on("hidden.bs.collapse", toggleChevron);

  // Switching Color schema
  function populateColorPlates() {
    var plateStings =
      '<div class="option-panel option-panel-collased">\n' +
      "    <h2>Change Color</h2>\n" +
      '    <div class="color-plate default-plate" data-color="default"></div>\n' +
      '    <div class="color-plate midnight-blue-plate" data-color="midnight-blue"></div>\n' +
      '    <div class="color-plate yellow-plate" data-color="yellow"></div>\n' +
      '    <div class="color-plate blue-plate" data-color="blue"></div>\n' +
      '    <div class="color-plate green-light-plate" data-color="green-light"></div>\n' +
      '    <div class="color-plate yellow-light-plate" data-color="yellow-light"></div>\n' +
      '    <div class="color-plate green-plate" data-color="green"></div>\n' +
      '    <div class="color-plate green-light-2-plate" data-color="green-light-2"></div>\n' +
      '    <div class="color-plate red-plate" data-color="red"></div>\n' +
      '    <div class="color-plate purple-plate" data-color="purple"></div>\n' +
      '    <div class="color-plate brown-plate" data-color="brown"></div>\n' +
      '    <div class="color-plate olive-plate" data-color="olive"></div>\n' +
      '    <div class="setting-button">\n' +
      '        <i class="fa fa-gear"></i>\n' +
      "    </div>\n" +
      "</div>";
    $("body").append(plateStings);
  }
  $(document).on("click", ".color-plate", function () {
    var name = $(this).attr("data-color");
    $('link[id="style_sheet"]').attr("href", "css/skins/" + name + ".css");
  });

  $(document).on("click", ".setting-button", function () {
    $(".option-panel").toggleClass("option-panel-collased");
  });
});

// mCustomScrollbar initialization
(function ($) {
  $(window)
    .resize(function () {
      $("#map").css("height", $(this).height() - 110);
      if ($(this).width() > 768) {
        $(".map-content-sidebar").mCustomScrollbar({ theme: "minimal-dark" });
        $(".map-content-sidebar").css("height", $(this).height() - 110);
      } else {
        $(".map-content-sidebar").mCustomScrollbar("destroy"); //destroy scrollbar
        $(".map-content-sidebar").css("height", "100%");
      }
    })
    .trigger("resize");
})(jQuery);


