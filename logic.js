
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
        let current_weather = response.current_weather;
        let current_weather_units = response.current_weather_units;
        console.log(current_weather)
        let temperature = current_weather.temperature;


    } catch (err) {
        console.log(err);
    }
}

getWeatherDetails()
