import { Directive } from "./Directive";
import { Expresion } from "./Function_Content/Content/Expresion";
import { TAS } from "../EDDs/TablaSimbolos/TAS";
import { Result } from "./Function_Content/Content/Result";
import { Variable } from "./Function_Content/Content/Variable";
import { Container } from "./Container";
import { ContentType } from "./Class_Content/ContentType";
import { Error } from "../../Tool/Error/Error";
import { ErrorMessage } from "../../Tool/Error/ErrorMessage";
import { ErrorType } from "../../Tool/Error/ErrorType";

export class Variable_Declaration extends Directive{
    type:ContentType;
    variableName:string;
    asignatedExpresion:Expresion|null;

    constructor(line:number, column:number, type:ContentType, variableName:string, asignatedExpresion:Expresion|null){
        super(line, column);

        this.type = type;
        this.variableName = variableName;
        this.asignatedExpresion = asignatedExpresion;

        this.sentenceName = "DECLARACION";
    }

    override setFather(father: Container): void {//el padre es un container, puesto que puede ser un GC o LC
        this.father = father;

        if(this.asignatedExpresion != null){
            this.asignatedExpresion.setFather(father);
        }
    }

    override exe(): Result {
        console.log("exe (VAR_DECLARATION)");

        let TAS:TAS = this.father.getTAS();

        let value:Result = ((this.asignatedExpresion != null)?this.asignatedExpresion.getValue()://SINO, se setean los valores por defecto xD
                ((this.type == ContentType.INTEGER)?new Result(ContentType.INTEGER, 0):((this.type == ContentType.DOUBLE)?new Result(ContentType.DOUBLE, 0.0):
                ((this.type == ContentType.STRING)?new Result(ContentType.STRING, ""):((this.type == ContentType.BOOLEAN)?new Result(ContentType.BOOLEAN, true):new Result(ContentType.CHAR, ''))))));

        if(value.getType() == this.type){
            TAS.setVariable(new Variable(this.sourceLocation.getLine(), this.sourceLocation.getColumn(), this.type, this.variableName, value.getValue()));
            return new Result(ContentType.NOTHING);
        }else if(value.getType() == ContentType.ERROR){
            return value;//puesto que aquí se estará enviando el objeto result de tipo ERROR, lo cual está bien, porque ya está creado, entonces por qué volver a hacerlo...
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.INCORRECT_ASIGNATED_TYPE,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "The type of asignated value doesn't correspond at "+
        " variable type");        
    }
}//OJO::: en la gramática se tendrá un mecanismo que se encargue de crear un listado de los nombres de las var a crear, para que así cuando 
//se llegue a la producción que corresponde a una creación, se envíe el listado y se vaya creando una a una cada instancia
//de esta clase, para cada nombre de variable declarado
    //esto ayudará a que la expresión pueda ser asignada a cada variable declarada...