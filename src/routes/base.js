import { Router } from "express";

const baseRouter = Router();

baseRouter.get("/", (_req, res) => {
  res.status(200).json({
    description: "Contele Challenge",
    version: 1.0,
  });
});

export { baseRouter };
