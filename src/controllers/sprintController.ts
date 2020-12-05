import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import pool from '../database';

class SprintController {

    public async getNextSprint(req: Request, res: Response) {
        const sql = "SELECT MAX(id_sprint) as max FROM sprint";
        pool.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.json({ error: 'Error of database', message: err.sqlMessage });
            };
            if (results.length > 0) {
                if (results.max == null) {
                    return res.json({ idSprint: 1 });
                }
                return res.json({ idSprint: results.max + 1 });
            } else {
                return res.json({
                    error: 'Error of database', message: "No se pudo obtener correctamente la informacion del"
                        + "sprint en la base de datos"
                });
            }
        })
    }
    public async creationSprint(req: Request, res: Response) {
        try {
            const sql = "SELECT MAX(id_sprint) as max FROM sprint";
            let idSprint = 1;
            pool.query(sql, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.json({ error: 'Error of database', message: err.sqlMessage });
                };
                if (results.length > 0) {
                    if (results.max != null) {
                        idSprint = results.max + 1;
                    }
                    const sql = "INSERT INTO sprint set ?";
                    const sprint = {
                        id_sprint: idSprint, start_date: req.body.star_date, end_date: req.body.end_state,
                        compromised_points: 0, achieved_points: 0
                    }
                    pool.query(sql, [sprint], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            return res.json({ error: 'Error of database', message: err.sqlMessage });
                        };
                        return res.json({message: 'Sprint creado exitosamente', idSprint: idSprint})

                    });
                } else {
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

    }

}
export const sprintController = new SprintController();