const defaultIdealTemp = 69;

function getIdealTemp() {
  const idealElValue = Number(document.getElementById("idealTempInput").value);
  return !idealElValue ? defaultIdealTemp : idealElValue;
}

function calcTempDistance(currentTemp) {
  return currentTemp ? Math.abs(getIdealTemp() - currentTemp).toFixed(1) : -1;
}

function updateTempDistance() {
  const displayedTemp = Number(
    document.getElementById("tempValue").textContent,
  );
  const mathEl = document.getElementById("math");
  const result = calcTempDistance(displayedTemp);
  if (result !== -1) mathEl.textContent = result;
  else mathEl.hidden = true;
}

export { getIdealTemp, calcTempDistance, updateTempDistance };
