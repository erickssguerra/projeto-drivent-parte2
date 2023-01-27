import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/tickets-service';
import { TicketTypeId } from '@/protocols';

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTicketsType = await ticketService.getAllTicketsTypes();
    res.status(httpStatus.OK).send(allTicketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as TicketTypeId;
  const { userId } = req;
  try {
    const ticket = await ticketService.postTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}