const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../utils");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};

module.exports = {
  loginUser: ctrlWrapper(loginUser),
};
