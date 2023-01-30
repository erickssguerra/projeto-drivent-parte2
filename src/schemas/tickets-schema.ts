import Joi from "joi";
import { TicketTypeId } from "@/protocols";

export const ticketTypeIdSchema = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().integer().min(1).required(),
});

export const ticketIdSchema = Joi.object({
  ticketId: Joi.number().integer().min(1).required(),
});
