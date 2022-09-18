import { setTimeElements } from './additions';
import { responseApi } from './apiFiveDays';
import { getData } from './chart';
import { show5daysElements, showTodayElements } from './navigation';
import { addCityKey } from './searchCity';
import { getTodayData, printTemperatures } from './todayTemperatures';
import { getCity, setCity } from './variables';

const form = document.querySelector('#search__form');
const inputCity = document.querySelector('[name="searchQuery"]');
const btnToday = document.querySelector("button[class='today']");
const btn5days = document.querySelector("button[class='fivedays']");
const btnTodayFrom5days = document.querySelector("button[class='today-btn']");
const btn5daysFrom5days = document.querySelector(
  "button[class='five-days-btn']"
);

async function setTodayPage(city) {
  setCity(city); //ustawienie city do zmiennej globalnej
  const data = await getTodayData(getCity()); //pobranie danych z API
  showTodayElements(); //pokazanie/schowanie odpowiednich elementów interfejsu
  await printTemperatures(data); //ustawienie dziennej pogody
  await setTimeElements(data); //ustawienie elementów czasu
  addCityKey(); //dodanie miasta do karuzeli
}

async function set5daysPage() {
  show5daysElements(); //pokazanie/schowanie odpowiednich elementów inferfejsu
  await responseApi(); //wywołanie API 5 dni
  await getData(); //przygotowanie danych do chartow
}

form.addEventListener('submit', e => { //search
  e.preventDefault();
  let city = inputCity.value.trim();
  setTodayPage(city);
});

btnToday.addEventListener('click', () => { //refresh today
  setTodayPage(getCity());
});
btnTodayFrom5days.addEventListener('click', () => { 
  setTodayPage(getCity());
});

btn5days.addEventListener('click', () => {
  set5daysPage();
});
btn5daysFrom5days.addEventListener('click', () => { //refresh 5 days
  set5daysPage();
});
