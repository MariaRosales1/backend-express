import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import keyword from './config';

export default async function verifyToken(req: Request, res: Response, next: any) {

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

		const payload:any = verify(token, keyword.secret);
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.body.id_user = payload.id_user;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}