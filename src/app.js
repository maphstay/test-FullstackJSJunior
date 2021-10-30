import express from "express";
import cors from "cors";
import { routes } from "./routes/route.js";
import { baseRouter } from "./routes/base.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import definition from "./doc/definition.js";

const app = express();
const baseURL = ``;

const options = {
  definition,
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(routes);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req, _res, _next) => {
  const error = new Error("Not found");
  error.status = 404;
  _next(error);
});

app.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.use(`${baseURL}/`, baseRouter);
app.use(`${baseURL}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));

export { app };
