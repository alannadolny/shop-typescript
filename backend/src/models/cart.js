"use strict";
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
    active: {
        type: Boolean,
        required: true,
    },
});
module.exports = (0, mongoose_1.model)('Cart', cartSchema);
//# sourceMappingURL=cart.js.map