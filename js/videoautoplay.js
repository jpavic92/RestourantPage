$(document).ready(function(){
  var screenWidth = $(window).width();
  // if window width is smaller than 768 remove the autoplay attribute
  // from the video
  if (screenWidth < 768){
        $('video').removeAttr('autoplay');
  } else {
    $('video').attr('autoplay');
  }
});