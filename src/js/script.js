<<<<<<< HEAD
var C = new ScrollMagic.Controller();
var S = new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    duration: 300
})
.setTween("#animate2", 
        {
            borderTop: "30px solid white",
            backgroundColor: "blue",
            scale: 0.7
        })
.addIndicators({
    name: "2 (duration 300)"
})
.addTo(C);
=======
//
//
//
//
//
//
//
//
//
//
//


//$(function() {
    controller = new ScrollMagic.Controller();

    $(".item").each(function (index, elem) {
    var config = $(this).attr("data-config");
    var time = $.parseJSON(config).time;
    var opacity = $.parseJSON(config).opacity;
    var scale = $.parseJSON(config).scale;

    //var duration = $(this).attr("data-duration");
    var tween = TweenMax.to(
            elem, 0.5,
            {
                opacity:opacity
            }
    );
    var j = new ScrollMagic.Scene({
        duration: time,
        triggerElement: elem,
            triggerHook: "onCenter",
        })
        .setTween(tween)
        .addTo(controller)
        .addIndicators();
    });

//});

//var controller = new ScrollMagic.Controller({
    //globalSceneOptions: {
        //triggerHook: 'onEnter'
    //}
//});

//var items = $('.item');

//var scene = new ScrollMagic.Scene({
    //triggerElement: ".item",
    //duration: 250,
    //offset: 0
//})
//.setTween('.item', {
    //opacity: 1,
    //scale: 1.1
//})
//.addIndicators({name: '2 (duration: 750)'})
//.addTo(controller);
>>>>>>> e6a810d38d092807a8b0eb534c96de5c0ca60b18
