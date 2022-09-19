import { forEach } from 'lodash';
import { getCity } from './variables';
const inputCity = document.querySelector('[name="searchQuery"');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let cities = [];
//   'Madrid',
//   'Lisbon',
//   'Warsaw',
//   'Berlin',
//   'Paris',
//   'Rome',
//   'Miami',
//   'London',
// ];

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

//closing function
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

const nodeList = cityList; //parent element for cities list
let childs = nodeList.children; //all cities elements list
// let firstChild = nodeList.children[0]; //first city in list
// let cityName = firstChild.firstElementChild.textContent; //content of first child

//total width of cities elements in memory
for (let i = 0; i < childs.length; i += 1) {
  let elemWidth = nodeList.children[i].getBoundingClientRect().width + 10;
  // console.log(elemWidth);
}

let carouselWidth = cityList.getBoundingClientRect().width;
let widthToMove = nodeList.children[0].getBoundingClientRect().width + 10;
let slidesNumber = carouselWidth / widthToMove; //number of elements in carousel

let index = Math.floor(slidesNumber) - 1;

function carouselUp() {
  let liElems = cityList.querySelectorAll('li');
  index += 1;
  prevBtn.classList.remove('hidden-btn');
  if (index < liElems.length - 1 && index > 0) {
    liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    nextBtn.classList.add('hidden-btn');
    liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    index = childs.length - index + 1; //seting index to move left
  }
}

function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  index -= 1;
  nextBtn.classList.remove('hidden-btn');
  if (index < liElems.length - 1 && index > 0) {
    liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    prevBtn.classList.add('hidden-btn');
    liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    index = Math.floor(slidesNumber) - 1;
  }
}
