import {Router} from 'express';
import {sprintController} from '../controllers/sprintController';
import verifyToken from '../verifyToken';

class SpintRoutes{
    public router:Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/nextSprint', sprintController.getNextSprint);
        this.router.post('/creation', sprintController.creationSprint);

    }
}
const spintRoutes = new SpintRoutes();
export default spintRoutes.router;