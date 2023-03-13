const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true" || favorite === "false") {
    const result = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");
    res.status(200).json(result);
  } else {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.status(200).json(result);
  }
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
};
