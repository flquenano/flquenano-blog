const nodemailer = require("nodemailer");

const send = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const emailOptions = {
      from: "Francis Luigie C. Quenano<flcq27@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    return await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = send;
