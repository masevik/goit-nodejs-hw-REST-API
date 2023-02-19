const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");

const { validateBody } = require("../../middlewares");
const { schema } = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema), ctrl.addContact);

router.put("/:contactId", validateBody(schema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
