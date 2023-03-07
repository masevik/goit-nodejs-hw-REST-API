const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("./contacts");

const { registerUser, getUsers, loginUser } = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
  registerUser,
  getUsers,
  loginUser,
};
