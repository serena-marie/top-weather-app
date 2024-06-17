import { fetchWeather, transformData } from './weatherApi';
import { updateTempDistance } from './temperature';
import './styles/reset.css';
import './styles/index.css';

function fillData(weatherResults) {
    // Fill data 
  const tempEl = document.getElementById('tempValue');
  tempEl.textContent = weatherResults.tempF;

  const conditionEl = document.getElementById('condition');
  conditionEl.textContent = weatherResults.condition.text;

  const cityEl = document.getElementById('cityName');
  cityEl.textContent = weatherResults.city;

  const timeEl = document.getElementById('currentTime');
  timeEl.textContent = weatherResults.time;

  updateTempDistance();
}

async function handleSearchClick(e) {
  const inputValue = document.getElementById('searchInput').value;
  const weatherData = await fetchWeather(inputValue);
  const weatherResults = await transformData(weatherData);
  fillData(weatherResults);
}

function handleSetTempClick() {
 updateTempDistance();
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', (e) => handleSearchClick(e));

const idealTempButton = document.getElementById('idealButton');
idealTempButton.addEventListener('click', () => handleSetTempClick());

const defaultData = await fetchWeather();
const results = await transformData(defaultData);

fillData(results);