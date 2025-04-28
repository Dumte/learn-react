import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "889eb9b51df74307937200155252804"; 

  const fetchWeather = async (location) => {
    setLoading(true);
    setError("");

    try {
      // Fetch current weather and 7-day forecast
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          location
        )}&days=7`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Location not found");
      }

      setWeatherData(data);
      setForecastData(data.forecast.forecastday);
      setSelectedDay(0); 
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city);
  };

  // Helper function for dynamic background colors
  const getBackgroundColor = (temp) => {
    if (!temp) return "bg-gray-100";
    if (temp < 0) return "bg-blue-100";
    if (temp < 10) return "bg-blue-50";
    if (temp < 20) return "bg-green-50";
    if (temp < 30) return "bg-yellow-50";
    return "bg-red-50";
  };

  // Format date for forecast tiles
  const formatDate = (dateString, withYear = false) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      ...(withYear && { year: "numeric" }),
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col w-full rounded-md mb-2 mx-auto p-4 bg-blue-50 max-w-4xl">
      <h1 className="text-2xl md:text-3xl w-full mx-auto mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow">
        Weather App
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 w-full mb-6"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-3 rounded-lg border bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          placeholder="Search for a city (e.g., London or Paris)"
          aria-label="Search for a city"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">Try: London, Paris, New York, Tokyo</p>
        </div>
      )}

      {/* 7-Day Forecast Tiles */}
      {forecastData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">7-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {forecastData.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(index)}
                className={`p-2 rounded-lg text-center transition-all ${
                  selectedDay === index
                    ? "ring-2 ring-blue-500 bg-white"
                    : "bg-white bg-opacity-70 hover:bg-opacity-100"
                }`}
              >
                <p className="font-medium">
                  {index === 0 ? "Today" : formatDate(day.date)}
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-10 h-10 mx-auto my-1"
                />
                <div className="flex justify-center gap-2">
                  <span className="font-bold">
                    {Math.round(day.day.maxtemp_c)}°
                  </span>
                  <span className="text-gray-500">
                    {Math.round(day.day.mintemp_c)}°
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Weather for Selected Day */}
      {weatherData && forecastData && (
        <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Weather Card */}
            <div
              className={`flex-1 p-6 rounded-lg ${getBackgroundColor(
                forecastData[selectedDay].day.avgtemp_c
              )}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">
                    {weatherData.location.name}, {weatherData.location.country}
                  </h2>
                  <p className="text-gray-700">
                    {formatDate(forecastData[selectedDay].date, true)}
                  </p>
                  {selectedDay === 0 && (
                    <p className="text-gray-700">
                      Last updated:{" "}
                      {new Date(
                        weatherData.current.last_updated
                      ).toLocaleTimeString()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <img
                    src={`https:${forecastData[selectedDay].day.condition.icon}`}
                    alt={forecastData[selectedDay].day.condition.text}
                    className="w-24 h-24 mx-auto"
                  />
                  <p className="text-5xl font-bold mt-2">
                    {selectedDay === 0
                      ? Math.round(weatherData.current.temp_c)
                      : Math.round(forecastData[selectedDay].day.avgtemp_c)}
                    °C
                  </p>
                  <p className="text-xl capitalize">
                    {forecastData[selectedDay].day.condition.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">High / Low</p>
                <p className="text-2xl font-semibold">
                  {Math.round(forecastData[selectedDay].day.maxtemp_c)}° /{" "}
                  {Math.round(forecastData[selectedDay].day.mintemp_c)}°
                </p>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">Humidity</p>
                <p className="text-2xl font-semibold">
                  {forecastData[selectedDay].day.avghumidity}%
                </p>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">Wind Speed</p>
                <p className="text-2xl font-semibold">
                  {forecastData[selectedDay].day.maxwind_kph} km/h
                </p>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">Precipitation</p>
                <p className="text-2xl font-semibold">
                  {forecastData[selectedDay].day.totalprecip_mm} mm
                </p>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">Sunrise/Sunset</p>
                <p className="text-lg">
                  {forecastData[selectedDay].astro.sunrise} /{" "}
                  {forecastData[selectedDay].astro.sunset}
                </p>
              </div>
              <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                <p className="text-gray-600">UV Index</p>
                <p className="text-2xl font-semibold">
                  {forecastData[selectedDay].day.uv}
                </p>
              </div>
            </div>
          </div>

          {/* Hourly Forecast (for today only) */}
          {selectedDay === 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {forecastData[0].hour.map((hour) => (
                  <div
                    key={hour.time}
                    className="flex-shrink-0 bg-white bg-opacity-80 p-3 rounded-lg text-center"
                  >
                    <p className="font-medium">
                      {new Date(hour.time).toLocaleTimeString([], {
                        hour: "2-digit",
                      })}
                    </p>
                    <img
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      className="w-10 h-10 mx-auto my-1"
                    />
                    <p className="font-bold">{Math.round(hour.temp_c)}°</p>
                    <p className="text-xs text-gray-600">
                      {hour.chance_of_rain}% rain
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
