const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  // Check for the token in the Authorization header
  let token = req.get('Authorization');

if (!token) {
  // Remove the "Bearer " prefix
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      req.user = null;
      req.exp = null;
      next(err); // Call next with an error
    } else {
      req.user = decoded.user;
      req.exp = new Date(decoded.exp * 1000);
      next();
    }
  });
} else {
  // No token was sent
  req.user = null;
  req.exp = null;
  next();
}
}