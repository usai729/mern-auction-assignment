const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.Verify = (req, res, next) => {
  const token = req.header("auth-token");

  try {
    if (!token) {
      return res.status(401).json({ msg: "No Token Provided" });
    }

    const verification = jwt.verify(token, process.env.SECRET);

    if (!verification) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.user = verification;
    next();
  } catch (e) {
    console.error("Error at token verification\n" + e);
    return res.status(500).json({ msg: "Error at Token Verification" });
  }
};
