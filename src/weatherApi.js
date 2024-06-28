import { format } from "date-fns";

const defaultCity = "San Francisco";
const apiKey = "d8f8dda439d843419cb12224241606";
const baseUrl = "https://api.weatherapi.com/v1/current.json";
const options = {
  mode: "cors",
};

async function fetchWeather(location = defaultCity) {
  const loc = (location || defaultCity).replace(/[^a-zA-Z\s,.]/g, "").trim();

  try {
    const response = await fetch(
      `${baseUrl}?key=${apiKey}&q=${loc}&aqi=no`,
      options,
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const statusMessage = `Response was not ok. status: ${response.status}`;
      const moreInfo = errorResponse
        ? `\n[Weather_API]: ${JSON.stringify(errorResponse)}`
        : "";
      const message = `${statusMessage}${moreInfo}`;
      console.error(message);
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
}

async function transformData(data) {
  try {
    const locationData = data?.location ?? {};
    const currentData = data?.current ?? {};
    const city = locationData.name ?? "";
    const region = locationData.region ?? "";
    const isDay = currentData.is_day === 1;
    const condition = currentData.condition ?? "";
    const tempC = currentData.temp_c ?? "";
    const tempF = currentData.temp_f ?? "";
    const time = currentData.last_updated
      ? format(new Date(currentData.last_updated), "p")
      : "";

    return {
      city,
      region,
      condition,
      tempC,
      tempF,
      time,
      isDay,
    };
  } catch (error) {
    return { error: `${error}` };
  }
}

export { fetchWeather, transformData };
