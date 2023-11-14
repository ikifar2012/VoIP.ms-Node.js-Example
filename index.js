const axios = require('axios');
const env = require('./env');

const API_PASSWORD = env.API_PASSWORD;
const API_USER = env.API_USER;
const DID = env.DID;
const BASE_URL = 'https://voip.ms/api/v1/rest.php';
const API_KEY = env.API_KEY;

/**
 * Sends an SMS message using the VoIP.ms API.
 * @param {string} destination - The phone number to send the SMS to.
 * @param {string} message - The message to send.
 */
async function sendSMS(destination, message) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_username: API_USER,
                api_password: API_PASSWORD,
                method: 'sendSMS',
                dst: destination,
                message: message,
                did: DID,
            }
        });
        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
}
// host a webserver for VoIP.ms to send incoming SMS messages to
// https://example.com/sms?to={TO}&from={FROM}&message={MESSAGE}&files={MEDIA}&id={ID}&date={TIMESTAMP}?api_key={API_KEY}

const express = require('express');
const app = express();
const port = 3000;
app.get('/sms', (req, res) => {
    console.log(req.query);
    res.send('OK');
    // parse api key
    const apiKey = req.query.api_key;
    if (apiKey !== API_KEY) {
        console.log('Invalid API key');
        return;
    }
    // parse the query string
    const to = req.query.to;
    const from = req.query.from;
    const message = req.query.message;
    // log the message
    console.log(`Received SMS from ${from} to ${to}: ${message}`);
    // send a response
    sendSMS(from, 'Thanks for your message! you just said: "' + message + '", congratulations human!🎉');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



// Example usage

// sendSMS('5555555555', 'Hello, world!');


