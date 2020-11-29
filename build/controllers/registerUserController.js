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
exports.registerUserController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = require("bcryptjs");
const config_1 = __importDefault(require("../config"));
class RegisterUserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //crear usuario
                const sql = 'INSERT INTO user_team set ?';
                const salt = yield bcryptjs_1.genSalt(10);
                req.body.password = yield bcryptjs_1.hash(req.body.password, salt);
                console.log(req.body.password);
                database_1.default.query(sql, [req.body], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.json({ error: 'Error of database', message: err.sqlMessage });
                    }
                    database_1.default.query('SELECT id_user, role FROM user_team WHERE email = ?', [req.body.email], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            return res.json({ error: 'Error of database', message: err.sqlMessage });
                        }
                        ;
                        if (results.length <= 0) {
                            return res.status(401).send('No user found');
                        }
                        console.log(results[0].id_user);
                        const token = jsonwebtoken_1.sign({ id_user: results[0].id_user }, config_1.default.secret, { expiresIn: 60 * 60 * 24 });
                        res.json({ auth: true, token: token, message: '100;token successful', role: results[0].role });
                    });
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { email, password } = req.body;
                database_1.default.query('SELECT password, id_user, role FROM user_team WHERE email = ?', [email], function (err, results, fields) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return res.status(401).json({ auth: false, token: null, error: 'Error of database', message: err.sqlMessage });
                        }
                        ;
                        if (results.length <= 0) {
                            return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
                        }
                        console.log(results);
                        const validPassword = yield bcryptjs_1.compare(password, results[0].password);
                        if (!validPassword) {
                            return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
                        }
                        const token = jsonwebtoken_1.sign({ id_user: results[0].id_user }, config_1.default.secret, { expiresIn: 60 * 60 * 24 });
                        res.json({ auth: true, token: token, message: '100;token successful', role: results[0].role });
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    searchPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const token: any = req.headers['x-access-token'];
                // console.log(token);
                // if (!token) {
                //     return res.status(404).json({ auth: false, message: 'No token provided' });
                // }
                // const decoded: any = verify(token, keyword.secret);
                // console.log(decoded);
                // pool.query('SELECT id_user, firstname, lastname, email, role FROM user_team WHERE id_user = ?', [req.body.id_user], function (err, results, fields) {
                //     if (err) {
                //         console.log('Error found in the function searchPage of resgisterUserController' + err);
                //         console.log(err.sql);
                //         return res.json({ error: 'Error of database', code: err.code, message: err.sqlMessage });
                //     }
                //     //console.log(results[0].id_user);
                //     if (results.length < 0) {
                //         return res.status(404).send('No user found');
                //     }
                //     console.log(results);
                //     res.json({ message: 'terminado' });
                // })
                res.json({ message: 'terminado' });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.registerUserController = new RegisterUserController();
