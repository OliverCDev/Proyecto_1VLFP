import { Token, Type } from "./Token";
import { Jugador } from "../models/Semestre";
import { Pokemon } from "../models/Curso";

export function construirJugadores(tokens: Token[]): Jugador[] {
  const jugadores: Jugador[] = [];
  let i: number = 0;
  
  while (i < tokens.length) {
    const token = tokens[i];
    console.log("Token actual:", token.getLexema());
    if (
      token.getTypeToken() === Type.PALABRA_RESERVADA &&
      token.getLexema() === "Jugador"
    ) {
      const jugador: Jugador = new Jugador("", []);
      if (
        tokens[i + 1].getTypeToken() === Type.DOS_PUNTOS &&
        tokens[i + 2].getTypeToken() === Type.COMILLAS
      ) {
        const nombreJugador = tokens[i + 3].getLexema();
        jugador.setName(nombreJugador.replace(/"/g, ""));
        i += 4;

        while (
          i < tokens.length &&
          tokens[i].getTypeToken() !== Type.LLAVE_CIERRA
        ) {
          
          if (
            tokens[i - 1].getTypeToken() === Type.COMILLAS &&
            tokens[i].getTypeToken() === Type.CADENA_DE_TEXTO &&
            tokens[i + 1].getTypeToken() === Type.COMILLAS
          ) {
            const pokemon = new Pokemon(); 
            const nombrePokemon = tokens[i].getLexema().replace(/"/g, "");
            const tipoPokemon = tokens[i + 3].getLexema();
            pokemon.setName(nombrePokemon);
            pokemon.setType(tipoPokemon);

            let j = i;
            while (
              j < tokens.length &&
              tokens[j].getTypeToken() !== Type.PARENTESIS_CIERRA
            ) {
              if (
                tokens[j].getTypeToken() === Type.PALABRA_RESERVADA &&
                tokens[j].getLexema() == "salud"
              ) {
                pokemon.setHealth(Number(tokens[j + 3].getLexema()));
              } else if (
                tokens[j].getTypeToken() === Type.PALABRA_RESERVADA &&
                tokens[j].getLexema().includes("ataque")
              ) {
                pokemon.setAttack(Number(tokens[j + 3].getLexema()));
              } else if (
                tokens[j].getTypeToken() === Type.PALABRA_RESERVADA &&
                tokens[j].getLexema().includes("defensa")
              ) {
                pokemon.setDefense(Number(tokens[j + 3].getLexema()));
              }
              j++;
            }

           
            if (tokens[j].getTypeToken() === Type.PARENTESIS_CIERRA) {
              pokemon.getIvs();
              pokemon.getUrlImg();
              jugador.pokemons.push(pokemon);
            }

            i = j;
          }

          i++;
        }
      }
      jugadores.push(jugador);
    }

    i++;
  }
  console.log("Jugadores construidos:", jugadores);
  console.log(jugadores.map(j => j.getPokemons()));
  return jugadores;
}
