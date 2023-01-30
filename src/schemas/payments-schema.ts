import { PaymentRequest } from "@/protocols";
import Joi from "joi";

export const paymentSchema = Joi.object<PaymentRequest>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }),
});
