const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

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

app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from server!" });
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