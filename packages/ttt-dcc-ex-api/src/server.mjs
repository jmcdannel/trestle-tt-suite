import { WebSocketServer } from 'ws';
import log from './utils/logger.mjs';
import dcc from './dcc.mjs';

let server
const port = 8081; // TODO: move to config
const serverId = 'DCCEXWebsocketServer'; // TODO: move to config

const MSG_CONNECTED = JSON.stringify({
  action: 'message',
  payload: `${serverId} is connected`
});

const handleClose = () => {
  log.info('[DCC WS SERVER] connection closed', serverId);
}

const handleError = err => {
  log.error('[DCC WS  SERVER] Unexpected error occurred', serverId, err);
}

const handleConnection = (ws, resolve) => {
  log.success('[DCC WS SERVER] new client connected', serverId);
  server = ws;
  // handling client connection error
  server.onerror = handleError;

  // handling what to do when clients disconnects from server
  server.on('close', handleClose);

  // handling what to do when messageis recieved
  server.on('message', dcc.handleMessage);

  // sending message to client
  server.send(MSG_CONNECTED);

  resolve(ws);
}

const send = async (data) => {
  if (server) {
    await server.send(JSON.stringify(data));
  }
}

const connect = async () => {
  return new Promise((resolve, reject) => {
    try {
      const wss = new WebSocketServer({ port });
      wss.on('connection', (ws) => handleConnection(ws, resolve));
      log.start('[DCC WS SERVER] WebSocket server started', port, serverId);
    } catch (err) {
      log.error('[DCC WS SERVER] error', err);
      reject(err);
    }
  });
}

export default { connect, send };