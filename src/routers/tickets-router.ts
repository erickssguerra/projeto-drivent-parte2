import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllTicketsTypes, postTicket } from '@/controllers';
import Joi from 'joi';
import { ticketTypeIdSchema } from '@/schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTicketsTypes)
  .post('/', validateBody(ticketTypeIdSchema), postTicket)

export { ticketsRouter };
