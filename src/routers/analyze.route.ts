import { Router } from "express";
import { analyze, mostrarErrores, mostrarCarreras } from "../controllers/analyze.controller";
import { home } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.get("/", home);

analyzeRouter.post("/analyze", analyze);

analyzeRouter.get("/carreras",mostrarCarreras);

analyzeRouter.get("/errores", mostrarErrores);

export default analyzeRouter;