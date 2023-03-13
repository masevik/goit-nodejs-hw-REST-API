const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../utils");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ user: { name: result.name, email: result.email } });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
