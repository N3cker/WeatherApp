import { forEach } from 'lodash';
import debounce from 'lodash.debounce';
import { getFavoriteCities } from './mainEvents';
import { getCity } from './variables';

const inputCity = document.querySelector('[name="searchQuery"');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let cities = getFavoriteCities();
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
    console.log('favsIndex');
    if (favsIndex != -1) {
      console.log(favsIndex);
      favs = [...favs.slice(0, favsIndex), ...favs.slice(favsIndex + 1)];
      localStorage.setItem('WeatherApp_favorites', favs.join('&'));
    }
  }
});

nextBtn.addEventListener('click', carouselUp);
prevBtn.addEventListener('click', carouselDown);

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

let indexUp = Math.round(slidesNumber) - 1;
let indexDown = indexUp - Math.round(slidesNumber) + 1;

window.addEventListener(
  'resize',
  debounce(
    () => {
      indexUp = Math.round(slidesNumber) - 1;
      // console.log('InDn begin: ' + indexDown);
      // console.log('InUp begin: ' + indexUp);
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
}

// console.log('InDn begin: ' + indexDown);
// console.log('InUp begin: ' + indexUp);

//function for higher resolution
// function carouselUp() {
//   let liElems = cityList.querySelectorAll('li');
//   indexUp += 1;
//   indexDown += 1;
//   prevBtn.classList.remove('hidden-btn');
//     if (indexUp < liElems.length - 1 && indexUp > 0) {
//       liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//       console.log('InUp: ' + indexUp);
//       console.log('InDn: ' + indexDown);
//     } else {
//       nextBtn.classList.add('hidden-btn');
//       liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//       indexDown = indexUp - Math.floor(slidesNumber) + 1; //seting index to move left
//       console.log('InUp: ' + indexUp);
//       console.log('InDn: ' + indexDown);
//     }
// }

// function carouselDown() {
//   let liElems = cityList.querySelectorAll('li');
//   indexDown -= 1;
//   indexUp -= 1;
//   nextBtn.classList.remove('hidden-btn');
//   if (indexDown < liElems.length - 1 && indexDown > 0) {
//     liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     console.log('InUp: ' + indexUp);
//     console.log('InDn: ' + indexDown);
//   } else {
//     prevBtn.classList.add('hidden-btn');
//     liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     indexUp = indexDown + Math.round(slidesNumber) - 1;
//     console.log('InUp: ' + indexUp);
//     console.log('InDn: ' + indexDown);
//   }
// }

//function for lower resolution
function carouselUp() {
  let liElems = cityList.querySelectorAll('li');
  indexUp += 1;
  indexDown += 1;
  prevBtn.classList.remove('hidden-btn');
  if (indexUp < liElems.length - 1 && indexUp > 0) {
    liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // console.log('InUp: ' + indexUp);
    // console.log('InDn: ' + indexDown);
  } else {
    nextBtn.classList.add('hidden-btn');
    liElems[indexUp].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    indexDown = indexUp - Math.round(slidesNumber) + 1; //seting index to move left
    // console.log('InUp: ' + indexUp);
    // console.log('InDn: ' + indexDown);
  }
}

function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  indexDown -= 1;
  indexUp -= 1;
  nextBtn.classList.remove('hidden-btn');
  if (indexDown < liElems.length - 1 && indexDown > 0) {
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // console.log('InUp: ' + indexUp);
    // console.log('InDn: ' + indexDown);
  } else {
    prevBtn.classList.add('hidden-btn');
    liElems[indexDown].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    indexUp = indexDown + Math.round(slidesNumber) - 1;
    // console.log('InUp: ' + indexUp);
    // console.log('InDn: ' + indexDown);
  }
}
