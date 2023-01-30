import { PaymentRequest } from '@/protocols';
import Joi from 'joi';

export const paymentSchema = Joi.object<PaymentRequest>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().length(16).regex(/^[0-9]+$/).required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().regex((/^((0?[1-9]|1[0-2])\/20[0-9]{2})$/)).required(),
    cvv: Joi.string().length(3).regex(/^[0-9]+$/).required(),
  }).required(),
});
