import { getIdealTemp } from "./temperature";
import { weatherClasses } from "./weatherClasses";
import { giphy } from "./giphyApi";
import "./styles/conditions.css";

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

function updateBackground(weather) {
  const main = document.querySelector("body");
  const currentClass = main.classList[0];

  const timeOfDay = weather.isDay ? "day" : "night";
  let newClass = "default";
  Object.entries(weatherClasses[timeOfDay]).forEach(([className, codes]) => {
    if (codes.includes(weather.condition.code)) {
      newClass = className;
    }
  });

  main.classList.remove(currentClass);
  main.classList.add(newClass);
}

async function updateSurprise(mutations) {
  const changedText = mutations[0].target.textContent;
  const surpriseDiv = document.getElementById("surprise");
  if (changedText === "0.0") {
    surpriseDiv.classList.add("showSurprise");
    const image = document.createElement("img");
    image.src = await giphy();
    surpriseDiv.append(image);
  } else {
    if (surpriseDiv.classList.contains("showSurprise")) {
      surpriseDiv.classList.remove("showSurprise");
    }

    if (surpriseDiv.hasChildNodes()) {
      surpriseDiv.textContent = "";
    }
  }
}

export {
  updateTempElement,
  updateCityElement,
  updateConditionElement,
  updateTimeElement,
  updateIdealTemp,
  updateBackground,
  updateSurprise,
};
