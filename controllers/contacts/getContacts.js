const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
};
