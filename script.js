// adding smooth scroll to whole website

var timeOut;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// making of circle mouse follower

function circleMouseFollower(xScale, yScale) {
    window.addEventListener("mousemove", function (details) {
        document.querySelector("#mini-Circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale}, ${yScale})`;
    });
}

// adding animation to all Elements in the first page

function firstPageAnim() {
    var timeLine = gsap.timeline();
    timeLine.from("#nav-Bar", {
        y: '-10',
        duration: 1.5,
        ease: Expo.easeInOut,
        opacity: 0
    })

        .to(".hidden-Elem", {
            y: '0',
            duration: 2,
            ease: Expo.easeInOut,
            stagger: .2,
            delay: -1
        })

        .from("#landing-page-footer", {
            y: '-10',
            duration: 1.5,
            ease: Expo.easeInOut,
            opacity: 0,
            delay: -1
        })
}

// Skewing of circle whenever we move it

function skewCircle() {
    var xScale = 1;
    var yScale = 1;

    var xPrevValue = 0;
    var yPrevValue = 0;

    window.addEventListener("mousemove", function (details) {
        clearTimeout(timeOut);

        var xDiffer = details.clientX - xPrevValue;
        var yDiffer = details.clientY - yPrevValue;

        xScale = gsap.utils.clamp(0.8, 1.2, xDiffer);
        yScale = gsap.utils.clamp(0.8, 1.2, yDiffer);

        xPrevValue = details.clientX;
        yPrevValue = details.clientY;

        circleMouseFollower(xScale, yScale);

        timeOut = setTimeout(function () {
            document.querySelector("#mini-Circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100)

    });
}


circleMouseFollower();
firstPageAnim();
skewCircle();

// Image animation to second page

document.querySelectorAll(".element").forEach(function (element) {

    var value = 0;
    var rotate = 0;

    element.addEventListener("mousemove", function (details) {

        // calculating differ between mouse pointer from top

        var difference = details.clientY - element.getBoundingClientRect().top;

        // For rotation of image

        rotate = details.clientX - value;
        value = details.clientX;





        gsap.to(element.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            // Move from top
            top: difference,
            // move from left
            left: details.clientX - element.getBoundingClientRect().left,
            rotate: gsap.utils.clamp(-20, 20, rotate * 0.5)
        });
    });

    element.addEventListener("mouseleave", function (details) {
        // for image hiding after mouse leave
        gsap.to(element.querySelector('img'), {
            opacity: 0,
            ease: Power3
        });
    });
});

var year = new Date();
var today = year.getFullYear();

document.querySelector(".Year").innerHTML = `${today} &copy;`;


function time() {
    var hours = year.getHours();
    var minutes = year.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

document.querySelector(".Time").innerHTML = time();

