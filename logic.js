
// this is the function to get the City Name. By Default the city's value is Delhi
async function getCityName(cityName = "Delhi") {
    try {
        let name = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
        let response = await name.json();
        let result = response.results[0]
        let latitude = result.latitude;
        let longitude = result.longitude;
        let city = result.city;
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
// interval: 900
// ​
// is_day: 1
// ​
// temperature: 27.2
// ​
// time: "2026-03-01T11:45"
// ​
// weathercode: 0
// ​
// winddirection: 291
// ​
// windspeed: 9.2

        let current_weather = response.current_weather;
        let current_weather_units = response.current_weather_units;

        let temperature = current_weather.temperature;
        let temperatureUnit = current_weather_units.temperature;

        let weather = weather_code_response[current_weather.weathercode];

        let humidity = Math.round(response.hourly.relative_humidity_2m.reduce((curr, acc)=> curr+acc ,0)/response.hourly.relative_humidity_2m.length);
        let humidity_unit = response.hourly_units.relative_humidity_2m;

        let wind = current_weather.windspeed;
        let wind_unit = current_weather_units.windspeed;

        console.log(temperature, temperatureUnit);
        console.log(weather);
        console.log(humidity, humidity_unit);
        console.log(wind, wind_unit);


    } catch (err) {
        console.log(err);
    }
}

getWeatherDetails()
