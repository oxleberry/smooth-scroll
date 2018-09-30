
const citiesList = [
  {
    name: 'Oakland',
    id: 'oak',
    boxClass: 'box1',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5378538
  },
  {
    name: 'San Fransicso',
    id: 'sf',
    boxClass: 'box2',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5391959
  },
  {
    name: 'San Jose',
    id: 'sj',
    boxClass: 'box3',
    timeZone: 'America/Los_Angeles',
    clock: '',
    weatherId: 5397777
    // weatherId: 5392171    
  },
  {
    name: 'New York',
    id: 'nyc',
    boxClass: 'box4',
    timeZone: 'America/New_York',
    clock: '',
    weatherId: 5125771
  },
  {
    name: 'London',
    id: 'lon',
    boxClass: 'box2',
    timeZone: 'Europe/London',
    clock: '',
    weatherId: 2643743
  },
  {
    name: 'Michigan',
    id: 'mic',
    boxClass: 'box3',
    timeZone: 'America/New_York',
    clock: '',
    weatherId: 5011908
  },
  {
    name: 'Hong Kong',
    id: 'hk',
    boxClass: 'box4',
    timeZone: 'Asia/Shanghai',
    clock: '',
    weatherId: 1819729
  },
  {
    name: 'Mexico City',
    id: 'mex',
    boxClass: 'box1',
    timeZone: 'America/Mexico_City',
    clock: '',
    weatherId: 3530597
  },
  {
    name: 'Sydney',
    id: 'syd',
    boxClass: 'box3',
    timeZone: 'Australia/Sydney',
    clock: '',
    weatherId: 6619279
  }
];


const SECRET_KEY = 'e1d85f466cbdf227085ec76920be7513';

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
