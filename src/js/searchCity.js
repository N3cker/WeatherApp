import { setCity } from './variables';
const inputCity = document.querySelector('[name="searchQuery"]');
const cityList = document.querySelector('.search__history-list');
const searchBtn = document.querySelector('.search__more-city');
let cities = [];

function addCityKey(e) {
  if (e.key !== 'Enter') {
    return;
  }
  let city = e.target.value.trim();
    setCity(city);
  if (city.length < 1 || cities.includes(city)) {
    e.target.value = '';
    return;
  }
  cities.push(city);

  const newCity = cities
    .map(
      newCity => `<li class="search__history-list-item">
                    <a href="#" class="search__city-name">${newCity}</a>
                    <p class="modal__close-city">X</p>
                </li>`
    )
    .join('');
  cityList.innerHTML = newCity;
  e.target.value = '';
}

function addCityMouse() {
  let city = inputCity.value.trim();
  setCity(city);
  
  if (city.length < 1 || cities.includes(city)) {
    inputCity.value = '';
    return;
  }
  cities.push(city);

  const newCity = cities
    .map(
      newCity => `<li class="search__history-list-item">
                        <a href="#" class="search__city-name">${newCity}</a>
                        <p class="modal__close-city">X</p>
                    </li>`
    )
    .join('');
  cityList.innerHTML = newCity;
  inputCity.value = '';
}

inputCity.addEventListener('keydown', addCityKey);
searchBtn.addEventListener('click', addCityMouse);
