const weatherList = document.querySelector('.wheather__more-list');
const nextThreeHours = document.querySelector('.arrow-next-btn');
const prevThreeHours = document.querySelector('.arrow-back-btn');
const nextTwoHours = document.querySelector('.arrow-next');
const prevTwoHours = document.querySelector('.arrow-back');

let indexWeatherUp = 3;
let indexWeatherDown = 0;

let indexTwoUp = 1;
let indexTwoDown = 0;

function carouselBottomUp() {
  let liElems = weatherList.querySelectorAll('li');
  indexWeatherUp += 1;
  prevThreeHours.classList.remove('hidden-btn');
  if (indexWeatherUp < liElems.length - 1 && indexWeatherUp > 0) {
    liElems[indexWeatherUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexWeatherDown += 1;
  } else {
    nextThreeHours.classList.add('hidden-btn');
    liElems[indexWeatherUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexWeatherDown = indexWeatherUp - 3; //seting index to move left
  }
}

function carouselBottomDown() {
  let liElems = weatherList.querySelectorAll('li');
  indexWeatherDown -= 1;
  nextThreeHours.classList.remove('hidden-btn');
  if (indexWeatherDown < liElems.length - 1 && indexWeatherDown > 0) {
    liElems[indexWeatherDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexWeatherUp -= 1;
  } else {
    prevThreeHours.classList.add('hidden-btn');
    liElems[indexWeatherDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexWeatherUp = indexWeatherDown + 3;
  }
}

function carouselMiddleUp() {
  let liElems = weatherList.querySelectorAll('li');
  indexTwoUp += 1;
  // prevThreeHours.classList.remove('hidden-btn');
  if (indexTwoUp < liElems.length - 1 && indexTwoUp > 0) {
    liElems[indexTwoUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexTwoDown = indexTwoUp - 1;
  } else {
    // nextThreeHours.classList.add('hidden-btn');
    liElems[indexTwoUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexTwoDown = indexTwoUp - 1; //seting index to move left
  }
}

function carouselMiddleDown() {
  let liElems = weatherList.querySelectorAll('li');
  indexTwoDown -= 1;
  // prevThreeHours.classList.remove('hidden-btn');
  if (indexTwoDown < liElems.length - 1 && indexTwoDown > 0) {
    liElems[indexTwoDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexTwoUp = indexTwoDown + 1;
  } else {
    // nextThreeHours.classList.add('hidden-btn');
    liElems[indexTwoDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexTwoUp = indexTwoDown + 1; //seting index to move left
  }
}

nextThreeHours.addEventListener('click', carouselBottomUp);
prevThreeHours.addEventListener('click', carouselBottomDown);
nextTwoHours.addEventListener('click', carouselMiddleUp);
prevTwoHours.addEventListener('click', carouselMiddleDown);
