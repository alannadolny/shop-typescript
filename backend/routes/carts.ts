import { FoundUser, Cart as CartInterface, Product } from './interfaces';
const User = require('../models/User');
const Cart = require('../models/cart');
import express, { Router } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { verifyToken, checkRequestMethod } from './middlewares';
import user from '../models/user';
const router: Router = express.Router();

const deleteOneProduct = (
  productArray: Array<mongoose.Types.ObjectId>,
  productToDelete: string
) => {
  let deleted: number = 0;
  return productArray.filter((el) => {
    if (deleted === 0 && el.toString() === productToDelete) {
      deleted = 1;
      return false;
    } else return true;
  });
};

router.post(
  '/',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const newCart: CartInterface = await Cart({
        owner: user._id,
        products: [req.body.product],
        active: true,
      }).save();
      return res.status(200).send(newCart);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  '/',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const carts: Array<CartInterface> = await Cart.aggregate([
        {
          $match: {
            owner: {
              $eq: user._id,
            },
          },
        },
      ]).sort({ active: 'descending' });
      return res.status(200).send(carts);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post(
  '/new',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const cart = await Cart.findOne({ owner: user._id, active: true });
      if (cart) {
        await Cart.findOne({ owner: user._id, active: true }).updateOne({
          $push: { products: [req.body.product] },
        });
      } else {
        const newCart: CartInterface = await Cart({
          owner: user._id,
          products: [req.body.product],
          active: true,
        }).save();
      }
      return res.status(200).send({ id: req.body.product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.delete(
  '/product',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const cart: CartInterface = await Cart.findOne({
        owner: user._id,
        active: true,
      });
      const newProductList = deleteOneProduct(cart.products, req.body.product);
      await Cart.findOneAndUpdate(
        { owner: user._id, active: true },
        {
          products: newProductList,
        }
      );
      return res.status(200).send({ id: req.body.product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.delete(
  '/all',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const cart: CartInterface = await Cart.findOne({
        owner: user._id,
        active: true,
      });
      await Cart.findOne({
        owner: user._id,
        active: true,
      }).remove();
      res.status(200).send(cart);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.patch(
  '/buy',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const user: FoundUser = await User.findOne({ login: req.body.login });
      const cart: CartInterface = await Cart.findOne({
        owner: user._id,
        active: true,
      });
      await Cart.findOne({
        owner: user._id,
        active: true,
      }).update({
        active: false,
      });
      return res.status(200).send(cart);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

export = router;
