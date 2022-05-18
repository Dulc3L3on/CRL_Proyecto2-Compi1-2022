import { CONTEXT_NAME } from "@angular/compiler/src/render3/view/util";
import { ContentType } from "./ContentType";
import { Container } from "../Container";
import { Directive } from "../Directive";
import { Expresion } from "../Function_Content/Content/Expresion";
import { Result } from "../Function_Content/Content/Result";
import { Variable } from "../Function_Content/Content/Variable";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";
import { Error } from "src/app/Modelo/Tool/Error/Error";

export class Incertitude extends Directive{
    public static incertitudeVarName:string = "INCERTITUDE";
    expr:Expresion;    

    constructor(line:number, column:number, expr:Expresion){
        super(line, column);

        this.expr = expr;
    }

    override setFather(father: Container): void {
        this.father = father;
        this.expr.setFather(father);
    }

    override exe(): Result {
        let result:Result = this.expr.getValue();
        console.log("incertitud father "+ this.father);

        if(result.getType() == ContentType.ERROR || 
          (result.getType() != ContentType.INTEGER && result.getType() != ContentType.DOUBLE)){
                this.father.TAS.setVariable(new Variable(this.sourceLocation.getLine(), this.sourceLocation.getColumn(), ContentType.DOUBLE, Incertitude.incertitudeVarName, 0.5));
                
                this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.INCERTITUDE_WITH_ERRORS,
                    this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
                return new Result(ContentType.ERROR, "The declarated incertitude, cannot read")
        }//si existe un error, no estará en la TAS, y al igual que cuando no colocan esta directiva, se enviará a donde se requiera los 0.5 por defecto...
        
        this.father.TAS.setVariable(new Variable(this.sourceLocation.getLine(), this.sourceLocation.getColumn(), result.getType(), Incertitude.incertitudeVarName, result.getValue()));
        return new Result(ContentType.NOTHING);        
    }

}

//es un error que pongan +1 vez la directiva incertidumbre?
//lo que yo pensaría hacer para ahorrarme esa revisada es simplemente add las directivas y exe cuando se topara con una el stack...
//eso si, no debería dejar de revisar que aparezca solo en el área de encabezado...


//además de servirme para mostrar los errores, la linea y col, me serán útiles para que no haya desacuerdos entre la decl, asig G y dec de func, puesto que para init la clase, revisaré el valor de estos atributos xD