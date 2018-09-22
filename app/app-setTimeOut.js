
// adapted from https://www.youtube.com/watch?v=b0tnynJtm18&t=1273s
//

function renderTime() {
  // gets and renders PST
  const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  const pacClock = formattedTime(pacificTime);
  // gets and renders EST
  const easternTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
  const eastClock = formattedTime(easternTime);
  // gets and renders Hong Kong Time
  const hkTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"})
  const hkClock = formattedTime(hkTime);
  // gets and renders Sydney Time
  const sydTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"})
  const sydClock = formattedTime(sydTime);
  // updates the time in the DOM
  const pacTimeEles = document.querySelectorAll('.pacTime');
  pacTimeEles.forEach(pacTimeEl => {
    pacTimeEl.textContent = pacClock;
  });
  const eastTimeEle = document.querySelector('.eastTime');
  eastTimeEle.textContent = eastClock;
  const hkTimeEle = document.querySelector('.hkTime');
  hkTimeEle.textContent = hkClock;
  const sydTimeEle = document.querySelector('.sydTime');
  sydTimeEle.textContent = sydClock;
}

formattedTime = (timeStr) => {
  timeArray = timeStr.split(' ');
  timeArray[1] = timeArray[1].slice(0, -3);
  timeArray[2] = timeArray[2].toLowerCase();
  result = `${timeArray[1]} ${timeArray[2]}`;
  return result;
}

// renders all the times on the page
renderTime();



const distance = 60;
const speed = 24;
// scrollY is a updated Y value, after scroll animation has occured
let scrollY = 0;
// prevTargetY holds last target the user has requested
let prevTargetY = 0;

// for myself:
// info to find the current display height in pixels
let displayHeight = window.innerHeight;
// console.log('DISPLAYHEIGHT');
// console.log(displayHeight);

// check for if scroll animation status
let animatorID = false;


autoScrollTo = (targetDiv) => {
  renderTime();
  // check for if scroll animation is still on
  // incase a user switches targets midway through animation
  if (animatorID) {
    console.log("ANIMATING");
      clearTimeout(animatorID);
  }
  // calculates the current scroll position
  // from the top of the page in pixels
  let currentY = window.pageYOffset;
  console.log('============== currentY');
  console.log(currentY);

  // calculates the how many pixels
  // the selected target section is from the top of the page
  let targetY = document.getElementById(targetDiv).offsetTop;
  console.log('targetY');
  console.log(targetY);

  // updated y position after animation
  // console.log('scrollY');
  // console.log(scrollY);

  // recursively keeps rendering the scroll animation
  animatorID = setTimeout(`autoScrollTo('${targetDiv}')`, speed);

  // check to see the new target is below previous target, then scroll down
  if (targetY > prevTargetY) {
    // check to see if we are right before at our target position, if so, then simply jump the scroll to the final position and stop the animation
    if (currentY > targetY - distance) {
      window.scroll(0, targetY);
      scrollY = targetY;
      prevTargetY = targetY;
      console.log('scrollY');
      console.log(scrollY);
      clearTimeout(animatorID);
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
      clearTimeout(animatorID);
    }
    else {
      scrollY = currentY - distance
      window.scroll(0, scrollY);
    }
  }
} // end of autoScrollTo


// EVENT LISTENERS

const scrollLinks = document.querySelectorAll(".scrollLink");

scrollLinks.forEach(scrollLink => {
  scrollLink.addEventListener("click", function(e) {
    e.preventDefault();
    let scrollTarget = scrollLink.dataset.scroll;
    console.log('scrollTarget');
    console.log(scrollTarget);
    autoScrollTo(scrollTarget);
  });
});
