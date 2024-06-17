import { getIdealTemp } from "./temperature";

function updateTempElement(weatherResults) {
  const tempUnit = document.getElementById("tempSelect").value;
  const tempEl = document.getElementById("tempValue");
  tempEl.textContent =
    tempUnit === "f" ? weatherResults.tempF : weatherResults.tempC;
  return tempEl;
}

function updateConditionElement(weatherResults) {
  const conditionEl = document.getElementById("condition");
  conditionEl.textContent = weatherResults.condition.text;
  return conditionEl;
}

function updateCityElement(weatherResults) {
  const cityEl = document.getElementById("cityName");
  cityEl.textContent = weatherResults.city;
  return cityEl;
}

function updateTimeElement(weatherResults) {
  const timeEl = document.getElementById("currentTime");
  timeEl.textContent = weatherResults.time;
  return timeEl;
}

function updateIdealTemp() {
  const tempUnit = document.getElementById("tempSelect").value;
  const idealTemp = document.getElementById("idealTempInput");
  const idealTempValue = getIdealTemp();
  let convertedTemp;
  if (tempUnit === "f") {
    convertedTemp = (idealTempValue * 9) / 5 + 32;
  } else {
    convertedTemp = ((idealTempValue - 32) * 5) / 9;
  }
  idealTemp.value = convertedTemp.toFixed(1);
  return idealTemp;
}

export {
  updateTempElement,
  updateCityElement,
  updateConditionElement,
  updateTimeElement,
  updateIdealTemp,
};
