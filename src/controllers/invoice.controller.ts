import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { NewInvoiceDto } from "../dto/new-invoice.dto";
import { InvoiceService } from "../services/invoice.service";

@Controller("/invoices")
@Service()
export class InvoiceController {
  constructor(@Inject() private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() invoice: NewInvoiceDto) {
    const { date, amount, distance_travelled, tags, client_id } = invoice;

    return this.invoiceService.create(
      {
        date,
        amount,
        distance_travelled,
        tags,
      },
      client_id
    );
  }

  @Get()
  getAll() {
    return this.invoiceService.getAll();
  }

  @Get("/:invoiceId")
  getById(@Param("invoiceId") invoiceId: string) {
    return this.invoiceService.get(invoiceId);
  }

  @Delete("/:invoiceId")
  async delete(@Param("invoiceId") invoiceId: string) {
    await this.invoiceService.delete(invoiceId);
  }
}
