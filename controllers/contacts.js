const Joi = require("joi");
const methods = require("../models");
const { HttpError, ctrlWrapper } = require("../utils");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .trim()
    .required(),
  phone: Joi.string().min(9).max(15).trim().required(),
});

const listContacts = async (req, res, next) => {
  const result = await methods.listContacts();
  return res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await methods.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await methods.addContact(req.body);
  return res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await methods.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await methods.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
