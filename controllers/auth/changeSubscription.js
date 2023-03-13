const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const changeSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id, name, email } = req.user;
  await User.findByIdAndUpdate(_id, { ...req.body, subscription });

  res.status(200).json({
    name,
    email,
    subscription,
  });
};

module.exports = {
  changeSubscription: ctrlWrapper(changeSubscription),
};
