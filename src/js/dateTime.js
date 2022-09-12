// const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

// const suffix = todaysDate => {
//   if (todaysDate > 3 && todaysDate < 21) return 'th';
//   switch (todaysDate % 10) {
//     case 1:
//       return 'st';
//     case 2:
//       return 'nd';
//     case 3:
//       return 'rd';
//     default:
//       return 'th';
//   }
// };

// let currentDay = new Date();

// const setDisplayCalendar = () => {
//   let todaysDate = [currentDay.getDate()];
//   let day = days[currentDay.getDay()];
//   let month = months[currentDay.getMonth()];

//   document.getElementById('suffix').innerHTML = suffix(todaysDate);
//   document.getElementById('todays-date').innerHTML = todaysDate;
//   document.getElementById('day').innerHTML = day;
//   document.getElementById('month').innerHTML = month;
// };

// const getTime = () => new Date().toLocaleTimeString();

// setDisplayCalendar();
// document.getElementById('date-time').innerHTML = getTime();

// setInterval(function () {
//     document.getElementById('date-time').innerHTML = getTime();
//     if (getTime() === '00:00:00') {
//         currentDay = new Date();
//         setDisplayCalendar();
//         console.log("zmieniam Ci html");
//     }
// }, 1000);
