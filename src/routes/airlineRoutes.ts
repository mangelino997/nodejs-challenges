import { Router } from 'express';
import airlineController from '../controllers/airlineController';

class AirlineRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('', airlineController.getAirline);
        this.router.get('/visualizations', airlineController.getAnalytics);
    }
}

export default new AirlineRouter().router;
