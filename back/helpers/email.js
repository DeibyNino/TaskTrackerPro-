import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"UpTaskPro - Project Management" <account@uptaskpro.com>',
    to: email,
    subject: "UpTaskPro - account confirmation",
    text: "confirm your new account UpTaskPro",
    html: ` <h3> Hi! ${name}, verify your account and start using the best tool to manage your projects! </h3>
    </br>
    <h2>Your account is almost ready </h2>
    </br>
    <a href="${process.env.FRONTEND_URL}/confirm-account/${token}" style='padding:1rem; background: #0098b7; color:#fff ; border-radius:10px'  >Confirm your account!</a>
    </br>
    <p>If you didn't create this account please ignore this message</p>
    `,
  });

  console.log(info);
};

// envio de Email al usuario para la recuperacion de password
export const emailRescuePassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"UpTaskPro - Project Management" <account@uptaskpro.com>',
    to: email,
    subject: "UpTaskPro - Reset password",
    text: "You have requested to reset your password of your account account UpTaskPro",
    html: ` <h3> Hi! ${name}, Click on the next button to reset your password and continue manage your projects with UpTaskPro.! </h3>
      </br>
      <h2>Your account is almost ready </h2>
      </br>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}" style='padding:1rem; background: #0098b7; color:#fff ; border-radius:10px'  >RESET PASSWORD!</a>
      </br>
      <p>If you didn't create this account please ignore this message</p>
      `,
  });

  console.log(info);
};
