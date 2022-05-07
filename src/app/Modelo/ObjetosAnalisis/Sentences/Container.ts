import { TAS } from "../EDDs/TablaSimbolos/TAS";
import { Sentence } from "./Sentence";

export class Container extends Sentence{
    TAS:TAS;

    getTAS():TAS{
        return this.TAS;
    }
}

//HEREDEROS
    //>Function
    //Loop
    //Control_Sentence