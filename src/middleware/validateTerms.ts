import { NextFunction,Request, Response } from 'express';
import { TermsDTO } from '../dto/validateTerms';

export const validateTerms = (req: Request, res: Response, next: NextFunction)=>{
    const { userId }: TermsDTO = req.body;
    if(!userId || typeof userId !== 'string') {
        res.status(400).json({error: 'userId is required'});
        return;
    }
    
    next();
};