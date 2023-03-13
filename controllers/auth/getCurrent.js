const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res, next) => {
  const { email, name, subscription } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
