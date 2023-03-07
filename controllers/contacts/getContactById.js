const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../utils");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
