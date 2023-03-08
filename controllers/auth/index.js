const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logout,
};
