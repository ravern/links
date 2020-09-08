import { AUTH_REDIRECT_PATH } from "~/constants";
import fetch from "~/helpers/fetch";

export default function auth(options = {}) {
  const { protect } = options;

  return async (req, res, next) => {
    const user = await fetch("/users/me", {
      headers: {
        cookie: req.headers.cookie,
      },
    });
    if (!user) {
      if (protect) {
        res.writeHead(302, {
          Location: AUTH_REDIRECT_PATH,
        });
        res.end();
      } else {
        req.state = { ...req.state, user: null };
        next();
      }
      return;
    }

    req.state = { ...req.state, user };
    next();
  };
}
