# VoIP.ms SMS API

This project is a simple implementation of the VoIP.ms SMS API. It allows you to send SMS messages and host a web server for incoming SMS messages.

*Please note that this implementation of the API is not complete and is intended for demonstration purposes only*

For more information on the VoIP.ms SMS API, see the [official documentation](https://voip.ms/m/apidocs.php).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. 

### Installing

1. Clone the repository
2. Install the dependencies using npm:

```bash
npm install
```

### Configuration

Create a `env.js` file in the root directory of the project, and insert your API credentials:

```javascript
module.exports = {
    API_PASSWORD: 'your-api-password',
    API_USER: 'your-api-username',
    DID: 'your-did',
    API_KEY: 'your-api-key'
};
```
| Variable    | Description                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------|
| `API_PASSWORD`| Set in the VoIP.ms control panel under `Main Menu > SOAP / REST API > API Security`.                 |
| `API_USER`    | The username/e-mail you use to log in to the VoIP.ms control panel.                                         |
| `DID`         | The phone number you want to send SMS messages from.                                                  |
| `API_KEY`     | A random string of characters that you use to authenticate incoming SMS messages in the SMS Callback URL. |

You can generate a random string of characters using the following command:

```bash
openssl rand -hex 32
```



## Running the Server

Start the server by running:

```bash
node index.js
```

The server will start on port 3000.

## Usage

To send an SMS, call the `sendSMS` function with the destination phone number and the message:

```javascript
sendSMS('5555555555', 'Hello, world!');
```

To receive an SMS, VoIP.ms will send a GET request to `https://example.com/sms` with the following query parameters: `to`, `from`, `message`, `files`, `id`, `date`, and `api_key`.

Via the SMS Callback URL in the VoIP.ms control panel, you can set the URL to:
```
https://example.com/sms?to={TO}&from={FROM}&message={MESSAGE}&files={MEDIA}&id={ID}&date={TIMESTAMP}?api_key=your-api-key
```

VoIP.ms will replace the query parameters with the appropriate values.

## Support
If you found this project helpful, please consider using my [referral link](https://voip.ms/en/invite/Mzg1ODYz) to sign up for VoIP.ms. I will receive a small commission at no extra cost to you.