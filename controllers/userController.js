const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { genToken } = require("../genToken");
const saltRounds = 10;

exports.userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {

      return res.send({ message: "Fill the form properly.", success: false });
    }
    const checkUserExists = await userModel.findOne({ email });
    if (!checkUserExists) {
      // hashing the password
      const encryptPassword = await bcrypt.hash(password, saltRounds);
      const token = genToken(email);
      const user = await userModel.create({
        email,
        password: encryptPassword,
        token,
      });
      return res.send({ message: "Signup successfully!", success: true });
    }
  } catch (error) {
    return res.send({
      message: "Something went wrong.",
      success: false,
      error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "Fill the form properly.", success: false });
  }
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    bcrypt.compare(password, checkUser.password, function (err, result) {
      if (result) {
        const token = genToken(checkUser.email);
        res.status(200);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
        });
        res.send({ message: "User Login Successfully!", token, success: true });
      } else {
        return res
          .status(500)
          .send({ message: "Server error!", success: false });
      }
    });
  } else {
    return res
      .status(401)
      .send({ message: "User not authenticate.", success: false });
  }
};
