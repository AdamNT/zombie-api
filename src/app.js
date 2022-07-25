import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import debugLib from 'debug';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config({ path: path.join(__dirname, '.env') });

import indexRouter from './routes/index';
import itemsRouter from './routes/items';
import zombiesRouter from './routes/zombies';

import initItemCronJobs from './cron/items';

const app = express();
const debug = debugLib('myapp:server');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Customer API',
      description: 'Customer API Information',
    },
    basePath: '/v1',
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.use('/', indexRouter);
app.use('/v1/items', itemsRouter);
app.use('/v1/zombies', zombiesRouter);

// init crons
initItemCronJobs();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

export default app;
