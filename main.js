document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&appid=6d9ae548620c2f3c7a8653d254edffc0&units=imperial`)
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
            icon: "",
            id: ""
          };
        }
        forecastData[date].temperature = forecast.main.temp;
        forecastData[date].description = forecast.weather[0].description;
        forecastData[date].icon = forecast.weather[0].icon;
        forecastData[date].id = forecast.weather[0].id; 
      });
      // Calculate the average temperature for each day
      Object.keys(forecastData).forEach(date => {
        forecastData[date].temperature = Math.floor((forecastData[date].temperature));
      });
      // Display the 5-day forecast using the forecastData object
      const forecastContainer = document.querySelector("#forecast");
      forecastContainer.innerHTML = "";
      Object.keys(forecastData).forEach((date, index) => {
        const forecast = forecastData[date];
        const forecastElement = document.createElement("div");
        if (index === 0) {
          const todayContainer = document.querySelector("#today");
          todayContainer.innerHTML = `
            <h2>Today</h2>
            <p>Temperature: ${forecast.temperature}°F</p>
            <p>Description: ${forecast.description}</p>
            <img src="http://openweathermap.org/img/wn/${forecast.icon}@2x.png"/>
          `;
        changeBackground(forecast.id);
        } else {
          forecastElement.innerHTML = `
            <h2>${date}</h2>
            <p>Temperature: ${forecast.temperature}°F</p>
            <p>Description: ${forecast.description}</p>
            <img src="http://openweathermap.org/img/wn/${forecast.icon}@2x.png"/>
          `;
          forecastContainer.appendChild(forecastElement);
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
});

function changeBackground(input){
  if(input<=531){
    document.body.style.backgroundImage = 'url("https://drive.google.com/uc?export=view&id=1AbzHz-9dELRyCN-JDoUOLk7_KEm2yOtO")';
  }
  else if(input>=600 && input<=622){
    document.body.style.backgroundImage = 'url("https://drive.google.com/uc?export=view&id=1Lhn_pha8S8Pch9SvzUuwxcpEQg3vLtHe")';
  }
  else if(input==800){
    document.body.style.backgroundImage = 'url("https://drive.google.com/uc?export=view&id=1q8uPfXHrsKym6VHCfXUx0xjaH2Yg027u")';
  }
  else if(input>=801){
    document.body.style.backgroundImage = 'url("https://drive.google.com/uc?export=view&id=16CRdZZ4eQ7nORc3TYE9wqOOIuEnLG1j_")';
  }
}