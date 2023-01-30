import { postPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .post('/process', validateBody(paymentSchema), postPayment);

export { paymentsRouter };
