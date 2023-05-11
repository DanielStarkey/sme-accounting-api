import { Router } from "express";
import Container from "typedi";
import { InvoiceController } from "../controllers/invoice.controller";

const routes = Router();

const invoiceController = Container.get(InvoiceController);

routes.post("/", invoiceController.create.bind(invoiceController));
routes.get("/", invoiceController.getAll.bind(invoiceController));
routes.delete("/:clientId", invoiceController.delete.bind(invoiceController));
routes.get("/:clientId", invoiceController.getById.bind(invoiceController));

export default routes;
