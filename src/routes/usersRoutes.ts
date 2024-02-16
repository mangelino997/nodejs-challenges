import { Router } from 'express';
import usersController from '../controllers/usersController';


class UsersRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get('/users', usersController.getAllUsers);
    }
}

export default new UsersRoutes();