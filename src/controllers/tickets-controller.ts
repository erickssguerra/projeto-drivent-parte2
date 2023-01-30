import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";
import { TicketResponse, TicketTypeId } from "@/protocols";

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTicketsType = await ticketService.getAllTicketsTypes();
    res.status(httpStatus.OK).send(allTicketsType);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as TicketTypeId;
  const { userId } = req;
  try {
    const ticket: TicketResponse = await ticketService.postTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketsFromUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets: TicketResponse = await ticketService.getTickets(userId);
    res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
