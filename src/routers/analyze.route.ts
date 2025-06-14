import { Router } from "express";
import { analyze, mostrarErrores, mostrarJugadores } from "../controllers/analyze.controller";
import { home } from "../controllers/analyze.controller";

const analyzeRouter = Router();

analyzeRouter.get("/", home);

analyzeRouter.post("/analyze", analyze);

analyzeRouter.get("/jugadores",mostrarJugadores);

analyzeRouter.get("/errores", mostrarErrores);

export default analyzeRouter;