import { Request, Response, Router } from "express";
import clientRoutes from "./client.routes";
import invoiceRoutes from "./invoice.routes";

const routes = Router();

routes.use("/clients", clientRoutes);
routes.use("/invoices", invoiceRoutes);

export default routes;
