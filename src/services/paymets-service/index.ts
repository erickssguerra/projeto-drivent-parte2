import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentRequest } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment, Ticket, TicketType } from "@prisma/client";

async function checkTicket(ticketId: number) {
  const ticket = (await paymentRepository.checkTicket(ticketId)) as Ticket;
  if (!ticket) throw notFoundError();
  return ticket;
}

async function checkUserEnrollment(enrollmentId: number, userId: number) {
  const enrollmentFromUser = await enrollmentRepository.checkUserEnrollment(enrollmentId, userId);
  if (!enrollmentFromUser) throw unauthorizedError();
}

async function postPayment(paymentRequest: PaymentRequest, userId: number) {
  const ticket = await checkTicket(paymentRequest.ticketId);
  await checkUserEnrollment(ticket.enrollmentId, userId);
  const updatedTicket = (await ticketRepository.updateStatus(ticket.id)) as Ticket;
  const { price } = (await ticketRepository.getPriceFromTicketType(ticket.ticketTypeId)) as TicketType;
  const paymentResponse = (await paymentRepository.postPayment(paymentRequest, updatedTicket, price)) as Payment;
  return paymentResponse;
}

async function getPayment(userId: number, ticketId: number) {
  const ticket = (await checkTicket(ticketId)) as Ticket;
  await checkUserEnrollment(ticket.enrollmentId, userId);
  const payment = (await paymentRepository.getPayment(ticketId)) as Payment;
  return payment;
}

const paymentService = {
  postPayment,
  getPayment,
};

export default paymentService;
