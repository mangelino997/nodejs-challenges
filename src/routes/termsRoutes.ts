import { Router } from 'express';
import termsController from '../controllers/termsController';
import { validateTerms } from '../middleware/validateTerms';

class TermsRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/accept', validateTerms, termsController.acceptTerms);
        this.router.get('/check', termsController.checkTerms);
    }
}

export default new TermsRoutes().router;