import { Router } from "express";
import { WeatherService } from "../services/weather";
import { connectionQueue } from "../config/rabbitmq";

const router = Router();

router.get('/search', async (req, res) => {
  const { location } = req.query;
  const rabbitmqConnection = await connectionQueue();
  const weatherService = new WeatherService(rabbitmqConnection);
  const locationData = await weatherService.getLocation(location as string);
  res.json({
    lat: locationData.lat ?? 0,
    lon: locationData.lon ?? 0,
    country: locationData.country,
    name: locationData.local_names?.id || locationData.name
  });
});

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  const rabbitmqConnection = await connectionQueue();
  const weatherService = new WeatherService(rabbitmqConnection);
  const weatherData = await weatherService.getWeatherData(location);
  res.json(weatherData);
});

export default router;