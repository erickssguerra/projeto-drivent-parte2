import { TicketType } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type TicketTypeId = {
  ticketTypeId: number;
};

export type TicketResponse = {
  id?: number;
  status: string;
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: TicketType;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentRequest = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: string;
    cvv: string;
  };
};
