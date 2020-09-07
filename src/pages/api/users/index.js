import connect from "next-connect";

import create from "~/api/handlers/users/create";
import db from "~/api/middleware/db";

export default connect().use(db()).post(create);
