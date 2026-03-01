
// this is the function to get the City Name. By Default the city's value is Delhi
async function getCityName(cityName="Delhi"){
    try {
        let name = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
        let response = await name.json();
        let result = response.results[0]
        let latitude = result.latitude;
        let longitude = result.longitude;
        // console.log(result.name);
        // console.log(result.latitude);
        // console.log(result.longitude);
        return [latitude, longitude]
    } catch (error) {
        console.log(error);
    }

}
getCityName('London')
