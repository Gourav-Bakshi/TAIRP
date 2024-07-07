
const apiKey = 'c0accbd099a91d70c0b50ff99fc81823'; 


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weatherForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim();

        if (cityName) {
            getWeeklyWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });
});

async function getWeeklyWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '200') {
            updateWeeklyWeather(data);
        } else {
            console.error('Error fetching weather data:', data.message);
            alert('City not found. Please check the spelling.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}

function updateWeeklyWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = ''; 

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);

        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = forecast.main.temp.toFixed(1);
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon; 

        
        const forecastCard = `
            <div class="forecast-card">
                <div class="forecast-date">${day}</div>
                <div class="forecast-icon">
                    <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">
                </div>
                <div class="forecast-temp">${temp}°C</div>
                <div class="forecast-description">${description}</div>
            </div>
        `;

        weatherInfo.innerHTML += forecastCard;
    }
}
