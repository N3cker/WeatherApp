// const apiKey = '30726d0cea6dff3429ac7876b4e8bfdc';

// export const fetchWeather = () => {
//   return fetchWeather(
//   `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}`
// )
//   .then(res => res.json())
//       .then(data => {
//           console.log(data);

//           const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
//           const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
//           options = options = { hour: 'numeric', minute: 'numeric' };

//           let displaySunrise = new Intl.DateTimeFormat('utc', options).format(
//               new Date(sunrise.getTime() + sunrise.getTimezoneOffset() * 60000)
//           );

//           let displaySunset = new Intl.DateTimeFormat('utc', options).format(
//               new Date(sunset.getTime() + sunset.getTimezoneOffset() * 60000)
//           );
//       }
