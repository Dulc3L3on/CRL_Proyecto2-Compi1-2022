import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Loop } from "./Loop";
import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { ThisReceiver } from "@angular/compiler";

export class While extends Loop{
    constructor(/*padre:LocalContainer, */condition:Expresion){
        super(/*padre, */condition);

        this.sentenceName = "MIENTRAS";
    }

    override exeLoop(): Result{       
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            this.TAS = new TAS();
            let result:Result;

            while((this.evaluateCondition().getValue() as boolean)){
                 result = this.readStack();

                 if(result.getType() == ContentType.BREAK){
                    break;
                 }else if(result.getType() == ContentType.CONTINUE){
                    continue;
                 }
                 //tendría que ser else-if?? yo digo que sí xD
                 else if(result.getType() != ContentType.NOTHING){
                    return result;
                 }//es decir ERR, B, C, S, I, D y RET xD                 
            }
        }else{
            return new Result(ContentType.ERROR);
        }
        return new Result(ContentType.NOTHING);//puesto que se llegó al final del for y ninguno de los ele de la pila devolvió un Result, con un tipo diferente...
    }//en este caso debería de colocar un throws por un loop infinito, pero esto en el padre... xD
    
}