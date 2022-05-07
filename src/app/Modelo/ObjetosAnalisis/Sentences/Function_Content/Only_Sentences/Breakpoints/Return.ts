//poseerá cnstrc, para que sea simple y complejo...
//no creo que sea nec crear una clase para cuando es S y otra para cuando es C...
    //Eso ya lo veremos xD

import { Expresion } from "../../Content/Expresion";
import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Return extends BreakPoint{
    expr?:Expresion;//en dado caso sea un simple, esto se quedrará vacío, no nukll, sino vacío xD

    constructor(expresion?:Expresion){
        super();

        this.expr = expresion;
    }//será empleado cuando se trate de un return "complejo"... se quedará como null cuando sea un return simple...

    override exe(): Result {
        if(this.expr == null){
            return new Result(ContentType.RETURN);
        }

        return this.expr.getValue();        
    }

}