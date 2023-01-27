import { prisma } from '@/config';
import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';

async function findAllTicketsTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function checkEnrollmentsByUserId(userId: number): Promise<Enrollment[]> {
  return await prisma.enrollment.findMany({ where: { userId } });
}

async function createTicketFromEnrollmentId(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const ticketRepository = {
  findAllTicketsTypes,
  checkEnrollmentsByUserId,
  createTicketFromEnrollmentId,
};

export default ticketRepository;
