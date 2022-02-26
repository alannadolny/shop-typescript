const User = require('../models/User');
const Product = require('../models/product');
import express, { Router } from 'express';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { verifyToken, checkRequestMethod } from './middlewares';
import { FoundUser, Product as ProductInterface } from './interfaces';
const router: Router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const product = await Product.find({});
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  '/',
  verifyToken,
  checkRequestMethod,
  async (req: express.Request, res: express.Response) => {
    try {
      const seller: FoundUser = await User.findOne({
        login: req.body.login,
      });
      const addedProduct: ProductInterface = await new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        added: new Date(),
        owner: seller._id,
        image: req.body.image,
        description: req.body.description,
      }).save();
      await User.findOne({ login: req.body.login }).updateOne({
        $push: { selling: [addedProduct._id] },
      });
      return res.status(200).send(addedProduct);
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
      });
      const productToDelete = await Product.findOne({ _id: req.body.product });
      await Product.findOne({ _id: req.body.product }).remove();
      const newProductList = foundUser.selling.filter(
        (el) => el.toString() !== req.body.product.toString()
      );
      await User.findOne({ login: req.body.login }).update({
        selling: newProductList,
      });
      return res.status(200).send(productToDelete);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

export = router;
