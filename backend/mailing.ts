import * as nodemailer from 'nodemailer';

require('dotenv').config();

interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
}

async function main() {
  const transporter: nodemailer.Transporter<nodemailer.SentMessageInfo> =
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
      },
    });

  const info: Message = await transporter.sendMail({
    from: `"Auctionary service" <${process.env.MAIL_LOGIN}>`,
    to: 'lohosev429@afarek.com',
    subject: 'Welcome to auctionary service!',
    text: 'Please, click following link to confirm your account.',
  });
}

main().catch(console.error);
