let timezoneOffset = 0;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const suffix = todaysDate => {
  if (todaysDate > 3 && todaysDate < 21) return 'th';
  switch (todaysDate % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

let currentDay = new Date(new Date().getTime() + timezoneOffset);
console.log(currentDay);

const setDisplayCalendar = () => {
  let todaysDate = [currentDay.getDate()];
  let day = days[currentDay.getDay()];
  let month = months[currentDay.getMonth()];

  document.getElementById('suffix').innerHTML = suffix(todaysDate);
  document.getElementById('todays-date').innerHTML = todaysDate;
  document.getElementById('day').innerHTML = day;
  document.getElementById('month').innerHTML = month;
};

const getTime = () =>
{
    d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    let cityTime = utc + 1000 * timezoneOffset;
    nd = new Date(cityTime);
    return nd;
    }
    // new Date().toLocaleTimeString();

setDisplayCalendar();
document.getElementById('date-time').innerHTML = getTime();

setInterval(function () {
  document.getElementById('date-time').innerHTML = getTime();
  if (getTime() === '00:00:00') {
    currentDay = new Date();
    setDisplayCalendar();
  }
}, 1000);



console.log(nd, 'nd');

export function setTimeZoneOffset(timezoneOff) {
  console.log(timezoneOffset);
  console.log('zamieniam na ', timezoneOffset);
  timezoneOffset = timezoneOff;
}
