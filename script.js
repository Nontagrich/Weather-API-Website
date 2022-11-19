const appKey = "3d3589c8c9c501b15360d069d0beee2d";

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityname = document.querySelector("#city");
const icon = document.querySelector("#icon");
const des = document.querySelector("#des");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

searchButton.addEventListener("click", findWeatherDetails);
searchButton.addEventListener("keyup", enterPressed);

function enterPressed(event){
    if(event.key === "Enter"){
            findWeatherDetails();
    }
}

function findWeatherDetails(){
    if( searchInput.value === ""){

    }
    else {
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

window.onload = () => {
    const defaults = "https://api.openweathermap.org/data/2.5/weather?q=Ratchaburi&appid=3d3589c8c9c501b15360d069d0beee2d";
    httpRequestAsync(defaults, theResponse);
}

function theResponse(response){
    const jsonObject = JSON.parse(response);
    cityname.innerHTML = "Weather in " + jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    des.innerHTML = jsonObject.weather[0].description;
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = "Humidity: " + jsonObject.main.humidity + "%";
    wind.innerHTML = "Wind speed: " + jsonObject.wind.speed + " km/h";
}

function httpRequestAsync(url, callback){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            callback(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
