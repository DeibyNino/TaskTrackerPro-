import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "395f3b03453e29",
      pass: "af3c5b4cf9d0b9",
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
    <a href="${process.env.FRONTEND_URL}/confirm-account/${token}" style='padding:1rem; background: #0098b7; color:#fff' >Confirm your account!</a>
    </br>
    <p>If you didn't create this account please ignore this message</p>
    `,
  });

  console.log(info);
};
