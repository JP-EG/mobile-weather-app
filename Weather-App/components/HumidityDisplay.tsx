import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = { humidity: number | undefined };

const HumidityDisplay: React.FC<Props> = ({ humidity }) => (
    <View style={styles.container}>
        <MaterialCommunityIcons name="water-percent" size={40} color="#4FC3F7" style={styles.icon} />
        <View style={styles.textContainer}>
            <Text style={styles.label}>Humidity</Text>
            <Text style={styles.value}>{humidity}%</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 12, width: 150 },
    icon: { marginRight: 12 },
    textContainer: { flex: 1 },
    label: { fontSize: 16, color: '#fff', fontWeight: '600' },
    value: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 4 },
});

export default HumidityDisplay;