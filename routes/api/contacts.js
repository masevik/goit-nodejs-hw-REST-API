const express = require("express");
const router = express.Router();
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
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  if (!email) {
    return res.status(400).json({ message: "Missing required email field" });
  }
  if (!phone) {
    return res.status(400).json({ message: "Missing required phone field" });
  }

  const result = await addContact(req.body);
  return res.status(201).json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  if (!email) {
    return res.status(400).json({ message: "Missing required email field" });
  }
  if (!phone) {
    return res.status(400).json({ message: "Missing required phone field" });
  }

  const result = await updateContact(Number(req.params.contactId), req.body);

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
