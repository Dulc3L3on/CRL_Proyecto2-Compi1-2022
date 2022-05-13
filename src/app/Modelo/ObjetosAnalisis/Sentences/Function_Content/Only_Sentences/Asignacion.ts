import { Directive } from "../../Directive";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Container } from "../../../Sentences/Container";
import { ContentType } from "../../Class_Content/ContentType";

export class Asignacion extends Directive{
    variableName:string;
    expr:Expresion;

    constructor(variableName:string, expr:Expresion){
        super();

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
        let variableContent:Result = container.findVariable(this.variableName);//puesto que la variable se debe buscar solo en la clase donde se encuentra la estructura de la función que se está exe, entonces se asegura que la TAS de dicha clase, esté ini, puesto que al encontrar la función invocada, se realiza esta inicailización...
        
        if(variableContent.getType() != ContentType.ERROR){
            let result:Result = this.expr.getValue();

            if(result.getType() == variableContent.getType()){
                variableContent.setValue(result.getValue());
                return new Result(ContentType.NOTHING);
            }else{
                return new Result(ContentType.ERROR, "asignated value type"+
                " does not match with the variable's type");
            }            
        }
        return variableContent;//se retorna el Result original de ERROR
    }
}