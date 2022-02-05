"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
require('dotenv').config();
var apiConnData = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 27017,
    apiPort: process.env.API_PORT || 5432,
    database: process.env.DATABASE || 'auction_service'
};
mongoose_1["default"]
    .connect("mongodb://".concat(apiConnData.host, ":").concat(apiConnData.port, "/").concat(apiConnData.database))
    .then(function (response) {
    console.log("Connected to MongoDB. Database name: \"".concat(response.connections[0].name, "\""));
    app.listen(apiConnData.apiPort, function () {
        console.log("API server listening at http://localhost:".concat(apiConnData.apiPort));
    });
})["catch"](function (error) { return console.error('Error connecting to MongoDB', error); });
