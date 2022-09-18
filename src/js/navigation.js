const btnToday = document.querySelector("button[class='today']");
const btn5days = document.querySelector("button[class='fivedays']");

const btnToday2 = document.querySelector("button[class='today-btn']");
const btn5days2 = document.querySelector("button[class='five-days-btn']");

const sectionTodayWeather = document.querySelector('.today-weather');
const sectionTodayClock = document.querySelector('.today-clock');
const sectionSentence = document.querySelector('.sentence');
const weatherBtn = document.querySelector('.buttonsToday');
const fiveDaysWeather = document.querySelector('.five-days-wheather');
const weatherMore = document.querySelector('.wheather__more');
const chart = document.querySelector('#canvas-wrapper');
const sunriseSunset = document.querySelector('.current-set');

export const showTodayElements = () => {
  sectionTodayWeather.style.display = '';
  sectionTodayClock.style.display = '';
  sectionSentence.style.display = '';
  btnToday.style.display = '';
  btn5days.style.display = '';
  weatherBtn.style.display = '';
  sunriseSunset.style.display = '';

  fiveDaysWeather.style.display = 'none';
  weatherMore.style.display = 'none';
  chart.style.display = 'none';
};

export function show5daysElements() {
  sectionTodayWeather.style.display = 'none';
  sectionTodayClock.style.display = 'none';
  sectionSentence.style.display = 'none';
  btnToday.style.display = 'none';
  btn5days.style.display = 'none';
  weatherBtn.style.display = 'none';

  fiveDaysWeather.style.display = '';
  weatherMore.style.display = '';
  chart.style.display = '';
}

function hideStartElements() {
  sectionTodayWeather.style.display = 'none';
  weatherBtn.style.display = 'none';
  sunriseSunset.style.display = 'none';
}

showTodayElements();
hideStartElements();
