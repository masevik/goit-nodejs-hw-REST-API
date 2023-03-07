const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../utils");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
