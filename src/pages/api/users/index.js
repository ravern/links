import connect from "next-connect";

import create from "~/api/handlers/users/create";
import cookies from "~/api/middleware/cookies";
import db from "~/api/middleware/db";

export default connect().use(db()).use(cookies()).post(create);
