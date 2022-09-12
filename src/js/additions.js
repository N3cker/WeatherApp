import { setTimeZoneOffset } from '../js/dateTime';
import Notiflix from 'notiflix';

const input = document.querySelector('input[name="searchQuery"]');
const form = document.querySelector('.search__form');

const apiKey = '30726d0cea6dff3429ac7876b4e8bfdc';

function setTimeElements(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.name) {
        Notiflix.Notify.failure(
          'Sorry, there is no city matching your search query. Please try again.'
        );
        return;
      }
      setDisplayedTimeElements(data);
      setTimeZoneOffset(data.timezone);
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const trimmedValue = input.value.trim();
  setTimeElements(trimmedValue);
});

function setDisplayedTimeElements(data) {
  const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
  const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
  options = options = { hour: 'numeric', minute: 'numeric' };

  let displaySunrise = new Intl.DateTimeFormat('utc', options).format(
    new Date(sunrise.getTime() + sunrise.getTimezoneOffset() * 60000)
  );

  let displaySunset = new Intl.DateTimeFormat('utc', options).format(
    new Date(sunset.getTime() + sunset.getTimezoneOffset() * 60000)
  );

  document.getElementById('sunrise').innerHTML = displaySunrise;
  document.getElementById('sunset').innerHTML = displaySunset;
}
