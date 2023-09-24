let latitude = 52.4204;
let longitude = -1.9127;
let weatherCode;
let temperature;
let isDay;
let URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

// Function to request users geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// function to lookup location based on coordinates
function reverseGeocode(latitude, longitude) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => {
      console.log("Response:", response); // Log the response object
      return response.json(); // Return the JSON parsed response
    })
    .then((data) => {
      console.log("Data:", data); // Log the data object
      return data.address.city;
    })
    .catch((error) => {
      console.error("Error:", error);
      return null; // Handle the error, return a default value, or throw an exception
    });
}

// Make latitude and longitude available from geolocation data
function savePosition(position) {
  latitude = position.coords.latitude.toFixed(4);
  longitude = position.coords.longitude.toFixed(4);
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  reverseGeocode(latitude, longitude).then((locationName) => {
    const locationElement = document.getElementById("location");
    if (locationElement) {
      locationElement.innerText = locationName || "Unknown Location";
    }
  });

  fetchWeather();
}

// Call the getLocation function to request location data
getLocation();

const weatherIcon = document.getElementById("weather-image");
const container = document.getElementById("container");
const temperatureText = document.getElementById("temperature");
const refreshButton = document.getElementById("refreshBtn");
const toggleBtn = document.getElementById("switch");
let currentMeasurement = "C";

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

  weatherCode = data.current_weather.weathercode;
  temperature = data.current_weather.temperature;
  isDay = data.current_weather.is_day;
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
  } else if (isDay === 1) {
    container.classList.remove("night-time");
  }
}

function imageUpdate(weatherCode, isDay) {
  console.log(weatherCode);
  console.log(isDay);
  if (isDay === 0 && [0, 1, 2, 3, 45, 48, 80, 81, 82].includes(weatherCode)) {
    let weatherDescription = codeLookupNight[weatherCode];
    weatherIcon.src = `assets/images/night/${weatherDescription}.png`;
    console.log(weatherDescription);
  } else {
    let weatherDescription = codeLookupDay[weatherCode];
    weatherIcon.src = `assets/images/day/${weatherDescription}.png`;
    console.log(weatherDescription);
  }
}

fetchWeather();

refreshButton.addEventListener("click", fetchWeather);
toggleBtn.addEventListener("mousedown", toggleMeasure);

async function searchLocation() {
  const searchTerm = document.getElementById("input").value;
  const count = 10; // Number of results to return
  const language = "en"; // Language for results (optional)

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=${count}&language=${language}&format=json`
  );
  const data = await response.json();

  if (data.results.length > 0) {
    const location = data.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;

    // Update location text on webpage
    const locationElement = document.getElementById("location");
    locationElement.innerText = location.name;

    // Update URL with new latitude and longitude
    URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Fetch weather data for the new location
    fetchWeather();
  } else {
    console.error("Location not found");
  }
}

// Attach event listener to the search button
const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", searchLocation);

// Event listener for when the user submits the search form
document.getElementById("searchBtn").addEventListener("click", function () {
  searchLocation();
  fetchWeather();
});
