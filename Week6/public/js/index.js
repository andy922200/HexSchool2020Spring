"use strict";

var navItems = document.querySelectorAll('#nav .nav-item');
navItems.forEach(function (d) {
  return d.firstElementChild.style = "color:white;";
});