import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class ClientService {
  constructor(private readonly db = new PrismaClient()) {}

  create(...clients: Array<Prisma.ClientCreateInput>) {
    return this.db.client.createMany({ data: clients });
  }

  getAll() {
    return this.db.client.findMany();
  }

  get(id: string) {
    return this.db.client.findFirst({ where: { id } });
  }

  delete(id: string) {
    return this.db.client.delete({ where: { id } });
  }
}
