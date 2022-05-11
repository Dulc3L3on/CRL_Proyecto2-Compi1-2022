import { Variable } from "../Function_Content/Content/Variable";
import { Function } from "./Function";
import { GlobalContainer } from "../GlobalContainer";
import { Result } from "../Function_Content/Content/Result";

export class Void_Function extends Function{

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros:Array<Variable>){
        super(padre, type, functionName, parametros);     
    }

    override exe_Function(): Result {
        //Recuerda que no se requiere inicializar la TAS, puesto que esto se hace con la directiva loadArguments, que es invocada en la exe de Invocación xD        
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
        if(result.getType() == ContentType.RETURN){//no pongo else if, porque aunque entre en el if de arriba, no tendría oportunidad de entrar a este, por solo ser un if xD
            return new Result(ContentType.NOTHING);//puesto que la axn del return muere al llegar a instancias del padre void_function xD y por lo tanto este RETURN, no puede ni debe afectar a los demás métodos, a menos que hicieran un return de éste, pero por ser de tipo void la fun, esto sería un err xD
                                                   //y además está nice hacer esto, ya que los Result de las funciones van a recaer a una expre y esta en sus revisiones de valores correctos, no incluye a RETURN xD
        }

        return result;        
    }
    
}