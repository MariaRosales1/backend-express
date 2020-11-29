"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
console.log(keys_1.default.database);
const pool = mysql_1.default.createPool(keys_1.default.database);
pool.getConnection((err, connection) => {
    try {
        if (err) {
            console.log(err);
        }
        ;
        connection.release();
        console.log('DB is connected');
    }
    catch (error) {
        console.log('Error al conectarse a la base de datos ' + error);
    }
});
exports.default = pool;
