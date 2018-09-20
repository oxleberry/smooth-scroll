
// adapted from https://www.youtube.com/watch?v=b0tnynJtm18&t=1273s
//
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


function renderTime() {
  // renders PST
  let pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
  console.log(pacificTime);
  // formats PST time
  pacArray = pacificTime.split(' ');
  pacTime = pacArray[1].slice(0, -3);
  console.log(pacTime);
  console.log(pacArray[2]);
  pacArray[2] = pacArray[2].toLowerCase();
  pacClock = `${pacTime} ${pacArray[2]}`
  console.log(pacClock);

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


  // // renders local time
  // let localDate = new Date()
  // let localHour = localDate.getHours()
  // let eastHour = localHour + 3;
  // let localMinutes = localDate.getMinutes()
  // let localAmpm = 'am';
  // let eastAmpm = 'am';
  //
  // console.log(localDate);
  // console.log(localMinutes);

  // // formats the minutes
  // if (localMinutes < 10) {
  //   localMinutes = `0${localMinutes}`
  // }
  // // hour of PST
  // if (localHour > 12) {
  //   localHour -= 12;
  //   localAmpm = 'pm';
  // }
  // // hour of EST
  // console.log(eastHour);
  // if (eastHour >= 24) {
  //   eastHour -= 12;
  //   eastAmpm = 'am';
  // } else if (eastHour > 12) {
  //   eastHour -= 12;
  //   eastAmpm = 'pm';
  // }

  // updates the time in the DOM
  // let localTimes = document.querySelectorAll('.localTime');
  // localTimes.forEach(localTime => {
  //   localTime.textContent = `${localHour}:${localMinutes}${localAmpm}`;
  // });
  // let eastTime2 = document.querySelector('.eastTime');
  // eastTime2.textContent = `${eastHour}:${localMinutes}${eastAmpm}`;

}

renderTime();

autoScrollTo = (ele) => {
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
  let targetY = document.getElementById(ele).offsetTop;
  console.log('targetY');
  console.log(targetY);

  // updated y position after animation
  // console.log('scrollY');
  // console.log(scrollY);

  // recursively keeps rendering the scroll animation
  animatorID = setTimeout(`autoScrollTo('${ele}')`, speed);

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
