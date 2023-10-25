const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check for the token in the Authorization header
  const token = req.get('Authorization');
  
  if (!token) {
    // Remove the "Bearer " prefix
    const token = token.replace('Bearer ', '');
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      req.user = err ? null : decoded.user;
      req.exp = err ? null : new Date(decoded.exp * 1000);
    });
    
    return next();
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};
