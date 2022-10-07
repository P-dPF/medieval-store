import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', orderController.insert);

export default router;