//poseerá cnstrc, para que sea simple y complejo...
//no creo que sea nec crear una clase para cuando es S y otra para cuando es C...
    //Eso ya lo veremos xD

import { Container } from "../../../Container";
import { Expresion } from "../../Content/Expresion";
import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Return extends BreakPoint{
    expr:Expresion|null;//en dado caso sea un simple, esto se quedrará vacío, no nukll, sino vacío xD

    constructor(expresion:Expresion|null){
        super();

        this.expr = expresion;

        this.sentenceName = "RETURN";        
    }//será empleado cuando se trate de un return "complejo"... se quedará como null cuando sea un return simple...

    override setFather(father: Container): void {
        this.father = father;
        
        if(this.expr != null){
            this.expr.setFather(father);
        }
    }

    override exe(): Result {
        if(this.expr == null){
            return new Result(ContentType.RETURN);
        }

        return this.expr.getValue();        
    }

}