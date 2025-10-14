import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type WeatherIconProps = {
    code: number | undefined;
    size?: number;
    style?: object;
};

const iconMap: Record<number, ImageSourcePropType> = {
    1000: require('@/assets/images/sunny.png'),
    1003: require('@/assets/images/partially-cloudy.png'),
    1006: require('@/assets/images/cloudy.png'),
    1009: require('@/assets/images/overcast.png'),
    1030: require('@/assets/images/mist.png'),
    1063: require('@/assets/images/light-rain.png'),
    1066: require('@/assets/images/light-snow.png'),
    1069: require('@/assets/images/sleet.png'),
    1072: require('@/assets/images/freezing-drizzle.png'),
    1087: require('@/assets/images/thunder-weather.png'),
    1114: require('@/assets/images/snow-storm.png'),
    1117: require('@/assets/images/blizzard.png'),
    1135: require('@/assets/images/fog.png'),
    1147: require('@/assets/images/freezing-fog.png'),
    1150: require('@/assets/images/light-rain.png'),
    1153: require('@/assets/images/light-rain.png'),
    1168: require('@/assets/images/freezing-drizzle.png'),
    1171: require('@/assets/images/freezing-drizzle.png'),
    1180: require('@/assets/images/light-rain.png'),
    1183: require('@/assets/images/light-rain.png'),
    1186: require('@/assets/images/light-rain.png'),
    1189: require('@/assets/images/moderate-rain.png'),
    1192: require('@/assets/images/heavy-rain.png'),
    1195: require('@/assets/images/heavy-rain.png'),
    1198: require('@/assets/images/light-freezing-rain.png'),
    1201: require('@/assets/images/freezing-drizzle.png'),
    1204: require('@/assets/images/sleet.png'),
    1207: require('@/assets/images/sleet.png'),
    1210: require('@/assets/images/light-snow.png'),
    1213: require('@/assets/images/light-snow.png'),
    1216: require('@/assets/images/light-snow.png'),
    1219: require('@/assets/images/snow-storm.png'),
    1222: require('@/assets/images/snow-storm.png'),
    1225: require('@/assets/images/snow-storm.png'),
    1237: require('@/assets/images/ice.png'),
    1240: require('@/assets/images/light-rain.png'),
    1243: require('@/assets/images/heavy-rain.png'),
    1246: require('@/assets/images/heavy-rain.png'),
    1249: require('@/assets/images/sleet.png'),
    1252: require('@/assets/images/sleet.png'),
    1255: require('@/assets/images/light-snow.png'),
    1258: require('@/assets/images/snow-storm.png'),
    1261: require('@/assets/images/ice.png'),
    1264: require('@/assets/images/ice.png'),
    1273: require('@/assets/images/thunder-weather.png'),
    1276: require('@/assets/images/thunder-weather.png'),
    1279: require('@/assets/images/thunder-weather.png'),
    1282: require('@/assets/images/thunder-weather.png'),
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 100, style }) => {
    if (code === undefined) {
        return null;
    }

    const iconSource = iconMap[code] || require('@/assets/images/cloudy.png');

    return (
        <View style={[styles.WeatherImage, style]}>
            <Image source={iconSource} style={{ width: size, height: size }} />
        </View>
    );
};

export default WeatherIcon;

const styles = StyleSheet.create({
    WeatherImage: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});