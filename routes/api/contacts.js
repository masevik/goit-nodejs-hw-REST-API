const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.schema), ctrl.addContact);

router.put(
  "/:contactId",authenticate, 
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",authenticate, 
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
