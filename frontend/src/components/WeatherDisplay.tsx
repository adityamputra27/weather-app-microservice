import React, { useState } from "react";

interface WeatherDisplayProps {
  weatherData: {
    lat: number;
    lon: number;
    current: {
      dt: number;
      sunrise: number;
      sunset: number;
      temp: number;
      feels_like: string;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
    };
    timestamp: string;
  };
  weatherLocation: {
    lat: number;
    lon: number;
    country: string;
    name: string;
  } | null;
  onRefresh: () => void;
}

const kelvinToCelsius = (kelvin: number): number => {
  return Number((kelvin - 273.15).toFixed(1));
}

const kelvinToFahrenheit = (kelvin: number): number => {
  return Number(((kelvin * (9 / 5)) - 459.67).toFixed(1));
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  weatherLocation,
  onRefresh
}) => {

  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const temperature = unit === 'C' 
    ? kelvinToCelsius(weatherData.current.temp)    
    : kelvinToFahrenheit(weatherData.current.temp);

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <div> 
          <h2 className="text-3xl font-bold mb-2">
            {weatherLocation?.name}, {weatherLocation?.country}
          </h2>
        </div>
        <button className="p-3 rounded-full hover:bg-slate-700 transition-all" onClick={onRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-6xl font-bold mb-2">
                {temperature}°{unit}
              </p>
              <p className="text-slate-400 text-lg">Feels like {unit == 'C' ? kelvinToCelsius(Number(weatherData.current.feels_like)) : kelvinToFahrenheit(Number(weatherData.current.feels_like))}°{unit}</p>
            </div>
            <div>
              <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt={weatherData.current.weather[0].description} className="w-24" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <button className="p-3 rounded-md bg-slate-600 hover:bg-slate-700 transition-all" onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
              Convert to {unit === 'C' ? '°F' : '°C'}
            </button>
            <button className="p-2 rounded-full hover:bg-slate-600 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <div className="text-xl font-semibold mb-4 text-amber-400">Weather Details</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 mb-1">Humidity</p>
              <p className="text-white font-semibold">{weatherData.current.humidity}%</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Wind Speed</p>
              <p className="text-white font-semibold">{weatherData.current.wind_speed} m/s</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Pressure</p>
              <p className="text-white font-semibold">{weatherData.current.pressure} hPa</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Clouds</p>
              <p className="text-white font-semibold">{weatherData.current.clouds}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
