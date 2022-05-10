import { Variable } from "../Function_Content/Content/Variable";
import { Function } from "./Function";
import { GlobalContainer } from "../GlobalContainer";
import { Result } from "../Function_Content/Content/Result";

export class Void_Function extends Function{

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros:Array<Variable>){
        super(padre, type, functionName, parametros);     
    }

    override exe_Function(): Result {
        let result:Result = this.readStack();

        //SI, EES UN HECHO QUE NO DEBE HACERSE ALGO AL recibir un ERROR!
        //puesto que en el lugar en el que se creó se hizo el seteo del
        //msje corresp, ya sea al listado o de una vez a la consola
        //por medio de un servicio en el caso de lo 2do y en lo 1ro quiza tb xD
        
        if(result.getType() != ContentType.NOTHING //puesto que en el void, siempre debe recibirse NOTHING en un caso standar xD
           || result.getType() != ContentType.RETURN
           || result.getType() != ContentType.ERROR){
           
            result = new Result(ContentType.ERROR, "A method cannot "
            +"return any expression");
        }//es decir I, D, S, B

        return result;        
    }
    
}