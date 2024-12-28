const confetti = {
    maxCount: 150,      // Max confetti count
    speed: 2,           // Confetti falling speed
    frameInterval: 15,  // Frame interval in milliseconds
    alpha: 1.0,         // Confetti alpha opacity
    gradient: false,    // Whether to use gradients for confetti
    start: null,
    stop: null,
    toggle: null,
    pause: null,
    resume: null,
    togglePause: null,
    remove: null,
    isPaused: null,
    isRunning: null
};

(function() {
    confetti.start = startConfetti;
    confetti.stop = stopConfetti;
    confetti.toggle = toggleConfetti;
    confetti.pause = pauseConfetti;
    confetti.resume = resumeConfetti;
    confetti.togglePause = toggleConfettiPause;
    confetti.remove = removeConfetti;
    confetti.isPaused = isConfettiPaused;
    confetti.isRunning = isConfettiRunning;
    var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
    var streamingConfetti = false;
    var animationTimer = null;
    var pause = false;
    var lastFrameTime = Date.now();
    var particles = [];
    var waveAngle = 0;
    var context = null;

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
        particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = Math.random() * Math.PI;
        return particle;
    }

    function toggleConfettiPause() {
        if (pause)
            resumeConfetti();
        else
            pauseConfetti();
    }

    function isConfettiPaused() {
        return pause;
    }

    function pauseConfetti() {
        pause = true;
    }

    function resumeConfetti() {
        pause = false;
        runAnimation();
    }

    function runAnimation() {
        if (pause) return;
        else if (particles.length === 0) {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            animationTimer = null;
        } else {
            var now = Date.now();
            var delta = now - lastFrameTime;
            if (!supportsAnimationFrame || delta > confetti.frameInterval) {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                updateParticles();
                drawParticles(context);
                lastFrameTime = now - (delta % confetti.frameInterval);
            }
            animationTimer = requestAnimationFrame(runAnimation);
        }
    }

    function startConfetti() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimationFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                return window.setTimeout(callback, confetti.frameInterval);
            };
        })();
        var canvas = document.getElementById("confetti-canvas");
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
            document.body.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener("resize", function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, true);
            context = canvas.getContext("2d");
        } else if (context ===[_{{{CITATION{{{_1{](https://github.com/js202005082300/Aide-m-moires/tree/c85c562d508c68fa086972462338ed773a25c8ac/JavaScript%2Fcours%2F002_hello_world%2Fnote.md)[_{{{CITATION{{{_2{](https://github.com/aramirezdecruz3148/Count-Down/tree/e439e57d827ea5ff5a186074c9fd2eefb42d0a39/src%2FClock.js)[_{{{CITATION{{{_3{](https://github.com/nandandkl/project1/tree/ac4c25edce743f3a2b61cbe35591ad88aa16ea03/Birth%20day%20wish%2Fscript.js)[_{{{CITATION{{{_4{](https://github.com/emerzon1/MomBday/tree/1174c0da5cdd9265a5623406a49338c91aa1af6c/src%2FViews%2FCard.js)[_{{{CITATION{{{_5{](https://github.com/prabhkirank12/20JavascriptProjects/tree/5e82586ced58c6a2f3734ccfcd047c660183db52/spockRockGame%2Fconfetti.js)[_{{{CITATION{{{_6{](https://github.com/novakjason/crystal-jquery-game/tree/13cf0084a31174b0b501db2f0d84d6ceffb898fd/assets%2Fjavascript%2Fconfetti.js)[_{{{CITATION{{{_7{](https://github.com/rebel47/HappyBirthday/tree/77bf6c1c6f39db73a4bc76bd56f42932f213a82f/scripts%2Fparticle.js)[_{{{CITATION{{{_8{](https://github.com/veeruthondamalla/test/tree/f400bab618a9c48ff37b1ec7956f2b39fca68edc/src%2Fassets%2Fjs%2Fconfetti.js)