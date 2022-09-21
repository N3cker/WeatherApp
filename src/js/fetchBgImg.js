import { getCity } from './variables';

export const fetchBgImg = async isDay => {
  let suffix = '';
  if (isDay) {
    suffix = '';
  } else {
    suffix = 'night';
  }
  return await fetch(
    `https://pixabay.com/api/?key=29588079-fbc492831fdad231bf7222b96&q=${getCity()}+city+${suffix}&orientation=horizontal&safesearch=true&image_type=photo`
  )
    .then(res => {
      if (!res.ok) {
        if (res.status === 404) {
          return [];
        }
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(error => {
      console.error(error);
    });
};
