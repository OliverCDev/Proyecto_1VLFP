import { Semestre } from "./Semestre";

class Carrera {
    nombre: string;
    semestres: Semestre[];

    constructor(nombre: string, semestres: Semestre[]) {
        this.nombre = nombre;
        this.semestres = semestres;
    }

    getNombre(): string {
        return this.nombre;
    }
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    getSemestres(): Semestre[] {
        return this.semestres;
    }
    setSemestres(semestres: Semestre[]): void {
        this.semestres = semestres;
    }
    addSemestre(semestre: Semestre): void {
        const existe = this.semestres.some(s => s.getNumero() === semestre.getNumero());
        if (!existe) {
            this.semestres.push(semestre);
        }
    }
}

export { Carrera };
