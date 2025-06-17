import { Token, Type } from "./Token";
import { Carrera } from "../models/Carrera";
import { Semestre } from "../models/Semestre";
import { Curso } from "../models/Curso";

export function construirCarreras(tokens: Token[]): Carrera[] {
  const Carreras: Carrera[] = [];
  let i: number = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    console.log("Token actual:", token.getLexema());
    if (
      token.getTypeToken() === Type.PALABRA_RESERVADA &&
      token.getLexema() === "Carrera"
    ) {
      const carrera: Carrera = new Carrera("", []);
      if (
        tokens[i + 1].getTypeToken() === Type.DOS_PUNTOS &&
        tokens[i + 2].getTypeToken() === Type.CADENA_DE_TEXTO
      ) {
        const nombreCarrera = tokens[i + 2].getLexema();
        carrera.setNombre(nombreCarrera.replace(/"/g, ""));
        i += 3;

        while (
          i < tokens.length &&
          tokens[i].getTypeToken() !== Type.CORCHETE_CIERRA
        ) {
          if (tokens[i].getTypeToken() === Type.NUMERO) {
            const semestre = new Semestre(0, []);
            const numeroSemestre = tokens[i].getLexema().replace(/"/g, "");
            semestre.setNumero(Number(numeroSemestre));
            let j = i;
            while (
              j < tokens.length &&
              tokens[j].getTypeToken() !== Type.LLAVE_CIERRA
            ) {
              if (
                tokens[j].getTypeToken() === Type.PALABRA_RESERVADA &&
                tokens[j].getLexema() == "Curso"
              ) {
                const curso = new Curso(0, "", 0, []);
                let k = j;
                while (
                  k < tokens.length &&
                  tokens[k].getTypeToken() !== Type.LLAVE_CIERRA
                ) {
                  if (
                    tokens[k].getTypeToken() === Type.PALABRA_RESERVADA &&
                    tokens[k].getLexema() == "Nombre"
                  ) {
                    const nombreCurso = tokens[k + 2]
                      .getLexema()
                      .replace(/"/g, "");
                    curso.setName(nombreCurso);
                    k++;
                  } else if (
                    tokens[k].getTypeToken() === Type.PALABRA_RESERVADA &&
                    tokens[k].getLexema() == "Area"
                  ) {
                    const Area: number = Number(
                      tokens[k + 2].getLexema().replace(/"/g, "")
                    );
                    curso.setArea(Area);
                    k++;
                  } else if (
                    tokens[k].getTypeToken() === Type.PALABRA_RESERVADA &&
                    tokens[k].getLexema() == "Prerrequisitos"
                  ) {
                    let t = k;
                    while (
                      t < tokens.length &&
                      tokens[i].getTypeToken() !== Type.PARENTESIS_CIERRA
                    ) {
                      if (tokens[t].getTypeToken() === Type.NUMERO) {
                        curso
                          .getPrerrequisitos()
                          .push(Number(tokens[t].getLexema()));
                        t++;
                      } else {
                        t++;
                      }
                    }
                    k = t;
                  }
                  k++;
                }

                if (tokens[k].getTypeToken() === Type.LLAVE_CIERRA) {
                  semestre.getCursos().push(curso);
                }

                j = k;
              }

              j++;

              if (tokens[j].getTypeToken() === Type.LLAVE_CIERRA) {
                carrera.getSemestres().push(semestre);
              }

              i = j;
            }

            i++;
          }
        }
      }
      
    }
    else{
      i++;
    }
  }
  console.log("Carreras construidos:", Carreras);
  console.log(Carreras.map((j) => j.getSemestres()));
  return Carreras;
}
