import { TicketStatus, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { TicketResponse } from '@/protocols';
import { notFoundError } from '@/errors';

async function getAllTicketsTypes(): Promise<TicketType[]> {
  return await ticketRepository.findAllTicketsTypes();
}

async function postTicket(ticketTypeId: number, userId: number): Promise<TicketResponse> {
  const enrollmentsFromUserId = await ticketRepository.checkEnrollmentsByUserId(userId);
  if (!enrollmentsFromUserId) throw notFoundError();
  const status: TicketStatus = 'RESERVED';
  return await ticketRepository.createTicketFromEnrollmentId(enrollmentsFromUserId[0].id, ticketTypeId, status);
}

async function getTickets(userId: number): Promise<TicketResponse[]> {
  const enrollmentsFromUserId = await ticketRepository.checkEnrollmentsByUserId(userId);
  if (!enrollmentsFromUserId) throw notFoundError();
  const ticketsFromUser = await ticketRepository.findTicketByEnrollmentId(enrollmentsFromUserId[0].id);
  if (!ticketsFromUser) throw notFoundError();
  return ticketsFromUser;
}
const ticketService = {
  getAllTicketsTypes,
  postTicket,
  getTickets,
};

export default ticketService;
