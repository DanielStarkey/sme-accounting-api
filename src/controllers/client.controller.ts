import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ClientService } from "../services/client.service";

@Service()
export class ClientController {
  constructor(@Inject() private readonly clientService: ClientService) {}

  async create(request: Request, response: Response) {
    const data = request.body;

    const client = await this.clientService.create(data);

    response.json(client);
  }

  async getAll(request: Request, response: Response) {
    const clients = await this.clientService.getAll();

    response.json(clients);
  }

  async getById(request: Request, response: Response) {
    const client = await this.clientService.get(request.params.clientId);

    response.json(client);
  }

  async delete(request: Request, response: Response) {
    const { clientId } = request.params;

    await this.clientService.delete(clientId);

    response.status(204).send();
  }
}
