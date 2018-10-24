const request = require('request');
//const API_KEY = 'AIzaSyAOOow6QI0PLuOB59V1W4Dgqa2BwBCodLI';

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);
    //warum braucht es die variable und geht nicht direkt?

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAOOow6QI0PLuOB59V1W4Dgqa2BwBCodLI`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to connect to google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('unable to find the address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else if (body.status === 'OVER_QUERY_LIMIT') {
            console.log('OVER_QUERY_LIMIT');
        } else if (response.statusCode === 403) {
            console.log('error 403');
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
