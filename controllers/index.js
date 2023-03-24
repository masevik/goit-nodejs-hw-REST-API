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
};
