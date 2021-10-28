import express from "express";
import { router } from "./routes/route.js";
import { baseRouter } from "./routes/base.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import definition from "./doc/definition.js";

const options = {
  definition,
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

const baseURL = ``;

app.use(router);

app.use(`${baseURL}/`, baseRouter);
app.use(`/${process.env.API_VERSION}`, router);
app.use(`${baseURL}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));

export { app };
