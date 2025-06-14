import { Curso } from "./Curso";

class Semestre {
    Numero: number;
    Cursos: Curso[];

    constructor(Numero: number, Cursos: Curso[]){
        this.Numero = Numero;
        this.Cursos = Cursos;
    }
    getNumbero(): number {
        return this.Numero;
    }
    getCursos(): Curso[] {
        return this.Cursos;
    }
    setNumero(numero: number): void {
        this.Numero = numero;
    }
    setCursos(cursos :Curso[]): void {
        this.Cursos = cursos;
    }
    addPokemon(curso: Curso): void {
        const existe = this.Cursos.some(c=> c.getNumero() === curso.getNumero())
        if(!existe){
            this.Cursos.push(curso);
        }
    }
}

export { Semestre};