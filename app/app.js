
// adapted from https://www.youtube.com/watch?v=b0tnynJtm18&t=1273s

const distance = 60;
const speed = 24;
// scrollY is a updated Y value, after scroll animation has occured
let scrollY = 0;
// prevTargetY holds last target the user has requested
let prevTargetY = 0;

// for myself:
// info to find the current display height in pixels
let displayHeight = window.innerHeight;
console.log('DISPLAYHEIGHT');
console.log(displayHeight);

// check for if scroll animation status
let animator = false;

autoScrollTo = (ele) => {
  // check for if scroll animation is still on
  // incase a user switches targets midway through animation
  if (animator) {
    console.log("ANIMATING");
      clearTimeout(animator);
  }
  // calculates the current scroll position
  // from the top of the page in pixels
  let currentY = window.pageYOffset;
  console.log('============== currentY');
  console.log(currentY);

  // calculates the how many pixels
  // the selected target section is from the top of the page
  let targetY = document.getElementById(ele).offsetTop;
  console.log('targetY');
  console.log(targetY);

  // updated y position after animation
  console.log('scrollY');
  console.log(scrollY);

  // recursively keeps rendering the scroll animation
  animator = setTimeout(`autoScrollTo('${ele}')`, speed);

  // check to see the new target is below previous target, then scroll down
  if (targetY > prevTargetY) {
    // check to see if we are right before at our target position, if so, then simply jump the scroll to the final position and stop the animation
    if (currentY > targetY - distance) {
      window.scroll(0, targetY);
      scrollY = targetY;
      prevTargetY = targetY;
      console.log('scrollY');
      console.log(scrollY);
      clearTimeout(animator);
    }
    // if target hasn't been reached, keep running the scroll animation
    else {
      scrollY = currentY + distance
      window.scroll(0, scrollY);
    }
  }
  // otherwise the new target is above previous target, then scroll up
  else {
    if (currentY < targetY + distance) {
      window.scroll(0, targetY);
      scrollY = targetY;
      prevTargetY = targetY;
      console.log('scrollY');
      console.log(scrollY);
      clearTimeout(animator);
    }
    else {
      scrollY = currentY - distance
      window.scroll(0, scrollY);
    }
  }
} // end of autoScrollTo
