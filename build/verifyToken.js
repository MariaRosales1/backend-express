"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("./config"));
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req.headers);
        // const token: any = req.headers['x-access-token'];
        // console.log("Verificando token")
        // console.log(token);
        // if (!token) {
        //     return res.status(404).json({ auth: false, message: 'No token provided' });
        // }
        // const decoded: any = verify(token, keyword.secret);
        // req.body.id_user = decoded.id_user;
        // next();
        try {
            if (!req.headers.authorization) {
                return res.status(401).send('Unauhtorized Request');
            }
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send('Unauhtorized Request');
            }
            const payload = jsonwebtoken_1.verify(token, config_1.default.secret);
            if (!payload) {
                return res.status(401).send('Unauhtorized Request');
            }
            req.body.id_user = payload.id_user;
            next();
        }
        catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    });
}
exports.default = verifyToken;
