import { setTimeZoneOffset } from '../js/dateTime';

// import { fetchWeather } from '../js/fetchWeather'
import Notiflix from 'notiflix';

const input = document.querySelector('input[name="searchQuery"]');

const form = document.querySelector('.search__form');

const apiKey = '30726d0cea6dff3429ac7876b4e8bfdc';

function fetchWeather(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data.name);

      const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
      const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
      options = options = { hour: 'numeric', minute: 'numeric' };

      let displaySunrise = new Intl.DateTimeFormat('utc', options).format(
        new Date(sunrise.getTime() + sunrise.getTimezoneOffset() * 60000)
      );

      let displaySunset = new Intl.DateTimeFormat('utc', options).format(
        new Date(sunset.getTime() + sunset.getTimezoneOffset() * 60000)
      );

      console.log(displaySunrise, 'sunrise');
      console.log(displaySunset, 'sunset');

      document.getElementById('sunrise').innerHTML = displaySunrise;
      document.getElementById('sunset').innerHTML = displaySunset;

      d = new Date();
      localTime = d.getTime();
      localOffset = d.getTimezoneOffset() * 60000;
      utc = localTime + localOffset;
      let cityTime = utc + 1000 * data.timezone;
      setTimeZoneOffset(data.timezone);
      nd = new Date(cityTime);

      console.log(nd, 'nd');
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetch(trimmedValue).then(data => {
      if (false) {
        Notiflix.Notify.failure(
          'Sorry, there is no city matching your search query. Please try again.'
        );
      }
    });

    fetchWeather(trimmedValue);
  }
});
