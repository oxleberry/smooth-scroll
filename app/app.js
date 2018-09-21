
// version 2 adapted from
// https://www.youtube.com/watch?v=oUSvlrDTLi4&t=163s
// easing
// http://www.gizma.com/easing/

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

function renderWeather() {
  // grabs data by one city name
  // let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // grab data by up to 20 city ids
  const weatherUrl = 'http://api.openweathermap.org/data/2.5/group?id=';
  const units = '&units=imperial&appid=';
  const key = 'e1d85f466cbdf227085ec76920be7513';

  const oakId = 5378538;
  const sfId = 5391959;
  const sjId = 5392171;
  const nycId = 5125771;
  const hkId = 1819729;
  const sydId = 6619279;

  cities = `${oakId},${sfId},${sjId},${nycId},${hkId},${sydId}`
  const path = `${weatherUrl}${cities}${units}${key}`;

  $.ajax({
    method: 'GET',
    url: path,
    success: onSuccess,
    error: onError
  });

  function onSuccess(res) {
    // console.log(res);
    const weatherDegEles = document.querySelectorAll('.weatherDeg');
    const weatherDescEles = document.querySelectorAll('.weatherDesc');

    weatherDegEles.forEach((ele, idx) => {
      let temp = res.list[idx].main.temp;
      let tempRound = Math.round(temp);
      let desc = res.list[idx].weather[0].description;
      ele.textContent = `${tempRound} degrees`;
      weatherDescEles[idx].textContent = desc;
    });
  }

  function onError(xhr, status, errorThrown) {
    console.log('Error: ' + errorThrown);
    console.log('Status: ' + status);
    console.dir(xhr);
  }

} // end of renderWeather

renderWeather();

function smoothScroll(target, duration) {
  // renderWeather();
  console.log('TARGET !!!');
  console.log(target);
  console.log(typeof target);
  // selecting the target element
  target = document.getElementById(target);
  console.log('target');
  console.log(target);
  console.log(typeof target);
  let targetYPos = target.offsetTop;
  console.log('targetYPos');
  console.log(targetYPos);
  // same as .offsetTop
  // let targetYPos2 = target.getBoundingClientRect().top;
  // console.log(targetYPos2);

  // getBoundingClientRect will also get info like .width, .height, .left ...
  // let targetYPos3 = target.getBoundingClientRect();
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
    // animates till we reach the duration time
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
// EVENT LISTENERS
const scrollLinks = document.querySelectorAll(".scrollLink");
scrollLinks.forEach(scrollLink => {
  scrollLink.addEventListener("click", function(e) {
    e.preventDefault();
    let scrollTarget = scrollLink.dataset.scroll;
    console.log('scrollTarget');
    console.log(scrollTarget);
    console.log(typeof scrollTarget);
    smoothScroll(scrollTarget, 1500);
  });
});
