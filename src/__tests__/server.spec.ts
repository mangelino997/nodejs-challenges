import Server from '../server/server';

describe('Server', () => {
    it('should create a server instance', () => {
        const port = 3000;
        const server = Server.init(port);
    
        expect(server).toBeInstanceOf(Server);
        expect(server.app).toBeDefined();
        expect(server['port']).toBe(port);
    });
});
