
// version 2 adapted from
// https://www.youtube.com/watch?v=oUSvlrDTLi4&t=163s
// easing
// http://www.gizma.com/easing/

function renderTime() {
  // renders PST
  let pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  // console.log(pacificTime);
  // formats PST time
  pacArray = pacificTime.split(' ');
  pacTime = pacArray[1].slice(0, -3);
  // console.log(pacTime);
  // console.log(pacArray[2]);
  pacArray[2] = pacArray[2].toLowerCase();
  pacClock = `${pacTime} ${pacArray[2]}`
  // console.log(pacClock);

  // renders EST
  let easternTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
  // formats PST time
  eastArray = easternTime.split(' ');
  eastTime = eastArray[1].slice(0, -3);
  eastArray[2] = eastArray[2].toLowerCase();
  eastClock = `${eastTime} ${eastArray[2]}`

  // updates the time in the DOM
  let pacTimeEles = document.querySelectorAll('.pacTime');
  pacTimeEles.forEach(pacTimeEl => {
    pacTimeEl.textContent = pacClock;
  });
  let eastTimeEle = document.querySelector('.eastTime');
  eastTimeEle.textContent = eastClock;
}
renderTime();


function smoothScroll(target, duration) {
  // console.log(target);
  // selecting the target element
  target = document.querySelector(target);
  console.log('target');
  console.log(target);
  let targetYPos = target.offsetTop;
  console.log('targetYPos');
  console.log(targetYPos);
  // same as .offsetTop
  // var targetYPos2 = target.getBoundingClientRect().top;
  // console.log(targetYPos2);

  // getBoundingClientRect will also get info like .width, .height, .left ...
  // var targetYPos3 = target.getBoundingClientRect();
  // console.log(targetYPos3);

  // very top of the page
  // was startPosition
  let currentY = window.pageYOffset;
  // console.log(currentY);

  let distance = targetYPos - currentY;
  console.log('distance');
  console.log(distance);

  // to track the time for when used with request animation
  let start = null;

  function animation(timestamp){
    if (!start) start = timestamp;

    // timestamp part of reqAF to keep track of animation time
    // console.log('performance now');
    // console.log(performance.now());
    console.log('timestamp');
    console.log(timestamp);
    // increments the time elapsed
    let timeElapsed = timestamp - start;
    console.log('timeElapsed');
    console.log(timeElapsed);

    // run calculates how to reach the targetY in an ease trajectory
    // 1) value in time since start of animation
    // 2) currentY Position in pixel
    // 3) how far we need to go till we hit the targetY in pixels
    // 4 time passed in for animation
    let run = ease(timeElapsed, currentY, distance, duration)
    console.log('run');
    console.log(run);

    // scrollTo, first argument scrolls on the x axis
    // scrollTo, second argument scrolls on the y axis
    window.scrollTo(0, run)
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
    else {
      console.log("CANCEL");
      cancelAnimationFrame(animationID);
    }

  }

  // cubic easing in/out
  function ease(t, b, c, d) {
    t /= d/2;
  	if (t < 1) return c/2*t*t*t + b;
  	t -= 2;
  	return c/2*(t*t*t + 2) + b;
  };

  let animationID = requestAnimationFrame(animation);
}

var scrollLink = document.querySelector('.scrollLink');

scrollLink.addEventListener("click", function(e) {
  e.preventDefault();
  smoothScroll('#ny', 1500);
});
