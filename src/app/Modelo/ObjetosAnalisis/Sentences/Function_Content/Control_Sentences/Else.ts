import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { LocalContainer } from "../../LocalContainer";
import { Result } from "../Content/Result";
import { Control_sentence } from "./Control_Sentence";

export class Else extends Control_sentence{
    
    constructor(/*padre:LocalContainer*/){//por ser un else, no es nec que reciba la condi, puesto que se debe exe en situaciones contrarias al if...
        super(/*padre, */null);

        this.sentenceName = "SINO";
    }

    override exe_ControlSentence(): Result {
        this.TAS = new TAS();

        return this.readStack();
    }//tuve que sobreescribirlo por la ini de la TAS xD, bueno, aunque tb hubiera podido hacerlo en el Control_Sentence xD

    //no debe sobrescribir algo, puesto que el comportamiento de
    //EvaluateStack, será el mismo para todos los container, hasta
    //donde veo, pero según recuerdo, creo que si puede variar
    //y además no que el método que se invocará de este va a tener las 
    //Axn predef, que es justo lo que debe hacerse al invocarse desde aquí xD
}