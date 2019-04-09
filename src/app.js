const path = require('path');
const express = require('express');
const hbs = require('hbs');  
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({ error: 'Must provide an address' });
    }

    geocode(address, (error, { lat, lon }) => {
        if (error) {
            return res.send('some error occured in geocode function');``
        }
        forecast(lat, lon, (error, { temp, rain }) => {
            if (error) {
                return res.send('some error occured in forecast function');
            }

            res.send('The temperature in ' + address + ' is ' + temp + ' and there is ' + rain + '% rain');
        })

    })
})

app.get('*', (req, res) => {
    res.sendStatus(404);
})

app.listen(process.env.PORT || 3000, () => { console.log('Server is up on port 3000')});