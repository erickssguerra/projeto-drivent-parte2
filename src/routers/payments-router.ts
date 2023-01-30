import { postPayment, getPayment } from "@/controllers";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { paymentSchema, ticketIdSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(paymentSchema), postPayment)
  .get("/", validateQuery(ticketIdSchema), getPayment);

export { paymentsRouter };
