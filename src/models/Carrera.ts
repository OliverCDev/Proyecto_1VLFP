import { Semestre } from "./Semestre";

class Carrera {
    Nombre: string;
    Semestres: Semestre[];

    constructor(Nombre:string,Semestres: Semestre[]){
        this.Nombre=Nombre;
        this.Semestres = Semestres;
    }

    getNombre():string{
       return this.getNombre();
    }

    setNombre(Nombre:string):void{
        this.Nombre=Nombre;
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
export { Carrera }
