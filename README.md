# Weather App

## Description
A full-stack weather application built with Microservice architecture and technology **MongoDB**, **Redis**, **RabbitMQ**, and **Next.js**. This app fetches and displays real-time weather data based on location, with features like data refresh, weather trends visualization, and drag-and-drop functionality for favorite locations.

---

## Technologies Used
- **Backend:** Node.js, Express, MongoDB, Redis, RabbitMQ
- **Frontend:** Next.js, Redux, Tailwind CSS
- **Others:** TypeScript, Docker

---

## Key Features
1. **Fetch and Display Weather Data:** Retrieve and display current weather information based on location.
2. **Caching with Redis:** Store weather data temporarily for optimized performance.
3. **Microservices with RabbitMQ:** Notify users via a message queue when weather data is refreshed.
4. **Weather Trends Chart:** Visualize temperature trends over the next few days using Chart.js.
5. **Drag-and-Drop Functionality:** Allow users to reorder their favorite locations.

---

## Prerequisites
Before running this application, ensure the following tools and dependencies are installed:
1. **Node.js** version 16 or later.
2. **Docker** and **Docker Compose** installed on your system.
3. API key from a public weather service, such as [OpenWeatherMap](https://openweathermap.org/api).

---

## Environment Variables
### Backend
Create a `.env` file in the `backend` directory with the following content:
```env
PORT=4000
MONGODB_URI=mongodb+srv://adityamuhamadputra:RywYFwqFqnfVKylU@cluster0.aoql4.mongodb.net/
MONGO_DB_NAME=test
MONGO_DB_COLLECTION=weather
MONGO_DB_USER=adityamuhamadputra
MONGO_DB_PASSWORD=RywYFwqFqnfVKylU
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://localhost:5672
OPEN_WEATHER_API_KEY=0734549e2fccaec1f2e6fd38f2752c56
OPEN_WEATHER_API_BASE_URL=https://api.openweathermap.org
```

### Frontend
Create a `.env` file in the `frontend` directory with the following content:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Installation and Setup
### Clone the repository to your local machine:
```
https://github.com/adityamputra27/weather-app-microservice.git
weather-app-microservice
```

## Docker Setup
### The application is fully dockerized. Use the following command to build and run the app:
```
docker-compose up --build
```

This command will:
1. Start MongoDB, Redis, and RabbitMQ containers.
2. Launch the Backend service on http://localhost:5000.
3. Launch the Frontend service on http://localhost:3000.

## How to Use
### Open the app in your browser at http://localhost:3000.
1. Enter a location to fetch weather data.
2. View:
  - Current temperature
  - Weather conditions
  - Future forecasts
3. Use the refresh button to fetch the latest data.
4. Drag and drop favorite locations to reorder them.
5. Button to change temperature to Celsius and Fahrenheit.

