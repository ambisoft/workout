const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const database = require("./middleware/database");

const ConnectStrava = require('./routes/connect/strava').default;
const Sessions = require('./routes/sessions').default;
const Sources = require('./routes/sources').default;
const Users = require('./routes/users').default;

const Polar = require('../src/api/Polar').default;

const PORT = process.env.PORT || 3001;
const app = express();

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: (origin, callback) => (
    callback(null, whitelist.includes(origin))
  ),
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));
app.use(database);
app.use(express.json());

// application routes
ConnectStrava(app);
Sessions(app);
Sources(app);
Users(app);

app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// TODO: move to ConnectPolar
app.post("/api/connect/polar/authorize", async (req, res) => {
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;
  const resp = await Polar.authorize(code, redirect_uri);
  res.send(resp.data);
});

// TODO: move to ConnectPolar
app.post("/api/connect/polar/exercises", async (req, res) => {
  const access_token = req.body.access_token;
  try {
    console.log('call .exercises');
    const resp = await Polar.exercises(access_token);
    console.log('exercises resp:', resp);
    res.send(resp.data);
  } catch (e) {
    console.log('error:', e);
    return;
  }
});

// TODO: move to ConnectPolar
app.post("/api/connect/polar/activities", async (req, res) => {
  const access_token = req.body.access_token;
  const user_id = req.body.user_id;

  // Step 1: register the user - if not registered
  // TODO: check if the user is registered
  // Step 2: create a transaction
  // Step 3: get activity data

  /*
  try {
    const resp = await Polar.registerUser(access_token, user_id);
    console.log('resp:', resp);
  } catch (e) {
    console.log('error:', e);
    return;
  }
  */

  try {
    const resp = await Polar.activities(access_token, user_id);
    console.log('transaction create:', resp);
    res.send(resp.data);
  } catch (e) {
    console.log('error:', e);
    return;
  }
});

// serve static React frontend
app.get('*', (req, res) => {
  const url = req.url;
  let filePath = url.replace(new RegExp('^/'), '');
  if (filePath === '') {
    filePath = 'index.html';
  }
  const fullPath = path.resolve(__dirname, '../build', filePath);
  if (fs.existsSync(fullPath)) {
    res.sendFile(fullPath);
  } else {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
