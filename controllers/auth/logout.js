const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({ message: "Logout success" });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
