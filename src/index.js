import { fetchWeather, transformData } from "./weatherApi";
import { updateTempDistance } from "./temperature";
import {
  updateCityElement,
  updateConditionElement,
  updateTempElement,
  updateTimeElement,
  updateIdealTemp,
} from "./uiRenderer";
import "./styles/reset.css";
import "./styles/index.css";

let weatherResults = {};

async function fetchAndFill(location = "") {
  const weatherData = await fetchWeather(location);
  weatherResults = await transformData(weatherData);
  fillData();
}

async function handleSearchClick() {
  const inputValue = document.getElementById("searchInput").value;
  fetchAndFill(inputValue);
}

function handleUnitChange() {
  updateTempElement(weatherResults);
  updateIdealTemp();
  updateTempDistance();
}

function handleSetTempClick() {
  updateTempDistance();
}

function fillData() {
  updateTempElement(weatherResults);
  updateConditionElement(weatherResults);
  updateCityElement(weatherResults);
  updateTimeElement(weatherResults);
  updateTempDistance();
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => handleSearchClick());

const idealTempButton = document.getElementById("idealButton");
idealTempButton.addEventListener("click", () => handleSetTempClick());

const tempUnitSelect = document.getElementById("tempSelect");
tempUnitSelect.addEventListener("change", () => handleUnitChange());

await fetchAndFill();
