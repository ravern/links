import connect from "next-connect";

import all from "~/api/handlers/links/all";
import create from "~/api/handlers/links/create";
import auth from "~/api/middleware/auth";
import cookies from "~/api/middleware/cookies";
import db from "~/api/middleware/db";

export default connect()
  .use(db())
  .use(cookies())
  .use(auth())
  .post(create)
  .get(all);
