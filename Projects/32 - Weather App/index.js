let humidity;
let pressure;
let temperature;
let windSpeed;
let weatherSummary;
let object;

const element = (id) => document.getElementById(id);

window.onload = function() {
    humidity = element("current-humidity");
    pressure = element("current-pressure");
    temperature = element("current-temperature");
    windSpeed = element("current-wind-speed");
    weatherSummary = element("weather-summary");
};

function getWeather() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            showWeather(lat, long)
        })
    }
    else {
        return window.alert("Could not get location");
    }
}

function showWeather(lat, long) {
    const url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object);
}

function displayWeather(object) {
    humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
    pressure.innerHTML = "Pressure: " + object.currently.pressure + " mb";
    temperature.innerHTML = "Temperature: " + farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
    windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
    weatherSummary.innerHTML = "Current Location: " + object.timezone + " <br/> <br/> Weather Summary: " + object.currently.summary;
    document.getElementById("weather-summary").style.backgroundColor = "hsl(216, 100%, 60%)";
    console.log(object);
}

function farenheitToCelsius(k) {
    return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
    return Math.round(h * 100);
}

function knotsToKilometres(knot) {
    return Math.round(knot * 1.852);
}