import connect from "next-connect";

import logout from "~/api/handlers/auth/logout";
import cookies from "~/api/middleware/cookies";

export default connect().use(cookies()).post(logout);
