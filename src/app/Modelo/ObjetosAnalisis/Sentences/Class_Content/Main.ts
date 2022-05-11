import { newArray } from "@angular/compiler/src/util";
import { Result } from "../Function_Content/Content/Result";
import { Variable } from "../Function_Content/Content/Variable";
import { GlobalContainer } from "../GlobalContainer";
import { Function } from "./Function";

export class Main extends Function{

    constructor(padre:GlobalContainer){
        super(padre, ContentType.VOID, "Principal", new Array<Variable>());//envío una instancia vacía, puesto que quedamos que para cuando no hayana parámetros se enviará esto, con tal que no hayan problemas xD
    }

    override exe_Function(): Result {
        (this.father as GlobalContainer).initTAS();//esto bien podría evitarse al usar el método getInvocatedFunction(), pero para variar un poco, y que esta clase tenga algo sobreescrito xD, lo haremos así xD

        let result:Result = this.readStack();

        if(result.getType() == ContentType.NOTHING){//puesto que es una función VOID, de lo contrario si obtuviera un valor != ERR y VOID, estarían intentando que la función retorne un valor, lo cual es incorrecto xD
            return new Result(ContentType.SUCCESS);
        }else if(result.getType() != ContentType.ERROR){
            return new Result(ContentType.ERROR, "The main function cannot return any value because its VOID type");            
        }
        return new Result(ContentType.ERROR, "Impossible to exec correctly because exist errors");
    }

}