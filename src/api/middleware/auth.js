import jwt from "jsonwebtoken";

import { COOKIE_ACCESS_TOKEN } from "~/api/constants";

export default function auth(options = {}) {
  const { protect } = options;

  return async (req, res, next) => {
    const { cookies, db } = req.state;

    const token = cookies.get(COOKIE_ACCESS_TOKEN);
    if (!token) {
      if (protect) {
        res.status(401);
        res.json({
          error: {
            message: "You are not authenticated",
          },
        });
      } else {
        next();
      }
      return;
    }

    let id;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      id = payload.id;
    } catch {
      res.status(401);
      res.json({
        error: {
          message: "You are not authenticated",
        },
      });
      return;
    }

    if (db) {
      const user = await db("users").where({ id }).first();
      if (!user) {
        res.status(401);
        res.json({
          error: {
            message: "You are not authenticated",
          },
        });
        return;
      }

      req.state = { ...req.state, user };
    }

    next();
  };
}
