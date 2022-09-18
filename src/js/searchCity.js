import { forEach } from 'lodash';
import { getCity } from './variables';
const inputCity = document.querySelector('[name="searchQuery"');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let cities = [];

// let cities = [
//   'Madrid',
//   'Lisbon',
//   'Warsaw',
//   'Berlin',
//   'Paris',
//   'Rome',
//   'Miami',
//   'London',
// ];
let index = 0;

export function addCityKey() {
  let city = getCity();

  if (city.length < 1 || cities.includes(city)) {
    inputCity.value = '';
    return;
  }
  cities.push(city);

  const newCity = cities
    .map(
      newCity => `<li class="search__history-list-item">
                    <a href="#" class="search__city-name">${newCity}</a>
                    <p class="modal__close-city" data-item="${newCity}">X</p>
                </li>`
    )
    .join('');
  cityList.innerHTML = newCity;
  inputCity.value = '';
}

function carouselUp() {
  let liElems = cityList.querySelectorAll('li');
  index += 1;
  index = Math.min(Math.max(index, 0), liElems.length - 1);
  if (index < liElems.length - 4 && index > 0) {
    prevBtn.classList.remove('hidden-btn');
    liElems[index + 3].scrollIntoView({ behavior: 'smooth' });
  } else {
    nextBtn.classList.add('hidden-btn');
    liElems[index + 3].scrollIntoView({ behavior: 'smooth' });
  }
}

function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  index -= 1;
  index = Math.min(Math.max(index, 0), liElems.length - 1);
  if (index < liElems.length - 3 && index > 0) {
    nextBtn.classList.remove('hidden-btn');
    liElems[index].scrollIntoView({ behavior: 'smooth' });
  } else {
    prevBtn.classList.add('hidden-btn');
    liElems[index].scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('click', function (e) {
  if (e.target.tagName === 'P') {
    const value = e.target.getAttribute('data-item');
    const index = cities.indexOf(value);
    cities = [...cities.slice(0, index), ...cities.slice(index + 1)];
    e.target.parentElement.remove();
  }
});

nextBtn.addEventListener('click', carouselUp);
prevBtn.addEventListener('click', carouselDown);
inputCity.addEventListener('submit', addCityKey);
