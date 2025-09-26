import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    temp_c?: number;
    conditionalText?: string;
    style?: object;
};

const WeatherTempAndCondition: React.FC<Props> = ({ temp_c, conditionalText, style }) => {
    if (temp_c === undefined && !conditionalText) return null;
    return (
        <View style={[styles.right, style]}>
            {temp_c !== undefined && (
                <Text style={styles.temp}>{Math.round(temp_c)}°C</Text>
            )}
            {conditionalText && (
                <Text style={styles.condition}>{conditionalText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    right: {
        alignItems: 'flex-end',
        paddingRight: 60,
    },
    temp: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    condition: {
        fontSize: 18,
        color: '#fff',
        marginTop: 4,
    },
});

export default WeatherTempAndCondition;