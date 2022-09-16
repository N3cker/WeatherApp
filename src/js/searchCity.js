import { setCity } from './variables';
const inputCity = document.querySelector('[name="searchQuery"]');
const cityList = document.querySelector('.search__history-list');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let cities = [];
let index = 0;

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
                    <p class="modal__close-city" onclick="removeCity(this,'${newCity}')">X</p>
                </li>`
    )
    .join('');
  cityList.innerHTML = newCity;
  e.target.value = '';
}

function removeCity(elem, city) {
  // let cityIndex = cities.indexOf(city);
  console.log(elem, city);
  //   cities = [...cities.slice(0, cityIndex), ...cities.slice(cityIndex + 1)];
  //   elem.parentElement.remove();
  //   console.log(cities);
}

function carouselUp() {
  let liElems = cityList.querySelectorAll('li');
  index += 1;
  index = Math.min(Math.max(index, 0), liElems.length - 1);
  if (index <= 1 || index < liElems.length - 1) {
    prevBtn.classList.remove('hidden-btn');
  } else {
    nextBtn.classList.add('hidden-btn');
  }
  liElems[index].scrollIntoView({ behavior: 'smooth' });
  console.log(liElems[index]);
}
function carouselDown() {
  let liElems = cityList.querySelectorAll('li');
  index -= 1;
  index = Math.min(Math.max(index, 0), liElems.length - 1);
  if (index < liElems.length - 1 && index > 0) {
    nextBtn.classList.remove('hidden-btn');
  } else {
    prevBtn.classList.add('hidden-btn');
  }
  liElems[index].scrollIntoView({ behavior: 'smooth' });
  console.log(index);
}

nextBtn.addEventListener('click', carouselUp);
prevBtn.addEventListener('click', carouselDown);
inputCity.addEventListener('keydown', addCityKey);

// function addCityMouse() {
//   let city = inputCity.value.trim();
//   setCity(city);

//   if (city.length < 1 || cities.includes(city)) {
//     inputCity.value = '';
//     return;
//   }
//   cities.push(city);

//   const newCity = cities
//     .map(
//       newCity => `<li class="search__history-list-item">
//                         <a href="#" class="search__city-name">${newCity}</a>
//                         <p class="modal__close-city">X</p>
//                     </li>`
//     )
//     .join('');
//   cityList.innerHTML = newCity;
//   inputCity.value = '';
// }

// searchBtn.addEventListener('click', addCityMouse);
