const request = require('request');


var geocodeAddress = (address) => {

    //warum braucht es die variable und geht nicht direkt?

    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAOOow6QI0PLuOB59V1W4Dgqa2BwBCodLI`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('unable to connect to google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('unable to find the address');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }

        })
    });

};

geocodeAddress('19148').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})
