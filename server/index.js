const express = require("express");
const request = require("request");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

var spotify_client_id = process.env.SPOTIFY_API_CLIENT;
var spotify_client_secret = process.env.SPOTIFY_API_SECRET;

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//Serve the main site
app.use(express.static("dist"));

//Login handler
app.get("/auth/login", (req, res) => {
  var scope =
    "streaming \
                 user-read-email \
                 user-read-private \
                 user-read-currently-playing \
                 user-read-playback-state";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: process.env.SERVER_URL + "/auth/callback",
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

//
app.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: process.env.SERVER_URL + "/auth/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log(body);
      //Send the token

      socketIO.emit("message", { token: access_token });

      res.send(
        "<html><body><script> (()=>{window.close()})()</script></body></html>"
      );
    } else {
      console.log(error);
    }
  });
});

//HTTP server
http.listen(process.env.PORT || 8000, () => {
  console.log("Server running");
});
