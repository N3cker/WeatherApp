import debounce from 'lodash.debounce';
import { getFavoriteCities } from './mainEvents';
import { getCity } from './variables';

const inputCity = document.querySelector('[name="searchQuery"');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let cities = getFavoriteCities();

let carouselWidth = cityList.offsetWidth;
let widthToMove = cityList.children[0].offsetWidth + 10;
let slidesNumber = carouselWidth / widthToMove; //number of elements in carousel

let indexUp = Math.round(slidesNumber) - 1;
let indexDown = indexUp - Math.round(slidesNumber) + 1;

setCarouselHtml();

export function addCityKey() {
  let city = getCity();

  if (city.length < 1 || cities.includes(city)) {
    inputCity.value = '';
    return;
  }
  cities.push(city);

  setCarouselHtml();
  inputCity.value = '';
}

//closing function
cityList.addEventListener('click', function (e) {
  if (e.target.tagName === 'P') {
    const value = e.target.getAttribute('data-item');
    const index = cities.indexOf(value);
    cities = [...cities.slice(0, index), ...cities.slice(index + 1)];
    e.target.parentElement.remove();
    let favs = getFavoriteCities();
    const favsIndex = favs.indexOf(value);
    if (favsIndex != -1) {
      favs = [...favs.slice(0, favsIndex), ...favs.slice(favsIndex + 1)];
      localStorage.setItem('WeatherApp_favorites', favs.join('&'));
    }
    calculateCarousel();
  }
});

nextBtn.addEventListener('click', carouselUp);
prevBtn.addEventListener('click', carouselDown);

calculateCarousel();


function calculateCarousel() {
  let children = cityList.children; //all cities elements list
  let sumElemWidths = -10; //minus last margin
  //total width of cities elements in memory
  for (let i = 0; i < children.length; i += 1) {
    let elemWidth = cityList.children[i].offsetWidth + 10;
    sumElemWidths += elemWidth;
  }
  let containerWidth = cityList.offsetWidth;
  if (containerWidth >= sumElemWidths) {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
  } else {
    nextBtn.style.display = '';
    prevBtn.style.display = '';
  }

  carouselWidth = cityList.getBoundingClientRect().width;
  widthToMove = cityList.children[0].getBoundingClientRect().width + 10;
  slidesNumber = carouselWidth / widthToMove; //number of elements in carousel

  indexUp = Math.round(slidesNumber) - 1;
  indexDown = indexUp - Math.round(slidesNumber) + 1;
}

window.addEventListener(
  'resize',
  debounce(
    () => {
      calculateCarousel();
      indexUp = Math.round(slidesNumber) - 1;
    },
    300,
    {
      leading: false,
      trailing: true,
    }
  )
);

function setCarouselHtml() {
  const newCity = cities
    .map(
      newCity => `<li class="search__history-list-item">
                    <a href="#" class="search__city-name">${newCity}</a>
                    <p class="modal__close-city" data-item="${newCity}">X</p>
                </li>`
    )
    .join('');
  cityList.innerHTML = newCity;
  calculateCarousel();
}

//function for lower resolution
function carouselUp() {
  let liElems = cityList.querySelectorAll('li');
  indexUp += 1;
  indexDown += 1;
  prevBtn.classList.remove('hidden-btn');
  if (indexUp < liElems.length - 1 && indexUp > 0) {
    liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    nextBtn.classList.add('hidden-btn');
    liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    indexDown = indexUp - Math.round(slidesNumber) + 1; //seting index to move left
  }
}

function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  indexDown -= 1;
  indexUp -= 1;
  nextBtn.classList.remove('hidden-btn');
  if (indexDown < liElems.length - 1 && indexDown > 0) {
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    prevBtn.classList.add('hidden-btn');
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    indexUp = indexDown + Math.round(slidesNumber) - 1;
  }
}
