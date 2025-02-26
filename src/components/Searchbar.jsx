import React, { useState } from "react";
import WeatherDisplay from "./Weatherdisplay";

export default function Searchbar() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    // Fetch weather data from OpenWeather API
    const handleSearch = async () => {
        if (!city.trim()) {
            setError("Please enter a valid city name.");
            setWeatherData(null);
            return;
        }

        const apiKey = "a0d8dedc140ad470ead8a13758d6169d";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "City not found.");
            }

            if (!data.main || !data.weather) {
                throw new Error("Invalid weather data received.");
            }

            setWeatherData({
                city: data.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0]?.description || "No description available",
                icon: data.weather[0]?.icon
                    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                    : null,
                condition: data.weather[0]?.main || "Clear",
            });
            setError("");
        } catch (err) {
            setWeatherData(null);
            setError(err.message || "Failed to fetch weather data. Please try again.");
        }
    };

    // Determine background class based on weather condition
    const getBackgroundClass = () => {
        if (!weatherData) return "bg-gradient-to-r from-gray-400 to-gray-600"; // Default background

        switch (weatherData.condition.toLowerCase()) {
            case "clear":
                return "bg-gradient-to-r from-blue-400 to-blue-600"; // Clear sky
            case "clouds":
                return "bg-cloudy"; // Animated cloudy background
            case "rain":
                return "bg-gradient-to-r from-gray-600 to-blue-900"; // Rainy
            case "thunderstorm":
                return "bg-gradient-to-r from-gray-700 to-purple-900"; // Thunderstorm
            case "snow":
                return "bg-gradient-to-r from-blue-200 to-white"; // Snowy
            case "mist":
            case "haze":
                return "bg-gradient-to-r from-gray-300 to-gray-500"; // Foggy
            default:
                return "bg-gradient-to-r from-gray-400 to-gray-600"; // Default
        }
    };

    return (
        <div className={`relative min-h-screen flex flex-col items-center justify-center ${getBackgroundClass()} transition-all duration-500`}>
            {/* Cloud Overlay for Cloudy Weather */}
            {weatherData?.condition.toLowerCase() === "clouds" && (
                <div className="clouds-overlay"></div>
            )}

            <div className="flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-lg">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        className="px-6 py-2 rounded-lg shadow-lg transition duration-200 bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <WeatherDisplay weatherData={weatherData} />
            </div>
        </div>
    );
}
