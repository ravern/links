export default async function all(req, res) {
  const { db, user } = req.state;

  const links = await db("links").where({ user_id: user.id });

  res.json({
    data: links,
  });
}
