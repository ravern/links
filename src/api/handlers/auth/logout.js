import { COOKIE_ACCESS_TOKEN } from "~/api/constants";

export default async function logout(req, res) {
  const { cookies } = req.state;

  cookies.set(COOKIE_ACCESS_TOKEN);

  res.json({ data: true });
}
