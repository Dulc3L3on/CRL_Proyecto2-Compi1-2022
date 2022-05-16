import { Variable } from "../Function_Content/Content/Variable";
import { Function } from "./Function";
import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";
import { ContentType } from "./ContentType";

export class Complex_Function extends Function{    

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros:Array<Variable>){
        super(padre, type, functionName, parametros);     

        this.sentenceName = "FUNCTION ";//+ toString que da la firma de la función
    }

    override exe_Function(): Result {
        let result:Result = this.readStack();
        
        if(result.getType() == ContentType.ERROR){
            //SI, EES UN HECHO QUE NO DEBE HACERSE ALGO AL recibir un ERROR!
            //puesto que en el lugar en el que se creó se hizo el seteo del
            //msje corresp, ya sea al listado o de una vez a la consola
            //por medio de un servicio en el caso de lo 2do y en lo 1ro quiza tb xD
                //a menos que haga falta más msjitos xD
            
        }else if(result.getType() == ContentType.RETURN){
            result = new Result(ContentType.ERROR, "A function should return"
            +" a value");

            //Se add el msje al listado de errores, o de una vez a la consola,
            //por medio del servicio xD
        }else if(result.getType() != this.getType()){
            result = new Result(ContentType.ERROR, "A "+this.getType()
             + " function cannot return an "+ result.getType());
        }

        return result;
        //aquí vienen a caer I, D, S, C, B, ERR, por los último 2 if...
        //puesto que eso se debe informar a los demás este tipo de R//
    }
    //al crear el commit que add todo esto por 1ra vez, al repo, tenía exe pero en realidad debería ser exe_function, creo que habías olvidado eso xD
    //NO OLVIDES, que los RESULT que las fun/met retornan van a caer a una epxre, entonces todo nice, no hay problema y mejor dicho una fun debe retornar el tipo corresp al que recibió luego de leer su respect stack xD
}