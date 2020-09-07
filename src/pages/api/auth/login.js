import connect from "next-connect";

import login from "~/api/handlers/auth/login";
import cookies from "~/api/middleware/cookies";
import db from "~/api/middleware/db";

export default connect().use(db()).use(cookies()).post(login);
