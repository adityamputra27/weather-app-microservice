import axios from 'axios';
import { WeatherData } from '../models/weather';

export class WeatherAPI {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor() {
    this.apiKey = process.env.OPEN_WEATHER_API_KEY || '';
    this.baseUrl = process.env.OPEN_WEATHER_API_BASE_URL || 'https://api.openweathermap.org/';
  }

  async getLocation(location: string): Promise<{ lat: number, lon: number, country: string, local_names: { id: string } | null, name: string }> {
    try {
      const response = await axios.get(`${this.baseUrl}/geo/1.0/direct?q=${location}&appid=${this.apiKey}`);
      return response.data[0];
    } catch (error) {
      throw new Error('Failed to fetch location data');
    }
  }

  async fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
}