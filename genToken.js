var jwt = require("jsonwebtoken");

exports.genToken = (email) => {
  
  const token = jwt.sign({ email }, process.env.JWT);
  return token;
};
