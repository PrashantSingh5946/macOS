const express = require('express')
const request = require('request')
const WebSocket = require('ws');
const app = express();

//
var spotify_client_id = "1f69117fccb34ebd9acb82fba5613f12";
var spotify_client_secret = "d461a6d7b944497bb63232a9bbdfc272";

//
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const clients = new Set();

//Login handler
app.get('/auth/login', (req, res) => {

    var scope = "streaming \
                 user-read-email \
                 user-read-private \
                 user-read-currently-playing \
                 user-read-playback-state"

    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:8000/auth/callback",
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

//
app.get('/auth/callback', (req, res) => {

    var code = req.query.code;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:8000/auth/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            console.log(body);
            //Send the token
            sendToAllClients(JSON.stringify({ token: access_token }))
            res.send("<html><body><script> (()=>{window.close()})()</script></body></html>");
        }
        else
        {
            console.log(error)
        }
    });
})


app.get('/', (req, res) => {
    res.send("Yeah!!")
})


const server = app.listen(8000, () => {
    console.log("Server running")
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    clients.add(ws)

    ws.on('message', (message) => {
        console.log('Received message:', message);
        // Process the message as needed
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

const sendToAllClients = (message) => {
    clients.forEach((client) => {
        client.send(message);
    });
};