import {Request, Response} from 'express';

class IndexController {

    public index(req:Request, res:Response){
        res.end('jjjj');
    }

}
export const indexController = new IndexController();