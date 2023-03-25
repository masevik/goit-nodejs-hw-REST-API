const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../../utils");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { BASE_URL } = process.env;

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Please verify tour email",
    html: `<strong>Please verify tour email</strong><br/><p>Click the <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">link</a></p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { name: result.name, email: result.email } });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
