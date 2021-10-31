const knex = require('knex')(require('../knexfile').default);

const connection = async (req, res, next) => {
  req.knex = knex;
  return next();
};

module.exports = connection;
