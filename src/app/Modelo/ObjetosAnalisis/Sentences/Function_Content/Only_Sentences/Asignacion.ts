import { Directive } from "../../Directive";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Container } from "../../../Sentences/Container";

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
        let index:number = container.getTAS().findVariable(this.variableName);
        
        if(index != -1){
            let result:Result = this.expr.getValue();

            if(result.getType() == container.getTAS().getVariable(index).getType()){
                container.getTAS().getVariable(index).setValue(result.getValue());
                return new Result(ContentType.NOTHING);
            }else{
                return new Result(ContentType.ERROR, "asignated value type"+
                " does not match with the variable's type");
            }            
        }
        return new Result(ContentType.ERROR, "There is no variable named "+this.variableName);
    }
}