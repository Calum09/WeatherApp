// Variables containing links to the relevant divs that we need to manipulte
const container = document.querySelector(".container");
const searchBox = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const inputField = document.getElementById("input-box");
const error = document.getElementById("error");

let getWeather = () => {
  // Save the city the user has typed into the search box within the variable 'city'
  const city = document.querySelector(".search-box input").value;
  const apiKey = "9a720f8880b2e15b9948222157dd66de";

  if (city === "") {
    return;
  }

  // API fetch

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      // If there's an error reduce the container size and show the correct error image
      if (json.cod === "404") {
        container.style.height = "300px";
        weatherBox.style.display = "";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      // Remove error message and styling if the search is valid
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Assigning variables to specific html elements for use later with json data
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind  span");

      // Switch statement to decide what weather image to show based on the actual weather of the location searched
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/clouds.png";
          break;
        case "fog":
          image.src = "images/fog.png";
          break;

        default:
          image.src = "";
      }

      // Add the correct json data from the weather api into the correct html elements

      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}m/s`;
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;

      // Increase the container size and add back the weather details and weather box

      container.style.height = "600px";
      weatherBox.style.display = "";
      weatherDetails.style.dispaly = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "600px";
    });
};

// Clear the input value after pressing the button
const Clearinput = () => {
  inputField.value = "";
};

// Adding an event listener to the input

inputField.addEventListener("keydown", function (event) {
  // Check if the Enter key was pressed
  if (event.key === "Enter") {
    // Your action here

    getWeather();
    Clearinput();
  }
});

// Event Listener for when a user clicks to search
searchBox.addEventListener("click", () => {
  getWeather();
  Clearinput();
});
