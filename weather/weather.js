const request = require('request');

const API_KEY_forecast = 'e7ce823666807ecd01379fda30c0c2b1';
//39.939,-75.11832

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/e7ce823666807ecd01379fda30c0c2b1/${lat}, ${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to connect to google servers');
        } else if (response.statusCode === 400) {
            callback('unable to fetch weather');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getWeather = getWeather;
