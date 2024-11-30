import { WeatherData, Weather } from "../models/weather";
import { Connection } from 'amqplib';
import { Redis } from 'ioredis';
import { WeatherAPI } from "../api/weather";

export class WeatherService {
  private readonly redisClient: Redis;
  private readonly weatherApi: WeatherAPI;
  private readonly rabbitmqConnection: Connection

  constructor(rabbitmqConnection: Connection) {
    this.redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    this.weatherApi = new WeatherAPI();
    this.rabbitmqConnection = rabbitmqConnection;
  }

  async getLocation(location: string): Promise<{ lat: number, lon: number, country: string, local_names: { id: string } | null, name: string }> {
    return this.weatherApi.getLocation(location);
  }

  async getWeatherData(location: string): Promise<WeatherData> {
    const cachedData = await this.redisClient.get(`weather:${location}`);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const locationData = await this.getLocation(location);
    const weatherData = await this.weatherApi.fetchWeatherData(locationData.lat || 0, locationData.lon || 0);
    const weather = new Weather({
      ...weatherData,
      lat: locationData.lat,
      lon: locationData.lon,  
      dt: weatherData.current.dt,
      sunrise: weatherData.current.sunrise,
      sunset: weatherData.current.sunset,
      temp: weatherData.current.temp,
      feels_like: weatherData.current.feels_like,
      pressure: weatherData.current.pressure,
      humidity: weatherData.current.humidity,
      dew_point: weatherData.current.dew_point,
      uvi: weatherData.current.uvi,
      clouds: weatherData.current.clouds,
      visibility: weatherData.current.visibility,
      wind_speed: weatherData.current.wind_speed,
      wind_deg: weatherData.current.wind_deg,
      weather: weatherData.current.weather,
      daily: weatherData.daily,
      timestamp: new Date()
    }); 
    
    await Promise.all([     
      weather.save(),
      this.redisClient.setex(`weather:${location}`, 300, JSON.stringify(weather)),
      this.publishNotification(location)
    ]);

    return weather;
  }

  private async publishNotification(location: string) {
    const channel = await this.rabbitmqConnection.createChannel();
    await channel.assertQueue('weather-notifications');
    channel.sendToQueue('weather-notifications', Buffer.from(JSON.stringify({ location, timestamp: new Date() })));
    await channel.close();
  }
}