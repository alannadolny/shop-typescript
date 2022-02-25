"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const dayjs_1 = __importDefault(require("dayjs"));
const router = express_1.default.Router();
const User = require('../models/User');
const middlewares_1 = require("./middlewares");
const product_1 = __importDefault(require("../models/product"));
const getBoolean = (value) => {
    if (value === 'true')
        return true;
    else
        return false;
};
require('dotenv').config();
router.post('/register', middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const user = await new User({
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
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.post('/login', middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const foundUser = await User.findOne({
            login: req.body.login,
            password: req.body.password,
        });
        if (!foundUser)
            return res.status(404).send('not found');
        else {
            if (!foundUser.active)
                return res.status(200).send('not active');
            const user = { login: req.body.login };
            const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
            return res
                .status(200)
                .cookie('authorization', token, {
                secure: getBoolean(process.env.SECURE) || true,
                httpOnly: true,
                expires: (0, dayjs_1.default)().add(2, 'hours').toDate(),
            })
                .send('token initialized');
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.get('/details', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const details = await User.aggregate([
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
                    from: product_1.default.collection.name,
                    localField: 'selling',
                    foreignField: '_id',
                    as: 'selling',
                },
            },
            {
                $lookup: {
                    from: product_1.default.collection.name,
                    localField: 'sold',
                    foreignField: '_id',
                    as: 'sold',
                },
            },
            {
                $lookup: {
                    from: product_1.default.collection.name,
                    localField: 'bought',
                    foreignField: '_id',
                    as: 'bought',
                },
            },
        ]);
        return res.send(details[0]);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.delete('/', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const foundUser = await User.findOne({
            login: req.body.login,
        }).remove();
        return res.status(200).send(foundUser);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.put('/', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        const foundUser = await User.findOne({
            login: req.body.login,
        }).update(req.body);
        return res.status(200).send(foundUser);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.put('/confirm', middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        console.log(req.body.id, req.body.login);
        const foundUser = await User.findOne({
            _id: req.body.id,
            login: req.body.login,
        }).update({ active: true });
        if (foundUser.modifiedCount === 0)
            return res.status(200).send('not found');
        return res.status(200).send(foundUser);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.get('/logout', middlewares_1.verifyToken, middlewares_1.checkRequestMethod, async (req, res) => {
    try {
        return res
            .clearCookie('authorization', {
            secure: getBoolean(process.env.SECURE) || true,
            httpOnly: true,
        })
            .send('cookie cleared');
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map