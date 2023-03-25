const { ctrlWrapper, HttpError, sendEmail } = require("../../utils");
const { User } = require("../../models/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  if (!user.verify) {
    const verifyEmail = {
      to: email,
      subject: "Please verify tour email",
      html: `<strong>Please verify tour email</strong><br/><p>Click the <a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">link</a></p>`,
    };

    await sendEmail(verifyEmail);
  }

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
