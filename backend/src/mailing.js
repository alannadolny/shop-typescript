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
const nodemailer = __importStar(require("nodemailer"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
    },
});
router.post('/', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: `"Auctionary service" <${process.env.MAIL_LOGIN}>`,
            to: req.body.email,
            subject: 'Welcome to auctionary service!',
            text: `Please, click following link to confirm your account: http://localhost:3000/confirm/${req.body.id}/${req.body.login}`,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
//# sourceMappingURL=mailing.js.map