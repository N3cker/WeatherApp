import { getCity } from './variables';

const input = document.querySelector('input');
const form = document.getElementById('search__form');

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

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d9a15daa009f4bc5f218b58d97ea6f20`;
  const response = await fetch(url);

  if (!response.ok)
    return alert(
      `Error: ${response.status}\nstatusText: ${response.statusText}`
    );

  const data = await response.json();

  const { temp, temp_max, temp_min } = data.main;

  const temperatureCelsius = kelvinToCelsius(temp);
  const temperatureMinCelsius = kelvinToCelsius(temp_min);
  const temperatureMaxCelsius = kelvinToCelsius(temp_max);

  // console.log('temperature:', temperatureCelsius, 'temperature min:', temperatureMinCelsius, 'temperature max:', temperatureMaxCelsius);

  const temperatures = {
    temperature_now: temperatureCelsius,
    temperature_min: temperatureMinCelsius,
    temperature_max: temperatureMaxCelsius,
  };

  return temperatures;
}

export async function printTemperatures() {
  const temperatureActual = document.querySelector('.today__temp--actuall');
  const temperatureMin = document.querySelector('.today__temp--minNum');
  const temperatureMax = document.querySelector('.today__temp--maxNum');

  const temperatures = await getWeatherData(getCity());

  console.log(temperatures);

  temperatureActual.innerHTML = temperatures.temperature_now;
  temperatureMin.innerHTML = temperatures.temperature_min;
  temperatureMax.innerHTML = temperatures.temperature_max;
}

