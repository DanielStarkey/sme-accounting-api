import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { InvoiceService } from "../services/invoice.service";

@Service()
export class InvoiceController {
  constructor(@Inject() private readonly invoiceService: InvoiceService) {}

  async create(request: Request, response: Response) {
    const { date, amount, distance_travelled, tags, client_id } = request.body;

    const invoice = await this.invoiceService.create(
      {
        date,
        amount,
        distance_travelled,
        tags,
      },
      client_id
    );

    response.json(invoice);
  }

  async getAll(request: Request, response: Response) {
    const invoice = await this.invoiceService.getAll();

    response.json(invoice);
  }

  async getById(request: Request, response: Response) {
    const invoice = await this.invoiceService.get(request.params.clientId);

    response.json(invoice);
  }

  async delete(request: Request, response: Response) {
    const { clientId: invoiceId } = request.params;

    await this.invoiceService.delete(invoiceId);

    response.status(204).send();
  }
}
