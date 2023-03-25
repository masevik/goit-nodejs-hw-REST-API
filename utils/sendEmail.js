const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: "masevikexp@gmail.com" };
  sgMail.send(msg);
};

module.exports = sendEmail;
