import { prisma } from '@/config';
import { TicketType } from '@prisma/client';

async function findAllTicketsTypes() : Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

const ticketRepository = {
  findAllTicketsTypes,
};

export default ticketRepository;

