const infoWeather = document.querySelector('.wheather-list');

const api_url =
  'http://api.openweathermap.org/data/2.5/forecast?q=warszawa&cnt=5&lang=pl&units=metric&appid=c58ab9d92883ad1e6f51fe201539b277';

export const responseApi = async function getWeather() {
  const response = await fetch(api_url);
  const data = await response.json();
  const list = data.list;
  const markup = list
    .map(
      item => `<li class="wheather-list-item"
    <p class="day-of-the-week">Sunday</p>
        <p class="day-of-the-month">${item.dt_txt}</p>
        <p class="wheather-icon">${item.weather.icon}</p>
        <p class="min-temp">Min: ${Math.ceil(item.main.temp_min)}</p>
        <p class="max-temp">Max: ${Math.ceil(item.main.temp_max)}</p>
        <button type='submit' class='more-info'>More Info</button>
        </li>`
    )
    .join('');
  console.log('markup', markup);
  infoWeather.innerHTML = markup;
};
