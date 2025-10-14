import { ScrollView, View, Text, StyleSheet } from 'react-native';
import WeatherIcon from '@/components/WeatherIcon';
import { HourlyForecastInfo } from '@/types/weather';

const HourlyForecast = ({ hours }: { hours: HourlyForecastInfo[] }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {hours.map((hour, idx) => (
          <View key={hour.time_epoch || idx} style={styles.hourBlockContainer}>
            <View style={styles.hourBlock}>
              <WeatherIcon code={hour?.condition?.code} size={50} />
              <Text style={styles.time}>{hour.time.slice(-5)}</Text>
              <Text style={styles.temp}>{Math.round(hour.temp_c)}°C</Text>
            </View>
          </View>
      ))}
    </ScrollView>
);

const styles = StyleSheet.create({
  scroll: {
    height: 150, // Constrain the height of the scroll view
  },
  hourBlockContainer: {
    marginRight: 10,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  hourBlock: { alignItems: 'center' },
  time: { marginTop: 8, color: '#fff', fontSize: 16 },
  temp: { marginTop: 4, fontWeight: 'bold', color: '#fff', fontSize: 22 },
});

export default HourlyForecast;