const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../utils");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const token = "adsfsdfsdf";

  res.status(201).json({ token });
};

module.exports = {
  loginUser: ctrlWrapper(loginUser),
};
