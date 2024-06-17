import { fetchWeather, transformData } from './weatherApi';
import { updateTempDistance } from './temperature';
import './styles/reset.css';
import './styles/index.css';

let weatherResults = {};

async function fetchAndFill(location = ''){
  const weatherData = await fetchWeather(location);
  weatherResults = await transformData(weatherData);
  fillData();
}

async function handleSearchClick(e) {
  const inputValue = document.getElementById('searchInput').value;
  const weatherData = await fetchWeather(inputValue);
  const weatherResults = await transformData(weatherData);
  fillData(weatherResults);
}

async function handleUnitChange() {
  fillData();
}

function handleSetTempClick() {
 updateTempDistance();
}

function fillData() {
  const tempUnit = document.getElementById('tempSelect').value;
  const tempEl = document.getElementById('tempValue');
  tempEl.textContent = tempUnit === 'f' ? weatherResults.tempF : weatherResults.tempC;

  const conditionEl = document.getElementById('condition');
  conditionEl.textContent = weatherResults.condition.text;

  const cityEl = document.getElementById('cityName');
  cityEl.textContent = weatherResults.city;

  const timeEl = document.getElementById('currentTime');
  timeEl.textContent = weatherResults.time;

  updateTempDistance();
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', (e) => handleSearchClick(e));

const idealTempButton = document.getElementById('idealButton');
idealTempButton.addEventListener('click', () => handleSetTempClick());

const tempUnitSelect = document.getElementById('tempSelect');
tempUnitSelect.addEventListener('change', () => handleUnitChange());

await fetchAndFill();