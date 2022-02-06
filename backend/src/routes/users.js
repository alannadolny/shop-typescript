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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const router = express_1.default.Router();
const User = require('../models/User');
const authenticate = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token === null)
        return res.status(401);
    jwt.verify(token, process.env.SECRET_TOKEN || 'token', (err, login) => {
        if (err)
            return res.status(403);
        req.login = login;
        next();
    });
};
require('dotenv').config();
router.post('/register', async (req, res) => {
    try {
        await new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
        }).save();
        const newUser = { login: req.body.login };
        const token = jwt.sign(newUser, process.env.SECRET_TOKEN || 'token');
        res.send(token);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            login: req.body.login,
            password: req.body.password,
        });
        if (!user)
            return res.status(404);
        else {
            const user = { login: req.body.login };
            const token = jwt.sign(user, process.env.SECRET_TOKEN || 'token');
            return res.send(token);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map