import { Semestre } from "./Semestre";

class Carrera {
    Semestres: Semestre[];

    constructor(Semestres: Semestre[]){
        this.Semestres = Semestres
    }

    getSemestres():Semestre[]{
        return this.Semestres;
    }
    setSemestres(Semestres: Semestre[]):void{
        this.Semestres = Semestres
    }

    addSemestre(semestre: Semestre): void {
    const existe = this.Semestres.some(s => s.Numero === semestre.Numero);
    if (!existe) {
        this.Semestres.push(semestre);
    }
    }
}