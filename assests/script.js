// 
// Weather API data collection & sorting
//

var weatherRequestUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
var lat = 47.6062;
var lon = 122.3321;
var key = "7013ba507325d4539fec0418a1dfc028";

// Fetch the weather API, collect the data for the given location for today and the next 5 days (all at noon). Select temp, wind, humidity, and icon, and store them as global variables.
fetch(weatherRequestUrl)
        .then(function(response) {
                console.log(response);
                response.json().then(function (data) {
                        console.log(data);
                });
        })

// 
// Geocoding
// 
// var geocodeRequestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${key}`