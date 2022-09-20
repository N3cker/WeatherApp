import { showChart } from './chart';

const btnToday = document.querySelector("button[class='todaybtn']");
const btn5days = document.querySelector("button[class='fivedaysbtn']");

const sectionTodayWeather = document.querySelector('.today-weather');
const sectionTodayClock = document.querySelector('.today-clock');
const sectionSentence = document.querySelector('.sentence');
const weatherBtn = document.querySelector('.buttonsToday');
const fiveDaysWeather = document.querySelector('.five-days-wheather');
const fiveDaysWeatherContainer = document.querySelector('.wheather-container');
const chart = document.querySelector('#canvas-wrapper');
const sunriseSunset = document.querySelector('.current-set');
const infoWeatherMore = document.querySelector('.wheather__more-container');
const chartDisplay = document.querySelector('#myChart');

export const showTodayElements = () => {
  sectionTodayWeather.style.display = '';
  sectionTodayClock.style.display = '';
  sectionSentence.style.display = '';
  btnToday.style.display = '';
  btn5days.style.display = '';
  weatherBtn.style.display = '';
  sunriseSunset.style.display = '';

  fiveDaysWeather.style.display = 'none';
  chart.style.display = 'none';
  if (chartDisplay.style.display !== 'none') {
    showChart();
  }
  fiveDaysWeatherContainer.style.borderRadius = '34px';
};

export function show5daysElements() {
  sectionTodayWeather.style.display = 'none';
  sectionTodayClock.style.display = 'none';
  sectionSentence.style.display = 'none';
  btnToday.style.display = 'none';
  btn5days.style.display = 'none';
  weatherBtn.style.display = 'none';
  infoWeatherMore.style.display = 'none';

  fiveDaysWeather.style.display = '';
  chart.style.display = '';
  fiveDaysWeatherContainer.style.borderRadius = '34px';
}

export function show5daysMore() {
  infoWeatherMore.style.display = '';
  fiveDaysWeatherContainer.style.borderRadius = '34px 34px 0 0';
}

function hideStartElements() {
  sectionTodayWeather.style.display = 'none';
  weatherBtn.style.display = 'none';
  sunriseSunset.style.display = 'none';
}

showTodayElements();
hideStartElements();
