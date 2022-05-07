import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Loop } from "./Loop";

export class While extends Loop{
    constructor(padre:LocalContainer, condition:Expresion){
        super(padre, condition);
    }

    override exeLoop(): Result{       
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            let result:Result;

            while((this.evaluateCondition().getResult() as boolean)){
                 result = this.readStack();

                 if(result.getType() == ContentType.BREAK){
                    break;
                 }else if(result.getType() == ContentType.CONTINUE){
                    continue;
                 }else if(result.getType() == ContentType.RETURN){
                    return new Result(ContentType.RETURN, "");//puesto que este hace que se salga de una vez de este método, debo hacer que se emule eso en lo demás xD
                 }

                 //tendría que ser else-if?? yo digo que sí xD
                 else if(result.getType() != ContentType.NOTHING){
                    return result;
                 }                 
            }
        }else{
            return new Result(ContentType.ERROR);
        }
        return new Result(ContentType.NOTHING);//puesto que se llegó al final del for y ninguno de los ele de la pila devolvió un Result, con un tipo diferente...
    }//en este caso debería de colocar un throws por un loop infinito, pero esto en el padre... xD
    
}