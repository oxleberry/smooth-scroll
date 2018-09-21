
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


function renderWeather() {
  // by one city name
  // let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // by up to 20 city ids
  const weatherUrl = 'http://api.openweathermap.org/data/2.5/group?id=';
  const units = '&units=imperial&appid=';
  const key = 'SECRET_KEY';

  const oakId = 5378538;
  const sfId = 5391997;
  const sjId = 5392171;
  const nycId = 5125771;

  cities = `${oakId},${sfId},${sjId},${nycId}`
  const path = `${weatherUrl}${cities}${units}${key}`;

  $.ajax({
    method: 'GET',
    url: path,
    success: onSuccess,
    error: onError
  });

  function onSuccess(res) {
    console.log(res);
    const oakWeatherEle = document.querySelector('.oakWeather');
    const oakDescEle = document.querySelector('.oakDesc');
    const sfWeatherEle = document.querySelector('.sfWeather');
    const sfDescEle = document.querySelector('.sfDesc');
    const sjWeatherEle = document.querySelector('.sjWeather');
    const sjDescEle = document.querySelector('.sjDesc');
    const nycWeatherEle = document.querySelector('.nycWeather');
    const nycDescEle = document.querySelector('.nycDesc');
    let temp = res.list[0].main.temp;
    // console.log(temp);
    let tempRound = Math.round(temp);
    // console.log(tempRound);
    oakWeatherEle.textContent = `${tempRound} degrees`;
    oakDescEle.textContent = `${res.list[0].weather[0].description}`;
    sfWeatherEle.textContent = `${res.list[1].main.temp} degrees`;
    sfDescEle.textContent = `${res.list[1].weather[0].description}`;
    sjWeatherEle.textContent = `${res.list[2].main.temp} degrees`;
    sjDescEle.textContent = `${res.list[2].weather[0].description}`;
    nycWeatherEle.textContent = `${res.list[3].main.temp} degrees`;
    nycDescEle.textContent = `${res.list[3].weather[0].description}`;
  }
  function onError(xhr, status, errorThrown) {
    console.log('Error: ' + errorThrown);
    console.log('Status: ' + status);
    console.dir(xhr);
  }

}

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
