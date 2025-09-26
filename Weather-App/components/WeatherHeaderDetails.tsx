import { Text, StyleSheet, View, Image } from 'react-native';
import type { Location } from '@/types/weather';
import locationImg from '@/assets/images/location.png';
import React from "react";

type Props = {
    location: Location | null;
    loading: boolean;
};

const formatDate = (localtime?: string) => {
    if (!localtime) return '';
    const date = new Date(localtime.replace(' ', 'T'));
    const weekday = date.toLocaleString('default', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${weekday}, ${day} ${month}`;
};

const WeatherHeaderDetails: React.FC<Props> = ({ location, loading }) => (
    <View style={styles.row}>
        <Image source={locationImg} style={styles.icon} />
        <Text style={styles.text}>
            {loading ? 'Loading...' : location?.name || 'Unknown City'}
        </Text>
        <Text style={styles.date}>
            {location?.localtime ? formatDate(location.localtime) : ''}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 24,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
    text: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        flex: 1,
    },
    date: {
        color: '#eee',
        fontSize: 16,
        marginLeft: 12,
    },
});

export default WeatherHeaderDetails;