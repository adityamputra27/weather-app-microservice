import { model, Schema } from "mongoose";

export interface WeatherData {
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
    weather: any[];
  };
  daily: any[];
  timestamp: Date;
}

const WeatherSchema = new Schema<WeatherData>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  current: {
    dt: { type: Number, required: true },
    sunrise: { type: Number, required: true },
    sunset: { type: Number, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: String, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    dew_point: { type: Number, required: true },
    uvi: { type: Number, required: true },
    clouds: { type: Number, required: true },
    visibility: { type: Number, required: true },
    wind_speed: { type: Number, required: true },
    wind_deg: { type: Number, required: true },
    weather: [{ type: Schema.Types.Mixed }],
  },
  daily: [{ type: Schema.Types.Mixed }],
  timestamp: { type: Date, default: Date.now },
});

export const Weather = model<WeatherData>('Weather', WeatherSchema)

