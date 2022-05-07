import { LocalContainer } from "../../LocalContainer";
import { Control_sentence } from "./Control_Sentence";

export class Else extends Control_sentence{
    
    constructor(padre:LocalContainer){//por ser un else, no es nec que reciba la condi, puesto que se debe exe en situaciones contrarias al if...
        super(padre);
    }

    //no debe sobrescribir algo, puesto que el comportamiento de
    //EvaluateStack, será el mismo para todos los container, hasta
    //donde veo, pero según recuerdo, creo que si puede variar
    //y además no que el método que se invocará de este va a tener las 
    //Axn predef, que es justo lo que debe hacerse al invocarse desde aquí xD
}