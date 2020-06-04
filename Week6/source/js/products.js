let navItems = document.querySelectorAll('#nav .nav-item');
let navItemsMobile = document.querySelectorAll('.navbar__mobile .nav-link');
navItems[0].firstElementChild.style = "color:green;font-weight:bold;"
navItemsMobile.forEach(d => d.style = "color:black;")