import { notFoundError } from '@/errors';
import { PaymentRequest } from '@/protocols';
import paymentRepository from '@/repositories/payment-repository';

async function postPayment(paymentRequest: PaymentRequest) {
  const ticket = await paymentRepository.checkTicket(paymentRequest.ticketId);
  console.log(ticket);
  if (!ticket) throw notFoundError();
}

const paymentService = {
  postPayment,
};

export default paymentService;
