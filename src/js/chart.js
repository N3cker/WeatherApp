import Chart from 'chart.js/auto';
import { getCity } from './variables';
import '../sass/index.scss';

const wrapper = document.querySelector('#canvas-wrapper');
const chartDisplay = document.querySelector('#myChart');
const button = document.querySelector('.show-hide');

button.addEventListener('click', showChart);

async function showChart() {
  if (chartDisplay.style.display !== 'none') {
    chartDisplay.style.display = 'none';
    wrapper.style.background = 'none';
    wrapper.style.boxShadow = 'none';
    button.textContent = 'Show Chart';
    await loadChart();
  } else {
    chartDisplay.style.display = 'block';
    wrapper.style.background = 'rgba(16, 33, 54, 0.8)';
    wrapper.style.boxShadow = '0px 8px 43px rgba(16, 33, 54, 0.8)';
    button.textContent = 'Hide Chart';
  };
};

export async function getData() {
  const API_KEY = '4da793d645cc6cbfba468135199f7159';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Szczecin&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  const { list } = data;
  const temperature = list.map(temp => { return temp.main.temp });
  const humidity = list.map(hum => { return hum.main.humidity }); 
  const windSpeed = list.map(ws => { return ws.wind.speed }); 
  const pressure = list.map(atm => { return atm.main.pressure });
  const dayTime = list.map(date => { return date.dt });

  let convertedDay = dayTime
    .map(day =>
      new Date(day * 1000)
    )
    .map(day =>
      day.toLocaleDateString('en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    );

  const day = [];
  for (let i = 0; i < convertedDay.length; i += 8) {
    day.push(convertedDay[i]);
  };
    return { temperature, humidity, windSpeed, pressure, day};
};

let myChart = null;

async function loadChart() {
  const ctx = document.querySelector('#myChart');
  const dataTemps = await getData()
    .catch(error => { console.error(error); console.log('error, error, error!!!'); });
  const data = {
    labels: dataTemps.day,
    datasets: [{
      label: ' — Temperature, C°',
      data: dataTemps.temperature,
      fill: false,
      backgroundColor: 'rgb(255,107,9)',
      borderColor: 'rgb(255,107,9)',
      borderWidth: 2
    },
    {
      label: ' — Humidity, %',
      data: dataTemps.humidity,
      hidden: true,
      fill: false,
      backgroundColor: 'rgb(9,6,235)',
      borderColor: 'rgb(9,6,235)',
      borderWidth: 2
    },
    {
      label: ' — Wind Speed, m/s',
      data: dataTemps.windSpeed,
      hidden: true,
      fill: false,
      backgroundColor: 'rgb(234,154,5)',
      borderColor: 'rgb(234,154,5)',
      borderWidth: 2
    },
    {
      label: ' — Atmosphere Pressure, m/m',
      data: dataTemps.pressure,
      hidden: true,
      fill: false,
      backgroundColor: 'rgb(6,120,6)',
      borderColor: 'rgb(6,120,6)',
      borderWidth: 2
    }]
  };
  const config = {
      type: 'line',
      data: data,
    options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#FFF',
              padding: 20
            },
            grid: {
              drawTicks: false,
              drawBorder: false,
              borderColor: '#FFF',
              color: '#FFF'
            }
          },
          y: {
            title: {
              display: true,
              position: 'left',
              text: 'Value of Indicators',
              color: '#FFF'
            },
            ticks: {
              color: '#FFF',
              padding: 15
            },
            grid: {
              drawTicks: false,
              drawBorder: false,
              borderColor: '#FFF',
              color: '#FFF'
            }
          }
      },
      layout: {
          padding: 16
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              padding: 20,
              color: '#FFF',
              font: {
                size: 14,
                weight: 400
              }
            },
          }
        }
      }
  };
  if (myChart !== null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
};