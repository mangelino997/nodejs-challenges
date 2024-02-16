import {validateTerms} from '../middleware/validateTerms'; 

const mockRequest = () => {
    const request= {
        body: {
            'userId': '234234-sdfsf'
        }
    };
    return request as any;
};

const mockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    return res as any;
};

const mockNext= jest.fn();

describe('validateTerms', () => {
    it('should call next() if userId is provided and valid', () => {
        const req = mockRequest();
        const res = mockResponse();
        validateTerms(req, res, mockNext);
        expect(mockNext).toBeCalledTimes(1);
    });
    
    it('should return 400 error if userId is not provided', () => {
        const req = mockRequest();
        req.body.userId = undefined; 
        const res = mockResponse();
        validateTerms(req, res, mockNext);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: 'userId is required' });
    });
});
