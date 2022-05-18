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
            console.log(argumentos);

            for(let index = 0; index < argumentos.length; index++){
                console.log("--argumento--");
                console.log(argumentos[index]);
                let tipo = argumentos[index].getValue().getType();
                console.log("tipo" + tipo);

                rehash += tipo;
            }
    
            console.log("rehash: " + rehash);
            return rehash;
        }
        return name;
    }//si se generó un error al momento de calcular la expre, el tipo que se debería obtener es el de error, lo cual no está mal, malo sería que al gnerarse un error, se creara una excep real y por lo tanto se parara el programa...

    isADecimal(num:number|null|undefined):boolean{//que pasa si en tiempo de exe recibe un undefined, en primer lugar creo que no entraría aquí...
        if(num == null || num == undefined){
            return false;
        }

        //Sino, entonces que proceda xD    
        let numString = num.toString();

        if(numString.split(".").length > 1){
            console.log("the number "+ num +" is a decimal");
            return true;
        }//puesto que siempre devolverá un arreglo, a menos que esto esté indefinido... de ser así provocaría problemas... a menos que los evite xD

        console.log("the number "+ num +" isn't a decimal");
        return false;
    }//Da lo mismo que usar lo del %1 ;-; xD, es decir no funciona cuando es .0...

    /* antigua forma
    isADecimal(num:number):boolean{
        if((num%1) > 0){
            console.log("the number "+ num +" is a decimal");
            return true;
        }
        console.log("the number "+ num +" isn't a decimal");
        return false;
    }*/

}