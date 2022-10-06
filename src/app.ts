import express from 'express';
import productRouter from './routes/product.routes';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

export default app;
