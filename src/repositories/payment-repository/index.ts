import { prisma } from '@/config';
import { notFoundError } from '@/errors';

async function checkTicket(ticketId: number) {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

const paymentRepository = {
  checkTicket,
};

export default paymentRepository;
