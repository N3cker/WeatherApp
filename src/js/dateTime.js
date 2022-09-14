let timezoneOffset = new Date().getTimezoneOffset() * -60;

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

const setDisplayCalendar = () => {
  let todaysDate = [currentDay.getDate()];
  let day = days[currentDay.getDay()];
  let month = months[currentDay.getMonth()];

  document.getElementById('suffix').innerHTML = suffix(todaysDate);
  document.getElementById('todays-date').innerHTML = todaysDate;
  document.getElementById('day').innerHTML = day;
  document.getElementById('month').innerHTML = month;
};

export const currentCityTime = () => {
  d = new Date();
  localTime = d.getTime();
  localOffset = d.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let cityTime = utc + 1000 * timezoneOffset;
  return new Date(cityTime);
};

const getTime = () => {
  return currentCityTime().toLocaleTimeString();
};

setDisplayCalendar();
document.getElementById('date-time').innerHTML = getTime();

setInterval(function () {
  document.getElementById('date-time').innerHTML = getTime();
  if (getTime() === '00:00:00') {
    setDisplayCalendar();
  }
}, 1000);

export function setTimeZoneOffset(timezoneOff) {
  timezoneOffset = timezoneOff;
  currentDay = currentCityTime();
  setDisplayCalendar();
}
