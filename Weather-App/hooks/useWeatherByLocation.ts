import { useEffect, useState } from 'react';
import * as expoLocation from 'expo-location';
import Constants from 'expo-constants';
import {Location, WeatherAPIResponse} from "@/types/weather";

const startDate = new Date();
const endDate = new Date();

const formatDate = (date: Date) => date.toISOString().split('T')[0];
const start = formatDate(startDate);
const end = formatDate(endDate);

export const useWeatherByLocation = () => {
    const [weather, setWeather] = useState<WeatherAPIResponse | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            const { WEATHER_API_KEY, BASE_URL } = Constants.expoConfig?.extra ?? {};
            if (!WEATHER_API_KEY || !BASE_URL) {
                console.error('Missing required environment variables');
                return;
            }
            try {
                const { status } = await expoLocation.requestForegroundPermissionsAsync();
                if (status !== 'granted') return;

                const loc = await expoLocation.getCurrentPositionAsync({});
                const { latitude, longitude } = loc.coords;

                const response = await fetch(`${BASE_URL}/history.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&dt=${start}&end_dt=${end}`);

                const data = await response.json();
                setWeather(data);
                setLocation(data?.location ?? null);
            } catch (err) {
                console.error('Error fetching weather:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocationAndWeather();
    }, []);

    return { weather, location, loading };
};