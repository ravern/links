import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { COOKIE_ACCESS_TOKEN } from "~/api/constants";

export default async function login(req, res) {
  const { db, cookies } = req.state;

  const { emailOrUsername, password } = req.body;

  const user = await db("users")
    .where({ username: emailOrUsername })
    .orWhere({ email: emailOrUsername })
    .first();
  if (!user) {
    res.json({ error: { message: "Invalid credentials" } });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.json({ error: { message: "Invalid credentials" } });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  cookies.set(COOKIE_ACCESS_TOKEN, token);

  delete user.password;

  res.json({
    data: {
      user,
    },
  });
}
