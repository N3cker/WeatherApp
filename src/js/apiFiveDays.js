import { getCity } from './variables';
import img from '../images/weather-icons.svg';

const btnFiveDays = document.querySelector('.five-days-btn');
const infoWeather = document.querySelector('.wheather-list');
const infoWeatherMore = document.querySelector('.wheather__more-list');

//funkcja przerabia otrzymane dane na mapę, w której kluczem jest dzień w formacie ISO, a wartością minimalna i maksymalna temperatura z danego dnia
const createDataFiveDays = list => {
  const result = list.reduce((acc, day) => {
    const date = day.dt_txt.split(' ')[0];
    if (acc[date]) {
      acc[date].temp_max = Math.max(acc[date].temp_max, day.main.temp_max);
      acc[date].temp_min = Math.min(acc[date].temp_min, day.main.temp_min);
    } else {
      acc[date] = { temp_max: day.main.temp_max, temp_min: day.main.temp_min };
    }
    return acc;
  }, {});
  return result;
};

const convertDateToISODay = date => date.toISOString().split('T')[0];

export const responseFiveDays = async function getWeather() {
  const api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${getCity()}&lang=pl&units=metric&appid=c58ab9d92883ad1e6f51fe201539b277`;
  const response = await fetch(api_url);
  const data = await response.json();
  const list = data.list;
  const day = [];
  for (let i = 0; i < list.length; i += 8) {
    day.push(list[i]);
  }
  const minMaxData = createDataFiveDays(list);
  const markup = day
    .map((item, idx) => {
      let dt = new Date(item.dt * 1000);
      let nameDay = dt.toLocaleDateString('en', {
        weekday: 'long',
      });
      let nameDayMonth = dt.toLocaleDateString('en', {
        day: 'numeric',
        weekday: 'short',
      });
      return `<li class="wheather-list-item not-active-day" name="${item.dt}">
        <p class="day-of-the-week">${nameDay}</p>
        <p class="day-of-the-month">${nameDayMonth}</p>
        <p class="wheather-icon"><svg class="svg_5days"><use href="${img}#icon-${
        item.weather[0].icon
      }"></use></svg></p>
      <div class="temp-container">
        <p class="min-temp">min</p>
        <p class="max-temp">max</p>
        </div>
        <div class="temp-container">
        <p class="min-temperature">${Math.round(
          minMaxData[convertDateToISODay(dt)].temp_min
        )}</p>
        <p class="max-temperature">${Math.round(
          minMaxData[convertDateToISODay(dt)].temp_max
        )}</p>
        </div>
        <a href="#" class="more-info">more info</a>
        </li>`;
    })

    .join('');
  infoWeather.innerHTML = markup;
};

export async function responseFiveDaysMore(dt) {
  const incomingDt = new Date(dt * 1000);
  const api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${getCity()}&lang=pl&units=metric&appid=c58ab9d92883ad1e6f51fe201539b277`;
  const response = await fetch(api_url);
  const data = await response.json();
  const list = data.list;
  const markupMore = list
    .map((item, idx) => {
      let dt = new Date(item.dt * 1000);
      if (dt.getDay() == incomingDt.getDay()) {
        let hours = dt.getHours();
        return `<li class="wheather__more-list-item">
        <p class="wheather__hour">${hours}:00</p>
        <p class="wheather__icon"><svg class="svg_moreInfo"><use href="${img}#icon-${
          item.weather[0].icon
        }"></use></svg></p>
        <p class="wheather__temp">${Math.ceil(item.main.temp)}</p>
        <p class="wheather__barometer">${item.main.pressure}hPa</p>
        <p class="wheather__humidity">${item.main.humidity}%</p>
        <p class="wheather__wind">${item.wind.speed} m/s</p>
      </li>`;
      }
    })

    .join('');
  infoWeatherMore.innerHTML = markupMore;
}
