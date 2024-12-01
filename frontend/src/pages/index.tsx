// import { WeatherChart } from "@/components/WeatherChart";
import { RecentLocations } from "@/components/RecentLocations";
import { WeatherChart } from "@/components/WeatherChart";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { RootState, AppDispatch } from "@/store";
import { fetchLocation, fetchWeather } from "@/store/weatherSlice";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentWeather, loading, error, locationData } = useSelector((state: RootState) => state.weather)

  const [location, setLocation] = useState("")

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (location.trim() !== "") {
      dispatch(fetchLocation(location))
      dispatch(fetchWeather(location))
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center tracking-wide">Mini Task Challenge: Weather App Microservice</h1>
      </div>

      <form action="" onSubmit={handleSearch} className="max-w-3xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full">
            <div className="flex flex-row gap-4 w-full">
              <input type="text" value={location} 
                placeholder="Enter location" 
                onChange={(e) => setLocation(e.target.value)} 
                className="flex-1 p-4 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-amber-400 transition-all"
              />
              <button type="submit" className="bg-amber-400 text-white-700 px-8 py-4 rounded-lg hover:bg-amber-300 transition-colors font-semibold">Search</button>
            </div>
          </div>
          <div className="w-full md:w-36">
            {loading ? (
              <div className="flex sm:justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-400"></div>
                <span className="ml-3 text-amber-400 text-lg font-semibold">Loading...</span>
              </div>
            ) : null}
          </div>

        </div>
      </form>
      {error && (
        <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-8 w-full border border-red-800">
          <p>Error fetching weather data</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div className="w-full md:w-1/3 bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h2 className="text-xl font-semibold mb-4 text-amber-400">Recent Locations</h2>
          <RecentLocations />
        </div>

        {currentWeather && (
          <div className="w-full md:w-2/3 bg-slate-800 rounded-lg shadow-xl p-8 mb-8 border border-slate-700">
            <WeatherDisplay weatherData={currentWeather} weatherLocation={locationData} onRefresh={() => dispatch(fetchWeather(location))}/>
            <WeatherChart forecast={currentWeather.daily} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;