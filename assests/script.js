// 
// Weather API data collection & sorting
//
var weatherListEls = document.querySelectorAll(".weatherList")

// Fetch the weather API, collect the data for the given location for today and the next 5 days (all at noon). Select temp, wind, humidity, and icon, and store them as global variables.

// NEED TO: save the li's  locally w/ name key
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

function displayForecast(data) {
        var indices = [0, 8, 16, 24, 32, 39]
        for (i = 0; i < weatherListEls.length; i++) {
                var currentList = weatherListEls[i]

                // remove children on additional searches
                while (currentList.children.length > 0) {
                        currentList.removeChild(currentList.firstChild)
                }

                var temp = "Temp: " + data.list[indices[i]].main.temp
                var wind = "Wind: " + data.list[indices[i]].wind.speed
                var humidity = "Humidity: " + data.list[indices[i]].main.humidity
                var arr = [temp, wind, humidity]

                for (x = 0; x < arr.length; x++){
                        var li = document.createElement("li")
                        li.textContent = arr[x]
                        currentList.append(li)
                }
        }
}


// TODO get the geocoder working. Use the user input field (change to form submission) and add submit event listener. On submit: 1) run geocoder with input data. 2) save geocode outputs to local storage and on button Seattle that appears below in history. 3) use saved outputs to update weather display & run display forecast function. $) add an if checker so api calls aren't repeated if the city has already been called that day.
        // 
        // Geocoding
        // 
var userFormEl = document.querySelector("#search")

userFormEl.addEventListener("click", formSubmitHandler);        

function formSubmitHandler() {
        var cityNameEl = document.querySelector("#cityName");
        cityNameValue = cityNameEl.value.trim()
        let storage = JSON.parse(localStorage.getItem("searchHistoryData"))
        // need an if checker to see if cityNameValue is in a button, if not, make it a button--needs to be here to avoid unnecessary function calls.
        if (storage == true) {
                if (cityNameValue in storage) {
                        let lat = storage[cityNameValue[0]]
                        let lon = storage[cityNameValue[1]]
                        getWeatherData(lat, lon)
                } else {
                        getGeocodeData(cityNameValue)
                }
        } else {
                getGeocodeData(cityNameValue)
        }
}


// Get data
function getGeocodeData(cityName) {
        // check to see if cityName is already in local storage
        var geocodeRequestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=7013ba507325d4539fec0418a1dfc028`
        
        fetch(geocodeRequestUrl)
        .then(function(response) {
                // need a response error checker in case the city isnt in the api
                console.log(response);
                response.json().then(function (data) {
                        let name = data[0].name
                        let lat = data[0].lat
                        let lon = data[0].lon

                        getWeatherData(lat, lon)
                        createSearchButton(name, lat, lon)
                });
        })
}


// ** This creates a button with a city name. The lat and lon of the city named is stored locally and is retrieveable on button click
var searchHistoryEl = document.querySelector("#searchHistory")
var searchHistoryData = {}

function createSearchButton(name, lat, lon) {
        searchHistoryData[name] = [lat, lon]
        localStorage.setItem("searchHistoryData", JSON.stringify(searchHistoryData))

        var btn = document.createElement("button")
        btn.setAttribute("id", name)
        btn.textContent = name
        searchHistoryEl.append(btn)
        btn.addEventListener("click", function(){
                var storage = JSON.parse(localStorage.getItem("searchHistoryData"))
                var key = this.getAttribute("id")
                getWeatherData(lat, lon)
        })
}


var test = JSON.parse(localStorage.getItem("searchHistoryData"))