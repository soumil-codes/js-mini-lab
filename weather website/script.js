document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        document.getElementById('weather-result').innerHTML = '<span style="color:red;">Please enter a city name.</span>';
        return;
    }
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'f26f98e8b2a7d14e3a47c7f4f8c450a2'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    document.getElementById('weather-result').innerHTML = 'Loading...';
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('City not found');
            return response.json();
        })
        .then(data => {
            document.getElementById('weather-result').innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById('weather-result').innerHTML = `<span style='color:red;'>${error.message}</span>`;
        });
} 