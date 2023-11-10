import WebSocket, { WebSocketServer } from 'ws';

// create new websocket server
const server = new WebSocketServer({ port: 8080 });

console.log('WebSocket Server listening on port 8080');

// connection event - called whenever a new client connects
server.on('connection', (wsClient) => {
    console.log('Client connected');

    // event when an error occurs
    wsClient.on('error', console.error);

    // event when client disconnects
    wsClient.on('close', () => {
        console.log('Client closed connection');
    });

    // event when a message is received
    wsClient.on('message', (data, isBinary) => {
        console.log(`Broadcasting Received Data ${data}`);

        // get all cliets from server and send data to all of them
        server.clients.forEach((client) => {
            client.send(data, { binary: isBinary });
        });
    });
});
