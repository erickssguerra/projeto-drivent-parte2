import { AuthenticatedRequest } from '@/middlewares';
import { PaymentRequest } from '@/protocols';
import paymentService from '@/services/paymets-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const paymentRequest = req.body as PaymentRequest;
  const { userId } = req;
  try {
    const response = await paymentService.postPayment(paymentRequest, userId);
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
