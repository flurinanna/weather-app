const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Adress to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAOOow6QI0PLuOB59V1W4Dgqa2BwBCodLI`;



//axios erkennt JSON automatisch und parst es und was es zurück gibt ist ein promise
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address')
    }

    var lat = response.data.results[0].geometry.location.lat
    var lng = response.data.results[0].geometry.location.lng
    var weatherUrl = `https://api.darksky.net/forecast/e7ce823666807ecd01379fda30c0c2b1/${lat}, ${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}. It feels like it's ${apparentTemperature}`)
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to server')
    } else {
        console.log(error.message);
    }
});
