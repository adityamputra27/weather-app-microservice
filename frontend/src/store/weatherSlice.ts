import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface LocationItem {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface WeatherState {
  currentWeather: {
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
    daily: {
      dt: number
      temp: {
        day: number
        min: number
        max: number 
        night: number
        eve: number
        morn: number
      }
    }[];
    timestamp: string;
    _id: string;
  } | null;
  recentLocations: LocationItem[];
  locationData: {
    lat: number;
    lon: number;
    country: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export const fetchLocation = createAsyncThunk(
  'weather/fetchLocation',
  async (location: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/weather/search?location=${location}`);
    return response.data;
  }
)

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/weather/${location}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }
    return response.data;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    recentLocations: [],
    loading: false,
    error: null,
    locationData: null
  } as WeatherState,
  reducers: {
    reorderLocations: (state, action) => {
      state.recentLocations = action.payload;
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.recentLocations = state.recentLocations.filter(
        location => location.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })

      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locationData = action.payload;

        const locationObject = {
          ...action.payload,
          id: `${Date.now()}-${action.payload.name}`,
          name: action.payload.name,
          lat: action.payload.lat,
          lon: action.payload.lon
        }

        const existingIndex = state.recentLocations.findIndex(
          loc => loc.name === locationObject.name && loc.lat === locationObject.lat && loc.lon === locationObject.lon
        )

        if (existingIndex !== -1) {
          state.recentLocations.splice(existingIndex, 1);
        }

        state.recentLocations.unshift(locationObject);
        
        if (state.recentLocations.length > 5) {
          state.recentLocations.pop();
        }
      })

      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch location data';
      })
  }
})

export const { reorderLocations } = weatherSlice.actions;
export default weatherSlice.reducer;

