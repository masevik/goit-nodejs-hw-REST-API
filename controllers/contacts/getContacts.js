const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const getContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  return res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
};
