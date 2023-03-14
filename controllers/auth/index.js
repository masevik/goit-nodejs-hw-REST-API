const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { changeSubscription } = require("./changeSubscription");
const { changeAvatar } = require("./changeAvatar");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  changeSubscription,
  changeAvatar,
};
