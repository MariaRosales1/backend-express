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
exports.sprintController = void 0;
const database_1 = __importDefault(require("../database"));
class SprintController {
    getNextSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT MAX(id_sprint) as max FROM sprint";
            database_1.default.query(sql, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.json({ error: 'Error of database', message: err.sqlMessage });
                }
                ;
                console.log(results);
                if (results.length > 0) {
                    console.log(results[0].max);
                    if (results[0].max == null) {
                        return res.json({ idSprint: 1 });
                    }
                    return res.json({ idSprint: results[0].max + 1 });
                }
                else {
                    return res.json({
                        error: 'Error of database', message: "No se pudo obtener correctamente la informacion del"
                            + "sprint en la base de datos"
                    });
                }
            });
        });
    }
    creationSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT MAX(id_sprint) as max FROM sprint";
                let idSprint = 1;
                database_1.default.query(sql, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.json({ error: 'Error of database', message: err.sqlMessage });
                    }
                    ;
                    console.log(results);
                    if (results.length > 0) {
                        if (results.max != null) {
                            idSprint = results.max + 1;
                        }
                        const sql = "INSERT INTO sprint set ?";
                        const sprint = {
                            id_sprint: idSprint, start_date: req.body.start_date, end_date: req.body.end_date,
                            compromised_points: 0, achieved_points: 0
                        };
                        database_1.default.query(sql, [sprint], function (err, results, fields) {
                            if (err) {
                                console.log(err);
                                return res.json({ error: 'Error of database', message: err.sqlMessage });
                            }
                            ;
                            return res.json({ message: 'Sprint creado exitosamente', idSprint: idSprint });
                        });
                    }
                    else {
                        return res.json({
                            error: 'Error of database', message: "No se pudo obtener correctamente la informacion del"
                                + "sprint en la base de datos"
                        });
                    }
                });
            }
            catch (error) {
                console.log("Error en [creatioSprint] " + error);
                return res.json({
                    error: 'Error of database', message: "No se pudo obtener correctamente la informacion del"
                        + "sprint en la base de datos"
                });
            }
        });
    }
}
exports.sprintController = new SprintController();
