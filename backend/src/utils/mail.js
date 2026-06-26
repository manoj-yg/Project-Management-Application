import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed, make sure you provided Mailtrap credentials correct",
    );
    console.error("Error: ", error);
  }
};

const emailVerificationMailgenContent = (username, VerificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project-Camp! We\'re very excited to have you on board",
      action: {
        instructions:
          "To verify Your email please click on the following button",
        button: {
          color: "#0dd82f",
          text: "Verify Your email",
          link: VerificationUrl,
        },
      },
      outro:
        "Need help , or have questions? Just reply to this email, we would Love to help",
    },
  };
};


const forgotPasswordMailgenContent = (username, PasswordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "we got a request to reset the password of your account",
      action: {
        instructions: "To reset the password click on the following link",
        button: {
          color: "#f50c0f",
          text: "Reset the password",
          link: PasswordResetUrl,
        },
      },
      outro:
        "Need help , or have questions? Just reply to this email, we would Love to help",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
