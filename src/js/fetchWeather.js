// const inputVal = document.querySelector('#search-input');
// const apiKey = '30726d0cea6dff3429ac7876b4e8bfdc';
// const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;

// // fetch(url)
// //   .then(res => res.json())
// //   .then(data => console.log(data));

// export const fetchWeather = inputValue => {
//   return fetchWeather(url)
//     .then (response => {
//       if (!response.ok) {
//         if (response.status === 404) {
//           return [];
//         }
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
