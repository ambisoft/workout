const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PASSWORD_MIN_LENGTH = 6;

const users = (app) => {
  app.post("/api/users", async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
      res.status(422).send({ error: "Email is required" });
      return;
    }
    if (!password) {
      res.status(422).send({ error: "Password is required" });
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      res.status(422).send({
        error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
      });
      return;
    }

    const exists = await req.knex
      .select('*')
      .table('users')
      .where({ username: username.toLowerCase() }).first();
    if (exists) {
      res.status(409).send({ error: 'Email already exists' });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = {
        username: username.toLowerCase(),
        first_name: '',
        last_name: '',
        password: encryptedPassword
      };
      const guid = (await req.knex.insert(user).into('users').returning('guid'))[0];
      const token = jwt.sign(
        { user_id: guid },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      const serialized = {
        guid: guid,
        first_name: user.first_name,
        last_name: user.last_name
      }
      res.send({ guid, token, user: serialized });
    }
  });
};

module.exports.default = users;
