import * as nodemailer from 'nodemailer';
import express, { Router } from 'express';
const router: Router = express.Router();

require('dotenv').config();

interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
}

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

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const info: Message = await transporter.sendMail({
      from: `"Auctionary service" <${process.env.MAIL_LOGIN}>`,
      to: req.body.email,
      subject: 'Welcome to auctionary service!',
      text: `Please, click following link to confirm your account: http://localhost:3000/confirm/${req.body.id}/${req.body.login}`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

export = router;
