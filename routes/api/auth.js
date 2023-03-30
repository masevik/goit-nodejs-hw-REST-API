const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

router.get("/verify/:verificationToken", ctrl.verifyToken);

router.post(
  "/verify",
  validateBody(schemas.verifySchema),
  ctrl.resendVerifyEmail
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, ctrl.changeSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;
