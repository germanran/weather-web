const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/5291d0f670dfe4783594debc40eb54bd/${lat},${lon}`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to server', null);
        } else if (res.body.error) {
            console.log('Unable to find location', null)
        } else {
            const { temperature: temp, precipProbability: rain } = res.body.currently;
            callback(null, { temp, rain });
        }
    })
}
    
module.exports = forecast;
