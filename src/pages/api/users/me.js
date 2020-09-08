import connect from "next-connect";

import getMe from "~/api/handlers/users/getMe";
import auth from "~/api/middleware/auth";
import cookies from "~/api/middleware/cookies";
import db from "~/api/middleware/db";

export default connect()
  .use(db())
  .use(cookies())
  .use(auth({ protect: true }))
  .get(getMe);
