import express = require('express');
import cookieParser = require('cookie-parser');
import termsRoutes from '../routes/termsRoutes';

export default class Server {
    public app: express.Application;

    constructor(private port: number) {
        this.app = express();
        this.config();
        this.routes();
    }

    start(callback?: () => void){
        this.app.listen(this.port,callback);
    }

    static init(port: number): Server {
        return new Server(port);
    }

    private config(): void {
        this.app.use(cookieParser());
    }
    
    private routes(): void {
        this.app.use('/terms/', termsRoutes);
    }
}
