const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");


exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header.cookie
    const decodeToken = jwt.verify(token, process.env.JWT);
    const user = await userModel.findOne({ email: decodeToken.email });
    if (!user) {
      return res.send("User is not authorizd");
    }
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
