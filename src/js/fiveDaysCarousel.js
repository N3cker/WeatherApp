const weatherDaysList = document.querySelector('.wheather-list');

const nextDay = document.querySelector('.arrow-next');
const prevDay = document.querySelector('.arrow-back');

let indexDayUp = 2;
let indexDayDown = 0;

function carouselMiddleUp() {
  let liElems = weatherDaysList.querySelectorAll('li');
  // prevThreeHours.classList.remove('hidden-btn');
  if (indexDayUp < liElems.length - 1 && indexDayUp > 0) {
    indexDayUp += 1;
    indexDayDown += 1;
    liElems[indexDayUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  } else {
    // nextThreeHours.classList.add('hidden-btn');
    liElems[indexDayUp].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
}

function carouselMiddleDown() {
  let liElems = weatherDaysList.querySelectorAll('li');

  // prevThreeHours.classList.remove('hidden-btn');
  if (indexDayDown < liElems.length - 1 && indexDayDown > 0) {
    indexDayUp -= 1;
    indexDayDown -= 1;
    liElems[indexDayDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  } else {
    // nextThreeHours.classList.add('hidden-btn');
    liElems[indexDayDown].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
}

nextDay.addEventListener('click', carouselMiddleUp);
prevDay.addEventListener('click', carouselMiddleDown);
