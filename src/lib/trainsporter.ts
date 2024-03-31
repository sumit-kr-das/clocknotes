const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "support@clocknotes.cloud",
    pass: "clocknotes.cloud&Sumit&Shoyeb&2001",
  },
});
export default transporter;
