import { Variable } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Variable"
import { Expresion } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion";

export class Tool{

    generateFunctionHash(name:string, parametros:Array<Variable>):string{
        if(parametros.length > 0){
            let hash:string = name+parametros.length;

            for(let index = 0; index < parametros.length; index++){
                hash += parametros[index].getType();//se add el valor#
            }

            return hash;
        }
        return name;       
    }

    regenerateFunctionHash(name:string, argumentos:Array<Expresion>){
        if(argumentos.length > 0){
            let rehash:string = name + argumentos.length;

            for(let index = 0; index < argumentos.length; index++){
                rehash += argumentos[index].getValue().getType();
            }
    
            return rehash;
        }
        return name;
    }//si se generó un error al momento de calcular la expre, el tipo que se debería obtener es el de error, lo cual no está mal, malo sería que al gnerarse un error, se creara una excep real y por lo tanto se parara el programa...

    isADecimal(num:number):boolean{
        return false;
    }

}