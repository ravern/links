import connect from "next-connect";

import get from "~/api/handlers/links/get";
import cookies from "~/api/middleware/cookies";
import db from "~/api/middleware/db";

export default connect().use(db()).use(cookies()).get(get);
