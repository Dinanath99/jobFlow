const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  // Configure the SMTP transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // e.g., smtp.gmail.com
    port: 587, // Use 465 for SSL
    secure: false, // Set to true if using port 465
    auth: {
      user: "dinanathmukhiya91@gmail.com", // Your SMTP username
      pass: "vnxq qejp bvvm qgpb", // Your SMTP password
    },
  });

  const mailOptions = {
    from: "JobFlow@gmail.com", // Sender address
    to, // Recipient's email address
    subject, // Email subject
    text, // Email body (plain text)
    html, // Email body (HTML)
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
