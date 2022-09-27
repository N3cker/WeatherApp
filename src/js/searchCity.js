import debounce from 'lodash.debounce';
import { getFavoriteCities } from './mainEvents';
import { getCity } from './variables';

const inputCity = document.querySelector('[name="searchQuery"');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


const weatherList = document.querySelector('.wheather__more-list');
const nextThreeHours = document.querySelector('.arrow-next-btn');
const prevThreeHours = document.querySelector('.arrow-back-btn');

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

inputCity.addEventListener('submit', addCityKey);
nextThreeHours.addEventListener('click', carouselBottomUp);
prevThreeHours.addEventListener('click', carouselBottomDown);

const nodeList = cityList; //parent element for cities list


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


const nodeWeatherlist = weatherList;
let weatherWidth = weatherList.getBoundingClientRect().width;
let widthToMoveWeather =
  nodeWeatherlist.children[0].getBoundingClientRect().width + 10;

let indexUp = Math.round(slidesNumber) - 1;
let indexDown = 0;
// let indexWeatherUp = Math.round(
//   weatherList.getBoundingClientRect().width /
//     (nodeWeatherlist.children[0].getBoundingClientRect().width + 10) -
//     2
// );
let indexWeatherUp = Math.round(
  weatherList.getBoundingClientRect().width /
    (nodeWeatherlist.children[0].getBoundingClientRect().width + 10) -
    1
);
let indexWeatherDown = 0;
console.log('slides before resize: ' + indexWeatherUp);

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

      let liElems = weatherList.querySelectorAll('li');
      indexUp =
        Math.round(
          cityList.getBoundingClientRect().width /
            (nodeList.children[0].getBoundingClientRect().width + 10)
        ) - 1;
      indexWeatherUp = Math.round(
        weatherList.getBoundingClientRect().width /
          (nodeWeatherlist.children[0].getBoundingClientRect().width + 10) -
          1
      );
      indexWeatherDown = Math.max(
        0,
        Math.round(
          weatherList.getBoundingClientRect().width /
            (nodeWeatherlist.children[0].getBoundingClientRect().width + 10) -
            4
        )
      );
      liElems[indexWeatherDown].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });

      console.log(indexUp);
      console.log('indexWeatherUp: ' + indexWeatherUp);
      console.log('indexWeatherDown: ' + indexWeatherDown);

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


//function for carousel

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

    indexDown =
      indexUp -
      Math.round(
        cityList.getBoundingClientRect().width /
          (nodeList.children[0].getBoundingClientRect().width + 10)
      ) +
      1; //seting index to move left

    indexDown = indexUp - Math.round(slidesNumber) + 1; //seting index to move left

  }
}

function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  indexDown -= 1;
  indexUp -= 1;
  nextBtn.classList.remove('hidden-btn');
  if (indexDown < liElems.length - 2 && indexDown > 0) {
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    prevBtn.classList.add('hidden-btn');
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    indexUp =
      indexDown +
      Math.round(
        cityList.getBoundingClientRect().width /
          (nodeList.children[0].getBoundingClientRect().width + 10)
      ) -
      1;

    indexUp = indexDown + Math.round(slidesNumber) - 1;

  }
}

function carouselBottomUp() {
  let liElems = weatherList.querySelectorAll('li');
  indexWeatherUp += 1;
  indexWeatherDown += 1;
  prevThreeHours.classList.remove('hidden-btn');
  if (indexWeatherUp < liElems.length - 1 && indexWeatherUp > 0) {
    liElems[indexWeatherUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    console.log('InUpIf: ' + indexWeatherUp);
    console.log('InDnIf: ' + indexWeatherDown);
  } else {
    nextThreeHours.classList.add('hidden-btn');
    liElems[indexWeatherUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    console.log('InUpElse: ' + indexWeatherUp);
    console.log('InDnElse: ' + indexWeatherDown);
    // indexWeatherDown = indexWeatherUp - 3; //seting index to move left
  }
}

function carouselBottomDown() {
  let liElems = weatherList.querySelectorAll('li');
  indexWeatherUp -= 1;
  indexWeatherDown -= 1;
  nextThreeHours.classList.remove('hidden-btn');
  if (indexWeatherDown < liElems.length - 1 && indexWeatherDown > 0) {
    liElems[indexWeatherDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    console.log('InUpIf: ' + indexWeatherUp);
    console.log('InDnIf: ' + indexWeatherDown);
  } else {
    prevThreeHours.classList.add('hidden-btn');
    liElems[indexWeatherDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    console.log('InUpElse: ' + indexWeatherUp);
    console.log('InDnElse: ' + indexWeatherDown);
  }
}

// let childs = nodeList.children; //all cities elements list
// let firstChild = nodeList.children[0]; //first city in list
// let cityName = firstChild.firstElementChild.textContent; //content of first child

//total width of cities elements in memory
// for (let i = 0; i < childs.length; i += 1) {
// let elemWidth = nodeList.children[i].getBoundingClientRect().width + 10;
// console.log(elemWidth);
// }

// console.log('InUp: ' + indexUp);
// console.log('InDn: ' + indexDown);
