const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  return res.status(200).json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById(Number(req.params.contactId));
  if (!result) {
    next();
    return;
  }

  return res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .trim()
      .required(),

    phone: Joi.string().alphanum().min(9).max(13).trim().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `${error.message}` });
  }

  const result = await addContact(value);
  return res.status(201).json(result);
});

router.put("/:contactId", async (req, res, next) => {
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

  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ message: `${error.message}` });
  }

  const result = await updateContact(Number(req.params.contactId), value);

  if (!result) {
    next();
    return;
  }

  return res.status(200).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(Number(req.params.contactId));
  if (!result) {
    next();
    return;
  }

  return res.status(200).json(result);
});

module.exports = router;
