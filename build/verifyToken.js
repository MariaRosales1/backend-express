"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("./config"));
function verifyToken(req, res, next) {
    console.log(req.headers);
    const token = req.headers['x-access-token'];
    console.log("Verificando token");
    console.log(token);
    if (!token) {
        return res.status(404).json({ auth: false, message: 'No token provided' });
    }
    const decoded = jsonwebtoken_1.verify(token, config_1.default.secret);
    req.body.id_user = decoded.id_user;
    next();
}
exports.default = verifyToken;
