import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Sunny from '@/assets/images/sunny.png';
import Cloudy from '@/assets/images/cloudy.png';
import PartiallyCloudy from '@/assets/images/partially-cloudy.png';
import Overcast from '@/assets/images/overcast.png';
import LightRain from '@/assets/images/light-rain.png';
import Mist from '@/assets/images/mist.png';
import LightSnow from '@/assets/images/light-snow.png';
import Sleet from '@/assets/images/sleet.png';
import FreezingDrizzle from '@/assets/images/freezing-drizzle.png';
import Thunder from '@/assets/images/thunder-weather.png';
import SnowStorm from '@/assets/images/snow-storm.png';
import Blizzard from '@/assets/images/blizzard.png';
import Fog from '@/assets/images/fog.png';
import FreezingFog from '@/assets/images/freezing-fog.png';
import ModerateRain from '@/assets/images/moderate-rain.png';
import HeavyRain from '@/assets/images/heavy-rain.png';
import LightFreezingRain from '@/assets/images/light-freezing-rain.png';
import Ice from '@/assets/images/ice.png';

type WeatherIconProps = {
    code: number | undefined;
    size?: number;
    style?: object;
};

const iconMap: Record<number, ImageSourcePropType> = {
    1000: Sunny,
    1003: PartiallyCloudy,
    1006: Cloudy,
    1009: Overcast,
    1030: Mist,
    1063: LightRain,
    1066: LightSnow,
    1069: Sleet,
    1072: FreezingDrizzle,
    1087: Thunder,
    1114: SnowStorm,
    1117: Blizzard,
    1135: Fog,
    1147: FreezingFog,
    1150: LightRain,
    1153: LightRain,
    1168: FreezingDrizzle,
    1171: FreezingDrizzle,
    1180: LightRain,
    1183: LightRain,
    1186: LightRain,
    1189: ModerateRain,
    1192: HeavyRain,
    1195: HeavyRain,
    1198: LightFreezingRain,
    1201: FreezingDrizzle,
    1204: Sleet,
    1207: Sleet,
    1210: LightSnow,
    1213: LightSnow,
    1216: LightSnow,
    1219: SnowStorm,
    1222: SnowStorm,
    1225: SnowStorm,
    1237: Ice,
    1240: LightRain,
    1243: HeavyRain,
    1246: HeavyRain,
    1249: Sleet,
    1252: Sleet,
    1255: LightSnow,
    1258: SnowStorm,
    1261: Ice,
    1264: Ice,
    1273: Thunder,
    1276: Thunder,
    1279: Thunder,
    1282: Thunder,
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 100, style }) => {
    if (code === undefined) {
        return null;
    }

    const iconSource = iconMap[code] || Cloudy;

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