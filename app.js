const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true";
const temperatureText = document.getElementById("temperature");
const refreshButton = document.getElementsByClassName("refreshBtn")[0];
const toggleBtn = document.getElementById("switch");
let currentMeasurement = "C";

// Celcius to Farenheit conversion Function
function ctoF(celsius) {
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

// Main function
async function fetchWeather() {
  const response = await fetch(URL);
  const data = await response.json();
  const temperature = data.current_weather.temperature;
  if (currentMeasurement === "C") {
    temperatureText.innerText = `${temperature}°C`;
    console.log(`${temperature}°C`);
  } else {
    const temperatureF = Math.round(ctoF(temperature));
    temperatureText.innerText = `${temperatureF}°F`;
    console.log(`${ctoF(temperature)}`);
  }
  // Need error handling
}

fetchWeather();

refreshButton.addEventListener("click", fetchWeather);
toggleBtn.addEventListener("mousedown", toggleMeasure);
