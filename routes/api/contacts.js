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
  return res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById(Number(req.params.contactId));
  return res.json(result);
});

router.post("/", async (req, res, next) => {
  const result = await addContact(req.body);
  return res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(Number(req.params.contactId));
  return res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
