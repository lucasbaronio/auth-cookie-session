import express from 'express';
import compression from 'compression';
import cors from 'cors';
import sessionMiddleware, { extendSessionExpiration } from './middlewares/sessionMiddleware.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(compression());
app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(sessionMiddleware());
app.use(extendSessionExpiration);

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello world!' });
});

app.listen(3000, () => console.log('Server is listening in port 3000'));
