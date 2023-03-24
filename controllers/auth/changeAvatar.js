const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const changeAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: temporaryPath, originalname } = req.file;

  await Jimp.read(temporaryPath)
    .then((image) => {
      return image.resize(250, 250).write(temporaryPath);
    })
    .catch((err) => {
      console.error(err);
    });

  const fileName = `${_id}_${originalname}`;
  const newPath = path.join(avatarsDir, fileName);
  await fs.rename(temporaryPath, newPath);

  const avatarURL = path.join("avatar", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  changeAvatar: ctrlWrapper(changeAvatar),
};
