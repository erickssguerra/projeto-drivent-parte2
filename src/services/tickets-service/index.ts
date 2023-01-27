import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';

async function getAllTicketsTypes(): Promise<TicketType[]> {
  return await ticketRepository.findAllTicketsTypes();
}

const ticketService = {
  getAllTicketsTypes,
};

export default ticketService;
