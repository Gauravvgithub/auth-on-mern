const jwt = require("jsonwebtoken");

const ensureAuthenticated = (request, response, next) => {
  const auth = request.headers["authorization"];
  if (!auth) {
    return response
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
  try {
    const decodedData = jwt.verify(auth, process.env.JWT_SECRET);
    request.user = decodedData;
    next();
  } catch (error) {
    return response
      .status(403)
      .json({ message: "Unauthorized, JWT token  wrong or expired" });
  }
};

module.exports = ensureAuthenticated;
