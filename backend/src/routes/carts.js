"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User = require('../models/User');
const Cart = require('../models/cart');
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const router = express_1.default.Router();
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
        await Cart.findOne({ owner: user._id, active: true }).updateOne({
            $push: { products: [req.body.product] },
        });
        return res.status(200).send({ id: req.body.product });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
module.exports = router;
//# sourceMappingURL=carts.js.map