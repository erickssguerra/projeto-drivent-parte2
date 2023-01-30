import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentRequest } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Payment, Ticket, TicketType } from '@prisma/client';

async function postPayment(paymentRequest: PaymentRequest, userId: number) {
  const ticket = (await paymentRepository.checkTicket(paymentRequest.ticketId)) as Ticket;
  if (!ticket) throw notFoundError();
  const enrollmentFromUser = await enrollmentRepository.checkUserEnrollment(ticket.enrollmentId, userId);
  if (!enrollmentFromUser) throw unauthorizedError();
  const updatedTicket = await ticketRepository.updateStatus(ticket.id) as Ticket;
  const { price } = await ticketRepository.getPriceFromTicketType(ticket.ticketTypeId) as TicketType;
  const paymentResponse = await paymentRepository.postPayment(paymentRequest, updatedTicket, price) as Payment;
  return paymentResponse;
}

const paymentService = {
  postPayment,
};

export default paymentService;
