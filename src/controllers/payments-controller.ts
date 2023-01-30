import { AuthenticatedRequest } from '@/middlewares';
import { PaymentRequest } from '@/protocols';
import paymentService from '@/services/paymets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const paymentRequest = req.body as PaymentRequest;

  try {
    const response = await paymentService.postPayment(paymentRequest);
    res.send(paymentRequest);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
