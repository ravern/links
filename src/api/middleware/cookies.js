import Cookies from "cookies";

export default function cookies() {
  return (req, res, next) => {
    const cookies = new Cookies(req, res);

    req.state = { ...req.state, cookies };
    next();
  };
}
