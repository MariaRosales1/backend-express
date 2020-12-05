import {Router} from 'express';
import {orderChangeController} from '../controllers/orderChangeController';
import verifyToken from '../verifyToken';

class OrderChangeRoute {
    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/creation', orderChangeController.create);
        this.router.get('/list-OCs', orderChangeController.listOrderChange);
       // this.router.post('/signin');
       // this.router.get('/searchPage',verifyToken);

    }
}
const orderChangeRoute = new OrderChangeRoute();
export default orderChangeRoute.router;