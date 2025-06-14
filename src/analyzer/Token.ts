enum Type{
    PALABRA_RESERVADA,
    CADENA_DE_TEXTO,
    NUMERO,
    DOS_PUNTOS,
    LLAVE_ABRE,
    LLAVE_CIERRA,
    CORCHETE_ABRE,
    CORCHETE_CIERRA,
    STATS_ABRE,
    IGUAL,
    PUNTO_COMA,
    COMILLAS,
    PARENTESIS_ABRE,
    PARENTESIS_CIERRA,
    UNKNOW
}


class Token{

    private row: number;
    private colum: number;
    private lexema: string;
    private typeToken: Type;
    private typeTokenString: string;
    
    constructor(typeToken: Type, lexema: string, row: number, colum: number){
        this.row = row;
        this.colum = colum;
        this.lexema = lexema;
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];

    }
    getRow(): number {
        return this.row;
    }
    getColum(): number {
        return this.colum;
    }
    getLexema(): string {
        return this.lexema;
    }
    getTypeToken(): Type {
        return this.typeToken;
    }
    getTypeTokenString(): string {
        return this.typeTokenString;
    }
    
}
export { Token , Type}