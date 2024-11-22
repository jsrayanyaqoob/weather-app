console.log("Hello World!");

const container = document.querySelector(".container");


container.innerHTML = `
  <div class="inputValue">
    <input type="text" placeholder="Search..." id="input">
    <button type="submit" class="btn" id="searchBtn">
      <i class="Icon fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
`;


const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
  const input = document.querySelector("#input");

  if (!input.value) {
    alert("Please enter a location!");
    return;
  }

  fetch(`http://api.weatherapi.com/v1/current.json?key=03837819e19b4492821121443241811&q=${input.value}&aqi=no`)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      container.innerHTML += `
        <div class="weatherContainer">
          <div class="weatherImage">
            <img src="${res.current.condition.icon}" alt="Weather Icon" width="150px">
            <p class="Temperature">${res.current.temp_c}°C</p>
            <h1 class="cityname">${res.location.name}</h1>
          </div>
          <div class="weatherDetails">
            <div class="humid">
                <p class="humdity"><i class="fa-solid fa-water"></i> ${res.current.humidity}%</p>
                <p class="humidPara">Humidity</p>
            </div>
            <div class="wind">
                <p class="windKMH"><i class="fa-solid fa-wind"></i> ${res.current.wind_kph}km/h</p>
                <p class="windPara">wind speed</p>
            </div>
          </div>
        </div>
      `
    })
    .catch(err => {
      console.error("Error fetching weather data:", err);
      container.innerHTML += `
        <div class="noDataFound">
          <img src="noData.png" alt="No Data Found" class="image404">
          <h2>No Data Found</h2>
        </div>
      `
    })
})
