import Joi from 'joi';
import { TicketTypeId } from '@/protocols';

export const ticketTypeIdSchema = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().integer().required(),
});