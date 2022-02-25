import express, { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
const router: Router = express.Router();
const User = require('../models/User');
import { verifyToken, checkRequestMethod } from './middlewares';
import {
  Person,
  PersonDetails,
  FoundUser,
  EditedUser,
  Product,
} from './interfaces';
import product from '../models/product';

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
        return res
          .status(200)
          .cookie('authorization', token, {
            secure: getBoolean(process.env.SECURE) || true,
            httpOnly: true,
            expires: dayjs().add(2, 'hours').toDate(),
          })
          .send('token initialized');
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
        {
          $lookup: {
            from: product.collection.name,
            localField: 'selling',
            foreignField: '_id',
            as: 'selling',
          },
        },
        {
          $lookup: {
            from: product.collection.name,
            localField: 'sold',
            foreignField: '_id',
            as: 'sold',
          },
        },
        {
          $lookup: {
            from: product.collection.name,
            localField: 'bought',
            foreignField: '_id',
            as: 'bought',
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

router.get(
  '/logout',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      return res
        .clearCookie('authorization', {
          secure: getBoolean(process.env.SECURE) || true,
          httpOnly: true,
        })
        .send('cookie cleared');
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

export = router;
