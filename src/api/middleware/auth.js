import jwt from "jsonwebtoken";

import { AUTH_REDIRECT_PATH, COOKIE_ACCESS_TOKEN } from "~/api/constants";

export default function auth() {
  return async (req, res, next) => {
    const { cookies, db } = req.state;

    const token = cookies.get(COOKIE_ACCESS_TOKEN);
    if (!token) {
      respondWithError(req, res);
      return;
    }

    let id;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      id = payload.id;
    } catch {
      respondWithError(req, res);
      return;
    }

    if (db) {
      const user = await db("users").where({ id }).first();
      if (!user) {
        respondWithError(req, res);
        return;
      }

      req.state = { ...req.state, user };
    }

    next();
  };
}

function respondWithError(req, res) {
  if (req.path.startsWith("/api")) {
    res.status(401);
    res.json({
      error: {
        message: "You are not authenticated",
      },
    });
  } else {
    res.writeHead(302, {
      Location: AUTH_REDIRECT_PATH,
    });
    res.end();
  }
}
