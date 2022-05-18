import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { Result } from "../Content/Result";
import { Control_Sentence } from "./Control_Sentence";

export class Else extends Control_Sentence{

    constructor(line:number, column:number, ){//por ser un else, no es nec que reciba la condi, puesto que se debe exe en situaciones contrarias al if...
        super(line, column, null);

        this.sentenceName = "SINO";
    }

    override exe_ControlSentence(): Result {
        console.log("exe_controlSentence [ELSE]");
        this.TAS = new TAS();

        return this.readStack();
    }//tuve que sobreescribirlo por la ini de la TAS xD, bueno, aunque tb hubiera podido hacerlo en el Control_Sentence xD

    //no debe sobrescribir algo, puesto que el comportamiento de
    //EvaluateStack, será el mismo para todos los container, hasta
    //donde veo, pero según recuerdo, creo que si puede variar
    //y además no que el método que se invocará de este va a tener las 
    //Axn predef, que es justo lo que debe hacerse al invocarse desde aquí xD
}

//Con este ELSE, cb un poquito las cosas, porque el padre si debe ser el mismo 
//que el de su respectivo IF, pero no debe ir en el contenido de dicho padre
//sino que en la var especial para el ELSE, que contiene el IF, puesto que tampoco
//puede ir en cuerpo del IF, porque no se debe exe siempre, sino dep de la o no exe
//del IF
    //Ahí te acuerdas de eso cuando estés con la impresión del AST de funciones...