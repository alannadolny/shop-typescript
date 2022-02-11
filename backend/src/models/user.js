"use strict";
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
    money: {
        type: Number,
    },
    bought: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    selling: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    sold: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    active: {
        type: Boolean,
        required: true,
    },
});
module.exports = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map