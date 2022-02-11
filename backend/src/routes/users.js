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
function checkRequestMethod(req, res, next) {
    const allowedMethod = [
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
const getBoolean = (value) => {
    if (value === 'true')
        return true;
    else
        return false;
};
require('dotenv').config();
router.post('/register', checkRequestMethod, async (req, res) => {
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
router.post('/login', checkRequestMethod, async (req, res) => {
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
            res.cookie('jwt', token, {
                secure: getBoolean(process.env.SECURE) || true,
                httpOnly: true,
                expires: (0, dayjs_1.default)().add(2, 'hours').toDate(),
            });
            return res.status(200).send(token);
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
router.get('/details', verifyToken, checkRequestMethod, async (req, res) => {
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
router.delete('/', verifyToken, checkRequestMethod, async (req, res) => {
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
router.put('/', verifyToken, checkRequestMethod, async (req, res) => {
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
router.put('/confirm', checkRequestMethod, async (req, res) => {
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
module.exports = router;
//# sourceMappingURL=users.js.map