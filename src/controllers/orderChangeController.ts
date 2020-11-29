import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import pool from '../database';
import {OrderChange} from '../models/orderChange';

class OrderChangeController {

    public async create(req:Request, res:Response){
        console.log(req.body);
        
        return res.json({"message":"enviado"})
    }
}
export const orderChangeController = new OrderChangeController();
