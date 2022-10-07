import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateToken from '../middlewares/validateToken';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.use(validateToken);
router.post('/', orderController.insert);

export default router;