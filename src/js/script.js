$(function() {
    controller = new ScrollMagic();
    $(".animate").each(function (index, elem) {
        var tween = TweenMax.to(elem, 0.5,
                               {scale: 1.02, backgroundColor: 'rgb(255, 39, 46)' }
                    );new ScrollScene({
                duration: 200,
                triggerElement: elem,
                triggerHook: "onCenter",
            })
            .setTween(tween)
            .addTo(controller)
            .addIndicators();
    });
});
//var controller = new ScrollMagic.Controller({
    //globalSceneOptions: {
        //triggerHook: 'onEnter'
    //}
//});

//var items = $('.item');

//var scene = new ScrollMagic.Scene({
    //triggerElement: ".item",
    //duration: 750,
    //offset: 0
//})
//.setTween('.item', {
    //opacity: 1,
    //scale: 1.1
//})
//.addIndicators({name: '2 (duration: 750)'})
//.addTo(controller);
