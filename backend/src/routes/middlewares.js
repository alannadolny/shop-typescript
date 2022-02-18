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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequestMethod = exports.verifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const header = req.headers.cookie
        ? req.headers.cookie.split('authorization=')[1]
        : undefined;
    const token = header && header.split(';')[0];
    if (token === undefined)
        return res.status(401).send('invalid token');
    jwt.verify(token, process.env.SECRET_TOKEN || 'token', (err, login) => {
        if (err)
            return res.status(403);
        req.body.login = login.login;
        next();
    });
}
exports.verifyToken = verifyToken;
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
exports.checkRequestMethod = checkRequestMethod;
//# sourceMappingURL=middlewares.js.map