const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.get("/", ctrl.getUsers);

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

module.exports = router;
