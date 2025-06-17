import { Curso } from "./Curso";

class Semestre {
    numero: number;
    cursos: Curso[];

    constructor(numero: number, cursos: Curso[]) {
        this.numero = numero;
        this.cursos = cursos;
    }

    getNumero(): number {
        return this.numero;
    }
    setNumero(numero: number): void {
        this.numero = numero;
    }
    getCursos(): Curso[] {
        return this.cursos;
    }
    setCursos(cursos: Curso[]): void {
        this.cursos = cursos;
    }
    addCurso(curso: Curso): void {
        const existe = this.cursos.some(c => c.getNumero() === curso.getNumero());
        if (!existe) {
            this.cursos.push(curso);
        }
    }
}

export { Semestre };
