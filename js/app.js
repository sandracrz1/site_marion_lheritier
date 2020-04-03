"use strict";
// open menu
var a;
var element;
var anchor_link;
var button_open;
var button_close;

//click menu
a = document.getElementsByClassName("icon_menu")[0].addEventListener("click", toggleMenuItem);
// toggle menu_content
function toggleMenuItem() {

  element = document.getElementsByClassName("menu-deroulant")[0];
  if (element.classList.contains("open")) {
    element.classList.remove("open");
  } else {
    element.classList.add("open");
  }
};
// scroll section anchor
document.addEventListener("scroll", detectActiveAnchor);

function detectActiveAnchor(event) {
  var scene_offset = document.getElementById('scene').offsetTop;
  var biographie_offset = document.getElementById('biographie').offsetTop;
  var photos_offset = document.getElementById('photos').offsetTop;
  var contact_offset = document.getElementById('contact').offsetTop;


  var activeAnchor = document.querySelector('.menu-bigscreen a.active');
  if (activeAnchor) {
    activeAnchor.classList.remove("active");
  }

  if (window.scrollY > contact_offset) {
    document.querySelector('a[href="#contact"]').classList.add("active")
  } else if (window.scrollY > photos_offset) {
    document.querySelector('a[href="#photos"]').classList.add("active")
  } else if (window.scrollY > scene_offset) {
    document.querySelector('a[href="#scene"]').classList.add("active")
  } else if (window.scrollY > biographie_offset) {
    document.querySelector('a[href="#biographie"]').classList.add("active")
  }
}
// scroll smooth
$(function () {
  /**
   * Smooth scrolling to page anchor on click
   **/
  $("a[href*='#']:not([href='#'])").click(function () {
    if (
      location.hostname == this.hostname &&
      this.pathname.replace(/^\//, "") == location.pathname.replace(/^\//, "")
    ) {
      var anchor = $(this.hash);
      anchor = anchor.length ? anchor : $("[name=" + this.hash.slice(1) + "]");
      if (anchor.length) {
        $("html, body").animate({
          scrollTop: anchor.offset().top
        }, 800);
      }
    }
  });
});
// open scene section content
button_open = document.getElementsByClassName("button")[0].addEventListener("click", toggleSceneContent);
button_close = document.getElementsByClassName("button_close")[0].addEventListener("click", toggleSceneContent);


function toggleSceneContent() {

  var element = document.getElementsByClassName("scene_content_hidden")[0];
  var button_close_offset = document.getElementsByClassName("button_close")[0].offsetTop;
  var button_open_content = document.getElementsByClassName("waves-effect waves-light btn-small")[0];

  if (element.classList.contains("open")) {
    element.classList.remove("open");
    var button_open_offset = document.getElementsByClassName("button")[0].offsetTop;
    window.scrollTo(0, button_open_offset);
    button_open_content.innerHTML = "Voir toutes les dates";
    button_open_content.insertAdjacentHTML('afterbegin', '<i class="material-icons left">arrow_downward</i>');

  } else {

    element.classList.add("open");
    button_open_content.innerHTML = "dates";
    button_open_content.insertAdjacentHTML('afterbegin', '<i class="material-icons left">arrow_upward</i>');
  }
};

// close menu onclick item_menu 
document.querySelectorAll('.anchor_link').forEach(item => {
  item.addEventListener('click', event => {
    toggleMenuItem();
  });
});

// slide  bio
var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

lightbox.option({
  'resizeDuration': 200,
  'wrapAround': true,
  'alwaysShowNavOnTouchDevices': true
})

//form
$(document).ready(function () {

  M.updateTextFields();
});
