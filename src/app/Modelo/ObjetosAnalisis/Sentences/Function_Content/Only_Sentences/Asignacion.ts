import { Directive } from "../../Directive";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Container } from "../../../Sentences/Container";
import { ContentType } from "../../Class_Content/ContentType";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class Asignacion extends Directive{
    variableName:string;
    expr:Expresion;

    constructor(line:number, column:number, variableName:string, expr:Expresion){
        super(line, column);

        this.variableName = variableName;
        this.expr = expr;

        this.sentenceName = "ASIGNACION";
    }

    override setFather(father: Container): void {
        this.father = father;
        this.expr.setFather(father);
    }

    override exe(): Result {
        return this.exe_Asignation(this.father);        
    }

    exe_Asignation(container:Container):Result{       
        console.log("exe_Asignation");
        
        let variableContent:Result = container.findVariable(this.variableName);//puesto que la variable se debe buscar solo en la clase donde se encuentra la estructura de la función que se está exe, entonces se asegura que la TAS de dicha clase, esté ini, puesto que al encontrar la función invocada, se realiza esta inicailización...
        
        if(variableContent.getType() != ContentType.ERROR){
            let result:Result = this.expr.getValue();

            if(result.getType() == variableContent.getType()){
                variableContent.setValue(result.getValue());
                return new Result(ContentType.NOTHING);
            }else{
                this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.UNMATCH_ASIGNATED_VALUE,
                    this.sourceLocation, this.sentenceName, this.father.getSentenceName()));

                return new Result(ContentType.ERROR, "asignated value type"+
                " does not match with the variable's type");
            }            
        }
        return variableContent;//se retorna el Result original de ERROR
    }
}