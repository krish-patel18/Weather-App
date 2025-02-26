import React from 'react';

export default function WeatherDisplay({ weatherData }) {
    if (!weatherData) {
        return null; // Return null if no weather data is available
    }

    const { city, temperature, description, icon } = weatherData;

    return (
        <div className="weather-display bg-white shadow-lg rounded-lg p-6 mt-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-purple-600">{city}</h2>
            <div className="flex justify-center mt-4">
                <img src={icon} alt={description} className="w-24 h-24" />
            </div>
            <p className="text-center text-4xl font-semibold text-purple-500 mt-2">{temperature}°C</p>
            <p className="text-center text-lg text-gray-600 mt-1 capitalize">{description}</p>
        </div>
    );
}