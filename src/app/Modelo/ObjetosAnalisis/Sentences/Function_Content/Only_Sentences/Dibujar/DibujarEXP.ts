import { ContentType } from "../../../Class_Content/ContentType";
import { Container } from "../../../Container";
import { Expresion } from "../../Content/Expresion";
import { Result } from "../../Content/Result";
import { Dibujar } from "./Dibujar";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class DibujarEXP extends Dibujar{
    expr:Expresion;

    constructor(line:number, column:number, expr:Expresion){
        super(line, column);

        this.expr = expr;

        this.sentenceName = "DIBUJAR_EXPR";
    }

    override setFather(father: Container): void {
        this.father = father;

        this.expr.setFather(this.father);
    }
    
    override generateScript(): string {        
        //En este caso solo se invocaría el método dibujar de la expresión que se posee aquí
        //puesto que ella ya sabe que hacer, lo único que quedaría seía devolver el string, que
        //al igual que en el método drawAST(), en caso tendga errores estos serína notados y notificados
        //por el método de generateGraphic
        
        return "";
    }

    override generateGraphic(file: string): Result {
        console.log("exe DRAW [EXP]");

        //Se invoca al meodo [drawFUN] que tiene el código para generar el .jpg o de una vez
        //el .pdf a partir del string recibido dependiendo del resultado que devuelva
        //se enviará msje SUCCESS or FAIL

        if(this.drawEXPR()){
            return new Result(ContentType.NOTHING);
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.DRAW_SCRIPT_FAILED_EXPR_AST,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "Encountered errors at tried draw the EXP AST");
    }

    drawEXPR():boolean{
        return true;
    }
}

//tanto esta clase como la de DibujarAST, dibujan árboles, pensé en hacer que ambas
//heredaran de una sola clase, pero los tipos de áboles no son iguales, a menos que
//hiciera un árbol general que sea capaz de tener una forma "cualquiera" y de manera
//simple la forma básica de un árbol binario...
    //es decir podría hacer que heredaran si creara un árbol multiuso, es decir, que
    //pueda tener cualquier forma...