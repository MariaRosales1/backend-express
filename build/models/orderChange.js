"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderChange = void 0;
class OrderChange {
    constructor() {
        const date = new Date();
        this.creation_date = date.toLocaleDateString();
        console.log(date);
    }
}
exports.OrderChange = OrderChange;
