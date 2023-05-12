import "reflect-metadata";
import dotenv from "dotenv";
import { createExpressServer, useContainer } from "routing-controllers";
import path from "node:path";
import Container from "typedi";

dotenv.config();

useContainer(Container);

const app = createExpressServer({
  routePrefix: "/api/v1",
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  controllers: [path.join(__dirname, "controllers", "*.controller.ts")],
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: true,
    },
  },
});

const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(fileUpload());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
