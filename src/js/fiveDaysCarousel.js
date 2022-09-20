const weatherList = document.querySelector('.wheather__more-list');
const nextThreeHours = document.querySelector('.arrow-next-btn');
const prevThreeHours = document.querySelector('.arrow-prev-btn');

let indexWeather = 5;

function carouselBottomUp() {
  let liElems = weatherList.querySelectorAll('li');
  console.log(liElems);
  indexWeather += 1;
  console.log(indexWeather);
  //   prevThreeHours.classList.remove('hidden-btn');
  if (indexWeather < liElems.length - 1 && indexWeather > 0) {
    liElems[indexWeather].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  } else {
    // nextThreeHours.classList.add('hidden-btn');
    liElems[indexWeather].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    indexWeather = 2; //seting index to move left
  }
}

// function carouselBottomDown() {
//   let liElems = weatherList.querySelectorAll('li');
//   index -= 1;
//   nextBtn.classList.remove('hidden-btn');
//   if (index < liElems.length - 1 && index > 0) {
//     liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//   } else {
//     prevBtn.classList.add('hidden-btn');
//     liElems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     index = Math.floor(slidesNumber) - 1;
//   }
// }
nextThreeHours.addEventListener('click', carouselBottomUp);
// prevThreeHours.addEventListener('click', carouselBottomDown);
