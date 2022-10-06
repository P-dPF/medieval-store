import express from 'express';
import 'express-async-errors';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

export default app;
