import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import pool from '../database';
import { OrderChange } from '../models/orderChange';

class OrderChangeController {

    public async create(req: Request, res: Response) {
        try {
            if (req.body) {
                console.log(req.body);
                //Creation orderChange
                let orderChange = new OrderChange();
                orderChange.id_order = req.body.numberOrder;
                orderChange.id_phase = 1;
                orderChange.priority = req.body.priority;
                orderChange.state = "Abierta";
                orderChange.finish_date = "";
                orderChange.description = req.body.description;

                //Insercion en la tabla order_change
                const sql: string = "INSERT INTO order_change set ?";
                pool.query(sql, [orderChange], function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.json({ error: 'Error of database', message: err.sqlMessage });
                    }
                    return res.json({ message: "Orden de cambio creada con exito" });
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.json({ Error: "Ocurrio un error en la creacion de una orden de cambio" })
        }
    }

    public listOrderChange(req: Request, res: Response) {
        const sql = "SELECT task_oc.* FROM (SELECT oc.id_order, oc.priority, oc.id_phase, oc.description, task.id_sprint, task.state_task FROM " +
            "order_change oc LEFT JOIN task ON (oc.id_order = task.id_order)) task_oc LEFT JOIN sprint ON (sprint.id_sprint = task_oc.id_sprint)";
        pool.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.json({ error: 'Error of database', message: err.sqlMessage });
            };
            let ordersChanges = result;
            for (let i = 0; i < ordersChanges.length; i++) {
                let id_phase: number = ordersChanges[i].id_phase;
                switch (id_phase) {
                    case 1: {
                        ordersChanges[i].id_phase = "Sin Asignar";
                        break;
                    }
                    case 2: {
                        ordersChanges[i].id_phase = "Diagnostico";
                        break;
                    }
                    case 3: {
                        ordersChanges[i].id_phase = "Analisis y Diseño";
                        break;
                    }
                    case 4: {
                        ordersChanges[i].id_phase = "Desarrollo";
                        break;
                    }
                    case 5: {
                        ordersChanges[i].id_phase = "Pruebas QA";
                        break;
                    }
                    default: {
                        ordersChanges[i].id_phase = "Sin Asignar";
                        break;
                    }
                }
                if(ordersChanges[i].id_sprint == null || ordersChanges[i].state_task == null){
                    ordersChanges[i].id_sprint = "No asignado";
                    ordersChanges[i].state_task = "No asignado";

                }

            }
            res.json(ordersChanges);
        })
    }
}
export const orderChangeController = new OrderChangeController();
