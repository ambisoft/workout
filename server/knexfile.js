const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: __dirname + "/migrations",
  },
};

module.exports.default = config;
