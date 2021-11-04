const capturedEmails = (app) => {
  app.post("/api/emails", async (req, res) => {
    const { email } = req.body;
    const ip = req.socket.remoteAddress;

    if (!email) {
      res.status(401).send({ error: "Email required" });
      return;
    }

    const knex = req.knex;
    const entry = { email, ip, created_at: new Date().toISOString() };
    const record = await knex.select('guid').table('captured_emails').first();
    if (record) {
      const guid = record.guid;
      const details = knex.raw(`jsonb_set(details,
        ARRAY['captured'], details->'captured' || CAST(? as jsonb)
      )`, [entry]);
      await knex('captured_emails').update({ details }).where({ guid });
    } else {
      const details = { captured: [entry] };
      await knex('captured_emails').insert({ details });
    }
    res.send({ status: 'ok' });
  });
};

module.exports.default = capturedEmails;
