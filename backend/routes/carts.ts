import { FoundUser, Cart as CartInterface } from './interfaces';
const User = require('../models/User');
const Cart = require('../models/cart');
import express, { Router } from 'express';
import { verifyToken, checkRequestMethod } from './middlewares';
const router: Router = express.Router();

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
      const carts: Array<CartInterface> = await Cart.find({ owner: user._id });
      return res.status(200).send(carts);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post('/new', verifyToken, checkRequestMethod, async (req, res) => {
  try {
    const user: FoundUser = await User.findOne({ login: req.body.login });
    await Cart.findOne({ owner: user._id }).updateOne({
      $push: { products: [req.body.product] },
    });
    return res.status(200).send('OK');
  } catch (err) {
    return res.status(500).send(err);
  }
});

export = router;
