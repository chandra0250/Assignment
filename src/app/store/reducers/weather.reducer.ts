import { createReducer, on } from '@ngrx/store';
import { loadWeather, deleteWeather, clearWeather } from '../actions/weather.actions';
import { Root, Weather } from '../../models/weather';

export interface WeatherState {
  weatherData: Root[];
}

export const initialState: WeatherState = {
  weatherData: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeather, (state, { weatherData }) => ({ ...state, weatherData })),
  on(deleteWeather, (state, { index }) => {
    const newWeatherData = state.weatherData.filter((_, i) => i !== index);
    return { ...state, weatherData: newWeatherData };
  }),
  on(clearWeather, (state) => ({
    ...state,
    weatherData: [], // Clear the weather data
  }))
);
