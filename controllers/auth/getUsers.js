const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const getUsers = async (req, res, next) => {
  const result = await User.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

module.exports = {
  getUsers: ctrlWrapper(getUsers),
};
