const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("./contacts");

const {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  changeSubscription,
  changeAvatar,
  verifyToken,
  resendVerifyEmail,
} = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
  registerUser,
  loginUser,
  getCurrent,
  logout,
  changeSubscription,
  changeAvatar,
  verifyToken,
  resendVerifyEmail,
};
