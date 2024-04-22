/* eslint-disable no-undef */
import express from 'express';
import { exit } from 'node:process';
import compression from 'compression';
import cors from 'cors';
import sessionMiddleware, { extendSessionExpiration } from './middlewares/sessionMiddleware.js';
import userRouter from './routes/userRoutes.js';
import GlobalError from './utils/globalError.js';
import errorController from './controllers/errorController.js';
// import { isDevelopment } from './utils/environment.js';

//==> CATCHING UNCAUGHT EXCEPTION ERRORS
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥  SHUTTING DOWN...');
  console.log(err, err.name, err.message);

  exit(1);
});

const app = express();

app.use(compression());
app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(sessionMiddleware());
app.use(extendSessionExpiration);

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => res.send('<h1>Bienvenido a Auth API!!!</h1>'));

// Not found Routes Error Handling
app.use('*', (req, res, next) => {
  const message = `Page not found! Please check if the URL (${req.originalUrl}) is correct.`;

  next(new GlobalError(404, message));
});

//==> GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorController);

//==> CONNECTING THE DATABASE AND STARTING THE SERVER
const port = process.env.HTTP_PORT || 8080;
// const databaseHost = process.env.DATABASE_HOST;
// const databasePort = process.env.DATABASE_PORT;
// const databaseUser = process.env.DATABASE_USER;
// const databasePass = process.env.DATABASE_PASSWORD;
// let MONGO_URL;
// if (isDevelopment())
//   MONGO_URL = `mongodb://${databaseUser}:${databasePass}@${databaseHost}:${databasePort}/authDB`;
// else MONGO_URL = `mongodb+srv://${databaseUser}:${databasePass}@${databaseHost}/authDB`;

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`==> DATABASE connection established!\n==> SERVER running on port ${port}...`);
//     });
//   })
//   .catch((err) => console.log(`Database connection error: ${err}`));

app.listen(port, () => console.log(`SERVER running on port ${port}...`));

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥  SHUTTING DOWN...');
  console.log(err.name, err.message, err);

  app.close(() => {
    exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED! Shutting down gracefully...');

  app.close(() => {
    console.log('Process terminated!');
  });
});

export default app;
