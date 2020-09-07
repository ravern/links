import { connect } from "~/api/db";

export default function db() {
  return async (req, res, next) => {
    const db = connect();

    req.state = { ...req.state, db };
    next();

    res.on("finish", () => {
      db.destroy();
    });
  };
}
