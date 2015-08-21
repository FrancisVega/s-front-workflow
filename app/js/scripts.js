
$(document).ready(function(){

    var target = $(".design-eco").offset().top - 120;
    var nexttarget = $(".metodo").offset().top - 90;


    $(window).scroll(function() {
        $(".cookie").css({
            'opacity' : 1-(($(this).scrollTop())/150)
        });
    });

    $(".cookie").click(function(){
        $(".cookie").fadeOut();
    });

    var interval = setInterval(function() {

        // Entra o sale del modulo por arriba
        if ($(window).scrollTop() >= target) {
            // clearInterval(interval);
            $('.logopath').css("fill", "#232323");
            $('.navpath').css("fill", "#232323");
        } else {
            $('.logopath').css("fill", "#ffffff");
            $('.navpath').css("fill", "#ffffff");
        }

        // Entra el siguiente modulo
        if ($(window).scrollTop() >= nexttarget) {
            // clearInterval(interval);
            $('.logopath').css("fill", "#ffffff");
            $('.navpath').css("fill", "#ffffff");
        }

    }, 250);



});
