const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config = require("../../config");

const tokenForUsers = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.sign({ iat: timeStamp }, config.secret);
};

const login = async (req, res, next) => {
  try {
    res.json({ token: tokenForUsers(req.user) });
  } catch (error) {
    return next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password || !username) {
      return res
        .status(422)
        .send({ error: "you must enter email, password and username" });
    }

    const existingUser = await User.findOne({
      email: email,
      username: username,
    });
    if (existingUser) {
      return res
        .status(422)
        .send({ error: "Email or user name is in use already" });
    }

    const user = await User.create({
      email: email,
      password: password,
      username: username,
    });
    res.json({ token: tokenForUsers(user) });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signup, login };
