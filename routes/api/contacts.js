const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.schema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
