const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
