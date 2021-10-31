const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require("../middleware/auth");

const sessions = (app) => {
  app.post("/api/sessions", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(401).send({ error: "Email and password required" });
      return;
    }

    const user = await req.knex
      .select('*')
      .table('users')
      .where({ username: username.toLowerCase() })
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

  app.get("/api/me", auth, async (req, res) => {
    const user = req.user;
    res.send({
      guid: user.guid,
      first_name: user.first_name,
      last_name: user.last_name
    });
  });

};

module.exports.default = sessions;
