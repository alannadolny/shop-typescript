"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        min: 4,
        required: true,
    },
});
module.exports = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map