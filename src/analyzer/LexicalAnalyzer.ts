import { Token, Type } from "./Token";

const RESERVED_WORDS: string[] = [
  "Carrera",
  "Semestre",
  "Curso",
  "Nombre",
  "Area",
  "Prerrequisitos",
];

class LexicalAnalyzer {
  private row: number;
  private column: number;
  private auxWord: string;
  private tokenList: Token[];
  private errorList: Token[];

  constructor() {
    this.row = 1;
    this.column = 0;
    this.auxWord = "";
    this.tokenList = [];
    this.errorList = [];
  }

  scanner(input: string) {
    input += "#";
    let char: string;

    for (let i = 0; i < input.length; i++) {
      char = input[i];

      if (char === '\n') {
        this.addPendingWord();
        this.row++;
        this.column = 0;
        continue;
      } else if (char === '\r') {
        continue;
      } else if (char === '\t') {
        this.column += 4;
        continue;
      } else if (char === ' ' || char === '#') {
        this.addPendingWord();
        this.column++;
        continue;
      }

      // Si es letra o número, seguimos formando palabras/números
      if (/[a-zA-Z0-9]/.test(char)) {
        this.auxWord += char;
        this.column++;
        continue;
      }

      // Si encontramos delimitador, primero verificamos si hay palabra pendiente
      this.addPendingWord();

      // Delimitadores
      switch (char) {
        case ',':
          this.addToken(Type.COMA, char);
          break;
        case '{':
          this.addToken(Type.LLAVE_ABRE, char);
          break;
        case '}':
          this.addToken(Type.LLAVE_CIERRA, char);
          break;
        case '[':
          this.addToken(Type.CORCHETE_ABRE, char);
          break;
        case ']':
          this.addToken(Type.CORCHETE_CIERRA, char);
          break;
        case ':':
          this.addToken(Type.DOS_PUNTOS, char);
          break;
        case ';':
          this.addToken(Type.PUNTO_COMA, char);
          break;
        case '(':
          this.addToken(Type.PARENTESIS_ABRE, char);
          break;
        case ')':
          this.addToken(Type.PARENTESIS_CIERRA, char);
          break;
        case '"':
          // iniciamos captura de cadena de texto
          let text = '"';
          this.column++;
          i++;
          while (i < input.length && input[i] !== '"') {
            text += input[i];
            i++;
            this.column++;
          }
          text += '"';
          this.addToken(Type.CADENA_DE_TEXTO, text);
          this.column++;
          break;
        default:
          this.addError(Type.UNKNOW, char);
          break;
      }
      this.column++;
    }
    return this.tokenList;
  }

  private addPendingWord() {
    if (this.auxWord.length > 0) {
      const type = RESERVED_WORDS.includes(this.auxWord)
        ? Type.PALABRA_RESERVADA
        : (/^\d+$/.test(this.auxWord) ? Type.NUMERO : Type.UNKNOW);
      this.addToken(type, this.auxWord);
      this.auxWord = "";
    }
  }

  private addToken(type: Type, lexeme: string) {
    this.tokenList.push(new Token(type, lexeme, this.row, this.column));
  }

  private addError(type: Type, lexeme: string) {
    this.errorList.push(new Token(type, lexeme, this.row, this.column));
  }

  getErroList() {
    return this.errorList;
  }
}

export { LexicalAnalyzer };