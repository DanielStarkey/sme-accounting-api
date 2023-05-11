import { Router } from "express";
import Container from "typedi";
import { ClientController } from "../controllers/client.controller";

const routes = Router();

const clientController = Container.get(ClientController);

routes.post("/", clientController.create.bind(clientController));
routes.get("/", clientController.getAll.bind(clientController));
routes.delete("/:clientId", clientController.delete.bind(clientController));
routes.get("/:clientId", clientController.getById.bind(clientController));

export default routes;
