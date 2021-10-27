import express from "express";
import { router } from "./routes/route.js";
// import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { baseRouter } from "./routes/base.js";
import definition from "./definition.js";

const options = {
  definition,
  apis: ["./src/routes/*.js"], // files containing annotations as above
};

const specs = swaggerJsDoc(options);

const app = express();

const baseURL = ``;
// const openApi = YAML.load("./src/doc/openapi.yaml");

app.use(router);

app.use(`${baseURL}/`, baseRouter);
app.use(`/${process.env.API_VERSION}`, router);
app.use(`${baseURL}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));

export { app };
