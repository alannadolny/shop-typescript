import express, { Router } from 'express';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
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
  active: boolean;
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
  active: boolean;
}

interface EditedUser {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCound: number;
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

function checkRequestMethod(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const allowedMethod: Array<string> = [
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];
  if (!allowedMethod.includes(req.method))
    return res.status(405).send('not allowed method');
  next();
}

const getBoolean = (value: string) => {
  if (value === 'true') return true;
  else return false;
};

require('dotenv').config();

router.post(
  '/register',
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        money: 0,
        bought: [],
        selling: [],
        sold: [],
        active: false,
      }).save();
      res.status(200).send({ id: user._id, login: user.login });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post(
  '/login',
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const foundUser: FoundUser = await User.findOne({
        login: req.body.login,
        password: req.body.password,
      });
      if (!foundUser) return res.status(404).send('not found');
      else {
        if (!foundUser.active) return res.status(200).send('not active');
        const user: Person = { login: req.body.login };
        const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
        res.cookie('jwt', token, {
          secure: getBoolean(process.env.SECURE) || true,
          httpOnly: true,
          expires: dayjs().add(2, 'hours').toDate(),
        });
        return res.status(200).send(token);
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  '/details',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
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
  checkRequestMethod,
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
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const foundUser: EditedUser = await User.findOne({
        login: req.body.login,
      }).update(req.body);
      return res.status(200).send(foundUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.put(
  '/confirm',
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      console.log(req.body.id, req.body.login);
      const foundUser: EditedUser = await User.findOne({
        _id: req.body.id,
        login: req.body.login,
      }).update({ active: true });
      if (foundUser.modifiedCount === 0)
        return res.status(200).send('not found');
      return res.status(200).send(foundUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

export = router;
