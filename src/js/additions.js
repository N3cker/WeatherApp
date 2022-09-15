import { getCity } from './variables';
import { setTimeZoneOffset, currentCityTime } from '../js/dateTime';
import Notiflix from 'notiflix';
import { fetchBgImg } from './fetchBgImg';

const form = document.querySelector('.search__form');

const apiKey = '30726d0cea6dff3429ac7876b4e8bfdc';
let sunrise;
let sunset;

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
      let isDay;

      if (
        getTimezonedSunrise().getTime() < currentCityTime().getTime() &&
        currentCityTime().getTime() < getTimezonedSunset().getTime()
      ) {
        isDay = true;
      } else {
        isDay = false;
      }
      fetchBgImg(isDay).then(response => {
        document.body.style.backgroundImage = `url(${response.hits[0].largeImageURL})`;
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const trimmedValue = getCity().trim();
  setTimeElements(trimmedValue);
});

function setDisplayedTimeElements(data) {
  sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
  sunset = new Date((data.sys.sunset + data.timezone) * 1000);
  options = options = { hour: 'numeric', minute: 'numeric' };

  let displaySunrise = new Intl.DateTimeFormat('utc', options).format(
    getTimezonedSunrise()
  );

  let displaySunset = new Intl.DateTimeFormat('utc', options).format(
    getTimezonedSunset()
  );

  document.getElementById('sunrise').innerHTML = displaySunrise;
  document.getElementById('sunset').innerHTML = displaySunset;
}

function getTimezonedSunrise() {
  return new Date(sunrise.getTime() + sunrise.getTimezoneOffset() * 60000);
}

function getTimezonedSunset() {
  return new Date(sunset.getTime() + sunset.getTimezoneOffset() * 60000);
}
