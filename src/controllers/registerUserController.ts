import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import pool from '../database';
import { genSalt, hash, compare } from 'bcryptjs';
import keyword from '../config';
import verifyToken from '../verifyToken';


class RegisterUserController {


    public async registerUser(req: Request, res: Response) {
        try {
            //crear usuario
            const sql: string = 'INSERT INTO user_team set ?';
            const salt = await genSalt(10);
            req.body.password = await hash(req.body.password, salt);

            console.log(req.body.password);
            pool.query(sql, [req.body],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.json({ error: 'Error of database', message: err.sqlMessage });
                    }
                    pool.query('SELECT id_user, role FROM user_team WHERE email = ?', [req.body.email], function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            return res.json({ error: 'Error of database', message: err.sqlMessage });
                        };
                        if (results.length <= 0) {
                            return res.status(401).send('No user found');
                        }
                        console.log(results[0].id_user);
                        const token = sign({ id_user: results[0].id_user }, keyword.secret, { expiresIn: 60 * 60 * 24 });
                        res.json({ auth: true, token: token, message: '100;token successful', role: results[0].role});
                    });
                });
        } catch (err) {
            console.log(err);
        }
    }
    public async signin(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { email, password } = req.body;
            pool.query('SELECT password, id_user, role FROM user_team WHERE email = ?', [email], async function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ auth: false, token: null, error: 'Error of database', message: err.sqlMessage });
                };
                if (results.length <= 0) {
                    return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
                }
                console.log(results);

                const validPassword = await compare(password, results[0].password);
                if (!validPassword) {
                    return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
                }
                const token: string = sign({ id_user: results[0].id_user }, keyword.secret, { expiresIn: 60 * 60 * 24 });

                res.json({ auth: true, token: token, message: '100;token successful', role: results[0].role });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    public async searchPage(req: Request, res: Response) {

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
        } catch (error) {
            console.log(error);
        }
    }

}
export const registerUserController = new RegisterUserController();