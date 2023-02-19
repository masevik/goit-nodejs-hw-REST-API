const express = require("express");
const router = express.Router();
const Joi = require("joi");
const methods = require("../../models");
const { HttpError } = require("../../utils");

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

router.get("/", async (req, res, next) => {
  try {
    const result = await methods.listContacts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await methods.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await methods.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await methods.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
