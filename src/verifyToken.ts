import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import keyword from './config';

export default function verifyToken(req: Request, res: Response, next: any) {

    console.log(req.headers);
    const token: any = req.headers['x-access-token'];
    console.log("Verificando token")
    console.log(token);
    if (!token) {
        return res.status(404).json({ auth: false, message: 'No token provided' });
    }
    const decoded: any = verify(token, keyword.secret);
    req.body.id_user = decoded.id_user;
    next();
}