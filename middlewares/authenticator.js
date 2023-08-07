const jwt = require('jsonwebtoken');

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send({
        message: "Token is not valid, please login",
        status: 2,
      });
    }

    if (decoded && decoded.userId) {
      // Store the decoded user ID in a custom property of the req object
      req.userId = decoded.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid, please login",
        status: 2,
      });
    }
  });
}

module.exports = {
  authenticator,
};
