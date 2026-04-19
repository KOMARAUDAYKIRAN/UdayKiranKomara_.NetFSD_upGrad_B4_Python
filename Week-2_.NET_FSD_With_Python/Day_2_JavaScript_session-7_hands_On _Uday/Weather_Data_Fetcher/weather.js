const card = document.getElementById("weatherCard");

// display function
const showWeather = (city, data) => {

    card.innerHTML = `
        <h3> ${city}</h3>
        <p> Temperature : <b>${data.temperature} °C</b></p>
        <p> Wind Speed : <b>${data.windspeed} km/h</b></p>
        <p> Direction : <b>${data.winddirection}°</b></p>
        <p> Time : <b>${data.time}</b></p>
    `;
};


// get coordinates (Promise)
const getCoordinates = (city) => {

    const geoURL =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    return fetch(geoURL)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {

            if (!data.results) throw new Error("Invalid city");

            return {
                lat: data.results[0].latitude,
                lon: data.results[0].longitude,
                name: data.results[0].name
            };
        });
};



// fetch weather (async/await)
const getWeatherData = async (lat, lon) => {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();

    return data.current_weather;
};



// main function
const getWeather = async () => {

    const city = document.getElementById("city").value;

    if (!city) {
        card.innerHTML = `<p class="msg"> Enter a city name</p>`;
        return;
    }

    card.innerHTML = `<p class="msg">Loading...</p>`;

    try {

        const location = await getCoordinates(city);
        const weather = await getWeatherData(location.lat, location.lon);

        showWeather(location.name, weather);

    }
    catch (err) {
        card.innerHTML = `<p class="msg"> ${err.message}</p>`;
    }

};