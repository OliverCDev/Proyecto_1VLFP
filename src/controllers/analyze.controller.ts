import { Request, Response } from "express";
import { LexicalAnalyzer } from "../analyzer/LexicalAnalyzer";
import { construirCarreras } from "../analyzer/Constructor";
import { Carrera } from "../models/Carrera";


let carreras: Carrera[];
export const analyze = (req: Request, res: Response) => {
  const input = req.body.editorTexto;
  console.log(input);
  let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

  let tokens  = lexicalAnalyzer.scanner(input);
  let errores = lexicalAnalyzer.getErroList();
  
  if(errores.length == 0){
    carreras = construirCarreras(tokens);
  }
  
 res.json({
    tokens: tokens,
    errores: errores,
    carreras: carreras
  });
}

export const home = (req: Request, res: Response) => {

    
  res.render("index");
};

export const mostrarCarreras = (req: Request, res: Response) => {
    if (carreras && carreras.length > 0) {
        res.render("carreras", { carreras: carreras });
    } else {
        res.render("carreras", { carreras: [] });
    }
}

export const mostrarErrores = (req: Request, res: Response) => {
    res.render("errores");
}
