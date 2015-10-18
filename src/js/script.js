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
