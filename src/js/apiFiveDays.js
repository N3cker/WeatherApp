import { getCity } from './variables';

const btnFiveDays = document.querySelector('.five-days-btn');
const infoWeather = document.querySelector('.wheather-list');
const infoWeatherDay = document.querySelector('.wheather-list-item');
const btnMoreInfo = document.querySelector('.more-info');
const infoWeatherMore = document.querySelector('.wheather__more-list');



export const responseFiveDays = async function getWeather() {
  const api_url = `http://api.openweathermap.org/data/2.5/forecast?q=${getCity()}&lang=pl&units=metric&appid=c58ab9d92883ad1e6f51fe201539b277`;
  const response = await fetch(api_url);
  const data = await response.json();
  const list = data.list;
  const day = [];
  for (let i = 0; i < list.length; i += 8) {
    day.push(list[i]);
  }
  const markup = day
    .map(item => {
      let dt = new Date(item.dt * 1000);
      let nameDay = dt.toLocaleDateString('en', {
        weekday: 'long',
      });
      let nameDayMonth = dt.toLocaleDateString('en', {
        day: 'numeric',
        weekday: 'short',
      });
      return `<li class="wheather-list-item">
        <p class="day-of-the-week">${nameDay}</p>
        <p class="day-of-the-month">${nameDayMonth}</p>
        <img class="wheather-icon" src="http://openweathermap.org/img/wn/${
          item.weather[0].icon
        }@2x.png" alt="${item.weather[0].description}"></img>
        <p class="min-temp">Min: ${Math.ceil(item.main.temp_min)}</p>
        <p class="max-temp">Max: ${Math.ceil(item.main.temp_max)}</p>
        <button type='submit' class='more-info'>More Info</button>
        </li>`;
    })

    .join('');
  infoWeather.innerHTML = markup;
};
btnFiveDays.addEventListener('click', responseFiveDays);

export const responseFiveDaysMore = async function getWeatherMore() {
  const api_url = `http://api.openweathermap.org/data/2.5/forecast?q=${getCity()}&lang=pl&units=metric&appid=c58ab9d92883ad1e6f51fe201539b277`;
  const response = await fetch(api_url);
  const data = await response.json();
  const list = data.list;
  const markupMore = list
    .map((item, idx) => {
      if (idx <= 6) {
        let dt = new Date(item.dt * 1000);
        let hours = dt.getHours();
        return `<li class="wheather__more-list-item">
        <p class="wheather__hour">${hours}:00</p>
        <img class="wheather-icon" src="http://openweathermap.org/img/wn/${
          item.weather[0].icon
        }@2x.png" alt="${item.weather[0].description}"></img>
        <p class="wheather__temp">${Math.ceil(item.main.temp)}</p>
        <p class="wheather__barometer">${item.main.pressure}mm</p>
        <p class="wheather__humidity">${item.main.humidity}%</p>
        <p class="wheather__wind">${item.wind.speed} m/s</p>
      </li>`;
      }
    })

    .join('');
  infoWeatherMore.innerHTML = markupMore;
};
btnMoreInfo.addEventListener('click', responseFiveDaysMore);
