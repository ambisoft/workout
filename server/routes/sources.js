const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require("../middleware/auth");

const sources = (app) => {
  app.get("/api/sources", auth, async (req, res) => {
    const sources = await req.knex
      .select('*')
      .table('sources')
      .orderBy('name');
    res.send(sources);
  });
};

module.exports.default = sources;
