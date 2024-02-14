import { Response, Request } from 'express';

class TermsController {
    constructor() {}
    /* add req because it allways received two parameters: request and response */
    public acceptTerms(req: Request, res: Response): void {
        const { userId }: { userId: string } = req.body;
        res
            .cookie('acceptedTerms', userId, { maxAge: 900000, httpOnly: true })
            .send('Terms and Conditions accepted');
    }

    public checkTerms(req: Request, res: Response): void {
        const acceptedUserId: string | undefined = req.cookies.acceptedTerms;

        acceptedUserId
            ? res.send('El usuario ha aceptado los términos y condiciones')
            : res.send('El usuario aún no ha aceptado los términos y condiciones');
    }
}
export default new TermsController();
