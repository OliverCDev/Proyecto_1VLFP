class Curso{
    numero: number;
    name: string;
    area: number;
    prerrequisitos: number[];
     
    constructor(numero: number,name?: string, area?: number, prerrequisitos?: number[], attack?: number, defense?: number) {
        this.numero = numero;
        this.name = name ?? "";
        this.area = area ?? 0;
        this.prerrequisitos = prerrequisitos ?? [];
    }

    getNumero():number{
        return this.numero;
    }
    setNumero(numero:number):void{
        this.numero=numero;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }
    getArea(): number {
        return this.area;
    }
    setArea(area: number): void {
        this.area = area;
    }
    getPrerrequisitos(): number[] {
        return this.prerrequisitos;
    }
    setPrerrequisitos(prerrequisitos: number[]): void {
        this.prerrequisitos = prerrequisitos;
    }
    addPrerrequisito(prerrequisito: number): void {
        if (!this.prerrequisitos.includes(prerrequisito)) {
            this.prerrequisitos.push(prerrequisito);
        }
    }

}
export { Curso };