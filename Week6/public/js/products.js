"use strict";

var navItems = document.querySelectorAll('#nav .nav-item');
var navItemsMobile = document.querySelectorAll('.navbar__mobile .nav-link');
navItems[0].firstElementChild.style = "color:green;font-weight:bold;";
navItemsMobile.forEach(function (d) {
  return d.style = "color:black;";
});