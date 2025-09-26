import { ScrollView, View, Text, StyleSheet } from 'react-native';
import WeatherIcon from '@/components/WeatherIcon';

const HourlyForecast = ({ hours }: { hours: any[] }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {hours.map((hour, idx) => (
          <View key={idx} style={styles.hourBlockContainer}>
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
  scroll: { marginVertical: 50, height: 140 },
  hourBlockContainer: {
    marginHorizontal: 10,
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
  time: { marginTop: 6, color: '#fff', paddingTop: 15, fontSize: 18 },
  temp: { marginTop: 4, fontWeight: 'bold', color: '#fff', fontSize: 22 },
});

export default HourlyForecast;