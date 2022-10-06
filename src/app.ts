import express from 'express';
import 'express-async-errors';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use(errorHandler);

export default app;
