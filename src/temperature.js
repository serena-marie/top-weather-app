const defaultIdealTemp = 69;

function getIdealTemp() {
  let idealElValue = document.getElementById('idealTempInput').value-0;
  return (!idealElValue) ? defaultIdealTemp : idealElValue;
}

function calcTempDistance(currentTemp) {
  return currentTemp ? Math.abs(getIdealTemp() - currentTemp).toFixed(1) : -1;
}

function updateTempDistance() {
  const displayedTemp = document.getElementById('tempValue').textContent-0;
  const mathEl = document.getElementById('math');
  const result = calcTempDistance(displayedTemp);
  if(result !== -1) mathEl.textContent = result;
  else mathEl.hidden = true;
}

export { getIdealTemp, calcTempDistance, updateTempDistance };
