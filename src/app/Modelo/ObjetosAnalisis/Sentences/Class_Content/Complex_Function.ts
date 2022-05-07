import { Variable } from "./Variable";
import { Function } from "./Function";
import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";

export class Complex_Function extends Function{    

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros?:Array<Variable>){
        super(padre, type, functionName, parametros);     
    }

    override readStack(): Result {
        //imple de código...
    

        return new Result();
    }    

}