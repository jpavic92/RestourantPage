$(document).ready(function(){
MenuBarShowHide();
});
function MenuBarShowHide() {
    $("#hiddenBar").hide();
    $(window).on("scroll", function () {
        var scrollVal = $(window).scrollTop();
        if(scrollVal >= $("#videoContainer").height()){
            $("#hiddenBar").slideDown(500);
        }
        else{
            $("#hiddenBar").slideUp(300);
        }
    });
}
