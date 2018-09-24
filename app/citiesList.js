
const citiesList = [
  {
    name: 'Oakland',
    id: 'oak',
    boxClass: 'box1',
    timeClass: 'pacTime',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5378538
  },
  {
    name: 'San Fransicso',
    id: 'sf',
    boxClass: 'box2',
    timeClass: 'pacTime',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5391959
  },
  {
    name: 'San Jose',
    id: 'sj',
    boxClass: 'box3',
    timeClass: 'pacTime',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5392171
  },
  {
    name: 'New York',
    id: 'nyc',
    boxClass: 'box4',
    timeClass: 'eastTime',
    timeZone: 'America/New_York',
    clock: '',
    weatherId: 5125771
  },
  {
    name: 'Hong Kong',
    id: 'hk',
    boxClass: 'box2',
    timeClass: 'hkTime',
    timeZone: 'Asia/Shanghai',
    clock: '',
    weatherId: 1819729
  },
  {
    name: 'Sydney',
    id: 'syd',
    boxClass: 'box4',
    timeClass: 'sydTime',
    timeZone: 'Australia/Sydney',
    clock: '',
    weatherId: 6619279
  }
  // {
  //   name: 'Mexico City',
  //   id: 'mex',
  //   boxClass: 'box1',
  //   timeClass: 'mexTime',
  //   timeZone: 'America/Mexico_City',
  //   clock: '',
  //   weatherId: 3530597
  // },
];



// 2 ways to loop through an object
// for (var idx in citiesObj){
//   console.log(idx);
//   let cityTime = new Date().toLocaleString('en-US', {timeZone: citiesObj[idx].timeZone});
//   console.log(cityTime);
// }

// for (var city of citiesObj){
//   console.log(city);
//   console.log(city.name);
//   let cityTime = new Date().toLocaleString('en-US', {timeZone: city.timeZone});
//   console.log(cityTime);
// }
