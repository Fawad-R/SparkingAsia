const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    console.log('token',token)
    console.log('process.env.JWT_SECRET',process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded',decoded)
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = authenticate;
