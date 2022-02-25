"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User = require('../models/User');
const Cart = require('../models/cart');
const product = require('../models/product');
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const router = express_1.default.Router();
const deleteOneProduct = (productArray, productToDelete) => {
    let deleted = 0;
    return productArray.filter((el) => {
        if (deleted === 0 && el.toString() === productToDelete) {
            deleted = 1;
            return false;
        }
        else
            return true;
    });
};
router.post('/', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const newCart = await Cart({
            owner: user._id,
            products: [req.body.product],
            active: true,
        }).save();
        return res.status(200).send(newCart);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.get('/', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const carts = await Cart.aggregate([
            {
                $match: {
                    owner: {
                        $eq: user._id,
                    },
                },
            },
        ]).sort({ active: 'descending' });
        return res.status(200).send(carts);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.post('/new', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const cart = await Cart.findOne({ owner: user._id, active: true });
        if (cart) {
            await Cart.findOne({ owner: user._id, active: true }).updateOne({
                $push: { products: [req.body.product] },
            });
        }
        else {
            const newCart = await Cart({
                owner: user._id,
                products: [req.body.product],
                active: true,
            }).save();
        }
        return res.status(200).send({ id: req.body.product });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.delete('/product', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const cart = await Cart.findOne({
            owner: user._id,
            active: true,
        });
        const newProductList = deleteOneProduct(cart.products, req.body.product);
        await Cart.findOneAndUpdate({ owner: user._id, active: true }, {
            products: newProductList,
        });
        return res.status(200).send({ id: req.body.product });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.delete('/all', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const cart = await Cart.findOne({
            owner: user._id,
            active: true,
        });
        await Cart.findOne({
            owner: user._id,
            active: true,
        }).remove();
        res.status(200).send(cart);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.patch('/buy', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        const cart = await Cart.findOne({
            owner: user._id,
            active: true,
        });
        await Cart.findOne({
            owner: user._id,
            active: true,
        }).update({
            active: false,
        });
        for (const productToBuy of cart.products) {
            await User.findOne({ login: req.body.login }).updateOne({
                $push: { bought: [productToBuy] },
            });
            const productToAdd = await product.findOne({
                _id: productToBuy,
            });
            await User.findOne({ _id: productToAdd.owner }).updateOne({
                $push: { sold: [productToBuy] },
            });
        }
        return res.status(200).send(cart);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
module.exports = router;
//# sourceMappingURL=carts.js.map