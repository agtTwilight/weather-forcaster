// 
// Weather API data collection & sorting
//
var weatherDisplayEls = document.querySelectorAll(".weatherDisplay")

// Fetch the weather API, collect the data for the given location for today and the next 5 days (all at noon). Select temp, wind, humidity, and icon, and store them as global variables.
function getWeatherData(lat, lon) {
        let weatherRequestUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&start=&appid=7013ba507325d4539fec0418a1dfc028`;
        fetch(weatherRequestUrl)
                .then(function(response) {
                        console.log(response);
                        response.json().then(function (data) {
                                console.log(data)
                                displayForecast(data);
                        });
                })
}
getWeatherData("45.5152", "-122.6784")

// TODO make sure the li's dont have bullets
// TODO instead of count, let's just do the easiest thing and make an array of values separted by 8 and ending at 39 (cnt is capped at 40 for the API!)
// TODO (dreamstate) take averages for each day and have those be displayed instead.
function displayForecast(test) {
        var count = 0
        for (i = 0; i < weatherDisplayEls.length; i++) {
                var currentDisplay = weatherDisplayEls[i]
                var temp = "Temp: " + test.list[count].main.temp
                var wind = "Wind: " + test.list[count].wind.speed
                var humidity = "Humidity: " + test.list[count].main.humidity
                var arr = [temp, wind, humidity]
                count = count + 7
                for (x = 0; x < arr.length; x++){
                        var li = document.createElement("li")
                        li.textContent = arr[x]
                        currentDisplay.append(li)
                }
        }
}

// TODO get the geocoder working. Use the user input field (change to form submission) and add submit event listener. On submit: 1) run geocoder with input data. 2) save geocode outputs to local storage and on button Seattle that appears below in history. 3) use saved outputs to update weather display & run display forecast function. $) add an if checker so api calls aren't repeated if the city has already been called that day. 
        // 
        // Geocoding
        // 
        var geocodeRequestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Seattle&appid=7013ba507325d4539fec0418a1dfc028`

        fetch(geocodeRequestUrl)
        .then(function(response) {
                console.log(response);
                response.json().then(function (data) {
                        console.log(data)
                        // displayForecast(data);
                });
        })