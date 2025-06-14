import { Request, Response } from "express";
import { LexicalAnalyzer } from "../analyzer/LexicalAnalyzer";
import { construirJugadores } from "../analyzer/ConstructorPlayer";
import { Jugador } from "../models/Semestre";

let jugadores: Jugador[];
export const analyze = (req: Request, res: Response) => {
  const input = req.body.editorTexto;
  console.log(input);
  let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

  let tokens  = lexicalAnalyzer.scanner(input);
  let errores = lexicalAnalyzer.getErroList();
  jugadores = [];
  if (errores.length == 0) {
      jugadores = construirJugadores(tokens);
      jugadores.forEach((jugador)=>{
        jugador.getPokemons().sort((a, b) => b.getIvs() - a.getIvs());
        const top6Pokemons = jugador.getPokemons().slice(0, 6);
        jugador.setPokemons(top6Pokemons);
      })
  }
 res.json({
    tokens: tokens,
    errores: errores,
    jugadores: jugadores
  });
}

export const home = (req: Request, res: Response) => {

    
  res.render("index");
};

export const mostrarJugadores = (req: Request, res: Response) => {
    if (jugadores && jugadores.length > 0) {
        res.render("jugadores", { jugadores: jugadores });
    } else {
        res.render("jugadores", { jugadores: [] });
    }
}

export const mostrarErrores = (req: Request, res: Response) => {
    res.render("errores");
}
