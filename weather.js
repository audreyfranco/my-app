let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =Math.round(response.data.main.temp);
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "8402b695ede9a6c63a7ea98262105a24";
  let city = document.querySelector("#search-text-input").value;
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let latitude = (position.coords.latitude);
  let longitude = (position.coords.longitude);
  let apiKey = "8402b695ede9a6c63a7ea98262105a24";
   let city = document.querySelector("#search-text-input").value;
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

