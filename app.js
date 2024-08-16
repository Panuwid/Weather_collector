const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'weather_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading weather data');
        }

        const weatherData = data.trim().split('\n').map(JSON.parse);
        const latestWeather = weatherData[weatherData.length - 1];

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Weather Report</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #333; }
                .weather-info { background-color: #f0f0f0; padding: 20px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>Current Weather in ${latestWeather.city}</h1>
            <div class="weather-info">
                <p>Temperature: ${latestWeather.temperature}°C</p>
                <p>Humidity: ${latestWeather.humidity}%</p>
                <p>Description: ${latestWeather.description}</p>
                <p>Last Updated: ${new Date(latestWeather.timestamp).toLocaleString()}</p>
            </div>
        </body>
        </html>
        `;

        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});