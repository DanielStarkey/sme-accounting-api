import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import csvToJson from "../common/csv-to-json";
import { NewClientDto } from "../dto/new-client.dto";
import { ClientService } from "../services/client.service";

@Controller("/clients")
@Service()
export class ClientController {
  constructor(@Inject() private readonly clientService: ClientService) {}

  @Post()
  create(@Body() client: NewClientDto) {
    return this.clientService.create(client);
  }

  @Post("/import")
  import(@UploadedFiles("clients") files: File[]) {
    const clients = Object.values(files)
      .map((file: any) => file.data.toString())
      .flatMap((csvContent) => csvToJson<any>(csvContent));

    return this.clientService.create(...clients);
  }

  @Get()
  getAll() {
    return this.clientService.getAll();
  }

  @Get("/:clientId")
  getById(@Param("clientId") clientId: string) {
    return this.clientService.get(clientId);
  }

  @Delete("/:clientId")
  async delete(@Param("clientId") clientId: string) {
    await this.clientService.delete(clientId);
  }
}
