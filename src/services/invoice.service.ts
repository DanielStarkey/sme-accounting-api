import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class InvoiceService {
  constructor(private readonly db = new PrismaClient()) {}

  create(invoice: Omit<Prisma.InvoiceCreateInput, "client">, clientId: string) {
    return this.db.invoice.create({
      data: {
        ...invoice,
        client: { connect: { id: clientId } },
      },
    });
  }

  getAll() {
    return this.db.invoice.findMany({ include: { client: true } });
  }

  get(id: string) {
    return this.db.invoice.findFirst({
      where: { id },
      include: { client: true },
    });
  }

  delete(id: string) {
    return this.db.invoice.delete({ where: { id } });
  }
}
