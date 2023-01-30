import { prisma } from '@/config';
import { PaymentRequest } from '@/protocols';
import { Payment, Ticket } from '@prisma/client';

async function checkTicket(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function postPayment(paymentRequest: PaymentRequest, ticket: Ticket, price: number) {
  return await prisma.payment.create({
    data: {
      ticketId: ticket.id,
      value: price,
      cardIssuer: paymentRequest.cardData.issuer,
      cardLastDigits: paymentRequest.cardData.number.slice(-4),
    },
  });
}

async function getPayment(ticketId: number){
  return await prisma.payment.findFirst({where: {ticketId}}) as Payment
}

const paymentRepository = {
  checkTicket,
  postPayment,
  getPayment
};

export default paymentRepository;
