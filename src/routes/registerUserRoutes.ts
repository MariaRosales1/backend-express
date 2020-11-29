import {Router} from 'express';
import {registerUserController} from '../controllers/registerUserController';
import verifyToken from '../verifyToken';

class RegisterUserRoute{
    public router:Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/signup', registerUserController.registerUser);
        this.router.post('/signin', registerUserController.signin);
        this.router.get('/searchPage',verifyToken, registerUserController.searchPage);

    }
}
const registerUserRoute= new RegisterUserRoute();
export default registerUserRoute.router;