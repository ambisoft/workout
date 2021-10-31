const jwt = require("jsonwebtoken");
const knex = require('knex')(require('../knexfile').default);

const fromHeaders = (headers) => {
  const authorization = headers.authorization || '';
  const m = authorization.match(/^Bearer\s+(\S+)/);
  return m ? m[1] : '';
};

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || fromHeaders(req.headers);
  if (!token) {
    return res.status(403).send({ error: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const guid = decoded.user_id;
    const user = await knex.select('*').table('users').where({ guid }).first();
    req.user = user;
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
  return next();
};

module.exports = verifyToken;
