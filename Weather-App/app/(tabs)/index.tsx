import React, { useState, useCallback } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherHeaderDetails from '@/components/WeatherHeaderDetails';
import WeatherIcon from '@/components/WeatherIcon';
import SearchBar from '@/components/SearchBar';
import HourlyForecast from '@/components/HourlyForecast';
import { useWeatherByLocation } from '@/hooks/useWeatherByLocation';
import { getHourIndex } from '@/utils/time';
import WeatherTempAndCondition from '@/components/WeatherTempAndCondition';
import HumidityDisplay from '@/components/HumidityDisplay';
import WindSpeedDisplay from '@/components/WindSpeedDisplay';
import Constants from 'expo-constants';

const { WEATHER_API_KEY, BASE_URL } = Constants.expoConfig?.extra ?? {};

const fetchLocationSuggestions = async (query: string) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${query}`);
  return res.json();
};

const fetchWeatherForCity = async (city: string, setWeather: any, setLocation: any, setLoading: any) => {
  setLoading(true);
  const start = new Date().toISOString().split('T')[0];
  const end = start;
  const response = await fetch(`${BASE_URL}/history.json?key=${WEATHER_API_KEY}&q=${city}&dt=${start}&end_dt=${end}`);
  const data = await response.json();
  setWeather(data);
  setLocation(data?.location ?? null);
  setLoading(false);
};

const Index = () => {
  const { weather, location, loading } = useWeatherByLocation();
  const hourIndex = getHourIndex();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customWeather, setCustomWeather] = useState<any>(null);
  const [customLocation, setCustomLocation] = useState<any>(null);
  const [customLoading, setCustomLoading] = useState(false);

  const handleChangeText = useCallback(async (text: string) => {
    setSearch(text);
    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const results = await fetchLocationSuggestions(text);
    setSuggestions(results);
    setShowSuggestions(true);
  }, []);

  const handleSuggestionPress = async (item: any) => {
    setSearch(item.name);
    setShowSuggestions(false);
    await fetchWeatherForCity(item.name, setCustomWeather, setCustomLocation, setCustomLoading);
  };

  const handleSearchPress = async () => {
    setShowSuggestions(false);
    await fetchWeatherForCity(search, setCustomWeather, setCustomLocation, setCustomLoading);
  };

  const displayWeather = customWeather || weather;
  const displayLocation = customLocation || location;
  const displayLoading = customLoading || loading;

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient colors={['#86CEFA', '#73B9EE', '#5494DA', '#3373C4', '#1750AC', '#003396']} style={styles.container}>
          <View>
            <SearchBar
                value={search}
                onChangeText={handleChangeText}
                onSearchPress={handleSearchPress}
            />
            {showSuggestions && (
                <FlatList
                    data={suggestions}
                    keyExtractor={item => item.id?.toString() || item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                          <Text style={{ color: 'white', padding: 10 }}>{item.name}, {item.country}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ backgroundColor: '#113065', borderRadius: 10, marginHorizontal: 15, maxHeight: 200 }}
                />
            )}
            <WeatherHeaderDetails location={displayLocation} loading={displayLoading} />
            <View style={styles.icon_and_temp}>
              <WeatherIcon code={displayWeather?.forecast?.forecastday[0]?.hour[hourIndex]?.condition?.code} />
              <WeatherTempAndCondition temp_c={displayWeather?.forecast?.forecastday[0]?.hour[hourIndex]?.temp_c} conditionalText={displayWeather?.forecast?.forecastday[0]?.hour[hourIndex]?.condition.text}/>
            </View>
            <View style={styles.humidity_and_wind}>
              <HumidityDisplay humidity={displayWeather?.forecast?.forecastday[0]?.hour[hourIndex]?.humidity}/>
              <WindSpeedDisplay windMph={displayWeather?.forecast?.forecastday[0]?.hour[hourIndex]?.wind_mph}/>
            </View>
            <HourlyForecast hours={displayWeather?.forecast?.forecastday[0]?.hour || []} />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderRadius: 12,
    paddingTop: 50,
    width: 390,
    height: 844,
    flex: 1,
  },
  icon_and_temp: {
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  humidity_and_wind: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});