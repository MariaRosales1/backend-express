"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerUserController_1 = require("../controllers/registerUserController");
const verifyToken_1 = __importDefault(require("../verifyToken"));
class RegisterUserRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/signup', registerUserController_1.registerUserController.registerUser);
        this.router.post('/signin', registerUserController_1.registerUserController.signin);
        this.router.get('/searchPage', verifyToken_1.default, registerUserController_1.registerUserController.searchPage);
    }
}
const registerUserRoute = new RegisterUserRoute();
exports.default = registerUserRoute.router;
