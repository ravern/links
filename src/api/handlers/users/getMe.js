export default async function getMe(req, res) {
  const { user } = req.state;

  delete user.password;

  res.json({ data: user });
}
