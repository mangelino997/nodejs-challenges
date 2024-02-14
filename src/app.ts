import Server from './server/server';

const PORT = 3002;

const server = Server.init(PORT);

server.start(() => {
    console.log(`Server running on port: ${PORT}`);
});