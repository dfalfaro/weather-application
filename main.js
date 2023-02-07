document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0`)
    .then(response => response.json())
    .then(data => {
      const forecastList = data.list;
      // Use an object to store the average temperature, description, and weather icon for each day
      const forecastData = {};
      // Iterate through the forecastList and process the data
      forecastList.forEach(forecast => {
        const date = forecast.dt_txt.split(" ")[0];
        if (!forecastData[date]) {
          forecastData[date] = {
            temperature: 0,
            description: "",
            icon: ""
          };
        }
        forecastData[date].temperature += forecast.main.temp;
        forecastData[date].description = forecast.weather[0].description;
        forecastData[date].icon = forecast.weather[0].icon;
      });
      // Calculate the average temperature for each day
      Object.keys(forecastData).forEach(date => {
        forecastData[date].temperature /= 8;
        forecastData[date].temperature = Math.round((forecastData[date].temperature - 273.15) * 9/5 + 32);
      });
      // Display the 5-day forecast using the forecastData object
      const forecastContainer = document.querySelector("#forecastContainer");
      forecastContainer.innerHTML = "";
      Object.keys(forecastData).forEach(date => {
        const forecast = forecastData[date];
        const forecastElement = document.createElement("div");
        forecastElement.innerHTML = `
          <h2>${date}</h2>
          <p>Temperature: ${forecast.temperature}°F</p>
          <p>Description: ${forecast.description}</p>
          <img src="http://openweathermap.org/img/wn/${forecast.icon}@2x.png"/>
        `;
        forecastContainer.appendChild(forecastElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
});