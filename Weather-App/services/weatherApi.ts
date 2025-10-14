import Constants from 'expo-constants';
import { WeatherAPIResponse, Location } from '@/types/weather';

const { WEATHER_API_KEY, BASE_URL } = Constants.expoConfig?.extra ?? {};

if (!WEATHER_API_KEY || !BASE_URL) {
    console.error("Weather API Key or Base URL is not set in environment variables.");
}

export const fetchLocationSuggestions = async (query: string): Promise<Location[]> => {
    if (query.length < 2) return [];
    const res = await fetch(`${BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${query}`);
    return res.json();
};

export const fetchWeatherForCity = async (city: string): Promise<WeatherAPIResponse> => {
    const start = new Date().toISOString().split('T')[0];
    const response = await fetch(`${BASE_URL}/history.json?key=${WEATHER_API_KEY}&q=${city}&dt=${start}&end_dt=${start}`);
    return response.json();
};