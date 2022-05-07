import { Variable } from "./Variable";
import { Function } from "./Function";
import { GlobalContainer } from "../GlobalContainer";
import { Result } from "../Function_Content/Content/Result";

export class Void_Function extends Function{

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros?:Array<Variable>){
        super(padre, type, functionName, parametros);     
    }

    override readStack(): Result{
        //imple de código...
    

        return new Result();//para este pto de existir returns, solo habría de esoss pero simples, puesto que al estar asignando los obj, se hace esa rev, para que cuando se proceda a la exe, este método ya no tenga la tarea de revisar eso...
    }    
    
}