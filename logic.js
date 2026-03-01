let details = document.querySelector('.details');


// this is the function to get the City Name. By Default the city's value is Delhi
async function getCityName(cityName = "Delhi") {
    try {
        let name = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
        let response = await name.json();
        let result = response.results[0]
        let latitude = result.latitude;
        let longitude = result.longitude;
        let city = result.name;
        // console.log(result.name);
        // console.log(result.latitude);
        // console.log(result.longitude);
        return [latitude, longitude, city]
    } catch (error) {
        console.log(error);
    }

}

// This is the actual function to get the weather details
async function getWeatherDetails(cityName = 'Delhi') {
    try {
        // part of making the correct URL
        let [latitude, longitude, city] = await getCityName(cityName);
        console.log(city)
        let url =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code&current_weather=true&
timezone=auto`
        console.log(url);
//https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true
        // part of fetching the actual data

        // what we need -> City, Temperature, Weather, Humidity, Wind
        let weatherObject = await fetch(url);
        let response = await weatherObject.json();

        // geting the textual data from the weather code
        let weather_code = await fetch('./weather_code.json');
        let weather_code_response = await weather_code.json();
        console.log(response)

        // Getting the actual data
        let current_weather = response.current_weather;
        let current_weather_units = response.current_weather_units;

        let temperature = current_weather.temperature;
        let temperatureUnit = current_weather_units.temperature;

        let weather = weather_code_response[current_weather.weathercode];

        let humidity = Math.round(response.hourly.relative_humidity_2m.reduce((curr, acc)=> curr+acc ,0)/response.hourly.relative_humidity_2m.length); // taking the average of the humidity array and rouding it off.
        let humidity_unit = response.hourly_units.relative_humidity_2m;

        let wind = current_weather.windspeed;
        let wind_unit = current_weather_units.windspeed;

        console.log(temperature, temperatureUnit);
        console.log(weather);
        console.log(humidity, humidity_unit);
        console.log(wind, wind_unit);

        // appending the values in the DOM.
        let cityDOM = document.createElement('div');
        cityDOM.className = 'info-strip';
        cityDOM.textContent = `City: ${city}`

        let temperatureDOM = document.createElement('div');
        temperatureDOM.className = 'info-strip';
        temperatureDOM.textContent = `Temperature: ${temperature}${temperatureUnit}`;

        let weatherDOM = document.createElement('div');
        weatherDOM.className = 'info-strip';
        weatherDOM.textContent = `Weather: ${weather}`;

        let humidityDOM = document.createElement('div');
        humidityDOM.className = 'info-strip';
        humidityDOM.textContent = `Humidity: ${humidity}${humidity_unit}`;

        let windDOM = document.createElement('div');
        windDOM.className = 'info-strip';
        windDOM.textContent = `Wind: ${wind}${wind_unit}`;

        details.appendChild(cityDOM)
        details.appendChild(temperatureDOM);
        details.appendChild(weatherDOM);
        details.appendChild(humidityDOM);
        details.appendChild(windDOM);


    } catch (err) {
        console.log(err);
    }
}

getWeatherDetails()
