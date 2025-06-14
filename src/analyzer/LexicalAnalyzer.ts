import { Token, Type } from "./Token";

const RESERVED_WORDS: string[] = [
  "Jugador",
  "salud",
  "atque",
  "defensa",
  "agua",
  "dragon",
  "planta",
  "psiquico",
  "fuego",
  "normal",
];
class LexicalAnalyzer {
  private row: number;
  private column: number;
  private auxChar: string;
  private auxWord: string;
  private state: number;
  private auxNum: number;
  private tokenList: Token[];
  private errorList: Token[];

  constructor() {
    this.row = 1;
    this.column = 0;
    this.auxChar = "";
    this.auxWord = "";
    this.state = 0;
    this.auxNum = 0;
    this.tokenList = [];
    this.errorList = [];
  }

  scanner(input: string) {
    input += "#";
    let char: string;
    let count: number = 0;
    for (let i: number = 0; i < input.length; i++) {
      char = input[i];
      switch (this.state) {
        case 0:
          switch (char) {
            case "{":
              this.state = 2;
              this.addCharacter(char);
              break;
            case '"':
              this.state = 3;
              this.addCharacter(char);
              count++;
              break;
            case "[":
              this.state = 4;
              this.addCharacter(char);
              break;
            case "]":
              this.state = 5;
              this.addCharacter(char);
              break;
            case ":":
              if (input[i + 1] == "=") {
                this.state = 6;
                this.addCharacter(char + "=");
                this.column++;
              } else {
                this.state = 7;
                this.addCharacter(char);
              }
              break;
            case "=":
              if (input[i - 1] != ":") {
                this.state = 8;
                this.addCharacter(char);
              }
              break;
            case ";":
              this.state = 9;
              this.addCharacter(char);
              break;
            case " ":
              this.column++;
              break;
            case "\n":
              console.log("Fila: " + this.row);
              this.row += 1;
              this.column = 0;
              console.log("Nueva linea --------------");
              console.log("Fila: " + this.row);
              break;
            case "\r":
              break;
            case "\t":
              this.column += 4;
              break;
            case "}":
              this.state = 12;
              this.addCharacter(char);
              break;
            case "(":
              this.state = 13;
              this.addCharacter(char);
              break;
            case ")":
              this.state = 14;
              this.addCharacter(char);
              break;
            default:
              if (/\d/.test(char)) {
                if (count == 1) {
                  this.addCharacterWord(char);
                  this.state = 11;
                } 
                this.addCharacter(char);
                if (input[i + 1] == ";") {
                  this.state = 10;
                }
                break;
              } else if (/[a-zA-Z]/.test(char) || count == 1) {
                console.log("Caracter: " + char);
                this.state = 11;
                this.addCharacterWord(char);
                break;
              } else if (char == "#" && i == input.length - 1) {
                // Fin del análisis
                console.log("Analyze Finished");
              } else {
                console.log("Caracter: " + char + "---- Contador: " + count);
                // Error Léxico
                this.addError(Type.UNKNOW, char, this.row, this.column);
                this.clear();
                this.clearWord();
                this.column++;
              }
              break;
          }
          break;
        case 2: // LLAVE_ABRE
          this.addToken(Type.LLAVE_ABRE, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 3: // COMILLAS
          this.addToken(Type.COMILLAS, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 4: // CORCHETE_ABRE
          this.addToken(
            Type.CORCHETE_ABRE,
            this.auxChar,
            this.row,
            this.column
          );
          this.clear();
          i--;
          break;
        case 5: // CORCHETE_CIERRA
          this.addToken(
            Type.CORCHETE_CIERRA,
            this.auxChar,
            this.row,
            this.column
          );
          this.clear();
          i--;
          break;
        case 6: // STATS_ABRE
          this.addToken(Type.STATS_ABRE, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 7: // DOS_PUNTOS
          this.addToken(Type.DOS_PUNTOS, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 8: // IGUAL
          this.addToken(Type.IGUAL, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 9: // PUNTO_COMA
          this.addToken(Type.PUNTO_COMA, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 10: // NUMERO
          this.addToken(Type.NUMERO, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 11: // PALABRA_RESERVADA O CADENA_DE_TEXTO
          console.log("Columna: " + this.column);
          console.log("AuxWord: " + this.auxWord);
          if (
            input[i] == ":" ||
            input[i] == "]" ||
            (input[i] == " " && RESERVED_WORDS.includes(this.auxWord))
          ) {
            this.addToken(
              Type.PALABRA_RESERVADA,
              this.auxWord,
              this.row,
              this.column
            );
            this.clearWord();
            count = 0;
          } else if (input[i] == '"') {
            this.addToken(
              Type.CADENA_DE_TEXTO,
              this.auxWord,
              this.row,
              this.column
            );
            this.clearWord();
            count = 0;
          }
          this.clear();
          i--;
          break;
        case 12: // LLAVE_CIERRA
          this.addToken(Type.LLAVE_CIERRA, this.auxChar, this.row, this.column);
          this.clear();
          i--;
          break;
        case 13: // PARENTESIS_CIERRA
          this.addToken(
            Type.PARENTESIS_ABRE,
            this.auxChar,
            this.row,
            this.column
          );
          this.clear();
          i--;
          break;
        case 14: // LLAVE_CIERRA
          this.addToken(
            Type.PARENTESIS_CIERRA,
            this.auxChar,
            this.row,
            this.column
          );
          this.clear();
          i--;
          break;
      }
    }
    return this.tokenList;
  }
  addCharacterWord(char: string) {
    this.auxWord += char;
    console.log("Se agrega la letra " + char + " a la cadena " + this.auxWord);
    this.column++;
  }
  clear() {
    this.state = 0;
    this.auxChar = "";
  }
  clearWord() {
    this.auxWord = "";
  }
  addToken(type: Type, lexeme: string, row: number, column: number) {
    this.tokenList.push(new Token(type, lexeme, row, column));
  }

  private addCharacter(char: string) {
    this.auxChar += char;
    this.column++;
  }
  private addError(type: Type, lexeme: string, row: number, column: number) {
    this.errorList.push(new Token(type, lexeme, row, column));
  }

  getErroList() {
    return this.errorList;
  }
}

export { LexicalAnalyzer };
