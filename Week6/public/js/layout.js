"use strict";

$('.ham-icon').click(function (e) {
  e.preventDefault();
  $('#navbar__mobile__sidebar').css({
    'width': '100%'
  });
  $('.nav-link__header').css({
    'display': 'flex',
    'justify-content': 'space-between'
  });
  $('.nav-link__subItems').css({
    'display': 'unset'
  });
});
$('.arrow-left').click(function (e) {
  e.preventDefault();
  $('#navbar__mobile__sidebar').css({
    'width': '0%'
  });
  $('.nav-link__header').css({
    'display': 'none'
  });
  $('.nav-link__subItems').css({
    'display': 'none'
  });
  $('#products-nav').css({
    'display': 'none'
  });
  $('.nav-link__downIcon').css({
    'display': 'unset'
  });
  $('.nav-link__upIcon').css({
    'display': 'none'
  });
});
$('.arrow-down').click(function (e) {
  e.preventDefault();
  $('#products-nav').css({
    'display': 'unset'
  });
  $('.nav-link__downIcon').css({
    'display': 'none'
  });
  $('.nav-link__upIcon').css({
    'display': 'unset'
  });
});
$('.arrow-up').click(function (e) {
  e.preventDefault();
  $('#products-nav').css({
    'display': 'none'
  });
  $('.nav-link__downIcon').css({
    'display': 'unset'
  });
  $('.nav-link__upIcon').css({
    'display': 'none'
  });
});