import React, { useState, useCallback } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
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
import { fetchLocationSuggestions, fetchWeatherForCity } from '@/services/weatherApi';
import { Location, WeatherAPIResponse } from '@/types/weather';

const Index = () => {
  const [fontsLoaded] = useFonts({
    // Replace 'YourIconFontName' with the name you'll use in your styles,
    // and update the path to your actual font file.
    // 'YourIconFontName': require('@/assets/fonts/Your-Icon-Font.ttf'),
  });

  const { weather, location, loading } = useWeatherByLocation();
  const hourIndex = getHourIndex();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customWeather, setCustomWeather] = useState<WeatherAPIResponse | null>(null);
  const [customLocation, setCustomLocation] = useState<Location | null>(null);
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

  const handleSuggestionPress = async (item: Location) => {
    setSearch(item.name);
    setShowSuggestions(false);
    setCustomLoading(true);
    const data = await fetchWeatherForCity(item.name);
    setCustomWeather(data);
    setCustomLocation(data?.location ?? null);
    setCustomLoading(false);
  };

  const handleSearchPress = async () => {
    setShowSuggestions(false);
    const data = await fetchWeatherForCity(search);
    setCustomWeather(data);
    setCustomLocation(data?.location ?? null);
  };

  const displayWeather = customWeather || weather;
  const displayLocation = customLocation || location;
  const displayLoading = customLoading || loading;

  // Wait until fonts and initial weather data are loaded
  if (!fontsLoaded && !loading) {
    return null; // Or a loading spinner/splash screen
  }

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient colors={['#86CEFA', '#73B9EE', '#5494DA', '#3373C4', '#1750AC', '#003396']} style={styles.container}>
          <SafeAreaView style={styles.contentContainer}>
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
            <View style={styles.hourly_forecast_container}>
              <HourlyForecast hours={displayWeather?.forecast?.forecastday[0]?.hour || []} />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
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
  },
  hourly_forecast_container: {
    paddingTop: 50,
  },
});