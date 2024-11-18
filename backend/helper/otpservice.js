const nodemailer = require("nodemailer");
const generateOTP = (length) => {
  const charset = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    OTP += charset[randomIndex];
  }
  return OTP;
};

const sendOTPEmail = async (employeeEmail, employeeName, OTP) => {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "dinanathmukhiya91@gmail.com",
        pass: "vnxq qejp bvvm qgpb",
      },
    });

    // Define email content
    let mailOptions = {
      from: "jobflow@gmail.com",
      to: employeeEmail,
      subject: "OTP for Password Reset",
      text: `Dear ${employeeName},\n\nYour OTP for password reset is: ${OTP}\n\nPlease enter this OTP on the reset password page.\n\nThank you.\n`,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return true; // Return true if email sending is successful
  } catch (error) {
    console.error("Error sending email: ", error);
    return false; // Return false if there's an error sending email
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
};
