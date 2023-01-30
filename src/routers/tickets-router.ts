import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getAllTicketsTypes, postTicket, getTicketsFromUser } from "@/controllers";
import { ticketTypeIdSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketsTypes)
  .get("/", getTicketsFromUser)
  .post("/", validateBody(ticketTypeIdSchema), postTicket);

export { ticketsRouter };
