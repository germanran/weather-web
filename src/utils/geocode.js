const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFuZ2VybWFuNDQiLCJhIjoiY2p1NnlsNml2MG10azQ0dDNjbm4zanpwZCJ9.pKE3O49onWCODAyqucw8og`;
    request({ url: geocodeUrl, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect the server', res);
        } else if (res.body.features.length === 0) {
            callback('Unable to find location', res);
        } else {
            const lat = res.body.features[0].center[1];
            const lon = res.body.features[0].center[0];
            callback(null, { lat, lon });
        }
    })
}

module.exports = geocode;