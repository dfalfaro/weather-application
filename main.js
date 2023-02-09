document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;

  if (!city || !state) {
    // Display an error message if the city or state inputs are empty
    alert("Please enter a valid city and state.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      const forecastList = data.list;
      // Use an object to store the average temperature, description, and weather icon for each day
      const forecastData = {};
      // Iterate through the forecastList and process the data
      forecastList.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];
        if (!forecastData[date]) {
          forecastData[date] = {
            temperature: 0,
            description: "",
            icon: "",
          };
        }
        forecastData[date].temperature = forecast.main.temp;
        forecastData[date].description = forecast.weather[0].description;
        forecastData[date].icon = forecast.weather[0].icon;
      });
      // Round temperature to a whole number
      Object.keys(forecastData).forEach((date) => {
        forecastData[date].temperature = Math.floor(
          forecastData[date].temperature
        );
      });
      // Display the 5-day forecast using the forecastData object
      document.getElementById("today").style.visibility = "visible";
      const forecastContainer = document.querySelector("#forecast");
      forecastContainer.innerHTML = "";
      Object.keys(forecastData).forEach((date, index) => {
        const forecast = forecastData[date];
        const forecastElement = document.createElement("div");
        forecastElement.innerHTML = `
          <h2>${date}</h2>
    <p>Temperature: ${forecast.temperature}°F</p>
          <p>${forecast.description}</p>
          <img src="http://openweathermap.org/img/wn/${forecast.icon}@2x.png"/>
        `;
        forecastContainer.appendChild(forecastElement);
      });
    })

    .catch((error) => {
      console.error(error);
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      const todayContainer = document.querySelector("#today");
      const backgroundSelector = data.weather[0].id;
      todayContainer.innerHTML = `
          <h2>Right Now</h2>
          <p>Temperature: ${Math.floor(data.main.temp)}°F</p>
    <p>${data.weather[0].description}</p>
          <img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png"/>
          `;
      changeBackground(backgroundSelector);
    });

  // Use a Geocoding API to convert the city and state into the latitude and longitude
  const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city},${state}&key=b016ef260ff04a97b21d6e54455a32ac`;

  fetch(geocodingApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const lat = data.results[0].geometry.lat;
      const lon = data.results[0].geometry.lng;

      const options = {
        // Required: API key
        key: "vyJngHjewR8tZeZESm2BkjwUQ8ODPukc",
        // Put additional console output
        verbose: true,
        // Use the latitude and longitude obtained from the Geocoding API
        lat: lat,
        lon: lon,
        zoom: 10,
      };

      // Initialize Windy API
      windyInit(options, (windyAPI) => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff
        const map = windyAPI.map;
        // .map is instance of Leaflet map
        map.setView([lat, lon], 10);
        L.marker([lat, lon]).addTo(map);
        document.getElementById("windy").style.visibility = "visible";
      });
    });
});

function changeBackground(input) {
  if (input < 233) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1Sbp_HSXlVhKkLiHeba6AfU-ykY8PpPGu")';
  } else if (input >= 300 && input <= 531) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1AbzHz-9dELRyCN-JDoUOLk7_KEm2yOtO")';
  } else if (input >= 600 && input <= 622) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1Lhn_pha8S8Pch9SvzUuwxcpEQg3vLtHe")';
  } else if (input >= 701 && input <= 771) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1uckTawJ0mpFrUiT-PD6b6tuHfjGrLGOb")';
  } else if (input == 800) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1q8uPfXHrsKym6VHCfXUx0xjaH2Yg027u")';
  } else if (input >= 801 && input <= 802) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=16CRdZZ4eQ7nORc3TYE9wqOOIuEnLG1j_")';
  } else if (input >= 803) {
    document.body.style.backgroundImage =
      'url("https://drive.google.com/uc?export=view&id=1_xyf80V1W3GtAU9oM0pxTmDgICh3U_qK")';
  }
}
