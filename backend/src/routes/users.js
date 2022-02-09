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
const router = express_1.default.Router();
const User = require('../models/User');
function verifyToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token === null)
        return res.status(401);
    jwt.verify(token, process.env.SECRET_TOKEN || 'token', (err, login) => {
        if (err)
            return res.status(403);
        req.body.login = login.login;
        next();
    });
}
require('dotenv').config();
router.post('/register', async (req, res) => {
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
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({
            login: req.body.login,
            password: req.body.password,
        });
        if (!foundUser)
            return res.status(404);
        else {
            const user = { login: req.body.login };
            const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
            return res.send(token);
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.get('/details', verifyToken, async (req, res) => {
    console.log(req.body.login);
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
        ]);
        return res.send(details[0]);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.delete('/', verifyToken, async (req, res) => {
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
router.put('/', verifyToken, async (req, res) => {
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
module.exports = router;
//# sourceMappingURL=users.js.map