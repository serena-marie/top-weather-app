import { format } from 'date-fns';

const defaultCity = 'San Francisco';
const apiKey = 'd8f8dda439d843419cb12224241606';
//`http://api.weatherapi.com/v1/current.json?key=d8f8dda439d843419cb12224241606&q=San Francisco&aqi=no
const baseUrl = 'https://api.weatherapi.com/v1/current.json';
const options = {
  mode: 'cors'
}

async function fetchWeather(location=defaultCity) {
  try {
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&aqi=no`, options);
    return response.json();
  } catch (error) {
    console.error(error); 
  }
}

async function transformData(data) {
  // console.log(data)
  try {
    const locationData = data?.location;
    const currentData = data?.current;
    let city = '', region = '', condition = '', tempC = '', tempF = '', time = '';
    if(locationData.name) city = locationData.name;
    if(locationData.region) region = locationData.region;
    if(currentData.condition) condition = currentData.condition;
    if(currentData.temp_c) tempC = currentData.temp_c;
    if(currentData.temp_f) tempF = currentData.temp_f;
    if(currentData.last_updated) {
      const transformedTime = format(new Date(currentData.last_updated), 'p');
      time = transformedTime;
    };

    return {
      city, region, condition, tempC, tempF, time
    }
  } catch (error) {
    console.error(error);
  }
}

export { fetchWeather, transformData };