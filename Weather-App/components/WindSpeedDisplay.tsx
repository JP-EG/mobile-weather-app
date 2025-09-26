import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = { windMph: number | undefined };

const WindSpeedDisplay: React.FC<Props> = ({ windMph }) => (
    <View style={styles.container}>
        <MaterialCommunityIcons name="weather-windy" size={40} color="#81D4FA" style={styles.icon} />
        <View style={styles.textContainer}>
            <Text style={styles.label}>Wind Speed</Text>
            <Text style={styles.value}>{windMph} mph</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 12, width: 200 },
    icon: { marginRight: 12 },
    textContainer: { flex: 1 },
    label: { fontSize: 16, color: '#fff', fontWeight: '600' },
    value: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 4 },
});

export default WindSpeedDisplay;