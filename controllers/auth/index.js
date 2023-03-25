const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { changeSubscription } = require("./changeSubscription");
const { changeAvatar } = require("./changeAvatar");
const { verifyToken } = require("./verifyToken");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  changeSubscription,
  changeAvatar,
  verifyToken,
  resendVerifyEmail,
};
