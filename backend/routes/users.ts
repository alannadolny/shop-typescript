import express, { json, Router } from 'express';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
const router: Router = express.Router();
const User = require('../models/User');

interface Person {
  login: string;
}

interface PersonDetails {
  login: string;
  email: string;
  money: number;
  bought: Array<mongoose.Schema.Types.ObjectId>;
  selling: Array<mongoose.Schema.Types.ObjectId>;
  sold: Array<mongoose.Schema.Types.ObjectId>;
}

interface FoundUser {
  _id: mongoose.Schema.Types.ObjectId;
  login: string;
  password: string;
  email: string;
  money: number;
  bought: Array<mongoose.Schema.Types.ObjectId>;
  selling: Array<mongoose.Schema.Types.ObjectId>;
  sold: Array<mongoose.Schema.Types.ObjectId>;
}

function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const header: string = req.headers['authorization'];
  const token: string = header && header.split(' ')[1];
  if (token === null) return res.status(401);
  jwt.verify(
    token,
    process.env.SECRET_TOKEN || 'token',
    (err: jwt.VerifyErrors, login: jwt.JwtPayload) => {
      if (err) return res.status(403);
      req.body.login = login.login;
      next();
    }
  );
}

require('dotenv').config();

router.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    try {
      await new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        money: 0,
        bought: [],
        selling: [],
        sold: [],
      }).save();
      res.status(200).send('ok');
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const foundUser: FoundUser = await User.findOne({
      login: req.body.login,
      password: req.body.password,
    });
    if (!foundUser) return res.status(404);
    else {
      const user: Person = { login: req.body.login };
      const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
      return res.send(token);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get(
  '/details',
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    console.log(req.body.login);
    try {
      const details: PersonDetails = await User.aggregate([
        {
          $match: {
            login: { $eq: req.body.login },
          },
        },
        {
          $project: {
            _id: 0,
            password: 0,
            __v: 0,
          },
        },
      ]);
      return res.send(details[0]);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.delete(
  '/',
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const foundUser: FoundUser = await User.findOne({
        login: req.body.login,
      }).remove();
      return res.status(200).send(foundUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.put(
  '/',
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const foundUser: FoundUser = await User.findOne({
        login: req.body.login,
      }).update(req.body);
      return res.status(200).send(foundUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

export = router;
