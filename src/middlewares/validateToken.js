import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../utils/config.js";

export const authReq = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ Message: "Unauthorized" });

  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;

    next();
  });
};