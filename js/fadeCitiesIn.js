SlideCities();
function SlideCities(){
  $(document).on("scroll", function(){
    var scrollVal = $(document).scrollTop();
    var offsetVal = $("#ourcities").offset().top-350;
    offsetVal
    if (scrollVal > offsetVal) {
        $('.citiesTable').addClass("visible")
    } else {
        $('.citiesTable').removeClass("visible")
    }
  });  
}