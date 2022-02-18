"use strict";
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    added: {
        type: Date,
        required: true,
    },
    sold: {
        type: Date,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
module.exports = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=product.js.map