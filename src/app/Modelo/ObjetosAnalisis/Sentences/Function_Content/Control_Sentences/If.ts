import { ThisReceiver } from "@angular/compiler";
import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { Container } from "../../Container";
import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Control_sentence } from "./Control_Sentence";
import { Else } from "./Else";

export class If extends Control_sentence{
    else_Condition:Else|null = null;
    
    constructor(/*padre:LocalContainer, */condition:Expresion){
        super(/*padre, */condition);

        this.sentenceName = "SI";
    }

    //aquí no debe sobreescribirse al padre, puesto que el control_sentence se encargó de ello según el caso que corresp...

    setElse(else_condition:Else){
        this.else_Condition = else_condition;
    }

    override exe_ControlSentence(): Result {
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            this.TAS = new TAS();
            let result:Result;            

            if((this.evaluateCondition().getValue() as boolean)){
                result = this.readStack();
                return result;
                //no haog en esa misma línea de arribita el return por los errores que podría lanzar el readStack()... Aunque si mal no recuerdo, en tus programas a pesar que el método pueda devolver el error, de todos modos haces el return al invocar a ese método xD
            }else if(this.else_Condition != null){
                result = this.else_Condition.exe_ControlSentence();
                //result = this.else_Condition.readStack();
                return result;
            }
        }
        return new Result(ContentType.ERROR);        
        //Aquí no es nec revisar que sea != NOTHING para hacer la dev, puesto que lo que devolvió será lo que se debe retornar, puesto que no es un ciclo en el que se pueda volver a evaluar la expre, entonces esas líneas no tienen sentido xD
    }
}