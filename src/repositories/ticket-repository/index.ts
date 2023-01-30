import { prisma } from '@/config';
import { TicketResponse } from '@/protocols';
import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';

async function findAllTicketsTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function checkEnrollmentsByUserId(userId: number): Promise<Enrollment> {
  return await prisma.enrollment.findFirst({ where: { userId } });
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

async function findTicketByEnrollmentId(enrollmentId: number): Promise<TicketResponse> {
  const response = await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
  return response;
}

async function updateStatus(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.update({ where: { id: ticketId }, data: { status: 'PAID' } });
}

async function getPriceFromTicketType(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

const ticketRepository = {
  findAllTicketsTypes,
  checkEnrollmentsByUserId,
  createTicketFromEnrollmentId,
  findTicketByEnrollmentId,
  updateStatus,
  getPriceFromTicketType,
};

export default ticketRepository;
