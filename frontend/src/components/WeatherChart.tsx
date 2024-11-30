import React from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface WeatherForecast {
  dt: number
  temp: {
    day: number
    min: number
    max: number 
    night: number
    eve: number
    morn: number
  }
}

interface WeatherChartProps {
  forecast: WeatherForecast[]
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ forecast }) => {
  console.log(forecast)
  const formattedData = forecast.map((item) => ({
    dt: new Date(item.dt * 1000).toLocaleDateString('id-ID', { weekday: 'short'}),
    temp: {
      ...item.temp,
      day: (item.temp.day - 273.15).toFixed(1),
      min: (item.temp.min - 273.15).toFixed(1),
      max: (item.temp.max - 273.15).toFixed(1),
      night: (item.temp.night - 273.15).toFixed(1),
      eve: (item.temp.eve - 273.15).toFixed(1),
      morn: (item.temp.morn - 273.15).toFixed(1)
    }
  }))


  return (
    <div style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-8">
        <div> 
          <h2 className="text-white text-xl font-bold mb-2">
            Forecast (7 days)
          </h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, bottom: 5, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt" />
          <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}/>
          <Tooltip formatter={(value: number) => `${value}°C`} labelFormatter={(label: string) => `Day: ${label}`}/>
          <Line 
            type="monotone" 
            dataKey="temp.max" 
            stroke="#ff4444" 
            name="Max Temp"
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="temp.day" 
            stroke="#4444ff" 
            name="Day Temp"
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="temp.min" 
            stroke="#44ff44" 
            name="Min Temp"
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
