import { fetchWeather, transformData } from "./weatherApi";
import { updateTempDistance } from "./temperature";
import {
  updateCityElement,
  updateConditionElement,
  updateTempElement,
  updateTimeElement,
  updateIdealTemp,
  updateBackground,
  updateSurprise,
} from "./uiRenderer";
import "./styles/reset.css";
import "./styles/index.css";
import "./iconsConfig";

let weatherResults = {};

async function fetchAndFill(location = "") {
  try {
    showLoadingIcon();
    const weatherData = await fetchWeather(location);
    weatherResults = await transformData(weatherData);
    fillData();
    return { status: "ok" };
  } catch (error) {
    return { error: `${error}` };
  } finally {
    hideLoadingIcon();
  }
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
  updateBackground(weatherResults);
  updateTempElement(weatherResults);
  updateConditionElement(weatherResults);
  updateCityElement(weatherResults);
  updateTimeElement(weatherResults);
  updateTempDistance();
}

function showLoadingIcon() {
  const loader = document.getElementById("loader");
  loader.style.display = "visible";
}

function hideLoadingIcon() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => handleSearchClick());

const idealTempButton = document.getElementById("idealButton");
idealTempButton.addEventListener("click", () => handleSetTempClick());

const tempUnitSelect = document.getElementById("tempSelect");
tempUnitSelect.addEventListener("change", () => handleUnitChange());

await fetchAndFill();

const observer = new MutationObserver((mutations) => updateSurprise(mutations));
const mathResults = document.getElementById("math");
const config = { childList: true };
observer.observe(mathResults, config);
