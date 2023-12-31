const jwt = require("jsonwebtoken");

//--------------------------------- AUTHENTICATION MIDDLEWARE ------------------------------------------------------------------------

const checkAuth = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "token must be present" });

    jwt.verify(
      token,
      "huuuvfjbjuirhhf",
      { ignoreExpiration: true },
      function (err, decodedToken) {
        
        if (err)
          return res.status(401).send({ status: false, message: "token is invalid" });
        if (Date.now() > decodedToken.exp * 1000) {
          return res.status(401).send({ status: false, message: "Token expired" }); //checking if the token is expired
        }
        

       next();
      }
    );
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports = { checkAuth };

 