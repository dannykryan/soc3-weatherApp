const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true";
const weatherIcon = document.getElementById("weather-image");
const container = document.getElementById("container");
const temperatureText = document.getElementById("temperature");
const refreshButton = document.getElementById("refreshBtn");
const toggleBtn = document.getElementById("switch");
let currentMeasurement = "C";

// PLAN
// Check Thunder Client and discover where the weather codes are being returned
// save the address here and check in console.log()

// data.current_weather.weathercode

// Draw up a comparison table that shows which images should be used for which number
// Save that list somewhere for reference

// Open that reference file and

// Link all weather images to their correct

// Create a function that changes the image based on area code

// Celcius to Farenheit conversion Function

function c2F(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Toggle measurement variable
function toggleMeasure() {
  console.log("toggle button clicked");
  if (currentMeasurement === "C") {
    currentMeasurement = "F";
  } else {
    currentMeasurement = "C";
  }
  fetchWeather();
}

async function fetchLocation() {
  const locationParams = composeParameters(locationParameters);
  // get location data from api
  const locationData = await retrieveDataFromApi(
    "https://nominatim.openstreetmap.org/search",
    locationParams
  );
  return await locationData;
}

// Main function
async function fetchWeather() {
  const response = await fetch(URL);
  let data = await response.json();

  let weatherCode = data.current_weather.weathercode;
  let temperature = data.current_weather.temperature;
  let isDay = data.current_weather.is_day;
  console.log(isDay);

  if (currentMeasurement === "C") {
    temperatureText.innerText = `${temperature}°C`;
    console.log(`${temperature}°C`);
  } else {
    const temperatureF = Math.round(c2F(temperature));
    temperatureText.innerText = `${temperatureF}°F`;
    console.log(`${c2F(temperature)}`);
  }
  // Need error handling
  imageUpdate(weatherCode, isDay);
  containerUpdate(isDay);
}

function containerUpdate(isDay) {
  if (isDay === 0) {
    container.classList.add("night-time");
  }
}

function imageUpdate(weatherCode, isDay) {
  console.log(weatherCode);
  console.log(isDay);
  if (isDay === 0 && [0, 1, 2, 3, 45, 48, 80, 81, 82].includes(weatherCode)) {
    let weatherDescription = codeLookupNight[weatherCode];
    weatherIcon.src = `images/night/${weatherDescription}.png`;
    console.log(weatherDescription);
  } else {
    let weatherDescription = codeLookupDay[weatherCode];
    weatherIcon.src = `images/day/${weatherDescription}.png`;
    console.log(weatherDescription);
  }
}

// async function displayWeather() {
//   await fetchWeather();
//   const weatherCode = getWeatherCode();
//   console.log(`Weather Code: ${weatherCode}`);
// }

// displayWeather();

fetchWeather();

refreshButton.addEventListener("click", fetchWeather);
toggleBtn.addEventListener("mousedown", toggleMeasure);
