
// version 2 adapted from https://www.youtube.com/watch?v=oUSvlrDTLi4&t=163s
// easing - http://www.gizma.com/easing/

// const citiesList = [
//   {
//     name: 'Oakland',
//     id: 'oak',
//     boxClass: 'box1',
//     timeClass: 'pacTime',
//     timeZone: 'America/Los_Angeles',
//     clock: '',
//     weatherId: 5378538
//   },
//   {
//     name: 'San Fransicso',
//     id: 'sf',
//     boxClass: 'box2',
//     timeClass: 'pacTime',
//     timeZone: 'America/Los_Angeles',
//     clock: '',
//     weatherId: 5391959
//   },
//   {
//     name: 'San Jose',
//     id: 'sj',
//     boxClass: 'box3',
//     timeClass: 'pacTime',
//     timeZone: 'America/Los_Angeles',
//     clock: '',
//     weatherId: 5392171
//   },
//   {
//     name: 'New York',
//     id: 'nyc',
//     boxClass: 'box4',
//     timeClass: 'eastTime',
//     timeZone: 'America/New_York',
//     clock: '',
//     weatherId: 5125771
//   },
//   {
//     name: 'Hong Kong',
//     id: 'hk',
//     boxClass: 'box1',
//     timeClass: 'hkTime',
//     timeZone: 'Asia/Shanghai',
//     clock: '',
//     weatherId: 1819729
//   },
//   {
//     name: 'Sydney',
//     id: 'syd',
//     boxClass: 'box4',
//     timeClass: 'sydTime',
//     timeZone: 'Australia/Sydney',
//     clock: '',
//     weatherId: 6619279
//   }
// ];

// 2 ways to loop through an object
// for (var idx in citiesList){
//   console.log(idx);
//   let cityTime = new Date().toLocaleString('en-US', {timeZone: citiesList[idx].timeZone});
//   console.log(cityTime);
// }

// for (var city of citiesList){
//   console.log(city);
//   console.log(city.name);
//   let cityTime = new Date().toLocaleString('en-US', {timeZone: city.timeZone});
//   console.log(cityTime);
// }

renderTime = () => {
  const cityTimeEles = document.querySelectorAll('.cityTime');
  cityTimeEles.forEach((cityTimeEl, idx) => {
    let cityTime = new Date().toLocaleString('en-US', {timeZone: citiesList[idx].timeZone});

    // console.log(cityTime);
    let cityClock = formattedTime(cityTime);
    // cityTimeEl.textContent = cityClock;
    // console.log(cityClock);

    let cityDay = formattedDay(cityTime);

    citiesList[idx].clock = cityClock;
    // console.log(citiesList);
    // cityTimeEl.textContent = cityClock;
    cityTimeEl.innerHTML = `${cityClock}<br />${cityDay}`;
  });
}

// other ways to work with DATE
// var date = new Date("9/23/2018")
// console.log(typeof date);
// var date2 = date.toString();
// console.log(typeof date2);
// console.log(date2);
// var date3 = date.toUTCString();
// console.log(typeof date3);
// console.log(date3);
// var date4 = date.toDateString();
// console.log(date4);
// var date5 = date.getDay();
// console.log(date5);


formattedTime = (timeStr) => {
  timeArray = timeStr.split(' ');
  // timeArray[0] = timeArray[0].slice(0, -6);
  timeArray[1] = timeArray[1].slice(0, -3);
  timeArray[2] = timeArray[2].toLowerCase();
  result = `${timeArray[1]} ${timeArray[2]}`;
  return result;
}

formattedDay = (timeStr) => {
  timeArray = timeStr.split(' ');
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  // formatting to get the DAY of the week
  // var date = new Date("9/23/2018")
  // var day = date.getDay();
  // console.log(day);
  let dateString = timeArray[0].slice(0, -1);
  // console.log(dateString);
  let date = new Date(dateString)
  let cityDay = date.getDay();
  cityDay = weekday[cityDay];
  // console.log(cityDay);
  return cityDay;
}

function getCityWeatherIds() {
  let citiesIdString = [];
  for (let city of citiesList){
    let cityWeatherId = city.weatherId;
    citiesIdString.push(cityWeatherId);
  }
  citiesIdString = citiesIdString.join(',');
  return citiesIdString;
}

