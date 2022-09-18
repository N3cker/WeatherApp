import { getCity } from './variables';
import img from '../images/weather-icons.svg'

const kelvinToCelsius = kelvin => Math.round(kelvin - 273.15);

export async function getTodayData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity()}&appid=d9a15daa009f4bc5f218b58d97ea6f20`;
  const response = await fetch(url);

  if (!response.ok)
    return alert(
      `Error: ${response.status}\nstatusText: ${response.statusText}`
    );

  const data = await response.json();
  return data;
}

export async function printTemperatures() {
  const todayCityName = document.querySelector('.today__cityName');
  const temperatureActual = document.querySelector('.today__temp--actuall');
  const temperatureMin = document.querySelector('.today__temp--minNum');
  const temperatureMax = document.querySelector('.today__temp--maxNum');
  const todayIcon = document.querySelector('.today__icon');

  const data = await getTodayData(getCity());
  
  const { temp, temp_max, temp_min } = data.main;

  const temperatureCelsius = kelvinToCelsius(temp);
  const temperatureMinCelsius = kelvinToCelsius(temp_min);
  const temperatureMaxCelsius = kelvinToCelsius(temp_max);

  todayIcon.innerHTML = `<use href="${img}#icon-${data.weather[0].icon}"></use>`
  todayCityName.innerHTML = `${data.name}, ${data.sys.country}`;
  temperatureActual.innerHTML = temperatureCelsius;
  temperatureMin.innerHTML = `${temperatureMinCelsius} °`;
  temperatureMax.innerHTML = `${temperatureMaxCelsius} °`;
}