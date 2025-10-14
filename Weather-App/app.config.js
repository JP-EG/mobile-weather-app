const appJson = require('./app.json');

module.exports = ({ config }) => {
    // Use the existing app.json config and add the extra properties
    config.extra = {
        ...config.extra,
        WEATHER_API_KEY: process.env.WEATHER_API_KEY,
        BASE_URL: process.env.BASE_URL,
    };
    return config;
};
