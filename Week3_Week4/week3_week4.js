$('.ham-icon').click(function (e) {
  e.preventDefault();
  $('.dropdown-menu').toggleClass('active');
})

/*default all hide, except 1st card*/
$('.card-item-body').hide();
$('.card-item').eq(0).addClass('active');
$('.card-item-body').eq(0).show();

// click li
$('.card-item').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active').siblings().removeClass('active');
  $(this).children().next().slideToggle();
  $(this).siblings().children().next().slideUp();
})