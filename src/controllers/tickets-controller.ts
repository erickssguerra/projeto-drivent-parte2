import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/tickets-service';

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTicketsType = await ticketService.getAllTicketsTypes();
    res.status(httpStatus.OK).send(allTicketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