renderWeather = () => {
  // grabs data by one city name
  // let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // grab data by up to 20 city ids
  const weatherUrl = 'http://api.openweathermap.org/data/2.5/group?id=';
  const citiesIdString = getCityWeatherIds();
  const units = '&units=imperial&appid=';
  const key = 'SECRET_KEY';
  const path = `${weatherUrl}${citiesIdString}${units}${key}`;

  // create a XHR object
  const xhr = new XMLHttpRequest();
  // OPEN - type, url/file, async
  xhr.open('GET', path, true);
  xhr.onload = function(){
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(xhr.responseText);
      // formats from XML to JSON structure
      const res = JSON.parse(xhr.responseText);
      // console.log(res);
      // loops through weather data and renders the output
      const weatherDegEles = document.querySelectorAll('.weatherDeg');
      const weatherDescEles = document.querySelectorAll('.weatherDesc');
      // const xEle = document.querySelector('.x');
      weatherDegEles.forEach((ele, idx) => {
        let temp = res.list[idx].main.temp;
        let tempRound = Math.round(temp);
        let desc = res.list[idx].weather[0].description;
        ele.textContent = `${tempRound} degrees`;
        weatherDescEles[idx].textContent = desc;
      });

    } else {
      console.log('request has failed');
      console.log(xhr.status);
    }
  }
  xhr.send();
} // end of renderWeather

function newSection() {
  const mainEle = document.querySelector('main');
  let sectionEle = document.createElement('section');
  sectionEle.setAttribute('id', citiesList[0].id);
  sectionEle.setAttribute('class', `contentBox ${citiesList[0].boxClass}`);

  let pTimeEle = document.createElement('p');
  pTimeEle.setAttribute('class', 'cityTime');
  pTimeEle.textContent = `${citiesList[0].clock}`;

  let h2Ele = document.createElement('h2');
  h2Ele.textContent = `${citiesList[0].name}`;

  let pWthrDegEle = document.createElement('p');
  pWthrDegEle.setAttribute('class', 'weatherDeg');

  let pWthrDescEle = document.createElement('p');
  pWthrDescEle.setAttribute('class', 'weatherDesc');

  sectionEle.appendChild(pTimeEle);
  sectionEle.appendChild(h2Ele);
  sectionEle.appendChild(pWthrDegEle);
  sectionEle.appendChild(pWthrDescEle);
  // sectionTags.appendChild(h2Ele);
  mainEle.appendChild(sectionEle);
}

newSection();

// renders all the times & weather data on the page
renderTime();
renderWeather();


smoothScroll = (target, duration) => {
  // tracks the current Y position in pixels
  let currentY = window.pageYOffset;
  // tracks the target Y positiom in pixels
  target = document.getElementById(target);
  let targetYPos = target.offsetTop;
  // tracks the remaining distance from target in pixels
  let distance = targetYPos - currentY;
  // track the time, for use with request animation
  let start = null;

  function animation(timestamp){
    // timestamp part of reqAF to keep track of animation time
    if (!start) start = timestamp;
    // tracks the time elapsed
    let timeElapsed = timestamp - start;
    // run, calculates how to reach targetY in an ease trajectory
    // 1) value of current time in the animation
    // 2) currentY position in pixel
    // 3) how far we need to go till we reach targetY in pixels
    // 4) target end time of animation
    let run = ease(timeElapsed, currentY, distance, duration)
    // scrollTo, first argument scrolls on the x axis
    // scrollTo, second argument scrolls on the y axis
    // animates till we reach the duration time
    window.scrollTo(0, run)
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
    else {
      cancelAnimationFrame(animationID);
    }
  } // end of animation function
  // recursively renders the animation function
  let animationID = requestAnimationFrame(animation);
} // end of smoothScroll function

// cubic easing in/out
ease = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};

// SMOOTH SCROLL EVENT HANDLERS
const scrollLinks = document.querySelectorAll(".scrollLink");
scrollLinks.forEach(scrollLink => {
  scrollLink.addEventListener("click", function(e) {
    renderTime();
    // renderWeather();
    e.preventDefault();
    let scrollTarget = scrollLink.dataset.scroll;
    smoothScroll(scrollTarget, 1500);
  });
});
