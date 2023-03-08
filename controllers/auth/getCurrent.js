const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res, next) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
