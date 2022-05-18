import { ThisReceiver } from "@angular/compiler";
import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { ContentType } from "../../Class_Content/ContentType";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Control_Sentence } from "./Control_Sentence";
import { Else } from "./Else";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class If extends Control_Sentence{
    else_Condition:Else|null = null;//puesto que no pertenece a un cuerpo definitivo
    
    constructor(line:number, column:number, condition:Expresion){
        super(line, column, condition);

        this.sentenceName = "SI";
    }

    //aquí no debe sobreescribirse al padre, puesto que el control_sentence se encargó de ello según el caso que corresp...

    setElse(else_condition:Else){
        this.else_Condition = else_condition;        
        this.else_Condition.setFather(this.father);//puesto que cuando se llegue a este momento, el if ya habría sido acoplado a su respectivo padre y por lo tanto no habría problema alguno...
    }//se seteará cuando se haga la reducción en la pila...

    override exe_ControlSentence(): Result {
        console.log("exe_ControlSentence [IF]");

        console.log("evaluating condition");
        let conditionResult:Result = this.evaluateCondition();
        console.log(conditionResult);

        if(conditionResult.getType() == ContentType.BOOLEAN){
            this.TAS = new TAS();
            let result:Result;            

            if((conditionResult.getValue() as boolean)){
                console.log("[IF] the condition is true! :3 xD");
                result = this.readStack();
                return result;
                //no haog en esa misma línea de arribita el return por los errores que podría lanzar el readStack()... Aunque si mal no recuerdo, en tus programas a pesar que el método pueda devolver el error, de todos modos haces el return al invocar a ese método xD
            }else if(this.else_Condition != null){
                result = this.else_Condition.exe_ControlSentence();                
                return result;
            }

            return new Result(ContentType.NOTHING);//puesto que la condición si era booleana, pero su valor fue false y no había else en el cual entrar en su defecto xD
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.BOOLEAN_REQUIRED_IF,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "An IF condition require be BOOLEAN");        
        //Aquí no es nec revisar que sea != NOTHING para hacer la dev, puesto que lo que devolvió será lo que se debe retornar, puesto que no es un ciclo en el que se pueda volver a evaluar la expre, entonces esas líneas no tienen sentido xD
    }
}