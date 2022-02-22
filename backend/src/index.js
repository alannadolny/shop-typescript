"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const mail = require('./mailing');
const products = require('./routes/products');
const carts = require('./routes/carts');
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/users', users);
app.use('/mail', mail);
app.use('/carts', carts);
app.use('/products', products);
require('dotenv').config();
const apiConnData = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 27017,
    apiPort: process.env.API_PORT || 5432,
    database: process.env.DATABASE || 'auction_service',
};
mongoose_1.default
    .connect(`mongodb://${apiConnData.host}:${apiConnData.port}/${apiConnData.database}`)
    .then((response) => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`);
    app.listen(apiConnData.apiPort, () => {
        console.log(`API server listening at http://localhost:${apiConnData.apiPort}`);
    });
})
    .catch((error) => console.error('Error connecting to MongoDB', error));
//# sourceMappingURL=index.js.map