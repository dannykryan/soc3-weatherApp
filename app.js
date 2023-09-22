// create weather API app
// create minimum viable product and, if time, add stretch goals
// good planning before we start to code
// solve problem before coding

// Sprint 1 - Great plan (1 hour MIN)
// How does the API work? - Read docs.
// what can it do? Limitations?
// Use Thunder Client and see what data it returns
// Got stuck? - check a short video
// Flowchart - plan out sprints (3)
// Can we fetch and output todays weather data?

// Sprint 2
// Sprint 3

// 30m break at 10:45
// back together for 11:15
// break at 12:30 for 1hr
// 3pm 15m break

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true";
const temperatureText = document.getElementById("temperature");
const refreshButton = document.getElementsByClassName("refreshBtn")[0];
const toggleBtn = document.getElementById("");
const currentMeasurement = "C";

// Celcius to Farenheit conversion Function
function ctoF(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Toggle measurement variable
function toggleMeasure() {
  if (currentMeasurement == "C") {
    currentMeasurement = "F";
  } else {
    currentMeasurement = "C";
  }
}

// Main function
async function fetchWeather() {
  const response = await fetch(URL);
  const data = await response.json();
  const temperature = data.current_weather.temperature;
  console.log(temperature);
  if (currentMeasurement == "C") {
    temperatureText.innerText = `${temperature}°C`;
  } else {
    const temperatureF = ctoF(temperature);
    temperatureText.innerText = `${temperatureF}°F`;
  }
  // Need error handling
}

fetchWeather();

refreshButton.addEventListener("click", fetchWeather);
toggleBtn.addEventListener("click", toggleMeasure);
