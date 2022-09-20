import { setCity } from './variables';

export async function getTodayDataByLocation() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=d9a15daa009f4bc5f218b58d97ea6f20`;
        const response = await fetch(url);

        if (!response.ok) {
          reject(
            `Error: ${response.status}\nstatusText: ${response.statusText}`
          );
        }
        const data = await response.json();
        setCity(data.name);
        resolve(data);
      });
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}
