const weatherList = document.querySelector('.wheather__more-list');
const nextThreeHours = document.querySelector('.arrow-next-btn');
const prevThreeHours = document.querySelector('.arrow-back-btn');

let indexWeatherUp = 4;
let indexWeatherDown = 1;

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
    indexWeatherDown = 3; //seting index to move left
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
    indexWeatherUp = 4;
  }
}
nextThreeHours.addEventListener('click', carouselBottomUp);
prevThreeHours.addEventListener('click', carouselBottomDown);
