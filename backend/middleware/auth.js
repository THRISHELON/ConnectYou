const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied!" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};
