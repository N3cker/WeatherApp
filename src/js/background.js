import { fetchBgImg } from '../js/fetchBgImg';

const input = document.querySelector('#search-input');

const setDefaultBg = () => {
  let currentHoure = new Date().getHours();

  if (currentHoure >= 8 && currentHoure < 20) {
    document.body.classList.add('default-bg-day');
  } else {
    document.body.classList.add('default-bg-night');
  }
};

setDefaultBg();