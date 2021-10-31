const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const auth = require("./middleware/auth");

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
app.use(express.json());

const knex = require('knex')(require('./knexfile').default);

app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/me", auth, async (req, res) => {
  const user = req.user;
  res.send({
    guid: user.guid,
    first_name: user.first_name,
    last_name: user.last_name
  });
});

app.post("/api/sessions", async (req, res) => {
  const { username, password } = req.body;

  const user = await knex
    .select('*')
    .table('users')
    .where({ username })
    .first();

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user.guid },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const serialized = {
      guid: user.guid,
      first_name: user.first_name,
      last_name: user.last_name
    }
    res.send({ guid: user.guid, token, user: serialized });
  } else {
    res.status(401).send({ error: "Login failed" });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  // TODO: validate username (email)
  // min length
  // max length
  // lowercase
  
  const exists = await knex.select('*').table('users').where({ username }).first();
  if (exists) {
    res.status(409).send({ error: "Username already exists" });
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: encryptedPassword };
    const guid = (await knex.insert(user).into('users').returning('guid'))[0];
    const token = jwt.sign(
      { user_id: guid },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const serialized = {
      guid: user.guid,
      first_name: user.first_name,
      last_name: user.last_name
    }
    res.send({ guid, token, user: serialized });
  }
});

app.post("/api/connect/polar/authorize", async (req, res) => {
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;
  const resp = await Polar.authorize(code, redirect_uri);
  res.send(resp.data);
});

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
