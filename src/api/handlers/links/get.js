export default async function get(req, res) {
  const { slug } = req.query;
  const { db } = req.state;

  const link = await db("links").where({ slug }).first();
  if (!link) {
    res.status(404);
    res.json({ error: { message: "Could not find link" } });
    return;
  }

  res.json({
    data: link,
  });
}
