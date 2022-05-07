import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";
import { Function } from "./Function";

export class Main extends Function{

    constructor(padre:GlobalContainer){
        super(padre, ContentType.VOID, "Principal");        
    }

    override readStack(): Result {
        
        return new Result();//se quedará así puesto que no debe devolver algo xD
                            //aunque quizá no se quede tan así, por la existencia
                            //del return simple, puesto que para ellos no hay res-
                            //tricc de existencia en lso métodos void y demás contenedores...
    }

}