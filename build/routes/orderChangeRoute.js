"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderChangeController_1 = require("../controllers/orderChangeController");
class OrderChangeRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/creation', orderChangeController_1.orderChangeController.create);
        // this.router.post('/signin');
        // this.router.get('/searchPage',verifyToken);
    }
}
const orderChangeRoute = new OrderChangeRoute();
exports.default = orderChangeRoute.router;
