'use strict';

const http = require('http');
const logger = require('../logger');
const app = require('../app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }
  switch (err.code) {
    case 'EACCES':
      logger.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListening() {
  logger.info(`Tenant Manager application successfully started and listening on port ${port}`);
}