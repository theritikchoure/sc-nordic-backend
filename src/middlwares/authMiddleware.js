const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_KEY;

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // user info from token
    next();
  });
};
